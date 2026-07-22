---
layout: page
title: Research 📜
description: "Paper list/publication of LI Yinqiao, a NLP researcher at City University of Hong Kong (CityU/CityUHK)."
---

## RESEARCH EXPERIENCE

- **Low-Resource Task Adaptation in LLMs (Under Review), 2025-2026**
  
  *Note: Details of this work are not included at this stage, as the corresponding manuscript is currently under double-blind review. I will update this section with a concise summary once the paper is accepted.* 

- **LoRAN: Improved Low-Rank Adaptation by a Non-Linear Transformation, 2023-2024**
  - In this paper, we study parameter-efficient fine-tuning methods for large pre-trained models. Specifically, we improve LoRA approaches to alleviate the performance loss from the constrained adapter by introducing a non-linear transformation (call it LoRAN). For a better adaptation, we also design a new non-linear function to appropriately fit the accumulated weight updates. 
  - We test our method in multiple advanced large language models. Experimental results show that our LoRAN significantly outperforms a strong baseline on SAMSum and 20 Newsgroups tasks. Moreover, when a lower rank is applied, our approach even yields a 1.95-point improvement in the classification task. 
  
- **Learning Reliable Neural Networks with Distributed Architecture Representations, 2020-2022**
  - Most NAS systems are unreliable due to the architecture gap brought by discrete representations of atomic architectures. In this work, we improve the performance and robustness of NAS by narrowing the gap between architecture representations. More specifically, we apply a general contraction mapping to model neural networks with distributed representations (call it ArchDAR). 
  - For a better search result, we present a joint learning approach to integrating distributed representations with advanced architecture search methods. 
  - We implement our ArchDAR in a differentiable architecture search model and test learned architectures on the language modeling task. On the PTB data, it outperforms a strong baseline significantly by 1.8 perplexity scores. Also, the search process with distributed representations is more stable which yields a faster structural convergence when it works with the DARTS model. 

- **AuMLM: An Auto-regressive Training Approach to Masked Language Modeling, 2021-2022**
  - Traditional masked language modeling systems are forced to predict masked words simultaneously. In this work, we enable models to predict masked tokens in order. More specifically, we determine the order of mask learning according to the dependencies among masked words and sequentially produce the masked tokens in an auto-regressive manner (call it AuMLM). 
  - Moreover, we design a coverage-based masking approach to generating more efficient mask strategies for fast training. 
  - We apply our method to BERT and test it on the GLUE tasks. Experimental results show that it yields an average of 1.15 point improvement. 

- **Learning Architectures from an Extended Search Space for Language Modeling, 2019-2020**
  
  - Neural architecture search has advanced significantly in recent years but most NAS systems restrict search to learning architectures of a recurrent or convolutional cell. In this work, we extend the search space of NAS. In particular, we present a general approach to learning both intra-cell and inter-cell architectures (call it ESS). 
  - For a better search result, we design a joint learning method to perform intra-cell and inter-cell NAS simultaneously. We implement our model in a differentiable architecture search system. 
  - For recurrent neural language modeling, ESS outperforms a strong baseline significantly on the PTB and WikiText data, with a new state-of-the-art on PTB. Moreover, the learned architectures show good transferability to other systems. E.g., they improve state-of-the-art systems on the CoNLL and WNUT NER tasks and CoNLL chunking task, indicating a promising line of research on large-scale pre-learned architectures. 
  
- **Sharing Attention Weights for Fast Transformer, 2018-2019**
  - Recently, the Transformer machine translation system has shown strong results by stacking attention layers on both the source and target-language sides. But the inference of this model is slow due to the heavy use of dot-product attention in auto-regressive decoding. In this work we speed up Transformer via a fast and lightweight attention model. More specifically, we share attention weights in adjacent layers and enable the efficient re-use of hidden states in a vertical manner. Moreover, the sharing policy can be jointly learned with the MT model.
  - We test our approach on ten WMT and NIST OpenMT tasks. Experimental results show that it yields an average of 1.3X speed-up (with almost no decrease in BLEU) on top of a state-of-the-art implementation that has already adopted a cache for fast inference. Also, our approach obtains a 1.8X speed-up when it works with the AAN model. This is even 16 times faster than the baseline with no use of the attention cache. 

- **Analysis of Data Parallel Methods in Training Neural Language Models via Multiple GPUs, 2017**
  - In order to speed up the process of training neural models, we apply the data parallel method to train them on multiple devices (such as GPUs). However, due to the frequent data transmission between multiple devices, we cannot get the ideal acceleration effect easily. In this work, we analyze the performance of the all-reduce algorithm and the sampling-based gradient update strategy in the data transmission stage. 
  - The experiments show the all-reduce algorithm and the sampling-based gradient update strategy can achieve 25% and 41% speedup on NVIDIA TITAN X. Moreover, we also discuss the applicability of the data parallel method and the influence of different hardware device connection modes on transmission speed. 

## PUBLICATIONS

- <u>Yinqiao Li</u>, Linqi Song, Hanxu Hou. 2024. *LoRAN: Improved Low-Rank Adaptation by a Non-Linear Transformation*. In Findings of the Association for Computational Linguistics: EMNLP 2024, Miami, Florida, USA. 
- <u>Yinqiao Li</u>, Chi Hu, Yuhao Zhang, Nuo Xu, Yufan Jiang, Tong Xiao, Jingbo Zhu, Tongran Liu, Changliang Li. 2020. *Learning Architectures from an Extended Search Space for Language Modeling*. In Proc. of the 58th Annual Meeting of the Association for Computational Linguistics (ACL), Seattle, USA. 
- Tong Xiao (my advisor), <u>Yinqiao Li</u>, Jingbo Zhu, Zhengtao Yu and Tongran Liu. 2019. *Sharing Attention Weights for Fast Transformer*. In Proc. of the 28th International Joint Conference on Artificial Intelligence (IJCAI), Macao, China. 
- <u>Yinqiao Li</u>, Runzhe Cao, Qiaozhi He, Tong Xiao, Jingbo Zhu. 2023. *Learning Reliable Neural Networks with Distributed Architecture Representations*. ACM Transactions on Asian and Low-Resource Language Information Processing (TALLIP). 
- Guanzhi Deng, Yi Xie, Yu-Keung Ng, Mingyang Liu, Peijun Zheng, Jie Liu, Dapeng Wu, <u>Yinqiao Li (corresponding author)</u>, Linqi Song. 2025. *KLIPA: A Knowledge Graph and LLM-Driven QA Framework for IP Analysis*. arXiv preprint arXiv:2509.07860. 
- Guanzhi Deng, Mingyang Liu, Dapeng Wu, <u>Yinqiao Li (corresponding author)</u>, Linqi Song. 2025. *Enhancing Low-Rank Adaptation with Structured Nonlinear Transformations*. arXiv preprint arXiv:2509.21870.
- <u>Yinqiao Li</u>, Ambyer Han, Le Bo, Tong Xiao, Jingbo Zhu, Li Zhang. 2017. *Analysis of Data Parallel Methods in Training Neural Language Models via Multiple GPUs*. In Proc. of the 13th China Workshop on Machine Translation (CWMT), Dalian, China. 
- Nuo Xu, <u>Yinqiao Li</u>, Chen Xu, Yanyang Li, Bei Li, Tong Xiao and Jingbo Zhu. 2019. *Analysis of Back-translation Methods for Low-Resource Neural Machine Translation*. In Proc. of the 8th CCF International Conference on Natural Language Processing and Chinese Computing (NLPCC), Dunhuang, China.
- Zerui Yang, <u>Yinqiao Li</u>, Yudai Matsuda, Linqi Song. 2025. *mHMG-DTI: a Drug-Target Interaction Prediction Framework Combining Modified Hierarchical Molecular Graphs and Improved Convolutional Block Attention Module*. In Proc. of the 1st Workshop on Pattern mining and Machine learning for Bioinformatics (PM4B), Sydney, Australia.
- Bei Li, <u>Yinqiao Li</u>, Chen Xu, Ye Lin, Jiqiang Liu, Hui Liu, Ziyang Wang, Yuhao Zhang, Nuo Xu, Zeyang Wang, Kai Feng, Hexuan Chen, Tengbo Liu, Yanyang Li, Qiang Wang, Tong Xiao and Jingbo Zhu. 2019. *The NiuTrans Machine Translation Systems for WMT19*. In Proc. of the Fourth Conference on Machine Translation (WMT), Florence, Italy.
- Wei Shao, Lemao Liu, <u>Yinqiao Li</u>, Guoping Huang, Shuming Shi, Linqi Song. 2026. *Towards Privacy-Preserving Machine Translation at the Inference Stage: A New Task and Benchmark*. IEEE Journal of Selected Topics in Signal Processing.
- Yanyang Li, Tong Xiao, <u>Yinqiao Li</u>, Qiang Wang, Changming Xu and Jingbo Zhu. 2018. *A Simple and Effective Approach to Coverage-Aware Neural Machine Translation*. In Proc. of the fifty-sixth Annual Meeting of the Association for Computational Linguistics (ACL), Melbourne, Australia.
- Qi Chen, Oi Yee Kwong, <u>Yinqiao Li</u>, Tong Xiao, and Jingbo Zhu. 2022. *Coarse-to-Fine Output Predictions for Efficient Decoding in Neural Machine Translation*. ACM Transactions on Asian and Low-Resource Language Information Processing (TALLIP).
- Quan Du, Nuo Xu, <u>Yinqiao Li</u>, Tong Xiao, Jingbo Zhu. 2021. *Topology-Sensitive Neural Architecture Search for Language Modeling*. IEEE Access.
- Yuhao Zhang, Nuo Xu, <u>Yinqiao Li</u>, Tong Xiao and Jingbo Zhu. 2019. *Research on Inference Acceleration Method of Neural Machine Translation System Based on Coarse2fine*. In Proc. of the 15th China Conference on Machine Translation (CCMT), Nanchang, China.
- Chi Hu, Bei Li, <u>Yinqiao Li</u>, Ye Lin, Yanyang Li, Chenglong Wang, Tong Xiao, Jingbo Zhu. 2020. *The NiuTrans System for WNGT 2020 Efficiency Task*. In Proc. of the Fourth Workshop on Neural Generation and Translation (WNGT), Seattle, USA. 
- Kalzang Gyatso, Peizhuo Liu, Yi Jing, <u>Yinqiao Li</u>, Nyima Tashi, Tong Xiao, Jingbo Zhu. 2023. *CCMT2023 Tibetan-Chinese Machine Translation Evaluation Technical Report*. In Proc. of the 19th China Conference (CCMT), Jinan, China.
- Yufan Jiang, Bei Li, Ye Lin, <u>Yinqiao Li</u>, Tong Xiao and Jingbo Zhu. 2018. *Learning Neuron Connections for Language Models*. In Proc. of the 14th China Workshop on Machine Translation (CWMT), Wuyishan, China.
- Chi Hu, Chenglong Wang, Xiangnan Ma, Xia Meng, <u>Yinqiao Li</u>, Tong Xiao, Jingbo Zhu, Changliang Li. 2021. *RankNAS: Efficient Neural Architecture Search by Pairwise Ranking*. In Proc. of the 2021 Conference on Empirical Methods in Natural Language Processing (EMNLP), Punta Cana, Dominican Republic.
- Mingying Xu, Hong Zhong, Jie Liu, Linqi Song, <u>Yinqiao Li</u>, Lei Shi. 2026. *A Self-Modified Hypergraph Neural Network for Multimodal Relation Extraction*. Information Processing & Management.
- Qiang Wang, Fuxue Li, Tong Xiao, Yanyang Li, <u>Yinqiao Li</u> and Jingbo Zhu. 2018. *Multi-layer Representation Fusion for Neural Machine Translation*. In Proc. of the 27th International Conference on Computational Linguistics (COLING), Santa Fe, New Mexico, USA.
- Junhao Ruan, Abudukeyumu Abudula, Xinyu Liu, Bei Li, <u>Yinqiao Li</u>, Chenglong Wang, Yuchun Fan, Yuan Ge, Tong Xiao, and Jingbo Zhu. 2024. *NDP: Next Distribution Prediction as a More Broad Target*. arXiv preprint arXiv:2408.17377. 
- Yongyu Mu, Abudurexiti Reheman, Zhiquan Cao, Yuchun Fan, Bei Li, <u>Yinqiao Li</u>, Tong Xiao, Chunliang Zhang, and Jingbo Zhu. 2023. *Augmenting Large Language Model Translators via Translation Memories*. In Findings of the Association for Computational Linguistics: ACL 2023, Toronto, Canada. 
- Jie Liu, Hong Zhong, Mingying Xu, Baowen Wu, Linqi Song, <u>Yinqiao Li</u>, Lei Shi, and Feifei Kou. 2025. *Dual-perspective Hypergraph Learning Network for Multimodal Entity and Relation Extraction*. Expert Systems with Applications.
- Mingying Xu, Kui Peng, Jie Liu, Qing Zhang, Linqi Song, and <u>Yinqiao Li</u>. 2025. *Multimodal Named Entity Recognition Based on Topic Prompt and Multi-Curriculum Denoising*. Information Fusion. 
- Qiang Wang, Bei Li, Jiqiang Liu, Bojian Jiang, Zheyang Zhang, <u>Yinqiao Li</u>, Ye Lin, Tong Xiao, Jingbo Zhu. 2018. *The NiuTrans Machine Translation System for WMT18*. In Proc. of the Third Conference on Machine Translation (WMT), Brussels, Belgium.
- Qiang Wang, Bei Li, Jiqiang Liu, Bojian Jiang, Zheyang Zhang, <u>Yinqiao Li</u>, Ye Lin, Tong Xiao and Jingbo Zhu. 2018. *Towards Building a Strong Transformer Neural Machine Translation System*. In Proc. of the 14th China Workshop on Machine Translation (CWMT), Wuyishan, China.
- Jiong Wang, Qing Zhang, Jie Liu, Kaifeng Nie, Ze Zhang, Linqi Song, <u>Yinqiao Li</u>. 2025. *Sub-network Knowledge Injection and Transferable Parameter Updating Strategy for Continual Learning of Vision-and-Language Tasks*. IEEE Transactions on Artificial Intelligence (TAI). 
- Mingying Xu, Fei Hou, Jie Liu, Li Xiong, Guizhong Xu, Feifei Kou, Lei Shi, Linqi Song, <u>Yinqiao Li</u>, Muhammet Deveci. 2026. *Data Augmentation with Entity-Object Consistency for Low-Resource Grounded Multimodal Named Entity Recognition*. Applied Soft Computing. 
- Yuhao Zhang, Ziyang Wang, Runzhe Cao, Binghao Wei, Weiqiao Shan, Shuhan Zhou, Abudurexiti Reheman, Tao Zhou, Xin Zeng, Laohu Wang, Xiaoqian Liu, Xunjuan Zhou, Yongyu Mu, Jingnan Zhang, <u>Yinqiao Li</u>, Bei Li, Tong Xiao and Jingbo Zhu. 2020. *The NiuTrans Machine Translation Systems for WMT20*. In Proc. of the Fifth Conference on Machine Translation (WMT), online. 

## EDITORIAL SERVICE

- Chen Zhang, Emily Allaway, Hua Shen, Lesly Miculicich, <u>Yinqiao Li</u>, Meryem M'hamdi, Peerat Limkonchotiwat, Richard He Bai, Santosh T.y.s.s., Sophia Simeng Han, Surendrabikram Thapa and Wiem Ben Rim. 2025. *Proceedings of the 9th Widening NLP Workshop*. In Proc. of the 9th Widening NLP Workshop (WiNLP), Suzhou, China.
