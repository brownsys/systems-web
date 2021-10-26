---
layout: post
title: "Lalith Suresh: Building Scalable and Flexible Cluster Managers Using Declarative Programming"
date: 2021-10-29
categories: sysread
---

### Abstract

Modern cluster managers routinely grapple with hard combinatorial optimization
problems, such as policy-based load balancing, placement, scheduling, and
configuration. Implementing ad-hoc heuristics to solve these problems is
notoriously hard to do, making it challenging to evolve the system over time and
add new features.

In this talk, I will present Declarative Cluster Managers (DCM), a general
approach for building cluster managers that makes them performant and easily
extensible. With DCM, developers specify the cluster manager's behavior using a
high-level declarative language like SQL and let a compiler take care of
generating an efficient implementation. I will show how DCM significantly lowers
the barrier to building scalable and extensible cluster manager components, in
the context of some real-world systems like Kubernetes.

You can check out the DCM project here:
[https://github.com/vmware/declarative-cluster-management/](https://github.com/vmware/declarative-cluster-management/)
