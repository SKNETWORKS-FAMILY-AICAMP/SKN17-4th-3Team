# SKN17-4th-3Team
# 🌸우리와 함께 떠나봄🌸

---
# 📚 Contents

<br>

1. [팀 소개](#1-팀-소개)
2. [프로젝트 개요](#2-%EF%B8%8F-프로젝트-개요)
3. [기술 스택](#3-%EF%B8%8F-기술-스택)
4. [시스템 아키텍처](#4-시스템-아키텍처)
5. [요구사항 명세서](#5-요구사항-명세서)
6. [화면설계서](#6-화면설계서)
7. [WBS](#7-WBS)
8. [ERD](#8-EDA)
9. [테스트 계획&결과 보고서](#9--테스트-계획-및-결과-보고서)
10. [수행결과](#10-수행결과)
11. [한 줄 회고](#11-한-줄-회고)

<br>

<br>

## 1. 팀 소개
<br>

### 💡팀명 : **오솔길**

### 🌟 팀원 소개

<br>

| 🥇 김태연 | 🥇 박지수 | 🥇 신승철 | 🥇 이재은 | 🥇 조해리 |
|:---:|:---:|:---:|:---:|:---:|
| <img width="150" height="190" alt="image" src="https://github.com/user-attachments/assets/6ca78457-21eb-4345-ab44-31762322ed82" /> | <img width="150" height="190" alt="image" src="https://github.com/user-attachments/assets/112bf72d-9b9e-402b-ac76-774303473aa3" /> | <img width="150" height="190" alt="image" src="https://github.com/user-attachments/assets/4a8a8133-7764-46a0-b0b3-11ae0f7531b2" /> | <img width="150" height="190" alt="image" src="https://github.com/user-attachments/assets/c08ac296-682e-45a4-85be-33b2eb3fad91" /> | <img width="150" height="190" alt="image" src="https://github.com/user-attachments/assets/03371a1f-70c9-4cd2-866a-8d9cffaa8331" /> |
| [@Taeyeon514](https://github.com/Taeyeon514) | [@0lipa](https://github.com/0lipa) | [@ssshinnpson](https://github.com/ssshinnpson) | [@JAEEUN0129](https://github.com/JAEEUN0129) | [@Haer111](https://github.com/Haer111) |

<br>

---

## 2. 📽️ 프로젝트 개요

<br>

## **🛫프로젝트 명 : 떠나봄🌸** 

<br>

### 2.1 프로젝트 소개

<br>

**관광지 정보를 알려주고 코스를 짜주는 챗봇 개발**

<br>

본 프로젝트는 **여행지 혹은 코스를 추천**해주는 관광 챗봇을 개발하는 것을 목표로 합니다. <br>
사용자가 **누구와 함께, 어떤 방식으로, 어디로 여행하고 싶은지** 등의 정보를 질문하면, 챗봇이 그에 맞는 여행지 혹은 코스를 추천해주고 이에 대한 설명을 추가적으로 해줍니다. <br>


---

### 2.2 프로젝트 필요성


<br>

#### 1. 할루시네이션 <br>

<br>

<img width="800" height="600" alt="image" src="https://github.com/user-attachments/assets/5712d666-b463-458c-8b18-1672e49002a3" />
<br>
Malta대학교의 Mark Anthony Camilleri 교수의 연구에 따르면, 최근 여행·관광 서비스 분야에서 디지털 미디어와 대화형 서비스 기술(챗봇 등)은 빠르게 확산되고 있습니다. 고객들은 여행 상품 검색, 일정 예약·변경, 환불 요청 등 다양한 활동을 온라인에서 수행하며, 이 과정에서 인공지능 기반 대화 시스템을 활용하는 경우가 늘어나고 있습니다.

>> 예시:
>>
>> <img width="800" height="600" alt="image" src="https://github.com/user-attachments/assets/81a00064-d65e-4b01-958b-253b95c32674" />
>>
>> **위의 사진에서 보이는 경기도 수원의 광복기념관은 존재하지 않는 곳입니다.**


<br>

#### 2. 관광지 검색 불편 <br>

대부분 사람들이 관광지를 검색할 때 지도나 블로그, 유튜브 등에 의존하곤 합니다. 하지만 지도나 블로그 등의 자료도 완벽한 해답이 되지는 못합니다. **광고성 장소**가 너무 많기 때문입니다. <br>
그래서 여행지를 검색할 때 많은 시간과 수고를 들이는 경우가 많습니다. 지도, 블로그 등에서 검색하는 이유는 또 있습니다. 바로 **리뷰** 때문입니다. 그 관광지에 다녀온 사람들이 **방문해서 어떤 것을 느꼈는지, 누구와 갔는데 어땠는지** 등을 알기 위해 사람들이 생각이 담겨있는 이러한 SNS를 주로 이용하곤 합니다. 그러나 단순 검색만으로는 이러한 맥락적인 정보를 얻기 힘듭니다. 따라서 이러한 것들을 확인하기 위해 리뷰나 블로그를 일일이 찾아봐야 하는 불편함이 있습니다.
<br>

#### 3. 국내 관광지에 대한 낮은 인지도 <br>

요즘 많은 젊은 사람들이 **국내여행보다 해외여행을 선호하는 경향**이 있습니다. <br> 
해외에 어떤 명소가 있는지 잘 알면서도 정작 **우리나라의 숨겨진 명소나 매력적인 관광지에 대해 잘 알지 못하는 경우**가 많습니다. <br>
<pre>해외 여행을 선호하는 비율은 20대 이하(48.3%)가 가장 높았고, 30대(45.9%), 40대(36.4%), 50대(34.9%), 60대 이상(33.8%)의 순이었다. <br>
국내 여행 만족도가 해외 여행보다 낮은 이유로는 ‘높은 관광지 물가(45.1%)’ ‘특색 있는 지역 관광 콘텐트 부족(19.4%)’ ‘관광지의 일부 지역 집중(9%)’ 등이 꼽혔다. <br>
국내 여행의 1회 평균 지출액은 54만3000원으로, 해외 여행(198만2000원)의 4분의 1에 불과했다. </pre>
[출처:중앙일보] https://www.joongang.co.kr/article/25353502


<br>

<h2>기대 효과</h2> 

#### 1. 관광지 검색 시간 단축 <br>
#### 2. 사용자의 상황(관계, 취향 등)에 맞는 맞춤형 관광지 및 코스 추천 <br>
#### 3. 챗봇 활용을 통한 국내 관광 활성화 기여 가능

<br>
---

### 2.3 프로젝트 목표

<br>

- **1차 목표 : 할루시네이션이 없는 관광지 챗봇 구현**
- **2차 목표 : 이용자의 취향과 상황을 반영하여 여행 코스를 구성해주는 챗봇 구현**
- **3차 목표 : 실제 방문 시 느낄 수 있는 경험을 얘기할 수 있는 챗봇 구현**

<br>

---



## 3. 🛠️ 기술 스택

| **분류**         | **기술/도구**                                                                            |
|------------------|------------------------------------------------------------------------------------------|
| **Language**         | ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python)     |
| **Development**   | ![VS Code](https://img.shields.io/badge/VS%20Code-0078d7?style=for-the-badge&logo=visualstudiocode&logoColor=white) ![Colab](https://img.shields.io/badge/Colab-F9AB00?style=for-the-badge&logo=googlecolab&color=525252)  ![RunPod](https://img.shields.io/badge/RunPod-5D29F0?style=for-the-badge&logo=runpod&logoColor=white)
| **Vector DB**	|![FAISS](https://img.shields.io/badge/FAISS-005EB8?style=for-the-badge&logo=meta&logoColor=white)	|
| **Framework**	| ![LangChain](https://img.shields.io/badge/LangChain-00B8A9?style=for-the-badge&logo=langchain&logoColor=white) <img src="https://img.shields.io/badge/django-092E20?style=flat-square&logo=django&logoColor=white"/>	|
| **Server/WSGI**	|![Gunicorn](https://img.shields.io/badge/gunicorn-%298729.svg?style=for-the-badge&logo=gunicorn&logoColor=white) ![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white) |
| **Model Deployment**	| ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![Docker Compose](https://img.shields.io/badge/Docker--Compose-1488C6?style=for-the-badge&logo=Docker&logoColor=white) |
| **Cloud Infra**	| ![AWSEC2](https://img.shields.io/badge/AWSEC2-FF9900?style=flat&logo=amazon-aws&logoColor=white&labelColor=FF9900) |
| **Model Hub**	| ![Hugging Face](https://img.shields.io/badge/-HuggingFace-fff5ee?logo=HuggingFace&logoColor=yellow) |
| **Collaboration Tool**      | ![GitHub](https://img.shields.io/badge/github-121011?style=for-the-badge&logo=github) ![Git](https://img.shields.io/badge/git-F05033?style=for-the-badge&logo=git) ![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)|

<br>

---

## 4. 🧩시스템 아키텍처 

<img src="img/시스템 아키텍처.png">

<br>


---

## 5. 🖼️ 요구사항 명세서
<img src="img/요구사항명세서.png" />





---

## 6. 📝화면설계서
<p align="center">  
  <img src="img/화면설계서1.png" align="center" width="32%">  
  <img src="img/화면설계서2.png" align="center" width="32%">  
  <img src="img/화면설계서3.png" align="center" width="32%">  
</p>
<p align="center">  
  <img src="img/화면설계서4.png" align="center" width="45%">  
  <img src="img/화면설계서5.png" align="center" width="45%">  
</p>


---

---

## 7. ⭐WBS
<img src="img/wbs.png" />

---


## 8. ERD

<img src="img/ERD.png"/>

---


## 9. 📻 테스트 계획 및 결과 보고서

<img src="img/테스트 계획 및 결과.png"/>

- 요구사항 명세서 기준으로 같은 IP로 5회 이상 로그인 실패시 5분간 재로그인 불가능 기능, 이메일 인증코드를 4회 이상 틀릴 경우 인증번호를 다시 받아야 회원가입을 할 수 있다는 기능을 제외한 모든 기능을 구현했습니다.


  
---
## 10. 수행결과



---

## 11. 한 줄 회고

| **이름** | **회고 내용** |
|---|---|
| 김태연 | LLM모델에 rag과 파인튜닝이 왜 필요한지 느낄 수 있는 기회가 되었습니다. 처음 시작 때의 기대에 비해 쉽지 않았던 프로젝트 진행이었지만, 4차단위에서는 3차에서 느꼈던 한계점들을 보완하여 더 나은 성과를 얻을 수 있도록 좀 더 전략적으로 진행해야겠다고 생각하게 되었습니다.  |
| 박지수 | 데이터를 수집하고 전처리하는 과정이 오래 걸려 RAG나 파인튜닝에 충분한 시간을 쏟지 못한 것이 너무 아쉬웠습니다. 리뷰 데이터를 추출할 수 있는 사이트가 더 많았다면 목표한 바를 이룰 수 있지 않았을까 싶어서 좀 더 알아보고싶습니다. 또, 결국 파인튜닝된 sllm을 연결하지 못 했는데 어떤 부분을 고쳐야할지 공부해볼 계획입니다. |
| 신승철 | retriever를 구성하면서 llm이 metadata의 필드들을 이해하게 하려 했으나 잘 인식하지 못해서 어려움을 겪었다. 또한 파인튜닝시 필요한 데이터를 찾는 것도 힘들었지만 합성데이터를 사용하는 방식도 있다고 해서 이 방식으로 진행했지만 파인튜닝도 잘 되지 않아 데이터가 중요하다는 것을 느꼈다. |
| 이재은 | Chroma DB와의 연동을 구현하면서, 데이터를 효과적으로 청킹하고, Document 객체를 생성한 뒤 이를 임베딩하여 데이터베이스에 저장하는 전체 과정을 체계적으로 이해할 수 있었습니다. |
| 조해리 | 처음 계획하고 생각했던 것과 달리 계속해서 예상치 못한 벽에 부딪히는 경험을 한 프로젝트였습니다. 데이터를 수집하고 전처리하는 과정도 계속해서 보충할 점이 생겼고, 파인튜닝을 위한 데이터셋을 준비하는 것도 쉽지 않았습니다. 또한 파인튜닝을 한 모델의 성능 또한 기대와 너무 달라서 조금 더 보완하고 싶다고 생각하게 되었습니다.  |


