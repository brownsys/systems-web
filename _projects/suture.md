---
layout: project-page
title: Suture
description: "Dynamic Permissions for Kubernetes Operators"
ongoing: true
img: /assets/project_images/suture.png
main_image: /assets/project_images/suture.png
people: [ amahaja5, tab ]
---

Every web service at scale accrues external dependencies — databases, load balancers, certificates, domain names, replicas, caches, message queues, distributed brokers, and more. Each of these dependencies must stay alive and functioning in order for a web service to work, but keeping them that way is a complex task: between handling DDoS attacks, network partitions, split brain scenarios, hardware faults, data corruption, configuration errors, cascading failures, certificate expiration and many other failure modes at scale, site reliability engineers have no shortage of things to worry being paged at 3 am about. 

Kubernetes operators let engineers write mitigation strategies for all these issues for any dependency, have software monitor the datacenter for new destabilizing events and then let said software respond to those new events with these strategies. They remove humans from the equation. But operators are far from a panacea. Our research has found that most operators themselves introduce new failure modes: 47% of engineers we surveyed said they’d introduced at least one major issue from a bad operator update, including data loss and service outages. These safety issues can be traced to the fact operators, unlike virtual machines, have no default isolation from different resources: operators have to interact with the whole cluster for some strategies and can take any action they want with those permissions, even if inappropriate. 

This project aims at solving this problem of safety by introducing a dynamic permissions layer — operators can still have access to change the whole cluster, but we can block the operator from carrying out actions if we think it will affect or violate some model of the system. Building this system has many challenges: how do we model a complicated Kubernetes cluster, and estimate the impact of changes? How do we make this fast and responsive? How do we come up with safety policies that actually matter to an engineer? Having good answers to all this could completely change how operations teams work in the future.  