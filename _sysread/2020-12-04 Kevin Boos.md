---
layout: post
title: "Kevin Boos: Theseus, a new Rust OS"
date: 2020-12-04
categories: sysread
---

<p><b>Abstract:</b><br />
Description:This talk introduces Theseus, a new operating system written from scratch in Rust that experiments with and rethinks fundamental OS design concepts and implementation choices. Theseus's OS structure consists of many tiny cell-like components with clear, runtime-persistent bounds that are all loaded and linked dynamically. Theseus treats state management as a first-class concern, striving to ensure that components can interact without holding states for or spilling states into each other.<br />
In addition, Theseus follows a novel principle called intralingual design, in which OS functionality is realized in ways that leverage the full power of strong static type systems and other mechanisms found in modern programming languages. Intralingual design empowers the compiler to view, understand, and enforce system-wide invariants about OS semantics beyond just memory safety, and enables Theseus to shift the responsibility of resource bookkeeping from the OS into the compiler, which reduces the set of states the OS must necessarily maintain.<br />
Together, Theseus’s structure, intralingual design, and state management principles facilitate desirable computing goals, allowing us to realize easy and arbitrary live evolution, library OS-style system flexibility, and availability through fault recovery, even for low-level core OS components.
</p>

<p><b><a href="http://kevinaboos.web.rice.edu/docs/Theseus_Brown_2020_12_04.pdf">Slides</a></b></p>
