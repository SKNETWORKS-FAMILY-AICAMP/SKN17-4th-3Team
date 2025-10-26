# CUDA 및 PyTorch 포함된 공식 베이스 이미지 사용
FROM pytorch/pytorch:2.0.1-cuda11.7-cudnn8-runtime

# FastAPI 및 Uvicorn 설치
RUN pip install --no-cache-dir fastapi uvicorn

# 앱 코드 복사
WORKDIR /app
COPY app/ /app/

# 포트 열기
EXPOSE 8000

# FastAPI 실행 명령
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
