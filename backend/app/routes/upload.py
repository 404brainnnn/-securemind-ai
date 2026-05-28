from fastapi import APIRouter, UploadFile, File
import shutil
import PyPDF2

from app.services.rag_service import create_vector_store

router = APIRouter()

@router.post("/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = ""

    with open(file_path, "rb") as pdf_file:

        reader = PyPDF2.PdfReader(pdf_file)

        for page in reader.pages:
            text += page.extract_text()

    chunks_created = create_vector_store(text)

    return {
        "filename": file.filename,
        "chunks_created": chunks_created,
        "message": "PDF processed successfully"
    }