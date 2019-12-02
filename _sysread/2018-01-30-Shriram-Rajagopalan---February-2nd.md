---
layout: post
title: "Shriram Rajagopalan - February 2nd"
date: 2018-01-30
categories: sysread
---

Title: Istio Service Mesh - Leveraging SDN principles at L7

Abstract: For the last two decades, the kernel has abstracted low-level networking concepts and TCP/IP interactions from user level applications, in an attempt to simplify application layer code. However, developers today still have to deal with the network when building distributed applications. Reasoning about failures, reliability, routing, discovery and load balancing, in addition to ensuring fleet-wide security across 1000s of VMs or containers is a daunting task for any application development team.

Istio, a joint effort between IBM, Google, and Lyft, aims to abstract networking, security, and telemetry from applications such that applications can offload service discovery, load balancing, resilience, and access control to a programmable L7 substrate called the service mesh. Having control over the L7 traffic allows the mesh to do some interesting things that was previously harder to achieve in a polyglot application environment that exists today. This talk will describe some initial operational experiences, lessons learned and how we plan to evolve this fabric.

Bio: Shriram Rajagopalan is a research staff member at IBM Research leading the Istio project from IBM. His broad research interests span distributed systems, computer networking and cloud computing. He completed his Ph.D. in Spring 2014, under the careful supervision of Prof. Andrew Warfield at the University of British Columbia, Vancouver.

He works on IBM's cloud platforms designing the infrastructure for hosting emerging enterprise workloads. He has had diverse experience in developing various aspects of the software stack over the last decade. He has worked  on the Xen hypervisor, the Linux kernel, network function virtualization, and recently on the Istio service mesh and Lyft’s Envoy.
