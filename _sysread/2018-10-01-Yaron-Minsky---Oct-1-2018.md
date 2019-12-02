---
layout: post
title: "Yaron Minsky - Oct 1 2018"
date: 2018-10-01
categories: sysread
---

State machine replication and the modern exchange

Electronic exchanges play an important role in the world's financial
system, acting as focal points where actors from across the world meet
to trade with each other.

But building an exchange is a difficult technical challenge, requiring
high transaction rates, low, determinstic response times, and serious
reliability.

We'll look at the question of how to design an exchange through the
lens of Concord, a system for building exchange-like systems that was
developed at Jane Street. Concord is designed from the ground up
around state machine replication, a classic distributed systems
technique.

This choice has profound affects on the resulting system, providing a
simple framework for building a reliable platform, while at the same
time requiring very careful performance engineering to make it work
effectively. We'll discuss the pros and cons of the design, and
consider the lessons it provides for other transaction processing
systems.

—————————

Yaron Minsky got his BA in Mathematics from Princeton and his PhD in
Computer Science from Cornell, where he studied distributed
systems. He joined Jane Street in 2003, where he started out
developing quantitative trading strategies, going on to found the
firm's quantitative research group. He introduced OCaml to the company
and managed the transition to using OCaml for all of its core
infrastructure, turning Jane Street into the world's largest
industrial user of the language. In the meantime, he's been involved
in many different aspects of Jane Street's technology stack, including
trading and risk systems, developer tools, and user-interface
toolkits. Yaron has lectured, blogged and written about programming
for years, with articles published in Communications of the ACM and
the Journal of Functional Programming, and is co-author of the book
Real World OCaml.
