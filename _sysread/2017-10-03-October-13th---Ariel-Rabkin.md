---
layout: post
title: "October 13th - Ariel Rabkin"
date: 2017-10-03
categories: sysread
---

<h2>The Cloudera Cluster Validation System: Checking for hundreds of
thousands of known issues per day</h2>
Cloudera is a leading provider of big-data processing software,
particularly in the Hadoop ecosystem. High performance distributed
systems are notoriously difficult to set up, manage, and troubleshoot,
and so we have invested heavily in tools to automate this work. In
particular, we check all incoming diagnostic data bundles from
customers against a library of hundreds of known problems.

This talk will describe the how and why of that system. Our
programming model is simple enough that supporters can write the
checks, expressive enough for hundreds of checks, scalable enough to
grow with the business, efficient enough to leave constantly running.
We also explain how we exploit a limited form of execution tracing to
automate regression testing for these checks. The talk will also
discuss the way the system fits into our business processes, and how
the two have co-evolved.
