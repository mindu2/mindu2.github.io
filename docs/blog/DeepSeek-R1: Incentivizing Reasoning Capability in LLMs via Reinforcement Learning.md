### DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning



Test Time Scale을 조절하는 방법으로 GRPO에서 Value function을 없앴다면 이번엔 Rule기반 보상으로 보상모델도 필요 없음

lr 3e-6
kl 베타값 : 0.001
temperature 1
16개씩 샘플링

reward 는 <think></think><answer></answer> 포멧에 대한 점수 + 정답여부

![image.png](https://mindu2.github.io/blog/images/deepseekr1_outline.png)


그림하고 본문 적힌 내용이 조금 다름, 본문 내용을 아래 정리함

1. Deep Seek V3 → rl : 좀 이상함, reasonin은 잘하는데 언어가 섞이고 대화처럼 보이진 않음 → 데이터 합성 후 필터링
   
2. 1번데이터로 Deep Seek V3 1번 SFT(이게 Cold Start라고 말하는거) → 1번 RL → 2번 SFT → 2번 RL

1번 RL : Reasoning강화용, 포맷보상 + 정답보상 + Language보상(언어 하나만 썼는지)
2번 SFT : 1번 RL 까지 학습 한 모델로 데이터 합성 → 필터링 후 Rejection 샘플을 만들고 일반 데이터들을 추가해서 한번더 SFT (일반 말하기 능력 회복)
2번 RL : Preference RL 단계로 다양한 프롬프트에 대해 (reasoning, general 문제 섞어서)

보상 식
Reward  = Reward(Reasoning) + Reward(General) + Reward(Language)
Reward(Reasoning)  - Format(포맷 내용 X, 포맷의 여부만 점수), Answer
Reward(General) - Format, Reward_Model

순서
Reward(Reasoning) 하고나서 일반 Instruction 데이터(General) + Preference reward(Reward(General)이라고 이해 했음, 요약 글쓰기 이런거 보상모델로 점수 준 듯) 400step


<img width="2202" height="1134" alt="image" src="https://github.com/user-attachments/assets/19f76948-7c02-44ca-ad22-28dc4a997157" />

<img width="2282" height="1241" alt="image" src="https://github.com/user-attachments/assets/b007f335-7778-45be-b23c-4790bb469073" />


실험해볼 내용 :</think>앞에 한국어만 생성시 보상을 주도록하면, 추론시 한국어만 사용해서 think를 생성하게 할 수 있을 것 같음.
