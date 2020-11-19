---
layout: project-page
title: Foxhound
description: "Server-Grade Observability for Network Augmented Applications"
ongoing: true
img: /assets/project_images/foxhound-resize.png
main_image: /assets/project_images/Foxhound.png
people: [ lucas, tab ]
papers: [ lucas19p4intel ]
---

There is a growing move to offload functionality, e.g., TCP or key-value stores, into the network - either on SmartNICs or programmable data planes.  While offloading promises significant performance boosts, these programmable devices often provide little visibility into their performance. Moreover, many existing tools for analyzing and debugging performance problems, e.g., distributed tracing, do not extend into these devices.

Motivated by this lack of visibility, we present the design and implementation of an observability framework called Foxhound, which introduces a co-designed query language, compiler, and storage abstraction layer for expressing, capturing and analyzing distributed traces and their performance data on programmable data planes.

