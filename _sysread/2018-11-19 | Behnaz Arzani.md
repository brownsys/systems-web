---
layout: post
title: "Behnaz Arzani"
date: 2018-11-19
categories: sysread
---

Towards networks that manage themselves


The goal of data center operators is to provide high availability to their customers. Data center networks operate at massive scales. Failures in these networks are unavoidable, and when they occur, they can have a detrimental effect on availability. Finding the cause of problems in data center networks is akin to finding the proverbial needle in a haystack. There are several existing work on diagnosis, but most focus on finding the devices that have failed, whereas in practice operators also need to know which applications are impacted by the failure, and by how much. In this talk, I will show how we achieved holistic, practical, and deployable diagnosis systems for data center networks.
 
I take a two-step approach to diagnosing specific applications and quantifying the impact of individual failures. First, I build a system NetPoirot (SIGCOMM 2016) that identifies the entity responsible for the failure. Second, using 007 (NSDI 2018) I identify the link responsible for the problem. NetPoirot allows operators to identify whether the client, network, or the server is responsible for a problem without any network/server infrastructure changes. In designing NetPoirot we showed, for the first time, that we can identify whether the network, client, or server was responsible for a failure through monitoring coarse-grained TCP statistics. If NetPoirot blames the network as the culprit, 007 can be used to pinpoint the device that caused the problem. 007 can also be used to attribute failures to applications they impact. As one operator from Azure networking put it: ``Fixes need to be prioritized based on customer impact. However, currently, we do not have a way to correlate customer impact with bad links.' 007 solves this problem. In this talk, I will describe both NetPoirot and 007 and show evaluation results from their deployments in Azure data centers.
 
Behnaz Arzani is a post doctoral researcher at Microsoft Research in the Mobility and Networking group. She received her PhD in computer science from the University of Pennsylvania in 2017 working working with Prof. Boon Thau Loo and Prof. Roch Guerin. She also completed her dual masters degree in computer science and electrical engineering at the University of Pennsylvania in the same year. Her B. Sc. degree is from the Electrical Engineering department at Sharif University of Technology in 2010 where she worked with Prof. Javad Salehi. Behnaz is the recipient of the University of Pennsylvania Rubinoff dissertation award. She was also nominated as one of the 10 N2Women rising stars in networking and communications (formerly known as “10 Women in Networking/Communications That You Should Watch”). She was also selected to participate in the rising stars in EECS workshop that was held at MIT this year.


 Host: Professor Theophilus Benson
