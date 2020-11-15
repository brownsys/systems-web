---
layout: post
title: "Jakub Szefer: Securing FPGA-Accelerated Cloud Infrastructures"
date: 2020-12-11
categories: sysread
---

<p><b>Abstract:</b><br />
Cloud FPGAs have been gaining popularity in recent years due to the ability of users to request FPGA
resources quickly, flexibly, and on-demand. However, as public cloud providers make FPGAs available to many, potentially mutually-untrusting users, security of these Cloud FPGA deployments needs to be analyzed, and defenses developed. This talk will discuss Cloud FPGA security from the perspective of side and covert channel attacks. Especially we want to address and prevent means for sensitive information, such as cryptographic keys or information about machine learning models from being leaked out. The talk will cover our recent work on thermal channels that can be used to create covert channels between users renting same FPGA over time. The talk will also discuss our other recent work on voltage-based channels that leverage custom circuits instantiated inside the FPGAs to measure voltage changes. Voltage-based channels can be used to leak sensitive information across FPGAs (in single-tenant or multi-tenant settings), or can be combined with other existing attacks to perform cross-talk leakage inside the FPGAs (in multi-tenant settings). The talk will end with overview of some defenses and open challenges in securing Cloud FPGAs.
</p>
