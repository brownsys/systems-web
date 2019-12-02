
---
layout: post
title: "September 29 - Minlan Yu"
date: 2017-08-21
categories: sysread
---

Minlan Yu is an associate professor in the computer science department of Yale University. She received her B.A. in computer science and mathematics from Peking University in 2006 and her M.A. and Ph.D. in computer science from Princeton University in 2008 and 2011. After that, she was a postdoctoral scholar at UC Berkeley for one year. She has actively collaborated with companies such as Google, AT&amp;T, Microsoft, Facebook, and Barefoot. Her research interests include data networking, distributed systems, enterprise and data center networks, network virtualization, and software-defined networking. She received ACM SIGCOMM doctoral dissertation award in 2012 and NSF CAREER award in 2015.

<strong>Title: Programmable Measurement Architecture for Data Centers</strong>

<span class="m_2274597934124254650gmail-il">Abstract</span>: Network visibility becomes increasingly important for data center and enterprise networks. Figuring out what is going on in the network is often harder than deciding what to do about it. However, in today's networks, measurement is an afterthought. Switch vendors often treat measurement as a second-class citizen, devoting most resources to control functions. Network operators have limited control over what (not) to measure, and have to infer from aggregated and sampled data from individual devices. Instead, I introduce a programmable measurement framework that brings together new programming abstractions that match operator's measurement requirements and new algorithms and systems that scale to many flows at line rate on commodity switches and hosts.
My talk will cover two example projects in this framework: (1) At switches, FlowRadar uses compressed flow counters and network-wide decoding to store a million flow counters within 10s of MB and report counters at millisecond timescales. (2) At hosts, Trumpet monitors every packet and reports thousands of events timely by identifying the right division of labor between the packet processing stage and the event collecting stage. The two projects are in technology transfer to Barefoot networks and Google respectively.
