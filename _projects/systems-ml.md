---
layout: project-page
title: Machine Learning Systems
description: "Efficient deep learning system"
ongoing: true
img: /assets/project_images/superneurons.png
main_image: /assets/project_images/superneurons.png
people: [ lwang53 ]
papers: [wang2018superneurons]
---

Here is what we have achieved so far:

1) dynamic GPU memory management: going deeper and wider in neural architectures improves their accuracy, while the limited GPU DRAM places an undesired restriction on the network design domain. Deep Learning (DL) practitioners either need to change to less desired network architectures, or nontrivially dissect a network across multiGPUs. These distract DL practitioners from concentrating on their original machine learning tasks. We present SuperNeurons: a dynamic GPU memory scheduling runtime to enable the network training far beyond the GPU DRAM capacity. SuperNeurons features 3 memory optimizations, Liveness Analysis, Unified Tensor Pool, and Cost-Aware Recomputation; together they effectively reduce the network-wide peak memory usage down to the maximal memory usage among layers. We also address the performance issues in these memory-saving techniques. Given the limited GPU DRAM, SuperNeurons not only provisions the necessary memory for the training, but also dynamically allocates the memory for convolution workspaces to achieve the high performance. Evaluations against Caffe, Torch, MXNet and TensorFlow have demonstrated that SuperNeurons trains at least 3.2432 deeper network than current ones with the leading performance. Particularly, SuperNeurons can train ResNet2500 that has 104 basic network layers on a 12GB K40c.

2) distributed training: the performance and efficiency of distributed training of Deep Neural Networks (DNN) highly depend on the
performance of gradient averaging among all participating nodes, which is bounded by the communication
costs. There are two major solutions to reduce communication overhead: one is to overlap communications with
computations (lossless), and the other is to reduce communications (lossy). The lossless solution works well for
linear neural architectures, e.g. VGG, AlexNet, but the latest networks such as ResNet and Inception render the
limited opportunity for such overlapping. Therefore, researchers have paid more attention to lossy methods. In this
paper, we present a novel, explainable lossy method that sparsifies gradients in the frequency domain, in addition
to a new range-based float point representation to quantize and further compress gradients. These techniques
are dynamic, which strikes a balance between compression ratio, accuracy, and computational overhead, and
highly optimized to maximize performance in heterogeneous environments. We also sketch proves to show how
the FFT sparsification θ, the ratio of dropped information, affects the convergence and accuracy, and show that
our method is guaranteed to converge using a diminishing θ in the training. Compared to STOA lossy methods,
e.g. QSGD, TernGrad, and Top-k sparsification, our approach incurs less approximation error, thereby better in
both the wall-time and accuracy. On an 8 GPUs, InfiniBand interconnected cluster, our techniques effectively
accelerate AlexNet training up to 2.26x to the baseline of no compression, and 1.31x to QSGD, 1.25x to Terngrad
and 1.47x to Top-K sparsification.