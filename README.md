# SKN17-4th-3Team
# 🗺️4th_PROJECT_3TEAM

---
# 📚 Contents

<br>

1. [팀 소개](#1-팀-소개)
2. [프로젝트 개요](#2-%EF%B8%8F-프로젝트-개요)
3. [기술 스택 및 사용 모델](#3-%EF%B8%8F-기술-스택-및-사용-모델)
4. [시스템 아키텍처 ](#4-시스템-아키텍처)
5. [WBS](#5-%EF%B8%8F-wbs)
6. [요구사항 명세서](#6-요구사항-명세서)
7. [수집 데이터 및 전처리 요약](#7-수집-데이터-및-전처리-요약)
8. [DB 연동 구현 코드](#8--db-연동-구현-코드)
9. [테스트 계획&결과 보고서](#9--테스트-계획-및-결과-보고서)
10. [진행과정 중 프로그램 개선 노력](#10-진행과정-중-프로그램-개선-노력)
11. [수행결과](#11--수행결과)
12. [한계](#12-한계)
13. [한 줄 회고](#13-%E2%80%8D-한-줄-회고)
<br>
<br>

<br>

## 1. 팀 소개
<br>

### 💡팀명 : **오솔길**

<br>
<br>

---

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



## 3. 🛠️ 기술 스택 및 사용 모델

| **분류**         | **기술/도구**                                                                            |
|------------------|------------------------------------------------------------------------------------------|
| **Language**         | ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python)     |
| **Development**   | ![VS Code](https://img.shields.io/badge/VS%20Code-0078d7?style=for-the-badge&logo=visualstudiocode&logoColor=white) ![Colab](https://img.shields.io/badge/Colab-F9AB00?style=for-the-badge&logo=googlecolab&color=525252)  ![RunPod](https://img.shields.io/badge/RunPod-5D29F0?style=for-the-badge&logo=runpod&logoColor=white)
| **Vector DB**	|![FAISS](https://img.shields.io/badge/FAISS-005EB8?style=for-the-badge&logo=meta&logoColor=white)	|
| **Framework**	| ![LangChain](https://img.shields.io/badge/LangChain-00B8A9?style=for-the-badge&logo=langchain&logoColor=white)	|
| **Demo**	| ![Streamlit](https://img.shields.io/badge/Streamlit-FF4B4B?style=for-the-badge&logo=streamlit&logoColor=white)|
| **Collaboration Tool**      | ![GitHub](https://img.shields.io/badge/github-121011?style=for-the-badge&logo=github) ![Git](https://img.shields.io/badge/git-F05033?style=for-the-badge&logo=git) ![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)|

<br>

## 사용 모델
| **분류**         | **사용 모델**                                                                             |
|------------------|-----------------------------------------------------------------------------------------|
|  **임베딩 모델**     |  **SentenceTransformer (all-MiniLM-L6-v2)**                              |
|  **LLM 모델**      |                  **Trillion-7B-Preview**                          |

<br>

**선정 이유**
<br>

#### 1. 임베딩 모델 선정 이유

<img src="img/embedding.jpg" width=700/>


<br>


<br>

#### 2. LLM 모델 선정 이유

<br>
<img src="img/trillion-7b-preview(1).png" width=700/>
<img src="img/trillion-7b-preview(2).jpg" width=700/>
<br>

<img src="img/trillion-7b-preview(3).png" width=700/>
출처: https://elice.io/ko/newsroom/llm-benchmark-korea-elice
<br>

---

## 4. 🧩시스템 아키텍처 

<img src="img/시스템아키텍처_수정.png" width=700/>

<br>


---

## 5. 🖼️ 요구사항 명세서
<img width="1435" height="617" alt="image" src="https://github.com/user-attachments/assets/6b25d5bb-ab54-4567-bc05-a929965c66b7" />





---

## 6. 📝요구사항 명세서

<img src="img/요구사항명세서.png" width=700/>

---


## 7. 📁수집 데이터 및 전처리 요약

=======
### 7.1 데이터 출처

- [대한민국 구석구석](https://korean.visitkorea.or.kr/main/main.do/) 웹크롤링 <br>

<img src="img/crawling(1).png" width=700/>
- 대한민국 최대 관광 사이트 <br>

<br>


**이유:** <br>
- 지역별 관광지 전부 확인 가능
- 태그별 관광지 분류 및 정보 추출 가능
- 크롤링 가능(가능 여부 확인 완료)
- 상세 정보(주소, 주차 가능 여부, 장애인 시설 등) 및 리뷰 댓글 포함

<br>

**데이터 출처 선정 이유:** <br>
- 지역별 관광지 전부 확인 가능
- 태그별 관광지 분류 및 정보 추출 가능
- 크롤링 가능(가능 여부 확인 완료)
- 상세 정보(주소, 주차 가능 여부, 장애인 시설 등) 및 리뷰 댓글 포함


<p align="center">
  <img src="img/crawling_ex(1).png" width="48%"/>
  <img src="img/crawling_ex(2).png" width="48%"/>
</p>
<p align="center">
<img src="img/crawling_ex(3).png" width=450/> 
<img src="img/crawling_ex(4).png" width=400/>
</p>


<br>


---

### 7.2 데이터 특징

- 총 20508개의 데이터, 84개의 컬럼
<img src="img/columns(1).jpg" width=700>



<br>

### 7.3 데이터 전처리 요약

<br>

전처리 과정에서 중복된 데이터 및 누락된 정보를 처리하고, 불필요한 컬럼을 정리하는 작업을 진행했습니다. 이를 통해 데이터의 품질을 높였습니다.

**1. 중복 확인:** <br>
- place 컬럼을 기준으로 중복된 데이터를 찾아 제거하였습니다.

**2. 정보 누락 확인:** <br>
- info와 review 컬럼에서 누락된 데이터를 찾아 추가 및 수정하였습니다.

**3. 불필요한 컬럼 제거 및 수정:** <br>
- 지역별 데이터 취합 과정에서 생성된 Unnamed 컬럼들과 크롤링 과정에서 생성된 오류 컬럼 등을 제거하고, <br>
`\r\n`, `\n`과 같이 컬럼명의 불필요한 문자를 수정하였습니다.

**4. 유사한 이름의 컬럼 합치기:** <br>
- `체험 프로그램`과 `체험프로그램` 과 같이 유사한 이름의 컬럼을 합치는 과정을 거쳤습니다.

**5. 숙박업소 및 음식점 제외:** <br>
- 숙박업소 및 음식점, 카페는 전부 제외하였습니다.
- 단, 체험 항목이 있거나, 관광지로 의미가 있을만한 곳들은 포함시켰습니다.
<img src = "img/preprocess(1).png" width=600>

**6. 청소년 수련원과 수련원 제외** <br>
- 수련원 데이터들을 전부 확인 후 제거했습니다.
 
**7. 이 외 데이터 제거** <br>
- 안경점, 진돗개 데이터 등의 데이터들을 추가로 제거했습니다.
<img src = "img/preprocess(3).png" width=600> <img src = "img/preprocess(4).png" width=600>


### 7.3 최종 전처리 결과

- 총 19854개의 데이터 ,73개의 컬럼
<img src="img/columns(2).jpg" width=700>
<br>


---

## 8. 🔗 DB 연동 구현 코드

[FAISS DB 연동 구현 코드](https://github.com/PrettyGirlss/crawling-data/blob/main/RAG/rag.py)

---

## 9. 📻 테스트 계획 및 결과 보고서

🗒️[테스트 계획 및 결과 보고서.pdf](https://github.com/SKNETWORKS-FAMILY-AICAMP/SKN17-3rd-3Team/blob/main/%ED%85%8C%EC%8A%A4%ED%8A%B8%20%EA%B3%84%ED%9A%8D%20%EB%B0%8F%20%EA%B2%B0%EA%B3%BC%20%EB%B3%B4%EA%B3%A0%EC%84%9C.pdf)

### 테스트 계획
**테스트 항목 및 기준**

| 테스트 항목         | 테스트 대상            | 평가 내용                                                                 |
|---------------------|------------------------|--------------------------------------------------------------------------|
| 응답의 상세함       | Fine-tuning, RAG       | - hallucination 여부 <br> - 실존하는 여행지, 상세 정보 등 <br> - 지역을 특정한 경우 일치하는 지역인지 |
| 응답 형식의 구조화  | Prompt Engineering     | - 요구한 응답 형식(3줄의 완결된 문장, 장소 이름+특징) 출력 여부 |
| 입력 상황 반영      | Prompt Engineering     | - 입력된 상황(체험, 피크닉, 부모님, 아기, 반려동물 동반 등)이 응답에 반영되는지 여부 |

<br>

**시스템 평가 기준 지표**<br>
➀ 실존하는 장소인지 <br>
➁ 사용자 맞춤 관광지 제공 - 사용자의 특징(액티비티, 피크닉, 사진 촬영 등의 선호도)과 동반 여부(부모님, 아이, 반려동물 등)를 실제로 반영하였는가<br>
➂ 입력 반영 정확도: RAG 문서의 내용이 실제로 반영되었는가<br>
➃ 출력 형식 일관성 : 3줄의 완결된 문장으로 출력되었는가. 장소 이름과 특징을 출력하였는가<br>

<br>

**테스트 문항**<br>
➀ 아기 데리고 같이 갈 만한 관광지와 장소에 대한 설명을 같이 해줘.<br>
➁ 반려동물과 함께 갈 수 있는 서울에 있는 관광지 추천해줘.<br>
➂ 부모님과 함께 드라이브할 수 있는 코스 추천해줘.<br>
➃ 혼자서 놀기에 적합한 부산 여행지 추천해줘.<br>
➄ 애인과 함께 데이트할 만한 강원도 여행지 추천해줘.<br>
➅ 아이와 함께 체험활동을 할 수 있는 관광지 추천해줘.<br>
➆ 역사탐방하기에 좋은 관광지 코스 추천해줘.<br>
➇ 경상남도 사진찍기 좋은 곳 추천해줘.<br>
➈ 전라남도 피크닉하기 좋은 곳 추천해줘.<br>
➉ 경기도 산책하기 좋은 장소 추천해줘.<br>

<br>

### 테스트 결과
**평가 결과**<br>
RAG나 별도의 프롬프트 없이 sLLM으로 답변을 생성하면 실제 그 지역에 있지 않은데도 추천하는 Hallucination 현상이 일어나는 것이 많이 보였다. <br>

<br>

### 테스트 결론
실제 관광지 데이터셋을 retriever로 llm에 묶은 결과, llm이 생각해서 추천하려는 장소의 실주소지를 파악할 수 있어 Hallucination이 줄어드는 성과를 보였다. <br>
비록 retriever로 관련 Document를 뽑아와도 제대로 지역을 확인하지 못하는 경우가 있었지만 프롬프팅으로 모델이 한 번 더 확인할 수 있게 해줘서 그런 현상을 더 줄일 수 있었다.
  
---
## 10. 🔍진행과정 중 프로그램 개선 노력

### 10.1 데이터 수집 부문

#### 1) 데이터 수집 출처 변경
처음에는 TripAdvisor에서 한 장소 당 최대 25개씩의 리뷰를 크롤링하여 데이터를 수집하고자 하였으나, 웹크롤링을 할 수 없는 환경이었을 뿐 아니라 관광지의 상세 정보(주소, 주차 가능 여부, 화장실 여부, 장애인 시설 등) 부족, 관광지명 언어 불일치 등의 한계점이 있었습니다. <br>
이후, 한국관광공사의 '대한민국 구석구석' 사이트로부터 지역별 관광지, 상세 정보, 리뷰 등을 크롤링하게 되었습니다. <br>

#### 2) 추가 크롤링
전체 약 20000개의 데이터 중 리뷰 데이터가 8000개 뿐이었습니다. <br>
리뷰 데이터를 통해 RAG를 구축하고 임베딩해 관련된 데이터를 추출하기에는 무리가 있다고 판단하여 크롤링한 사이트에서 추가로 데이터를 크롤링하였습니다.<br>
<img width="500" height="100" alt="image" src="https://github.com/user-attachments/assets/cdcd24ff-be19-4eac-8bdc-488ad2257917" />

관광지에 대한 #문화공간, #가볼래터, #관광지, #남녀노소, #여행구독, #연인과함께와 같은 태그 컬럼을 추가하여 벡터 DB에 넣었습니다. 이를 통해 리트리버의 검색 성능이 개선되었습니다. <br>


### 10.2 임베딩 모델 개선

임베딩 모델 변경: <br>
초기에는 all-MiniLM-L12-v2 모델을 사용했으나, 인코딩 시간이 너무 길어 all-MiniLM-L6-v2 모델로 변경하여 속도 개선을 이루었습니다. <br>
변경 후 인코딩 속도가 크게 향상되었습니다.

<br>

### 10.3 벡터 DB 와 LLM 성능 향상

<br>

Document 객체 내용 조정 : <br>
Document 객체의 metadata와 page_content 내용을 기존 데이터의 place, info, review 주소, 태그 등의 컬럼을 다양한 방식으로 조합하여 여러 가지 벡터 DB를 생성하였습니다. <br>
<img src='img/vectordb(1).png' width=700>
<br>

##### 기존 documents :

<img width="1970" height="355" alt="image" src="https://github.com/user-attachments/assets/dc033a5e-b40c-4552-b5b4-8ae3542639cb" />
<br>

##### 변경한 documents :

<img width="1987" height="312" alt="image" src="https://github.com/user-attachments/assets/6aeccbf5-69ed-4167-83f3-47d340fde7ca" />
<br>

<br>

### 10.4 청킹 부문

CharacterTextSplitter -> RecursiveCharacterTextSplitter: <br>
처음에는 CharacterTextSplitter를 사용했으나, 도큐먼트 컨텐츠가 제대로 청킹되지 않았습니다. 로우 수가 기존 데이터와 동일했으나, RecursiveCharacterTextSplitter로 변경하였더니, 총 로우 개수가 늘어나면서 제대로 청킹이 이루어졌습니다.


---

## 11. 한계

<br>

### 1. Retriever 객체 개선 ->SelfQueryRetriever
<br>
: 메타데이터 필드 와 문서 내용에 대한 간단한 설명을 미리 제공

프로그램 개선 과정에서 Retriever 객체의 성능을 높이기 위해
metadata_field_info를 정의하여 문서에 대한 더 구체적인 메타데이터 정보를 제공하고, 이를 통해 검색 성능을 향상시켰습니다.

**1. AttributeInfo 클래스를 사용해 관광지 정보**
(예: place, 홈페이지, 주소, 이용시간, 휴일 등)를 세분화하여 검색 성능을 향상시켰습니다.

<img width="512" height="517" alt="image" src="https://github.com/user-attachments/assets/30e41381-c74e-4b1d-9fec-0c222e0e41e8" />
<img width="939" height="154" alt="image" src="https://github.com/user-attachments/assets/289f5fe6-9ec2-4192-b6f7-cf41b16baf2f" />



**2. 문서 내용 및 메타데이터 필드 정보**
지역별 관광지 설명과 메타데이터를 document_content에 결합하여 SelfQueryRetriever에 전달했습니다.

**3. SelfQueryRetriever 개선**
SelfQueryRetriever.from_llm() 메서드를 사용하여 벡터 저장소와 연결된 리트리버 객체를 인스턴스화하고, 더 정확한 검색이 가능하도록 했습니다.

<img width="350" height="140" alt="image" src="https://github.com/user-attachments/assets/8092f4d1-03f8-49be-b7a3-49929c36cbc1" />


<br>

### 2. Finetuning

##### 사용한 모델들

세 가지 **sLLM 모델**을 활용하여, 기존 데이터셋을 바탕으로 **파인튜닝**을 진행하여 모델 성능을 개선하고자 했습니다. 각 모델의 특성에 맞는 최적화 작업을 진행했으며, 사용된 모델들은 다음과 같습니다:

| 모델 이름 | 특징 | 파인튜닝된 모델 허깅페이스 링크 |
| --- | --- | --- |
| **HyperCLOVA X SEED** | 한국어 최적화 모델로, 고객 리뷰 분석에 강점. 한/중/일 최적화. | [HyperCLOVA X SEED]( https://huggingface.co/0lipa/SEED-1.5B-travel-finetuned) |
| **블라썸 한국어 최적화 모델** | 한국어에 최적화된 파인튜닝 모델로, 효율적인 한국어 문장 생성 가능. | [Bllossom/llama-3.2-Korean-Bllossom-AICA-5B]([https://huggingface.co/Bllossom/llama-3.2-Korean-Bllossom-AICA-5B](https://huggingface.co/CHOROROK/llama3.2-travel-finetuned2)) |
| **Saxo Linkbricks-Horizon AI-Korean** | 한/중/일 최적화된 모델로, 고객 리뷰 분석에서 높은 성능을 보임. | [Saxo/Linkbricks-Horizon-AI-Korean-llama-3.1-sft-dpo-8B](https://huggingface.co/0lipa/Linkbricks-Horizon8.0B-travel-finetuned) |

##### 파인튜닝을 위한 데이터셋 생성


<img width="1743" height="271" alt="image" src="https://github.com/user-attachments/assets/9926f475-ab3a-4fd1-a4b3-bcc5ebbe0f85" />


기존 데이터셋을 바탕으로, **파인튜닝을 위한 데이터셋**을 새롭게 생성하여 모델의 성능을 개선하려고 했습니다. 각 모델에 최적화된 데이터를 만들기 위해, **주어진 지시문을 바탕으로 관련된 질문과 답변을 데이터셋으로 구성**하였으며, 이를 통해 **한국어 문장 처리 성능을 높이기 위한 노력**이었습니다.

위 작업을 통해 **모델의 정확도와 효율성**을 개선하는데 집중했습니다.

### 3. 추가적인 한계점 
-> 거리까지 고려해 코스를 짜주는 챗봇은 아직 고려하지 못 했습니다.
<br>
-> 실시간 관광지를 반영하기 어려울 수 있습니다.


---


## 12. 💻 수행결과

<img width="1008" height="823" alt="image" src="https://github.com/user-attachments/assets/42ca1e02-6bfd-4f48-a565-66865e8856e7" />


---
## 13. 🧑‍💻 한 줄 회고
 
| **이름** | **회고 내용** |
|---|---|
| 김태연 | LLM모델에 rag과 파인튜닝이 왜 필요한지 느낄 수 있는 기회가 되었습니다. 처음 시작 때의 기대에 비해 쉽지 않았던 프로젝트 진행이었지만, 4차단위에서는 3차에서 느꼈던 한계점들을 보완하여 더 나은 성과를 얻을 수 있도록 좀 더 전략적으로 진행해야겠다고 생각하게 되었습니다.  |
| 박지수 | 데이터를 수집하고 전처리하는 과정이 오래 걸려 RAG나 파인튜닝에 충분한 시간을 쏟지 못한 것이 너무 아쉬웠습니다. 리뷰 데이터를 추출할 수 있는 사이트가 더 많았다면 목표한 바를 이룰 수 있지 않았을까 싶어서 좀 더 알아보고싶습니다. 또, 결국 파인튜닝된 sllm을 연결하지 못 했는데 어떤 부분을 고쳐야할지 공부해볼 계획입니다. |
| 신승철 | retriever를 구성하면서 llm이 metadata의 필드들을 이해하게 하려 했으나 잘 인식하지 못해서 어려움을 겪었다. 또한 파인튜닝시 필요한 데이터를 찾는 것도 힘들었지만 합성데이터를 사용하는 방식도 있다고 해서 이 방식으로 진행했지만 파인튜닝도 잘 되지 않아 데이터가 중요하다는 것을 느꼈다. |
| 이재은 | Chroma DB와의 연동을 구현하면서, 데이터를 효과적으로 청킹하고, Document 객체를 생성한 뒤 이를 임베딩하여 데이터베이스에 저장하는 전체 과정을 체계적으로 이해할 수 있었습니다. |
| 조해리 | 처음 계획하고 생각했던 것과 달리 계속해서 예상치 못한 벽에 부딪히는 경험을 한 프로젝트였습니다. 데이터를 수집하고 전처리하는 과정도 계속해서 보충할 점이 생겼고, 파인튜닝을 위한 데이터셋을 준비하는 것도 쉽지 않았습니다. 또한 파인튜닝을 한 모델의 성능 또한 기대와 너무 달라서 조금 더 보완하고 싶다고 생각하게 되었습니다.  |
