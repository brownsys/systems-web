---
layout: project-page
title: DeepConfig
description: "DeepConfig: Automating Data Center Network Topologies Management with Machine Learning."
ongoing: true
img: /assets/project_images/deepconfig.png
main_image: /assets/project_images/deepconfig.png
people: [ ssalman1, tab ]
papers: [ deepconfig:netai18 ]
---

In recent years, many techniques have been developed to improve the performance and efficiency of data center networks. While these techniques provide high accuracy, they are often designed using heuristics that leverage domain-specific properties of the workload or hardware.

In this vision paper, we argue that many data center networking techniques, e.g., routing, topology augmentation, energy savings, with diverse goals actually share design and architectural similarity. We present a design for developing general intermediate representations of network topologies using deep learning that is amenable to solving classes of data center problems. We develop a framework, DeepConfig, that simplifies the processing of configuring and training deep learning agents that use the intermediate representation to learns different tasks. To illustrate the strength of our approach, we configured, implemented, and evaluated a DeepConfig-Agent that tackles the data center topology augmentation problem. Our initial results are promising --- DeepConfig performs comparably to the optimal. 