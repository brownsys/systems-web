---
layout: page
permalink: /publications/
title: Publications
description: More recent first.
order: 4
years: [2019,2018,2017,2016,2015,2014,2013]
earlier: 2012
---

{% for y in page.years %}
  <h3 class="year">{{y}}</h3>
  {% bibliography  -q @*[year={{y}}]* %}
{% endfor %}

<h3 class="year">Earlier</h3>
{% bibliography  -q @*[year<={{page.earlier}}]* %}
