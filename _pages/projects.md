---
layout: page
title: Projects
permalink: /projects/
description: The group is working on a range of projects, and we list some examples below.
order: 3
---

{% assign current_projects = site.projects | where: "ongoing", "true" %}
{% assign earlier_projects = site.projects | where: "ongoing", "false" %}

### Current Projects
<table class="project-list">
<colgroup>
<col width="35%" />
<col width="65%" />
</colgroup>
	<tbody>
	{% for project in current_projects %}
	{% if project.ignore %}
	{% else %}
	<tr class="project-item">
		{% if project.img %}
			<td class="project-image">
			<img class="thumbnail" src="{{ project.img | prepend: site.baseurl | prepend: site.url }}"/>
			</td>
			<td>
		{% else %}
			<td colspan="2">
		{% endif %}
   	<h2 class="project-title"><a href="{{ project.url | prepend: site.baseurl | prepend: site.url }}">{{ project.title }}</a></h2>
	<p>{{ project.description }}</p>
	</td>
	</tr>
	{% endif %}
	{% endfor %}
	</tbody>
</table>


### Earlier Projects

<table class="project-list">
<colgroup>
<col width="35%" />
<col width="65%" />
</colgroup>
	<tbody>
	{% for project in earlier_projects %}
	{% if project.ignore %}
	{% else %}
	<tr class="project-item">
		{% if project.img %}
			<td class="project-image">
			<img class="thumbnail" src="{{ project.img | prepend: site.baseurl | prepend: site.url }}"/>
			</td>
			<td>
		{% else %}
			<td colspan="2">
		{% endif %}
   	<h2 class="project-title"><a href="{{ project.url | prepend: site.baseurl | prepend: site.url }}">{{ project.title }}</a></h2>
	<p>{{ project.description }}</p>
	</td>
	</tr>
	{% endif %}
	{% endfor %}
	</tbody>
</table>


