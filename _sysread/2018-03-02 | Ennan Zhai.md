---
layout: post
title: "Ennan Zhai"
date: 2018-03-02
categories: sysread
---

Title: Heading off correlated failures in cloud-scale systems

Abstract:
Today's cloud systems heavily rely on redundancy for reliability.
Nevertheless, as cloud systems become ever more structurally complex,
independent infrastructure components may unwittingly share deep
dependencies.  These unexpected common dependencies may result in
correlated failures that undermine redundancy efforts.  The
state-of-the-art efforts, e.g., post-failure forensics not only lead
to prolonged failure recovery time in the face of structurally complex
systems, but also fail to avoid expensive service downtime.  In this
talk, I will present a series of work towards preventing correlated
failures not only in a single cloud datacenter but also across
multiple cloud providers.  In the first part of the talk, I will show
a system that helps the datacenter administrators proactively audit
correlated failure risks through three steps: 1) automatically
collecting component dependencies, 2) constructing a fault graph to
model the target system stacks, and 3) analyzing the fault graph to
identify potential risks.  To ensure the practicality, efficiency, and
accuracy of our approach, we further equip this auditing system with a
domain-specific auditing language framework, a set of high-performance
auditing primitives based on SAT/SMT solvers, and an automatic
correlated failure risk repair engine.  In the second part of the
talk, I will present another auditing system capable of preventing
correlated failures across multiple cloud providers unwilling to share
their dependency information due to the business privacy concern.  We
construct a private set similarity protocols to evaluate the
independence of each alternative inter-cloud replications without
leaking any sensitive information, thus avoiding correlated failures
across different providers at the early stage.

Bio:
Ennan Zhai is currently an Associate Research Scientist in the
Computer Science Department at Yale University, where he also received
his Ph.D. in 2015. His research focuses on building secure and
reliable computer systems. Specifically, his work takes advantage of
an interdisciplinary approach, integrating areas including distributed
systems, security, verification, and programming languages.
