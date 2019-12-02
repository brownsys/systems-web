---
layout: post
title: "Frank Pfenning -- April 25 2019"
date: 2019-06-10
categories: sysread
---

A rehabilitation of message-passing concurrency

Recently, there has been a lot of research on shared-memory concurrency. Nevertheless, programmers are discouraged from using it because of the difficulty of writing clear, correct programs. This is embodied for example in the Go Language slogan “Do not communicate by sharing memory; instead, share memory by communicating.” But do we have the right abstractions for message-passing concurrent programming? I argue that we do not (yet!) because concurrency constructs are usually bolted on to an existing language with an entirely different semantic foundation. I will review some recent progress on designing better abstractions based on strong logical and type-theoretic principles. Multiple themes from functional and object-oriented programming will re-emerge from these foundations in a new form, including (ha!) shared memory.

Frank Pfenning studied Mathematics and Computer Science at the Technical University Darmstadt and then left for Carnegie Mellon University on a Fulbright scholarship where he obtained his Ph.D. in Mathematics in 1987 under the supervision of Professor Peter Andrews. He subsequently joined the Department of Computer Science at Carnegie Mellon University as research faculty where he became Professor in 2002 and served as Director of Graduate Programs from 2004 to 2008 and Associate Dean for Graduate Education from 2009 to 2010. He was appointed Head of the Computer Science Department in January 2013 and the Joseph F. Traub Professor of Computer Science in October 2015.

Host: Professor Shriram Krishnamurthi
