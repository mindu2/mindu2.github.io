## DeepSeekMath: Pushing the Limits of Mathematical
Reasoning in Open Language Models — GRPO제안 논문

fastText-based classifier (Joulin et al.,2016). — 텍스트 분류기 

tool-integrated reasoning (Gou et al., 2023) data — 2023 년도에 agent

데이터수집 : 크롤링(근거있게 크롤링) →DeepSeekMath Corpus구축

수집한 데이터가 괜찮은지 평가 하기 위해 
MatPile(8.9B)
Proof-Pile-2(52B)
OpenWebMath(13.6B)
DeepSeekMath Corpus(120B)를
DeepSeek-LLM 1.3B모델에 대해 학습 후 평가 진행(모든 데이터 수는 150B로 맞춤,중복 샘플링)
DeepSeekMath Corpus 성능이 가장 좋았다고 함 -> 따라서 DeepSeekMath Corpus가 제일 좋다라고 주장

1. PT단계
DeepSeek-Coder-Base-v1.5 7B 모델 500B 데이터 PT(DeepSeekMath Corpus, Arxiv, AlgebraStack, Github, 일반 CC데이터)

2. SFT단계
GSM8K, MATH, Lila-OOD, Chinese K-12 mathematical 을 이용해 776k 수학 데이터 구축
3가지 유형으로 구축: COT(사고과정이 글로 적힌 데이터), POT(사고과정에 수식적인 계산이 적힌 데이터), Tool(COT, POT혼합)


여기까지 해서 이미 잘했다고 함

![image.png](https://mindu2.github.io/blog/images/deepseekmath_eval.png)

그림은 마지막 두줄 보면 됨
PPO

![image.png](https://mindu2.github.io/blog/images/deepseekmath_ppo.png)

cf) 보상모델의 경우 데이터 Rank에 따른 점수 간격을 최대화하게 학습 됨

따라서 특정 기준을 가진 분포가 아니며 출력 값 또한 실수이기에 정규화 된 값 A를 사용한다.

A는 (보상 - 보상예측값) 이다, 앞서 학습 완료된 보상 모델이 있다. 이것을 두 번 사용한다. 하나는 파라미터를 고정해서 스코어를 측정 하는 용도, 하나는 LLM을 PPO하면서 같이 학습 되어 보상 기댓값을 예측 하는 용도, 여기서 학습되는 Reward Model을 Value function이라 하며 보상 예측 값은 Value Function의 Output이다. Value funtion은 회귀로 (실제보상- 예측값)^2으로 학습되 단순히 이 시점에서 이 보상이 끝까지 갈 경우 최종 보상 값을 예측한다. 그러면 매시점 모델이 지금 생성이 괜찮은지를 판단할 수 있다. 이렇게 설계된 이유는 reward 모델은 샘플 단위로 학습해 한 샘플에 대한 score를 출력하기 때문이다. 그 결과로  문장 내 모든 토큰 들은 모두 같은 보상 R을 가지게 된다. 이 부분은 학습 시 샘플이 주어진 순간 상수 R값을 가진다고 이해하면 된다. 하지만 PPO는 토큰 단위의 업데이트를 설계한다. 토큰 단위의 업데이트를 위해 중간 토큰들에 대한 값 V가 필요하고 이를 위해 Value Function으로 (지금까지 이런 토큰들이 나왔을때 이 뒤로 끝까지 생성하면 평균적으로 받을 최종)보상을 출력한다. 그리고 A=R-V를 구해 업데이트를 진행한다.
질문 분포 P 중 하나인 Query에 대해서 생성한 답변에 대해 A를 계산, 
A는 (보상 - BaseLine)값으로 모델이 토큰을 출력하는 순간 정해지며 정규화된 보상

또한 위 식은 기존 PPO에서  KL제한이 빠진 것 처럼 보이나

![image.png](https://mindu2.github.io/blog/images/kl_divergency.png)

항을 곱해서 역할을 대신 함,  
clip을 적용한 것과 비교해 작은 값을 선택 및 gradient 업데이트를 진행

GRPO는 여기서 A(실제 보상 - 예측 보상 기댓값)정규화 방식을 바꾸자 주장한다.
1. Value funtion을 학습하면서 연산량이 증가된다. 따라서 Value model 대신, 같은 질문에서 나온 답변들끼리 서로 비교하자
2. A에 곱하던 KL을 곱하지 말고 빼자  

GRPO

![image.png](https://mindu2.github.io/blog/images/deepseekmath_grpo.png)
