FROM python:3.12

ENV PYTHONDONTWRITEBYTECODE=1 
# 실행시 pycache 파일 안생기게
ENV PYTHONUNBUFFERED=1
# 로그가 실시간 출력되도록

WORKDIR /code
# 작업 영역 디렉토리

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
# requirements 목록 복사해 설치

COPY . .
# 여기 전체 코드 목록을 디렉토리에 대해 가져감
RUN python manage.py collectstatic --noinput
# 입력받는거 없이 정적 파일들을 다 모아서 처리해주겠다

CMD ["gunicorn", "_4th_project.wsgi:application", "--config", "gunicorn.conf.py"]