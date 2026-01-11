---
layout: cv-layout
title: "International CV"
permalink: /cv_en
author_profile: false
redirect_from:
  - /resume
  - /resume_en
---


{% include base_path %}

<p class="no-print">
  <a href="https://github.com/thiswillbeyourgithub/website/blob/master/_pages/cv_en.md">Page Source Code</a>
  |
  <a href="#" onclick="window.print(); return false;" data-umami-events="cv_en_download_link">Download PDF</a>
  |
  <a href="../cv_fr" data-umami-events="cv_en_to_fr_link">French version here / Version en français ici</a>
</p>

<div class="cv-header">
  <h1>Olivier Cornelis</h1>
  <div class="cv-info">
    <div class="cv-info-item">
      <strong>Email:</strong> <a href="mailto:cv@oliviercornelis.fr">cv@oliviercornelis.fr</a>
    </div>
    <div class="cv-info-item">
      <strong>Website:</strong> <a href="https://olicorne.org">olicorne.org</a>
    </div>
    <div class="cv-info-item">
      <strong>Location:</strong> Paris, France
    </div>
    <div class="cv-info-item">
      <strong>ORCID:</strong> <a href="https://orcid.org/0000-0002-5445-4679">0000-0002-5445-4679</a>
    </div>
    <div class="cv-info-item">
      <strong>Github:</strong> <a href="https://github.com/thiswillbeyourgithub/">@thiswillbeyourgithub</a> (top 2.6% in 2025)
    </div>
    <div class="cv-info-item">
      <strong>Generated on:</strong> {{ site.time | date: "%d %b %Y" }}
    </div>
  </div>
</div>



# Education
* Specialized Studies Diploma (DES) in Psychiatry - since 2025
    * Paris Cité University, Paris psychiatry
* Master's degree (M1), 2019-2025
    * Health Research Track, Neuroscience, Genetics, R programming, Paris Cité University
    * Reviewers: Dr Anton Iftimovici (MD-PhD), Dr Estelle Pruvost-Robieux (MD-PhD), Dr Adeline Alice Bonnard (MD)
* General and Advanced Medical Sciences Degree - 2016-2025
    * Paris Cité University
* Preparatory Class for Grandes Écoles - 2015-2016
    * Carnot High School, Physics Chemistry section (PCSI-PC)



# Internships & Experience
* *NeuroSpin*, UNICOG team of Pr Stanislas Dehaene, Gif-Sur-Yvettes, France - 2022
    * Master's internship: computational modeling of consciousness states via fMRI, Python library development, Machine learning, High-dimensional data clustering
* *Dartmouth College (Ivy League)*, Pr Chris AMOS, Hanover, NH USA - 2015
    * One-month internship at *Geisel School of Medicine*, R programming, cf publication


# Skills
## Computer Science
* Proficiency in **Unix** environment (GNU/Linux, OSX), algorithmic complexity, advanced shell concepts (zsh/bash), vi/vim/neovim, regexp, sysadmin (self hosting, databases), Interfaces (GUI/CLI)
* **AI** LLM (pytorch, scikit-learn, huggingface, ...), agents (LangChain, DIY), interpretability (representation engineering), embedding-based search (RAG, wdoc), image generation, ASR/STT finetuning
* **Machine Learning and big data** (PCA, T-SNE, UMAP, TFIDF, numpy, pandas, regexp, complexity, optimization)
* Proficiency in **collaboration software** (git, Jupyter Notebook, markdown)
* Strong commitment to **Free/Open Source Software** (top 2.6% on Github as of 2025, [InterHop](https://interhop.org/), [DataForGood](https://dataforgood.fr/))
* Web stack and knowledge in other languages and domains (SQL, Javascript, lua, HTML/CSS)
* Hardware knowledge (soldering, server assembly), embedded systems (micropython, smartwatch)

## Language
- French native
* English level C1/C2 (more than 3 cumulative months in North America)
* Spanish level A2
* German level A1-A2

## Other
* Technical & Innovation Advisor at *Société Nouvelle des Cycles Cavales* (ecological intermediate mobility) - since 2024
* Driver's license (category B) - 2015

# Publication
  <ul class="publications">{% for post in site.publications reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>

# Online Training
* **Inria** - 2021
    * *Reproducible Research: Methodological Principles for Transparent Science*
    * *Bioinformatics: Algorithms and Genomes*
    * *Python 3: From Fundamentals to Advanced Language Concepts*
* **HuggingFace** : *Natural Language Processing Machine Learning Course* - 2021

# Personal Interests
- Organizer of in-person meetups for an online community focused on AI risks and rationality
- Cinema enthusiast, locks, film photography, sports
