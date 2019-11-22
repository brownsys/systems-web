---
layout: project-page
title: "Noria: fast and efficient websites"
description: "Dynamic, high-performance incrementally materialized views via streaming dataflow."
ongoing: true
img: /assets/project_images/noria.png
people: [ malte, zeling ]
---

Noria serves millions of requests per second on a single server by integrating
an in-memory cache and a SQL database in a single dataflow computation that
incrementally maintains materialized views for application queries.

A new dataflow model, _partially-stateful dataflow_, helps Noria achieve
this performance with bounded memory and computation cost. Unlike prior
streaming dataflow systems, which store and update full state in each stateful
operator (\eg joins, aggregations, and materialized views), Noria stores
and maintains only a subset of it.

Partial state also allows Noria to install new queries in its live dataflow in
milliseconds, so applications can evolve and pose new queries without any
backend downtime.

**This is joint research project with the [PDOS group](https://pdos.csail.mit.edu) at MIT.**

#### Publications

 * Noria: dynamic, partially-stateful data-flow for high-performance web applications<br />
   Gjengset, Jon, Schwarzkopf, Malte, Behrens, Jonathan, Araújo, Lara Timbó, Ek, Martin, Kohler, Eddie, Kaashoek, M. Frans Kaashoek, and Morris, Robert<br />
   _In Proceedings of the 13th USENIX Symposium on Operating Systems Design and Implementation (OSDI)_<br />
   2018.<br />
   [[PDF](https://cs.brown.edu/people/malte/pub/papers/2018-osdi-noria.pdf)]
