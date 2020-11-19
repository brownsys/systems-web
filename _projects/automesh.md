---
layout: project-page
title: AutoMesh
description: "AutoMesh: Too Many Knobs!"
ongoing: true
img: /assets/project_images/automesh.png
main_image: /assets/project_images/automesh.png
people: [ ssalman1, tab ]
papers: [ ]
---

Recently developers are migrating from a monolith based architecture to microservices, which while providing a host of benefits, does introduce some coordination and configuration complexity by providing developers with a plethora of configuration knobs to tune, which leads to configuration headaches. In this paper, we introduce AutoMesh, our distributed bayesian optimization based solution for microservices configuration tuning. The reason that older auto-tuning frameworks don’t work with microservices is because using a global model does not scale due to the amount of possible configuration options, microservices are dynamic in nature and configuration updates have an impact on other services. 