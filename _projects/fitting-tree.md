---
layout: project-page
title: Fitting Tree
description: "Short description"
ongoing: false
img: /assets/project_images/fitting-tree.png
main_image: /assets/project_images/fitting-tree.png
ignore: true
---

This project explores a new type of a "learned index", which can achieve significantly smaller footprint (relative to B+ Tree), with deterministic bounds on
lookup times and support for inserts.

At the heart of FITing-Tree is a trade-off between bandwidth and latency: FITing-Tree is an approximation of a full index where the number of random memory lookups  (which is  correlated with size of the index) is traded with non-random memory lookups (search in a bounded area).

reading some amount of unnecessary data (the index is less "accurate"), and index size:  
we use piece-wise linear functions to approximate (to within a fixed deterministic error) the data distribution. Even though the index is approximated, the results are accurate.

Using real data-sets we have seen a reduction of index leaf level by multiple orders of magnitude when compared to using a B+ Tree with equivalent lookup performance.
