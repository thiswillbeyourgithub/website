---
layout: archive
title: "Plan du site"
ref: sitemap
permalink: /fr/sitemap
author_profile: true
lang: fr
---

{% include base_path %}

Une liste de tous les articles et pages présents sur le site. Pour vous les robots, il existe également une [version XML]({{ base_path }}/sitemap.xml) disponible pour digestion.

<h2>Pages</h2>
{% for post in site.pages %}
  {% include archive-single.html %}
{% endfor %}

<h2>Articles</h2>
{% for post in site.posts %}
  {% include archive-single.html %}
{% endfor %}

{% capture written_label %}'Aucun'{% endcapture %}

{% for collection in site.collections %}
{% unless collection.output == false or collection.label == "posts" %}
  {% capture label %}{{ collection.label }}{% endcapture %}
  {% if label != written_label %}
  <h2>{{ label }}</h2>
  {% capture written_label %}{{ label }}{% endcapture %}
  {% endif %}
{% endunless %}
{% for post in collection.docs %}
  {% unless collection.output == false or collection.label == "posts" %}
  {% include archive-single.html %}
  {% endunless %}
{% endfor %}
{% endfor %}
