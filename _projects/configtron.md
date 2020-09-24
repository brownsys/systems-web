---
layout: project-page
title: ConfigTron
description: "ConfigTron: Tackling network diversity with heterogeneous configurations."
ongoing: true
img: /assets/project_images/configtron.png
main_image: /assets/project_images/configtron.png
people: [ unaseer, tab ]
papers: [ naseer2017configtron ]
---

The web serving protocol stack is constantly changing and
evolving to tackle technological shifts in networking infrastructure and website complexity. As a result of this evolution, the
web servers can use a plethora of protocols and configuration
parameters to address a variety of realistic network conditions.
Yet,today, despite the significant diversity in end-user networks
and devices, most content providers have adopted a “one-size-fits-all” approach to configuring the networking stack of their
user facing web servers (or at best employ moderate tuning).

In this paper, we demonstrate that the status quo results in
sub-optimal performance and argue for a novel framework that
extends existing CDN architectures to provide programmatic
control over a web server’s configuration parameters. We designed a data-driven framework, ConfigTron, that leverages
data across connections to identify their network and device
characteristics, and learn the optimal configuration parameters
to improve end-user performance. To demonstrate the scalability and efficiency, we evaluate ConfigTron on five traces,
including one from a global content provider. Further, we analyzed ConfigTron using two live-deployments including one on
the global content provider. Our results show that ConfigTron
improves tail (p95) web performance by 32-67% across diverse
websites and networks.


#### Publications

 * Configtron: Tackling network diversity with heterogeneous configurations.<br />
   Usama Naseer and Theophilus Benson<br />
   9th {USENIX} Workshop on Hot Topics in Cloud Computing (HotCloud 17)<br />


#### Acknowledgements

We are indebted to the Janusz Jezowicz from [SpeedChecker](https://probeapi.speedchecker.com/) for granting us access to their globally distibuted Internet and web measurements platform.