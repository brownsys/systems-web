---
layout: post
title: "Irina Calciu: Rethinking Software Systems for Remote Memory"
date: 2020-11-13
categories: sysread
---

<p><b>Abstract:</b><br />
Recent research efforts propose remote memory systems that pool memory from multiple hosts. These systems rely on the virtual memory subsystem to track application memory accesses and transparently offer remote memory to applications. We outline several limitations of this approach, such as page fault overheads and dirty data amplification. Instead, we argue for a fundamentally different approach: leverage the local host's cache coherence traffic to track application memory accesses at cache line granularity. Our approach uses emerging cache-coherent FPGAs to expose cache coherence events to the remote memory runtime. This approach not only accelerates remote memory systems by reducing dirty data amplification and by eliminating page faults, but also enables other use cases, such as live virtual machine migration, unified virtual memory, security and code analysis. All of these use cases open up many promising research directions.
</p>
