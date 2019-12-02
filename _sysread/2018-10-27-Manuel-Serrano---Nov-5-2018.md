---
layout: post
title: "Manuel Serrano - Nov 5 2018"
date: 2018-10-27
categories: sysread
---

Static compilation, a.k.a., ahead-of-time (AOT) compilation, is
an alternative approach to JIT compilation that can combine good speed
and lightweight memory footprint, and that can accommodate read-only
memory constraints that are imposed by some devices and some operating
systems. Unfortunately the highly dynamic nature of JavaScript makes
it hard to compile statically and all existing AOT compilers have
either gave up on good performance or full language support. We have
designed and implemented an AOT compiler that aims at satisfying
both. It supports full unrestricted ECMAScript 5.1 plus many
ECMAScript 2017 features and the majority of benchmarks are within
50% of the performance of one of the fastest JIT compilers.

Manuel Serrano is a researcher at INRIA Sophia-Antipolis, where he has created the Bigloo, Hop, and other languages and compilers.
