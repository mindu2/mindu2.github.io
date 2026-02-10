# Training language models to follow instructions with human feedback (Openai PPO 제안논문)

 
Openai의 PPO논문이다.

논문이 나온 상황
2015년에 TRPO라고 강화학습을 할 때, KL 디버젼시제약을 함께 줄 경우 안정적인 강화학습이 가능하다는 이론이 나왔다.
2017년에 Openai는 Proximal Policy Optimization Algorithms(PPO)논문을 통해 기존에 구현복잡한 KL디버젼시 제약을 현실적으로 구현 하는 방안으로 학습 후 모델의 생성한 토큰에 대한 보상값을 학습 전 모델이 생성한 토큰에 대한 보상값을 나누어 
구현한다.



데이터 실험 규모 
SFT 13K
RL 33K


### 학습 순서

GPT3 이 있음 → 사람 40명이 SFT데이터 수집 → 수집된 데이터로 GPT3-SFT 16epoch학습 → k=4 로 해서 답변 4개씩 생성 → 사람 40명이 4개의 순서(rank)를 매김 → 이 데이터로 보상 모델 학습 → RLHF학습을 위한 초기화 용 GPT3-SFT를 새로 만들기  (2 epoch, 생성된 SFT데이터 + PT데이터 10%추가) → 이렇게 생성된 GPT3-SFT(앞선 16에폭 SFT랑 다른것으로 16epoch SFT모델은 보상모델을 위한 데이터를 만들기 위해 구운것이다.)에 대해 query를 날리고 생성한 답변에 대해 보상모델이 점수를 측정 → 이 점수로 학습 진행
지금은 합성할 모델들이 많지만 이 당시만 해도 고품질 데이터를 만들 방법이 거의 없어서 수작업으로 진행 한 것으로 보인다.

보상모델  오브젝트 함수 

![image.png](https://mindu2.github.io/blog/images/ppo_loss.png)

x라는 프롬프트에 대해 yw와 yl을 출력하는 분포에 대해서 보상모델이 내놓은 yw의 점수와 yl점수간의 차이가 커지도록 학습

PPO-ptx 오브젝트 함수(ptx는 모델의 로스를 의미), 참고 PPO는 토큰단위 계산

2015년에 TRPO라고 나왔는 강화학습에서 Policy 업데이트를 안정적으로 하기 위해 hard한 KL제약을 걸음2017년에  Openai는 TRPO의 KL제약이 연산량의 증가와 구현의 복잡성으로 답이 없음에 KL대신 현재 업데이트에서 이전업데이트와 큰 차이가 없으면 되 라는 조건을 걸고 구현은 (업데이트 모델의 토큰 확률/기존 모델의 토큰 확률)로 진행한다.

![image.png](https://mindu2.github.io/blog/images/ppo_object.png)

x에 대해 y를 output으로 출력하는 현재 학습대상인 LLM에 대해
1.  보상모델이 측정한 점수(실제로는 socre 정규화 값으로 r세타가 아닌 A를 사용)
2. RL학습전 모델의 분포와 학습 중인 모델의 파라미터 비 (KL은 답이없어서 대용)
3. 현재 모델이 입력 토큰에 대한 로스
를 더한 값
기존 분포 제약을  건 이유 : 보상모델의 결과는 실수값 (-무한, 무한)이므로 제한요소가 필요 
추가로 실험을 통해 Openai는 현재 쿼리에대한 모델의 로스또한 포함한  ppo-ptx가  결과가 좋다 하였음

SFT학습 arg
epoch 16, dropout 0.2, 코사인스케줄러사용 warm up없이 초기의 10% 수치까지 decay
6B모델의 보상모델이 가장 좋았다고 함

보상모델 arg
epoch 1 중요, lr : 9e-6, batch 64

PPO arg
batch 512개로 오브젝트 계산에 필요한 값들을 수집
수집한 값들로 64개씩 minibatch로 업데이트
ppo clip 0.2
베타 값 0.02
EMA 0.992 (실제 파라미터 업데이트시 EMA으로 업데이트)
