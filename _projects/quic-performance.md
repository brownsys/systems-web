---
layout: project-page
title: Dissecting Performance of Production QUIC
description: "Benchmarking and analyzing production QUIC and TCP endpoints from Google, Facebook, and Cloudflare"
ongoing: true
img: /assets/project_images/quic-logo-resize.png
main_image: /assets/project_images/quic-testbed.png
people: [ ayu9, tab ]
---

IETF QUIC, the standardized version of Google's UDP-based layer-4 network protocol, has seen increasing adoption from large Internet companies for its benefits over TCP. Yet despite its rapid adoption, performance analysis of QUIC in production is scarce. Most existing analyses have only used unoptimized open-source QUIC servers on non-tuned kernels: these analyses are unrepresentative of production deployments which raises the question of whether QUIC actually outperforms TCP in practice. 
    
In this project, we conduct one of the first comparative studies on the performance of QUIC and TCP against production endpoints hosted by Google, Facebook, and Cloudflare under various dimensions: network conditions, workloads, and client implementations.

To understand our results, we create a [tool](https://github.com/triplewy/quic-benchmarks) to systematically analyze the root cause of the performance differences between the two protocols. Using our tool we make several key observations. First, while QUIC has some inherent advantages over TCP, such as worst-case 1-RTT handshakes, much of its overall performance gains are largely determined by the server's choice of congestion-control algorithm and the robustness of its congestion-control implementation under edge-case network scenarios. Second, we find that performance of QUIC clients is a function of the configured flow control and TLS, which can be non-trivial to tune. Lastly, we demonstrate that QUIC's removal of head-of-line (HOL) blocking has little impact on web-page performance in practice.