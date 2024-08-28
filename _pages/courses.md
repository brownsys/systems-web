---
layout: page
permalink: /courses/
title: Courses
description: Current and previous offered systems courses
order: 5

core_courses:
 - csci0330:
   title: "CSCI0330:  Introduction to Computer Systems"
   link: https://cs.brown.edu/courses/csci0330/
 - csci0320:
   title: "CSCI0320:  Introduction to Software Engineering"
   link: https://cs.brown.edu/courses/csci0320/
 - csci0300:
   title: "CSCI0300:  Fundamentals of Computer Systems"
   link: https://cs.brown.edu/courses/csci0300
 - csci1310:
   title: "CSCI1310:  Fundamentals of Computer Systems (Masters)"
   link: https://cs.brown.edu/courses/csci1310
 - csci1380:
   title: "CSCI1380:  Distributed Systems"
   link: https://cs.brown.edu/courses/csci1380
 - csci1600:
   title: "CSCI1600: Real-Time and Embedded Software"
   link: "https://brown-cs1600.github.io/"
 - csci1680:
   title: "CSCI1680:  Computer Networks"
   link: https://cs.brown.edu/courses/csci1680
 - csci1720:
   title: "CSCI1710: Logic for Systems"
   link: http://cs.brown.edu/courses/csci1710/
 - csci1952y:
   title: "CSCI1952y: Computer Architecture"
   link: "https://browncs1952y.github.io/"

seminar_courses:
 - csci2390f19:
   term: Fall 2019
   title: "CSCI2390:   Privacy-Conscious Computer Systems"
   link: https://cs.brown.edu/courses/csci2390
   instructor: Malte Schwarzkopf
 - csci2950us18:
   term: Spring 2018
   title: "CSCI2950u:  Cloud 3.0 Infrastructure"
   link: https://cs.brown.edu/courses/csci2950-u/s18
   instructor: Rodrigo Fonseca
 - csci2950us17:
   title: "CSCI2950u:  Advanced Networking"
   term: Spring 2017
   link: https://cs.brown.edu/courses/csci2950-u/s17
   instructor: Rodrigo Fonseca

---

Faculty in our group are teach several courses in various areas of
systems and networking.

Are you a student interested in systems?  Great!  We recommend you
check out the following courses, often taught by faculty in our
group.

For information on specific course offerings per semester, see the
<a href="http://cs.brown.edu/courses" target="_blank">department website</a>.

## Core courses
<ul>
{% for item in page.core_courses %}
<li markdown="span"><a href="{{item.link}}" target="_blank">{{item.title}}</a></li>
{% endfor %}
</ul>

## Seminar courses

These courses are offered less-frequently, and cover specific research
areas:
<ul>
{% for item in page.seminar_courses %}
<li markdown="span"><a href="{{item.link}}" target="_blank">{{item.title}}</a>, {{item.term}}, {{ item.instructor }}</li>
{% endfor %}
</ul>
