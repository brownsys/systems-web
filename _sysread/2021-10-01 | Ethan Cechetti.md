---
layout: post
title: "Ethan Cecchetti: Compositional Security for Reentrant Applications"
date: 2021-10-01
categories: sysread
---

### Abstract

The disastrous vulnerabilities in smart contracts
sharply remind us of our ignorance: we do not know how to write code that is
secure in composition with malicious code. Information flow control has long
been proposed as a way to achieve compositional security, offering strong
guarantees even when combining software from different trust domains.
Unfortunately, this appealing story breaks down in the presence of reentrancy
attacks. In this talk I will present a highly general definition of reentrancy
and reentrancy security that allows software modules like smart contracts to
protect their key invariants while retaining the expressive power of safe forms
of reentrancy. I will describe how we can combine a type system and run-time
mechanism to enforce this new notion of security even in the presence of unknown
code.

This work recently received a best paper award at IEEE S&P '21. The paper is
available at [https://ethan.umiacs.io/papers/serif.pdf](https://ethan.umiacs.io/papers/serif.pdf)

### Bio

Ethan is currently a post-doc at the University of Maryland
working primarily with Mike Hicks and is on the market for tenure-track academic
jobs this year. His research focuses broadly on designing secure decentralized
systems and building tools to ease their development using programming languages
and applied cryptography. He completed his PhD at Cornell in August 2021 working
with Andrew Myers and Ari Juels, and is a proud alumnus of Brown undergraduate
Computer Science program (class of 2012). More information is available at his
website: [https://ethan.umiacs.io/](https://ethan.umiacs.io/)
