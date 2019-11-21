---
layout: project-page
title: Dynamic Monitoring of Correctness for Stateful Network Behavior
description: "Runtime-checking for correctness properties in stateful software-defined networks"
ongoing: false
img: /assets/project_images/stateful-sdn.png
main_image: /assets/project_images/stateful-sdn.png
people: [ tn, rfonseca ]
papers: [ demarinis2019scanning, nelson2016switches ]
---

Testing and debugging networks is notoriously
difficult. Software-Defined Networks (SDNs) complicate this problem
since the network is defined by a program, which may contain
third-party or home-grown software.  The goal of this project is to
facilitate network debugging by exploring runtime checking of
correctness properties about stateful network behavior, such as the
operation of a stateful firewall or connection tracker.  Monitoring
stateful properties at runtime intrinsically requires maintaining
information about packet history, which presents unique challenges
compared to traditional monitoring approaches involving flow
statistics or analyzing control traffic.  Our present work focuses on
identifying requirements for checking stateful properties and
exploring platforms for extending switches to support monitoring
features.


