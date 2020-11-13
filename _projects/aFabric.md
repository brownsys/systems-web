---
layout: project-page
title: aFabric
description: "aFabric: Towards a Holistic View for Managing Hardware Accelerators in the Cloud"
ongoing: true
img: /assets/project_images/aFabric-workflow-downsampled.svg
main_image: /assets/project_images/aFabric-workflow.svg
people: [ cwu55, tab ]
---

We propose aFabric, an OS for heterogeneous accelerators. We treat accelerator 
programs as control flow graphs and effectively decompose
them into pieces. Instead of scheduling programs temporally, we
schedule all accelerator programs by space. In this way, scheduling
becomes a program placement problem; and aFabric will properly
encode different resource and performance constraints that aFabric
extracts from the program pieces, and receives from user specific
intentions. In addition, aFabric encodes the information about the
hardware configurations and accelerator topology. Finally, the placement 
problem becomes an optimization problem; and we design
heuristics to solve the problem and address the scheduler’s scalability
problem. This optimization process places program pieces
with different demands to appropriate locations to achieve global
optimality. Fine-grained program placement also improves the hardware 
utilization rate. After the placement decision has been made,
aFabric will generate new programs by merging program pieces for
every piece of hardware and inject sentry code to ensure memory
isolation. In addition, aFabric will make heterogeneous hardware
topology transparent to users by allowing users provide aFabric
with configurations describing dataflow between programs, which
also become constraints in the program placement problem; and
aFabric will automatically inject data routing code to manages the
data transport among end-hosts and accelerators. Since hardware
become transparent to users, the cloud has more opportunities to
perform tasks such as maintenance scheduling.