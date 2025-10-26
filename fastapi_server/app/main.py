from fastapi import FastAPI
from pydantic import BaseModel
import torch

class InputData(BaseModel):
    values: list[float]  # 예: [0.1, 0.2, ..., 0.9]

app = FastAPI()

# GPU 사용 설정
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# 예시 모델 (10 → 1)
model = torch.nn.Linear(10, 1).to(device)
model.eval()

@app.post("/predict")
async def predict(data: InputData):
    x = torch.tensor(data.values, dtype=torch.float32).to(device)
    x = x.view(1, -1)  # [1, 10]
    with torch.no_grad():
        output = model(x)
    return {"result": output.cpu().item()}

# GPU 상태 확인용 엔드포인트
@app.get("/gpu-check")
def gpu_check():
    return {
        "gpu_available": torch.cuda.is_available(),
        "device": torch.cuda.get_device_name(0) if torch.cuda.is_available() else "CPU"
    }
