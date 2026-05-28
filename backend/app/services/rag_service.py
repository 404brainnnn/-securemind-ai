import os

from dotenv import load_dotenv
from openai import OpenAI

from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings

load_dotenv()

client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)

embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

CHROMA_PATH = "chroma_db"


def create_vector_store(text):

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )

    chunks = splitter.split_text(text)

    Chroma.from_texts(
        chunks,
        embedding=embedding_model,
        persist_directory=CHROMA_PATH
    )

    return len(chunks)


def ask_question(query):

    vector_store = Chroma(
        persist_directory=CHROMA_PATH,
        embedding_function=embedding_model
    )

    docs = vector_store.similarity_search(query, k=5)

    context = "\n\n".join([doc.page_content for doc in docs])

    prompt = f"""
You are SecureMind AI, an intelligent enterprise document assistant.

Your job:
- Answer using the provided context when relevant
- If context does not contain the answer, reply naturally
- Be concise and professional
- Never say "I cannot answer" unless truly impossible

DOCUMENT CONTEXT:
{context}

USER QUESTION:
{query}

ANSWER:
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content