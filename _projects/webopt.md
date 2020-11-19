---
layout: project-page
title: WebOpt Profiler
description: "WebOpt Profiler: Providing performance clarity for Web optimizations"
ongoing: true
img: /assets/project_images/webopt.png
main_image: /assets/project_images/webopt.png
people: [ gmurtaza, tab ]
---
Despite decades of research on mobile webpage optimizations, little is known about how these optimizations interoperate. Moreover, there has been little systematic work to understand the scenarios wherein combinations of these optimizations excel. Without a comprehensive understanding of how these optimizations compose with each other and under what conditions they excel operators cannot determine which optimizations to adopt, and, similarly, developers do not know where to focus their efforts.

In this project, we argue that developers should be required to evaluate and characterize the broader interactions between their proposed techniques and other techniques – this is in addition to demonstrating the potential benefits of their approach. To aide developers in characterizing these broader interactions, we propose an analytical model which decomposes web optimizations into virtual speedup functions that operate on well-understood Browser processing phases (e.g., processing, rendering, layout, etc., for an object) and we present a web browser-oriented causal profiler which empirically explores interactions between optimizations by using their analytical models to speed up different parts of the Browser during a page load. Our system, WebOptProfiler, identifies and addresses practical issues in extending causal profiling to the webpage optimization domain and provides an algorithm for extracting an analytical model from readily available browser traces.