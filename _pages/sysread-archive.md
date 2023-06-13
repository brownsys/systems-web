---
layout: page
permalink: /sysread-archive/
title: Sysread archive
description: Archive of past sysread talks (2021 and earlier)
skipnav: true
---

{% assign today = 'now' | date: '%s' %}
{% assign sorted = site.sysread | reverse %}

<ul>
  {% for post in site.sysread %}
  {% assign this_date = post.date | date: '%s' %}
  {% if this_date > today %}
    <li><a href="{{ post.url | prepend: site.baseurl }}">{{ post.date | date: "%b %-d, %Y" }}:  {{ post.title }}</a></li>
  {% endif %}
  {% endfor %}
</ul>

<h3>Past Talks</h3>

<ul>
  {% for post in sorted %}
  {% assign this_date = post.date | date: '%s' %}
  {% if this_date <= today %}
    <li><a href="{{ post.url | prepend: site.baseurl }}">{{ post.date | date: "%b %-d, %Y" }}:  {{ post.title }}</a></li>
  {% endif %}
  {% endfor %}
</ul>


<!-- {% include pagination.html %} -->
