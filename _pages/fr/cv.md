---
layout: cv-layout
title: "CV Français"
author_profile: false
lang: fr
ref: cv
permalink: /fr/cv
redirect_from:
    - /cv_fr
    - /fr/cv_fr
---

{% include base_path %}

<p class="no-print">
  <a href="https://github.com/thiswillbeyourgithub/website/blob/master/_pages/fr/cv.md">Code Source de cette Page</a>
  |
  <a href="#" onclick="window.print(); return false;" data-umami-events="cv_fr_download_link">Télécharger le PDF</a>
  |
  <a href="../../en/cv" data-umami-events="cv_fr_to_en_link">English version here / Version en anglais ici</a>
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
      <strong>Lieu:</strong> Paris, France
    </div>
    <div class="cv-info-item">
      <strong>ORCID:</strong> <a href="https://orcid.org/0000-0002-5445-4679">0000-0002-5445-4679</a>
    </div>
    <div class="cv-info-item">
      <strong>Github:</strong> <a href="https://github.com/thiswillbeyourgithub/">@thiswillbeyourgithub</a> (top 2.3%, 2025)
    </div>
    <div class="cv-info-item">
      <strong>Généré le:</strong> {{ site.time | date: "%d %b %Y" }}
    </div>
  </div>
</div>



# Formation
* Diplôme d'Étude Spécialisée (DES) de psychiatrie - depuis 2025
    * Université Paris Cité, psychiatrie Paris
* Master 1, 2019-2025
    * Parcours Recherche en Santé, Neurosciences, Génétique, programmation en R, Université Paris Cité
    * Rapporteurs: Dr Anton Iftimovici (MD-PhD), Dr Estelle Pruvost-Robieux (MD-PhD), Dr Adeline Alice Bonnard (MD)
* Diplôme de Formation Générale et Approfondie en Sciences Médicales - 2016-2025
    * Université Paris Cité
* Classe Préparatoire aux Grandes Écoles - 2015-2016
    * Lycée Général Carnot, section Physique Chimie (PCSI-PC)



# Stages & Expériences
* *NeuroSpin*, équipe UNICOG du Pr Stanislas Dehaene, Gif-Sur-Yvettes, France - 2022
    * Stage de M1: modélisation computationnelle des états de conscience via IRMf, Développement de bibliothèques Python, Apprentissage automatique, Clustering de données de haute dimension
* *Dartmouth College (Ivy League)*, Pr Chris AMOS, Hanover, NH USA - 2015
    * Stage d’un mois à la *Geisel School of Medicine*, programation en R, cf publication


# Compétences
## Informatiques
* **IA** LLM (pytorch, scikit-learn, huggingface, ...), agents (LangChain, DIY), interprétabilité (representation engineering), recherche par *embeddings* (RAG, wdoc), generation d'image, ASR/STT finetuning
* **Machine Learning et big data** (PCA, T-SNE, UMAP, TFIDF, numpy, pandas, regexp, complexité, optimisation)
* **Environnement Unix** (GNU/Linux, OSX), complexité algorithimique, notions avancées du shell (zsh/bash), vi/vim/neovim, des regexp, sysadmin (self hosting, databases, dimensionnement, estimation de ressources, cahier des charges), Interfaces (GUI/CLI)
* **Logiciels de collaboration** (git, Jupyter Notebook, markdown)
* Fort engagement envers les **Logiciels Libre** (top 2.3% sur Github en 2025, [InterHop](https://interhop.org/), [DataForGood](https://dataforgood.fr/))
* Technologies du web et notions dans d’autres langages et domaines (SQL, Javascript, lua, HTML/CSS)
* Notion de hardware (soudure, assemblage de serveurs), embarqué (micropython, montre connectée)

## Linguistiques
- Français natif
* Anglais niveau C1/C2 (plus de 3 mois cumulés en Amérique du Nord)
* Espagnol niveau A2
* Allemand niveau A1-A2

## Autre
* Conseiller Technique & Innovation chez *Société Nouvelle des Cycles Cavales* (mobilités intermédiaires écologiques) - depuis 2024
* Permis B - 2015

# Publication
  <ul class="publications">{% for post in site.publications reversed %}
    {% if post.lang == page.lang %}
    {% include archive-single-cv.html %}
    {% endif %}
  {% endfor %}</ul>

# Formation en ligne
* **Inria** - 2021
    * *Recherche reproductible : principes méthodologiques pour une science transparente*
    * *Bioinformatique : algorithmes et génomes*
    * *Python 3 : des fondamentaux aux concepts avancés du langage*
* **HuggingFace** : *Natural Language Processing Machine Learning Course* - 2021

# Extra professionnel
- Organisateur de rencontre physique d'une communauté en ligne sur les risques inhérents à l'IA et la rationalité
- Cinéphile, serrurerie, photographie argentique, sport
