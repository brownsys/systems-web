---
layout: default
---
# Sysread

<!-- <div class="header-bar"> -->
<!--   <h1>{{ site.blog_name }}</h1> -->
<!--   <h2>{{ site.blog_description }}</h2> -->
<!-- </div> -->

Sysread is our weekly seminar on computer systems research and industry practice.
We host speakers on a range of topics that are of interest to the group.

This semester, sysread takes place at <b>12 noon on Fridays</b> in <b>CIT 368</b> and on Zoom.

New talks and changes to the schedule are announced on the mailing list
which you can subscribe to
[here](https://lists.cs.brown.edu/sympa/info/sysread).

{% assign today = 'now' | date: '%s' %}
{% assign sorted = site.sysread | reverse %}

<h3>Upcoming talks</h3>

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
