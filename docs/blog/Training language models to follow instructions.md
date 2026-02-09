# Training language models to follow instructions with human feedback

Openai의 PPO논문이다.

논문이 나온 상황
2015년에 TRPO라고 강화학습을 할 때, KL 디버젼시제약을 함께 줄 경우 안정적인 강화학습이 가능하다는 이론이 나왔다.
2017년에 Openai는 Proximal Policy Optimization Algorithms(PPO)논문을 통해 기존에 구현복잡한 KL디버젼시 제약을 현실적으로 구현 하는 방안으로 
