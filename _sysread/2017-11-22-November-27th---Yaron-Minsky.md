
---
layout: post
title: "November 27th - Yaron Minsky"
date: 2017-11-22
categories: sysread
---

Title: The Design of Iron

Code review is a fundamental part of developing high quality software. Pretty much every software organization that cares about good code has some kind of code review system in place.

But automating code review, particularly for a large and complex
codebase with many active contributers, is surprisingly challenging. This is especially so for a correctness-critical codebase where it's important that review be done completely, even in awkward corner-cases.

This talk will cover the design of Iron, a code review and release
management tool that was developed at Jane Street to address these problems.  We'll show how Iron models the process of code review, and uses that model to effectively handle complex cases like reading through a conflicted merge.

In addition, we'll describe how Iron's integrated release management and its system of hierarchical features is used to allow multiple different release workflows to co-exist harmoniously on the same codebase.

Bio: Yaron Minsky heads the Technology group at Jane Street, a proprietary trading firm that is the largest industrial user of OCaml. He was responsible for introducing OCaml to the company and for managing the company's transition to using OCaml for all of its core infrastructure. Today, billions of dol<span class="_dgc">lars worth of securities transactions flow each day through those systems. Yaron obtained his PhD in Computer Science from Cornell University, where he studied distributed systems. Yaron has lectured, blogged and written about OCaml for years, with articles published in Communications of the ACM and the Journal of Functional Programming. He chairs the steering committee of the Commercial Users of Functional Programming, and is a member of the steering committee for the International Conference on Functional Programming.</span>
