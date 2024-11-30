---
layout: default
title: "Resume"
---

<h2>{{ site.data.resume.personal_info.name }}</h2>
<p>{{ site.data.resume.personal_info.title }}</p>
<p>Email: <a href="mailto:{{ site.data.resume.personal_info.email }}">{{ site.data.resume.personal_info.email }}</a></p>
<p>Phone: {{ site.data.resume.personal_info.phone }}</p>
<p>Location: {{ site.data.resume.personal_info.location }}</p>
<img src="{{ site.data.resume.personal_info.profile_picture }}" alt="Profile Picture" />

<h3>Summary</h3>
<p>{{ site.data.resume.summary }}</p>

<h3>Skills</h3>
<h4>Technical Skills</h4>
<ul>
  {% for skill in site.data.resume.skills.technical %}
    <li>{{ skill }}</li>
  {% endfor %}
</ul>

<h4>Soft Skills</h4>
<ul>
  {% for skill in site.data.resume.skills.soft %}
    <li>{{ skill }}</li>
  {% endfor %}
</ul>

<h3>Experience</h3>
{% for job in site.data.resume.experience %}
  <h4>{{ job.job_title }} at {{ job.company }} ({{ job.start_date }} - {{ job.end_date }})</h4>
  <ul>
    {% for responsibility in job.responsibilities %}
      <li>{{ responsibility }}</li>
    {% endfor %}
  </ul>
{% endfor %}

<h3>Education</h3>
{% for edu in site.data.resume.education %}
  <p>{{ edu.degree }} from {{ edu.institution }} ({{ edu.year }})</p>
{% endfor %}

<h3>Certifications</h3>
<ul>
  {% for cert in site.data.resume.certifications %}
    <li>{{ cert }}</li>
  {% endfor %}
</ul>

<h3>Projects</h3>
{% for project in site.data.resume.projects %}
  <h4>{{ project.title }}</h4>
  <p>{{ project.description }}</p>
{% endfor %}