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
      <strong>Github:</strong> <a href="https://github.com/thiswillbeyourgithub/">@thiswillbeyourgithub</a> (<a href="https://gstats.olicorne.org">top ~2.3%</a>, 2024-26, pré- & post-IA)
    </div>
    <div class="cv-info-item">
      <strong>Généré le:</strong> {{ site.time | date: "%d %b %Y" }}
    </div>
  </div>
</div>



# Formation
* Diplôme d'Études Spécialisées (DES) de Psychiatrie - depuis 2025
    * Université Paris Cité, Psychiatrie Paris, Coordination : Pre Caroline DUBERTRET
    * Validation du séminaire optionnel de neuropsychiatrie « Approche neuro-psychiatrique des troubles du comportement », Pr Philippe FOSSATI, Groupe Hospitalier Pitié-Salpêtrière (Paris) - 2026
* Master 1, 2019-2025
    * Parcours Recherche en Santé, Neurosciences, Génétique, programmation en R, Université Paris Cité
    * Rapporteurs: Dr Anton IFTIMOVICI (MD-PhD), Dr Estelle PRUVOST-ROBIEUX (MD-PhD), Dr Adeline-Alice BONNARD (MD)
* Diplôme de Formation Générale et Approfondie en Sciences Médicales - 2016-2025
    * Université Paris Cité, site Bichat
* Classe Préparatoire aux Grandes Écoles - 2015-2016
    * Lycée Général Carnot, section Physique Chimie (PCSI-PC)



# Stages & Expériences
* *NeuroSpin*, équipe UNICOG du Pr Stanislas DEHAENE, sous-équipe dirigée par le Pr Béchir JARRAYA, Gif-Sur-Yvettes, France - 2022
    * Stage de M1: Modélisation computationnelle des états de conscience via IRMf, Développement de bibliothèques Python, Apprentissage automatique, Clustering de données de haute dimension
* *Dartmouth College (Ivy League)*, Pr Chris AMOS, Hanover, NH, USA - 2015
    * Stage d’un mois à la *Geisel School of Medicine*, programmation en R, cf publication


# Compétences
## Informatiques
* **IA** LLM (pytorch, scikit-learn, huggingface, ...), agents (LangChain, DIY), interprétabilité (*representation engineering*), recherche par *embeddings* (RAG, wdoc), génération d'image, *finetuning* ASR/STT et création de jeux de données d'entraînement, optimisations pour l'inférence médicale hors ligne
* **Reconnaissance vocale** publication en libre accès de [UltiMed-ASR-FR-v1](https://huggingface.co/datasets/Olicorne/UltiMed-ASR-FR-v1), un jeu de données de 3 105 heures de parole médicale française et d'un affinage de Parakeet-v3 entraîné dessus avec un seul GPU grand public (8 fois moins d'erreurs sur du texte médical technique), optimisé pour un usage hors ligne sur CPU dans un navigateur
* **Machine Learning et big data** PCA, T-SNE, UMAP, TFIDF, numpy, pandas, regexp, complexité, optimisation
* **Environnement Unix** (GNU/Linux, OSX), administration système (gestion de serveurs distants et self hosting, déploiement), complexité algorithmique, notions avancées du shell (zsh/bash) et regexp, interface utilisateur (WebUI/GUI/CLI), vi/vim/neovim, développement Web
* **Logiciels de collaboration** git, Jupyter Notebook, markdown
* **Logiciels Libres** engagement fort ([top ~2.3% sur Github](https://gstats.olicorne.org), 2024-26 pré- & post-IA, 7k+ téléchargements PyPI/mois, [InterHop](https://interhop.org/), [DataForGood](https://dataforgood.fr/))
* **Sites web liés à la santé** plusieurs sites réalisés pour des collègues et des patients, toujours gratuits et open source (informations sur les médicaments, transfert de documents, transcription audio, ...)
* **Notions de hardware** soudure, dimensionnement software/hardware et optimisations de ressources, assemblage de serveurs, embarqué (micropython, montre connectée)

## Linguistiques
- Français natif
* Anglais niveau C1/C2 (3 mois cumulés en Amérique du Nord)
* Espagnol niveau A2
* Allemand niveau A1-A2

## Autres
* Conseiller Technique & Innovation chez *Société Nouvelle des Cycles Cavales* (mobilités intermédiaires écologiques) - depuis 2024
* Permis B - 2015

# Publication
  <ul class="publications">{% for post in site.publications reversed %}
    {% if post.lang == page.lang %}
    {% include archive-single-cv.html %}
    {% endif %}
  {% endfor %}</ul>

# Formations en ligne
* **Inria** - 2021
    * *Recherche reproductible : principes méthodologiques pour une science transparente*
    * *Bioinformatique : algorithmes et génomes*
    * *Python 3 : des fondamentaux aux concepts avancés du langage*
* **HuggingFace** : *Natural Language Processing Machine Learning Course* - 2021

# Extra professionnel
- Organisateur de rencontres physiques d'une communauté en ligne sur les risques inhérents à l'IA et la rationalité
- Cinéphile, serrurerie, photographie argentique, sport
