---
layout: page
title: Projects
permalink: /projects/
description: Our projects
order: 3
---
{% comment %}
<div class="project-list">
	<ul class="post-list">
	{% for project in site.projects %}
	<div class="project-item">
	<li>
	{% if project.img %}
	<img class="thumbnail" src="{{ project.img | prepend: site.baseurl | prepend: site.url }}"/>
	{% endif %}
	<h2><a class="project-title" href="{{ project.url | prepend: site.baseurl | prepend: site.url }}">{{ project.title }}</a></h2>
	<p>{{ project.description }}</p>
	</li>
	</div>
	{% endfor %}
	</ul>
</div>
{% endcomment %}


<table class="project-list">
<colgroup>
<col width="35%" />
<col width="65%" />
</colgroup>
	<tbody>
	{% for project in site.projects %}
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
	{% endfor %}
	</tbody>
</table>






{% comment %}

{% for project in site.projects %}

{% if project.redirect %}
<div class="project">
    <div class="thumbnail">
        <a href="{{ project.redirect }}" target="_blank">
        {% if project.img %}
        <img class="thumbnail" src="{{ project.img | prepend: site.baseurl | prepend: site.url }}"/>
        {% else %}
        <div class="thumbnail blankbox"></div>
        {% endif %}    
        <span>
            <h2>{{ project.title }}</h2>
            <br/>
            <p>{{ project.description }}</p>
        </span>
        </a>
    </div>
</div>
{% else %}

<div class="project ">
    <div class="thumbnail">
        <a href="{{ project.url | prepend: site.baseurl | prepend: site.url }}">
        {% if project.img %}
        <img class="thumbnail" src="{{ project.img | prepend: site.baseurl | prepend: site.url }}"/>
        {% else %}
        <div class="thumbnail blankbox"></div>
        {% endif %}    
        <span>
            <h2>{{ project.title }}</h2>
            <br/>
            <p>{{ project.description }}</p>
        </span>
        </a>
    </div>
</div>

{% endif %}

{% endfor %}
{% endcomment %}
