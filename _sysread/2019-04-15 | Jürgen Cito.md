---
layout: post
title: "Jürgen Cito"
date: 2019-04-15
categories: sysread
---

Learning-based Program Analysis for Software Configurations (Jurgen Cito, MIT CSAIL)

Configuration errors have become an increasing root cause of
software failures as modern software systems grow increasingly
large and more complex. Just recently, a misguided software
configuration change lead to major outages at Facebook
and Instagram [1]. In this talk, I want to give an overview on
recent work that employs learning techniques to enable program
analysis for configurations: (1) Learning a static analyzer for
continuous integration configurations, and (2) Synthesizing container
configurations from interactions and state changes.

(1) Incorrect configuration settings lead to build failures in
continuous integration (CI) environments, which can take hours to run,
significantly delaying feedback loops and wasting valuable developer
time. We make use of cascading decision trees to learn constraints about
CI configurations that identify failing builds and their root causes.
To more accurately identify root causes, we train a neural network that
filters out constraints that are less likely to be connected to the root
cause of a build failure.

(2) Writing container configurations (Dockerfiles) is a tedious and
error-prone process. We automate this task by recording developer
interactions and observe state changes in containers. The challenge is
to distinguish between experimental interactions and essential
interactions that eventually lead to the desired final state of the
infrastructure. We show different techniques to achieve
this goal in addition to a repair technique based on learned
probabilistic models from all container configurations on GitHub that
transforms instructions in the from the interaction language to conform
to (statistical) best practices in Dockerfiles.
