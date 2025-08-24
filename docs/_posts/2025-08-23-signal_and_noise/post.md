# Signal and Noise: A Framework for Reducing Uncertainty in Language Model Evaluation

### [:page_facing_up: https://arxiv.org/abs/2508.13144](https://arxiv.org/abs/2508.13144)

!!! info "Category"
    - LLM evaluation


대규모 언어모델을 학습하기 전에, 비교적 작은 모델의 학습과 평가를 통해 학습 데이터셋에 대한 의사결정을 진행한다. 
하지만 과연 400M 파라미터의 모델 학습 결과와 10B 모델 학습 결과가 동일한 양상을 보일 것인가? 작은 모델로 결정된 학습 configuration을 신뢰할 수 있는가?에 대한 의문이 남는다. 

<img class="thumb off-glb" src="../imgs/fig1.png" alt="Signal and Noise cover" loading="lazy" />

이 연구에서는 성능의 signal과 noise를 통해, scaling-up 가능성 판별에 좋은 벤치마크를 구분하는 방법을 제시한다. signal은 좋은 모델과 나쁜 모델을 구분할 수 있는 벤치마크의 능력을 나타내며, noise는 학습 과정에서의 벤치마크 민감도를 나타낸다.
다만, 단순히 학습 과정에서 "점수가 잘오른다"라는 것으로 좋은 signal을 보인다고 할 수 없다. 위의 그림처럼 서로 다른 학습 세팅 사이에서 얼마나 점수 차이가 나는지를 기준으로 signal을 판단한다. Noise의 경우에는 벤치마크의 baseline 점수, 가능한 선택지, 벤치마크 데이터의 수 등에 영향을 받을 것으로 생각된다. 

SNR(signal-to-noise ratio)가 더 높은 벤치마크를 통해 작은 규모 모델에서 의사결정을 할 때 scaling-up을 신뢰할 수 있다고 주장하며, 벤치마크의 noise를 낮추고 signal을 높이는 방법을 소개한다. 
