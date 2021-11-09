---
layout: post
title: "Stephanie Wang: A Fault-Tolerant Distributed Memory Layer for General-Purpose Execution"
date: 2021-11-12
categories: sysread
---

### Abstract


RPC has been remarkably successful as a foundation for distributed applications
because of its simple but powerful semantics. With *no shared state* between
processes, RPC has produced highly efficient system implementations as well as
flexibility and interoperability for applications. However, the lack of shared
state also makes it difficult to build data-intensive applications directly on
RPC, as all values must be copied between processes. Instead, these applications
are often built on top of specialized distributed frameworks, such as Apache
Spark for big data processing. These frameworks handle problems such as memory
management on behalf of the application, but sacrifice interoperability as a
result.


We argue that RPC itself should be extended with an immutable shared address
space and first-class references [HotOS’21]. This preserves RPC’s original
semantics while offering two key application benefits: 1) by allowing
data-intensive applications to be built directly on RPC, we promote
interoperability, and 2) by shifting functionality such as automatic memory
management to a common distributed system, we can reduce duplicated work between
specialized frameworks. A key challenge in this effort is ensuring fault
tolerance without sacrificing performance or flexibility. In this talk, I will
discuss our work on ownership, a method of guaranteeing transparent data
recovery for an immutable shared address space [NSDI’21], as well as our ongoing
work on persistence for stateful applications.


### Bio

Stephanie is a final-year PhD candidate at UC Berkeley, advised by Ion Stoica.
Her research focuses on the problem of designing and building a general-purpose
distributed system. Towards this end, she is also a lead committer for the
open-source [Ray project](https://github.com/ray-project/ray) and a software
engineer at the startup [Anyscale](https://www.anyscale.com/). She is a
recipient of the UC Berkeley Chancellor’s Fellowship and was a participant of
EECS Rising Stars in 2021. In addition, she holds a BS in computer science and
math and an MEng in computer systems from MIT, where she was advised by Frans
Kaashoek and Nickolai Zeldovich.
