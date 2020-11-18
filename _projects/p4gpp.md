---
layout: post
title: P4GPP
description: "P4GPP: A GPU-Accelerated P4 Packet Processing."
ongoing: true
img: /assets/project_images/p4gpp.jpg
main_image: /assets/project_images/p4gpp.jpg
people: [ ykim, tab ]
---

Programmable network devices enable testing innovative ideas and protocols and offloading network functions from end devices. Nevertheless, network devices have resource constraints and P4 programs need to be distributed dynamically given each network device’s available resources and capability. While diverse heterogeneous systems are introduced to accelerate P4 program packet processing, we believe GPU is also a great candidate for the acceleration since many network functions are parallelizable.  

P4 program’s match-actions stages are functionally parallelizable and GPU accelerators can outperform others when processing large P4 programs with less data-level dependency. In this research, we aim to design a framework, P4GPP, which effectively utilizes GPU’s resources by optimizing P4 packet processing with dependency analysis and hiding overheads introduced by kernel launching and CPU-GPU data transfer. We believe that this project can enable offloading not only network functions but also diverse parallelizable compute-intensive applications.