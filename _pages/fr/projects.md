---
ref: projects
permalink: /fr/projects
title: "Projets"
author_profile: true
lang: fr
---

{% include french_translation_disclaimer.md %}

Sur cette page, vous pouvez lire la liste exhaustive des projets de programmation que j'ai créés au fil des années. Elle est assez longue, utilisez donc la table des matières ci-dessous pour naviguer.

Un mot sur l'échelle avant de faire défiler : l'essentiel de ce qui suit relève du grattage de démangeaison. De petits outils créés parce que quelque chose m'agaçait, publiés au cas où cela vous agacerait aussi. Le travail sur lequel j'aimerais être jugé est regroupé dans [Gros projets](#larger-projects). L'IA a multiplié ce que je peux produire, mais les fondations lui sont antérieures : [wdoc](#wdoc), [AnnA](#anna) et [AnkiAIUtils](#ankiaiutils) ont été écrits à la main. (Pour être clair : aucune donnée de patient n'est jamais impliquée dans tout cela, pas même anonymisée, et pas même sur des serveurs que j'héberge moi-même.)

Mes dépôts de code sont hébergés sur [github](https://github.com/thiswillbeyourgithub/):

[![(Cliquez ici si ca ne charge pas)](https://gstats.olicorne.org)](https://uncached.gstats.olicorne.org)

*Nombre de projets individuels sur cette page : 134*

*Certains de mes projets sont également publiés sur [PyPI](https://pypi.org/user/thiswillbeyourgithub/), totalisant plus de 7k téléchargements par mois (en mars 2026).*


*Je n'aurais jamais pu écrire du code sans le mouvement open source, les innombrables tutoriels partagés librement en ligne et la culture de publication du code source et des scripts. Je suis profondément reconnaissant envers tous ceux qui ont contribué à rendre les connaissances en programmation accessibles. Ces projets sont ma tentative de rendre la pareille et d'aider les autres dans leur parcours, tout comme tant de personnes m'ont aidé.*
{: .notice--info}

<details><summary><i>Une note sur le terme "Projet"</i></summary>
<ul>
    <li><i>Je compte comme "projet" uniquement ce que j'ai créé moi-même. Cela n'inclut donc pas mes contributions à d'autres projets. Consultez <a href="#contributions-au-code">le bas de la page</a> si vous souhaitez lire quelques-unes de mes contributions.</i></li>
</ul>
</details>

<details><summary><i>Une note sur le "vibecoding"</i></summary>
<ul>
    <li><i>La plupart du temps, je ne fais pas de <a href="https://simonwillison.net/2025/Mar/19/vibe-coding/">vibecoding</a> sur ces projets : j'essaie d'écrire des spécifications techniques soignées, j'utilise des tests unitaires aussi souvent que possible, et j'assume la responsabilité des choix de conception derrière le code. Dans les rares cas où un petit projet annexe a été vibecodé, son README le dit explicitement.</i></li>
</ul>
</details>

<details><summary><i>Une note sur la paternité</i></summary>
<ul>
    <li><i>Bien que j'utilise l'IA depuis de nombreuses années, je ne l'ai pas utilisée pour coder avant environ 2024. Depuis, lorsque je veux une assistance basée sur l'IA, j'utilise presque exclusivement <a href="https://aider.chat/">aider</a> avec l'argument <b>--attribute-author</b> afin que vous puissiez voir quels projets et commits ont été réalisés avec ou sans.</i></li>
    <li><i>Depuis décembre 2025, aider semble ne plus être maintenu depuis des mois. Depuis début 2026, je suis passé à <a href="https://github.com/anthropics/claude-code">Claude Code</a> et cela a (à nouveau) révolutionné ma productivité. Non seulement parce que je peux désormais m'attaquer à des projets plus ambitieux, mais surtout parce qu'il ne s'agit plus uniquement de code. La gestion de beaucoup d'autres choses devient automatisable. Le terme « assistant » est désormais plus approprié que simplement « aide au développeur » en ce qui me concerne.</i></li>
</ul>
</details>

<details><summary><i>Une note sur les licences</i></summary>
<ul>
    <li><i>La plupart, sinon tous mes projets sont publiés sous la <a href="https://www.gnu.org/licenses/agpl-3.0.en.html">licence AGPLv3</a>. Auparavant, j'utilisais presque exclusivement la <a href="https://www.gnu.org/licenses/gpl-3.0.en.html">licence GPLv3</a>.</i></li>
</ul>
</details>

<br>

{% include toc_wide %}

## Médecine / Science Informatique / Gros projets
{: #larger-projects}
*24 projets jusqu'à présent*
- [justelesRCP](https://justelesrcp.olicorne.org) : Un site statique rapide pour consulter les RCP officiels français, généré à partir des données publiques ANSM/BDPM, avec une recherche par IA gratuite, sans publicité et sans pistage (instance publique gratuite sur [justelesrcp.olicorne.org](https://justelesrcp.olicorne.org)).
- [neurarium](https://neurarium.olicorne.org/?lang=fr) : Un atlas 3D à sources notées qui relie l'anatomie cérébrale, les voies, les récepteurs et les médicaments psychiatriques dans un même modèle interrogeable (instance publique gratuite sur [neurarium.olicorne.org](https://neurarium.olicorne.org/?lang=fr)).

### Transcription audio médicale

#### UltiMed

Les logiciels de transcription courants font trop d'erreurs sur les textes médicaux. UltiMed est ma tentative d'alternative ouverte : un jeu de données, un modèle affiné et les scripts qui les ont produits.

- [parakeet-tdt-0.6b-v3-UltiMed-onnx](https://huggingface.co/Olicorne/parakeet-tdt-0.6b-v3-UltiMed-onnx) : Un affinage médical français de Parakeet, optimisé pour le CPU et le navigateur, avec 7 à 8 fois moins d'erreurs que le modèle de base sur du texte médical technique (testable dans [Parakeet Web](https://parakeetweb.olicorne.org)).
- [UltiMed-ASR-FR-v1](https://huggingface.co/datasets/Olicorne/UltiMed-ASR-FR-v1) : Un jeu de données ouvert de parole médicale française : 3 105 heures de phrases en style dictée lues par une machine, sous [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), sans aucune donnée patient, pour que n'importe quel éditeur de logiciel puisse proposer gratuitement une dictée médicale française correcte.
    - [UltiMed-ASR-FR-v1-scripts](https://github.com/thiswillbeyourgithub/UltiMed-ASR-FR-v1-scripts) : La chaîne de génération, pour que d'autres puissent reconstruire le jeu de données ou l'adapter à une autre spécialité ou une autre langue.
    - [UltiMed-ASR-FR-v1-Voxtral](https://github.com/thiswillbeyourgithub/UltiMed-ASR-FR-v1-Voxtral) : Le modèle de synthèse vocale local, soigneusement optimisé, qui a lu à voix haute chaque phrase du jeu de données.
    - [UltiMed-ASR-FR-v1-NeMo_training_scripts](https://github.com/thiswillbeyourgithub/UltiMed-ASR-FR-v1-NeMo_training_scripts) : Les scripts pour reproduire l'affinage, réalisé sur ma propre machine.
- [parakeet-tdt-0.6b-v3-optimized-onnx](https://huggingface.co/Olicorne/parakeet-tdt-0.6b-v3-optimized-onnx) : Une version du modèle de reconnaissance vocale [Parakeet](https://huggingface.co/nvidia/parakeet-tdt-0.6b-v3) de NVIDIA, fortement optimisée pour tourner sur des machines modestes et dans le navigateur.
- [Parakeet Web](https://github.com/thiswillbeyourgithub/parakeet_web) : Une transcription vocale qui tourne entièrement dans le navigateur, proposant plusieurs modèles dont le mien (instance publique gratuite sur [parakeetweb.olicorne.org](https://parakeetweb.olicorne.org)).
- [AudioCrowd](https://github.com/thiswillbeyourgithub/AudioCrowd) : *[Archivé]* Une petite application Gradio permettant à plusieurs volontaires d'enregistrer des phrases simultanément, pour constituer un jeu de données de reconnaissance vocale.

### Autres gros projets

- [SAM3-Skin-HeartRate](https://github.com/thiswillbeyourgithub/SAM3-Skin-HeartRate) : Une réimplémentation de [faceHR](https://github.com/ajsteele/faceHR) avec segmentation automatique de la peau (SAM 3) pour amplifier les variations de couleur liées au flux sanguin, en pensant aux ponctions artérielles.
- [PrevMed](https://github.com/PrevMedOrg/PrevMed) (abréviation de *Preventive Medicine*) : Une plateforme minimaliste, gratuite et open source, où des utilisateurs non techniques rédigent des questionnaires cliniques en YAML, sans stockage de données personnelles (j'ai été rémunéré pour la concevoir puis la développer).
- [wdoc](https://github.com/thiswillbeyourgithub/wdoc){: #wdoc} : Un outil pour interroger et résumer tout type de document (PDF, vidéos YouTube, Anki, pages web, etc.) avec n'importe quel LLM (modèle de langage). (Pour être clair : aucune donnée de patient n'est jamais impliquée, pas même anonymisée, et pas même sur des serveurs que j'héberge moi-même.)
    - [OmniQA](https://github.com/thiswillbeyourgithub/OmniQA) : *[Archivé]* Un outil pour indexer tout type de document et poser des questions à un LLM à son sujet, l'ancêtre de [wdoc](#wdoc).
- [repeng-research-fork](https://github.com/thiswillbeyourgithub/repeng-research-fork) : Un fork pour explorer des questions soulevées dans les issues de [repeng](https://github.com/vgel/repeng/), avec des ajouts comme les entrées au format chat et la prise en charge de Qwen3, proposés en amont.
- `NOM ANONYMISÉ` (dépôt privé) : Une bibliothèque qui gère les nombreuses différences entre méthodes de clustering (pas d'inférence, clusters flous, réassignation des étiquettes) afin de toutes les comparer, sujet de mon stage de M1 à [NeuroSpin](https://fr.wikipedia.org/wiki/NeuroSpin).
- [gradio_pharmacokinetic_simulator](https://github.com/thiswillbeyourgithub/gradio_pharmacokinetic_simulator) : Un graphique interactif des concentrations plasmatiques au cours du temps selon différents schémas posologiques, pour s'entraîner à l'intuition pharmacocinétique.
    - [med-pharmacokinetic-simulator](https://github.com/thiswillbeyourgithub/Med-pharmacokinetic-simulator) : Une simulation R/Shiny du méthylphénidate à libération immédiate, faite pour qu'un ami puisse organiser ses prises autour du sommeil, des années avant la version Gradio (l'un de mes tout premiers projets de programmation).
- [ADHD_european_drug_map](https://github.com/thiswillbeyourgithub/ADHD-european-drug-map) : Une carte des médicaments du TDAH autorisés dans chaque pays européen, construite automatiquement à partir de la liste de médicaments de l'EMA (suggérée par un ami).
- KnQuant (pas encore publié) : *[Inachevé]* Une bibliothèque pour transformer du texte non structuré en triplets de connaissances interrogeables avec des embeddings multimodaux.
- [QuestEA](https://github.com/thiswillbeyourgithub/QuestEA) : Une exploration de la possibilité d'extraire plus d'information des données d'enquête grâce aux embeddings et à un peu de mathématiques, par exemple pour comparer différents questionnaires psychiatriques entre eux.
- [WebSend](https://github.com/thiswillbeyourgithub/WebSend) : Un moyen sécurisé de transférer des photos d'un téléphone vers un ordinateur derrière un pare-feu, chiffrées de bout en bout via WebRTC à travers un serveur qui ne peut pas les lire (instance publique gratuite sur [websend.olicorne.org](https://websend.olicorne.org)).
- [AiFormParser](https://github.com/thiswillbeyourgithub/AiFormParser) : *[Inachevé]* Un moyen de transformer des questionnaires cliniques papier en tableurs sans que les données patient ne quittent jamais le navigateur.
- [sleep_tracker_pinetime](https://github.com/thiswillbeyourgithub/SleepTk_pinetime_sleep_tracker) : Un suivi du sommeil pour [wasp-os](https://github.com/wasp-os/wasp-os) avec un réveil calé sur les cycles de sommeil (utilisé chaque nuit depuis environ 2021).
    - [InfiniSleep-tracking](https://github.com/thiswillbeyourgithub/InfiniSleep-tracking) : Un fork d'[InfiniTime](https://github.com/InfiniTimeOrg/InfiniTime) pour que la montre enregistre le sommeil toute seule, avec la meilleure autonomie d'InfiniTime.
    - J'utilise [mon fork de Gadgetbridge](https://codeberg.org/thiswillbeyourgithub/Gadgetbridge-infinisleep-tracking) pour récupérer les données depuis la montre.

## Apprentissage automatique
*6 projets jusqu'à présent*

- [LLM Presidio Like PII Remover](https://github.com/thiswillbeyourgithub/LLM_presidio_like_PII_remover) : Une exploration de la capacité de petits LLM locaux à repérer les informations personnelles dans un texte, à partir de définitions en langage courant plutôt que de modèles entraînés.
    - [PII French Medical Test Suite](https://github.com/thiswillbeyourgithub/PII_french_medical_test_suite) : Un moyen de mesurer à quel point ces modèles détectent les informations personnelles dans des phrases médicales françaises contenant de fausses données.
- [Beta-Variational-Autoencoder](https://github.com/thiswillbeyourgithub/Beta-Variational-Autoencoder) : Un beta-VAE simple avec une interface scikit-learn, fait pour un autre projet faute d'en avoir trouvé un.
- [GridSearchReductor](https://github.com/thiswillbeyourgithub/GridSearchReductor) : Un moyen de lancer moins d'expériences qu'une recherche par grille complète tout en couvrant raisonnablement l'espace des paramètres.
- [repeng-research-fork](https://github.com/thiswillbeyourgithub/repeng-research-fork) : *Voir ci-dessus*
- `NOM ANONYMISÉ` : *Voir ci-dessus*

## Anki
*[Anki](https://github.com/ankitects/anki/) est un système open source de cartes mémoire/répétition espacée*
*14 projets jusqu'à présent*

- [Stahl Ankifier](https://github.com/thiswillbeyourgithub/StahlAnkifier) : Un moyen de transformer le *Prescriber's Guide* (Stahl) en cartes Anki, fait pendant mon internat de psychiatrie car le faire à la main aurait pris des mois.
- [Voice2Anki](https://github.com/thiswillbeyourgithub/Voice2Anki) : Un moyen de créer rapidement de bonnes cartes mémoire en les dictant, avec mes propres formulations, sur n'importe quel sujet.
- [AnkiAiUtils](https://github.com/thiswillbeyourgithub/AnkiAIUtils){: #ankiaiutils} : Un outil qui ajoute une aide supplémentaire aux cartes que j'échouais sans cesse, comme une explication, un moyen mnémotechnique ou une illustration.
- [AnnA_anki_neuronal_Appendix](https://github.com/thiswillbeyourgithub/AnnA_Anki_neuronal_Appendix){: #anna} : Un moyen d'éviter de réviser le même jour des cartes quasi identiques, et de rattraper un retard sans perdre en rétention.
- [py_ankiconnect](https://github.com/thiswillbeyourgithub/py_ankiconnect) : Un moyen simple de communiquer avec Anki depuis des projets Python et depuis la ligne de commande.
- [AnkiAutoMindmap](https://github.com/thiswillbeyourgithub/AnkiAutoMindmap) : Un outil pour construire des cartes mentales à partir des cartes, pour avoir une vue d'ensemble de tout ce qui a été écrit sur un sujet (par exemple les céphalées).
- [i3_seach_anki_collection](https://github.com/thiswillbeyourgithub/i3_search_anki_collection) : Un raccourci i3 qui ouvre une invite de recherche et affiche les cartes correspondantes dans le navigateur d'Anki.
- [HapaxPredator](https://github.com/thiswillbeyourgithub/HapaxPredator) : Un add-on qui liste chaque mot des cartes sélectionnées par fréquence, pour faire ressortir les mots rares (souvent des fautes de frappe).
- [IndexableAnki](https://github.com/thiswillbeyourgithub/IndexableAnki) : *[Archivé]* Un export de chaque carte Anki en fichier texte pour que [Recoll](https://www.lesbonscomptes.com/recoll/) puisse l'indexer (depuis remplacé par le parseur Anki de [wdoc](#wdoc)).
- [anki_PrioriTag](https://github.com/thiswillbeyourgithub/anki_Prioritag) : Un paquet filtré construit à partir des tags qui contiennent le plus de cartes oubliées.
- [anki_autobury_added_today](https://github.com/thiswillbeyourgithub/anki_autobury_added_today) : Un script qui enfouit les cartes créées le jour même pour qu'elles ne reviennent pas en révision avant le lendemain.
- [Anki Semantic Search](https://github.com/thiswillbeyourgithub/Anki-Semantic-Search) : *[Archivé]* Un moyen de retrouver des cartes par leur sens, et pas seulement par les mots exacts qu'elles contiennent.
- [pdf2anki](https://github.com/thiswillbeyourgithub/pdf2anki) : Un moyen de chercher dans des PDF avec la recherche d'Anki, qui gère bien les mots-clés multiples et les mots partiels.
- [clozolkor](https://github.com/thiswillbeyourgithub/Clozolkor) : Un modèle de note qui dévoile les longues cartes à trous (listes, étapes) un élément à la fois, plutôt que tout d'un coup.

## Karakeep
*[Karakeep](https://github.com/karakeep-app/karakeep) est une application open source de lecture différée*
*3 projets jusqu'à présent*

- [karakeep_python_api](https://github.com/thiswillbeyourgithub/karakeep_python_api) : Un client Python et une CLI non officiels pour l'API de [Karakeep](https://karakeep.app/), sur lesquels s'appuient mes outils Karakeep.
- [Karanki](https://github.com/thiswillbeyourgithub/Karanki) : *[Inachevé]* Une synchronisation bidirectionnelle entre les surlignages Karakeep et Anki, chaque couleur de surlignage correspondant à un paquet avec sa propre rétention cible.
- [freshrss_to_karakeep](https://github.com/thiswillbeyourgithub/freshrss_to_karakeep) : Une tâche planifiée qui envoie les articles marqués comme favoris dans [FreshRSS](https://github.com/FreshRSS/FreshRSS) vers Karakeep avec un tag "freshrss".

## Logseq
*[Logseq](https://github.com/logseq/logseq) est une application open source de PKM (Personal Knowledge Management)*
*4 projets jusqu'à présent*

- [LogseqMarkdownParser](https://github.com/thiswillbeyourgithub/LogseqMarkdownParser) : Une petite bibliothèque et CLI pour accéder aux propriétés des blocs Logseq, avec une sortie JSON utilisable avec `jq`.
- [wallabag_to_logseq_and_omnivore](https://github.com/thiswillbeyourgithub/wallabag_to_logseq_and_omnivore) : *[Archivé]* Une migration des articles lus et des surlignages de Wallabag vers Logseq, en envoyant les non lus vers Omnivore.
- [LogseqPDFImporter](https://github.com/thiswillbeyourgithub/LogseqPDFImporter) : Un moyen d'importer dans Logseq des PDF annotés dans d'autres lecteurs, en conservant les couleurs de surlignage et les zones surlignées sous forme d'images.
- [MdXLogseqTODOSync](https://github.com/thiswillbeyourgithub/MdXLogseqTODOSync) : Une synchronisation des TODO situés entre des délimiteurs dans deux fichiers Markdown, pour que la mise à jour de mon graphe Logseq mette à jour le README d'un dépôt.

## Open-WebUI
*[Open-WebUI](https://github.com/open-webui/open-webui/issues) est une plateforme IA auto-hébergée*
*2 projets jusqu'à présent*

- [Open-WebUI Knowledge Zotero Sync](https://github.com/thiswillbeyourgithub/openwebui-knowledge-zotero-sync) : Une synchronisation d'une bibliothèque Zotero vers une base de connaissances Open WebUI (un fork de [stoerr/openwebui-knowledgesync](https://github.com/stoerr/openwebui-knowledgesync), qui sera retiré une fois mon connecteur Zotero intégré à l'officiel [oikb](https://github.com/open-webui/oikb)).
- [openwebui_custom_pipes_filters](https://github.com/thiswillbeyourgithub/openwebui_custom_pipes_filters) : Une collection de filtres, outils et modèles pour Open WebUI, par exemple pour transmettre des métadonnées utilisateur à Langfuse ou limiter la longueur des conversations.

## Smartwatch
*Principalement pour [wasp-os](https://github.com/wasp-os/wasp-os) et [InfiniTime](https://github.com/InfiniTimeOrg/InfiniTime) sur la [pinetime](https://pine64.org/devices/pinetime/)*
*3 projets jusqu'à présent*

- [InfiniSleep-tracking](https://github.com/thiswillbeyourgithub/InfiniSleep-tracking) : *Voir ci-dessus*
- [sleep_tracker_pinetime](https://github.com/thiswillbeyourgithub/SleepTk_pinetime_sleep_tracker) : *Voir ci-dessus*
- [pomodoro_wasp_os](https://github.com/thiswillbeyourgithub/Pomodoro-wasp-os) : Une application Pomodoro pour [wasp-os](https://github.com/wasp-os/wasp-os) avec des préréglages, des motifs de vibration configurables et des réglages conservés d'une session à l'autre.

## API
*J'ai créé mes propres bibliothèques de "référence" pour rendre mes autres projets plus interopérables*
*5 projets jusqu'à présent*

- [freshrss_python_api](https://github.com/thiswillbeyourgithub/freshrss_python_api) : Un wrapper Python typé autour de l'API Fever de FreshRSS pour récupérer, marquer et organiser les articles depuis des scripts.
- [caldav_tasks_api](https://github.com/thiswillbeyourgithub/Caldav-Tasks-API) : Une bibliothèque et CLI pour créer, récupérer et supprimer des tâches CalDAV, sur laquelle s'appuient mon installation vocale Home Assistant et d'autres outils.
    - [caldav_cal_api](https://github.com/thiswillbeyourgithub/Caldav-Cal-API) : L'équivalent de caldav_tasks_api pour les événements de calendrier (VEVENT), avec la même structure et le même nommage.
- [karakeep_python_api](https://github.com/thiswillbeyourgithub/karakeep_python_api) : *Voir ci-dessus*
- [py_ankiconnect](https://github.com/thiswillbeyourgithub/py_ankiconnect) : *Voir ci-dessus*

## Productivité
*Outils que j'utilise, ai utilisés ou créés*
*14 projets jusqu'à présent*

- [claude_usage](https://github.com/thiswillbeyourgithub/claude_usage) : Une CLI pour lire l'utilisation du forfait Claude.ai, et une skill qui permet à Claude Code d'attendre la fin de la limite de 5 heures puis de reprendre tout seul.
- [MacroMaker](https://github.com/thiswillbeyourgithub/MacroMaker) : *[Inachevé]* Un enregistreur de séquences de souris, stockées dans des fichiers YAML lisibles et rejouées en utilisant l'OCR pour trouver où cliquer.
- [save_to_zotero](https://github.com/thiswillbeyourgithub/save_to_zotero) : Un moyen de transformer des pages web en PDF propres avec des métadonnées correctes dans Zotero, pour les lire et les annoter sur tous mes appareils après la fermeture d'[Omnivore](https://github.com/omnivore-app/omnivore).
- [mini_LiTOY](https://github.com/thiswillbeyourgithub/mini_LiTOY) : Une bibliothèque minimale pour classer une liste de tâches par comparaisons ELO deux à deux ("laquelle compte le plus ?"), sur laquelle d'autres outils peuvent s'appuyer.
    - [LiTOY](https://github.com/thiswillbeyourgithub/LiTOY-aka-List-that-Outlives-You) : *[Archivé]* Un moyen de classer tous ses objectifs, à court et long terme, par comparaisons deux à deux sur l'importance et le temps nécessaire, chacune convertie en score ELO.
- [BrownieCutter](https://github.com/thiswillbeyourgithub/BrownieCutter) : *[Archivé]* Un script dans l'esprit de [CookieCutter](https://cookiecutter.readthedocs.io/) qui crée un modèle prêt à l'emploi pour chaque nouvel outil libre (il s'est généré lui-même).
- [zsh-ai](https://github.com/thiswillbeyourgithub/zsh-ai) : Un moyen de décrire une tâche en langage courant, d'appuyer sur une touche et de choisir une commande suggérée avec fzf (basé sur [muePatrick/zsh-ai-commands](https://github.com/muePatrick/zsh-ai-commands)).
- [HAL](https://github.com/thiswillbeyourgithub/HAL) : Un e-mail quotidien unique résumant les courriels des dernières 24 heures et étiquetant au passage les messages non lus, fait à la demande d'une amie pour sa responsable, cadre dirigeante dans une entreprise connue.
- [github_discussion_parser](https://github.com/thiswillbeyourgithub/github_discussion_parser) : Un export de chaque discussion GitHub, avec tous ses commentaires et réponses, sous forme de fichier Markdown structuré lisible par un LLM.
- [systemd_unit_maker](https://github.com/thiswillbeyourgithub/systemd_unit_maker) : Un moyen de transformer une commande en service et timer systemd en une ligne, avec la possibilité de relire les unités avant de les installer.
- [SAIC (SimpleAICommits)](https://github.com/thiswillbeyourgithub/SimpleAICcommits) : Un outil qui suggère des messages de commit à partir du diff indexé, en suivant le style de mes propres commits passés, à choisir avec fzf.
- [Quick_Whisper_Typer](https://github.com/thiswillbeyourgithub/Quick-Whisper-Typer) : Un moyen d'appuyer sur une touche, de parler, et d'obtenir la transcription tapée là où se trouve le curseur, comme alternative minimale à [AquaVoice](https://withaqua.com/).
- [simple_voice_chat](https://github.com/thiswillbeyourgithub/simple_voice_chat) : Une interface de conversation vocale qui combine librement des fournisseurs de reconnaissance vocale, de LLM et de synthèse vocale, construite sur [fastrtc](https://github.com/gradio-app/fastrtc).
- [AiderBuilder](https://github.com/thiswillbeyourgithub/AiderBuilder) : *[Archivé]* Un script zsh minimal qui transforme [aider](https://aider.chat/) en agent récursif, utilisé pour construire plusieurs des petits outils de cette page.

## Outils "Rot"
*Outils exploitant des codes déterministes basés sur le temps*
*3 projets jusqu'à présent*

- [wormrot.sh](https://github.com/thiswillbeyourgithub/wormrot.sh) : Un script pour que les deux ordinateurs dérivent les codes [magic-wormhole](https://magic-wormhole.readthedocs.io/) de l'heure et d'un secret partagé, sans avoir à en transmettre aucun.
- [fowlrot.sh](https://github.com/thiswillbeyourgithub/fowlrot.sh) : La même rotation de codes basée sur le temps que [wormrot.sh](https://github.com/thiswillbeyourgithub/wormrot.sh), appliquée aux connexions [fowl](https://github.com/meejah/fowl/).
- [knockd_rotator](https://github.com/thiswillbeyourgithub/knockd_rotator) : Un script pour que le client et le serveur dérivent tous deux les séquences [knockd](https://github.com/jvinet/knock) de l'heure et d'un secret partagé, afin d'empêcher les attaques par rejeu.

## Ntfy
*[ntfy.sh](https://ntfy.sh) facilite l'envoi et la réception de notifications, je l'utilise beaucoup pour la surveillance*
*8 projets jusqu'à présent*

- [ntfy_nmap_watcher](https://github.com/thiswillbeyourgithub/ntfy_nmap_watcher) : Un script qui scanne mes serveurs depuis l'extérieur pour repérer des règles [ufw-docker](https://github.com/chaifeng/ufw-docker) obsolètes ayant exposé des services par erreur.
- [Daily_Fact_Ntfy](https://github.com/thiswillbeyourgithub/Daily_Fact_Ntfy) : Un script qui envoie à une heure aléatoire de la journée un fait intéressant sur un sujet choisi, rédigé par un LLM.
- [Ntfy_CSV_Reminders](https://github.com/thiswillbeyourgithub/Ntfy_CSV_Reminders) : Un script qui envoie des rappels pour des tâches récurrentes, chacun avec une probabilité de 1/n par jour, pour éviter la lassitude face aux notifications.
- [ntfy_systemd](https://github.com/thiswillbeyourgithub/ntfy_systemd) : Un script qui envoie une notification sur le téléphone avec l'état de l'unité dès qu'un service systemd échoue ou passe en mode dégradé.
- [ntfy_syncthing_conflict_checker](https://github.com/thiswillbeyourgithub/ntfy_syncthing_conflict_checker) : Un script qui cherche les fichiers de conflit dans tous les dossiers Syncthing et envoie une notification quand il en apparaît.
- [ntfy_fail2ban](https://github.com/thiswillbeyourgithub/ntfy_fail2ban) : Un script qui envoie sur mon téléphone un résumé périodique des IP détectées, bannies ou bloquées par Fail2Ban et UFW.
- [weather_notifier](https://github.com/thiswillbeyourgithub/weather_notifier) : Un script qui prévient sur le téléphone en cas de pluie annoncée ou de jours à venir plus chauds ou plus froids que la normale.
- [allocine_checker](https://github.com/thiswillbeyourgithub/Allocine_Checker) : Un script qui prévient quand des films anciens comme *Stalker* ou *Solaris* passent dans un cinéma proche.

## Outils Divers
*46 projets jusqu'à présent*
- [ICD-11_to_Langchain_Documents](https://github.com/thiswillbeyourgithub/ICD-11_to_langchain) : Un moyen de chercher des codes CIM-11 par leur sens plutôt que par mots-clés exacts.
- [gpu_nvidia_vram_healthspan](https://github.com/thiswillbeyourgithub/gpu_nvidia_vram_healthspan) : Un moyen d'éviter la surchauffe de la mémoire du GPU, la courbe de ventilation d'origine ne réagissant qu'à la température du cœur.
- [xlsx_move_comments_to_inside_cells](https://github.com/thiswillbeyourgithub/xlsx_move_comments_to_inside_cells) : Un script qui déplace les commentaires des fichiers `.xlsx` dans les cellules, car ils étaient invisibles dans la visionneuse mobile de Nextcloud.
- [envlocker](https://github.com/thiswillbeyourgithub/envlocker) : Une façon d'éviter de laisser les clés d'API en clair dans `.zshrc`, sans recourir à un gestionnaire de secrets.
- [ufw-docker-recap](https://github.com/thiswillbeyourgithub/ufw-docker-recap) : Une double vérification des ports de conteneurs réellement exposés par le pare-feu.
- [ntrig-calib](https://github.com/thiswillbeyourgithub/ntrig-calib) : Une correction d'une zone morte de l'écran tactile d'une Surface Pro 3 sous Linux (rétro-ingénierie faite avec Claude à partir de l'outil de calibration Windows).
- [Sanoid Docker Snapshots Cleanup](https://github.com/thiswillbeyourgithub/sanoid_docker_snapshots_cleanup) : Un moyen de récupérer l'espace de sauvegarde occupé par les snapshots ZFS de conteneurs Docker qui n'existent plus.
- [Umami Apprise Notifier](https://github.com/thiswillbeyourgithub/umami_apprise_notifier) : Une notification quand quelqu'un visite mon site, sans consulter le tableau de bord d'analytics.
- [Website Link Checker](https://github.com/thiswillbeyourgithub/website_link_checker) : Un moyen de trouver les liens cassés de ce site avant les visiteurs.
- [srt_ai_translator](https://github.com/thiswillbeyourgithub/srt_ai_translator) : Un outil pour traduire des sous-titres dans des langues vers lesquelles personne ne les avait traduits.
- [GPU Docker Monitor](https://github.com/thiswillbeyourgithub/nvidia-smi-docker-matcher) : Un moyen de savoir quel conteneur occupe la VRAM avant de redémarrer quoi que ce soit.
- [gradioSearcher](https://github.com/thiswillbeyourgithub/GradioSearcher) : *[Inachevé]* Une interface simple pour explorer les bases de données vectorielles construites par [wdoc](#wdoc).
- [systemd_last_run](https://github.com/thiswillbeyourgithub/systemd_last_run) : Un moyen de repérer les timers systemd qui ont silencieusement cessé de s'exécuter.
- [vps-backup](https://github.com/thiswillbeyourgithub/vps_backup) : Un script de sauvegardes compressées et horodatées de mon VPS qui ne conserve que les dernières copies.
- [iroh_send](https://github.com/thiswillbeyourgithub/iroh-send) : Un moyen d'envoyer fichiers et dossiers directement d'une machine à une autre, sans serveur intermédiaire.
- [adb_newpipe_exporter](https://github.com/thiswillbeyourgithub/adb_newpipe_exporter) : Une sauvegarde de la base de données de NewPipe depuis un ordinateur, en pilotant les menus d'export de l'application via ADB.
- [autopassad](https://github.com/thiswillbeyourgithub/autopassad) : Un script qui repère "continuer" ou "passer" à l'écran par OCR et clique dessus.
- [Umami Data Fetcher](https://github.com/thiswillbeyourgithub/umami_data_fetcher) : Un moyen de sauvegarder les statistiques respectueuses de la vie privée d'olicorne.org avant qu'umami.is ne les supprime au bout de 6 mois.
- [Home Assistant CalDAV client](https://github.com/thiswillbeyourgithub/Home-Assistant-CalDAV-client) : Un moyen de dire "je dois faire la vaisselle" à Home Assistant et de le voir apparaître dans mes tâches Nextcloud.
- [LiteLLM Proxy OpenRouter Price Updater](https://github.com/thiswillbeyourgithub/litellm_proxy_openrouter_price_updater) : *[Archivé]* Un script pour tenir à jour les prix OpenRouter de LiteLLM, qui étaient en retard sur les prix réels.
- [OpenRouter to Langfuse Model Pricing Sync](https://github.com/thiswillbeyourgithub/openrouter_cost_into_langfuse/) : *[Archivé]* Une copie des prix d'OpenRouter dans Langfuse, pour suivre le coût réel des appels aux LLM.
- [git_scripts_keeper](https://github.com/thiswillbeyourgithub/git_scripts_keeper) : Un historique des modifications de dossiers qu'aucun outil de configuration ne suit, commité périodiquement.
- [OCR_with_format](https://github.com/thiswillbeyourgithub/OCR_with_format) : Un moyen pour pytesseract de conserver la mise en page et les espacements du texte au lieu de les aplatir.
- [HumanReadableSeed](https://github.com/thiswillbeyourgithub/HumanReadableSeed) : Un moyen de partager un jeton base64 [edgevpn](https://github.com/mudler/edgevpn/) à l'oral ou à l'écrit, en le transformant en une suite de mots vérifiable.
- [PersistDict](https://github.com/thiswillbeyourgithub/PersistDict) : Un cache de type dictionnaire qui survit aux redémarrages, fait pour [wdoc](#wdoc) plutôt que de dépendre de celui de LangChain.
- [whisper_audio_splitter](https://github.com/thiswillbeyourgithub/whisper_audio_splitter) : Un moyen d'enregistrer des cartes Anki à voix haute en une seule session, en disant "stop" entre chacune, et d'obtenir un fichier audio par carte.
- [corpus_matcher](https://github.com/thiswillbeyourgithub/corpus_matcher) : Une bibliothèque pour retrouver d'où vient un extrait de texte légèrement modifié dans un grand corpus.
- [speech.sh](https://github.com/thiswillbeyourgithub/speech.sh) : Un moyen de taper du texte et de l'entendre lu à voix haute, fait en 30 minutes quand j'ai soudainement perdu la voix.
- [OpenrouterModelFilter](https://github.com/thiswillbeyourgithub/OpenrouterModelFilter) : Un script pour filtrer la liste des modèles OpenRouter.
- [iptables_rate_limit_modifier](https://github.com/thiswillbeyourgithub/iptables_rate_limit_modifier) : Un script pour rendre la limitation de débit d'UFW moins agressive.
- [Load_Average_Balancer.sh](https://github.com/thiswillbeyourgithub/load_average_balancer) : Un moyen de différer les tâches lourdes tant que le CPU est occupé.
- [PDF_batch_decryptor](https://github.com/thiswillbeyourgithub/PDF_batch_decryptor) : Un moyen de déchiffrer de nombreux PDF en masse.
- [Spotify_tts](https://github.com/thiswillbeyourgithub/Spotify_tts) : Un moyen d'apprendre les titres des chansons en cours de lecture, sans regarder l'écran.
- [ufw_auto_ssh_whitelist](https://github.com/thiswillbeyourgithub/ufw_auto_ssh_whitelist) : Un moyen d'autoriser l'IP SSH actuelle dans le pare-feu sur demande, et de nettoyer ces règles au bout de 30 jours.
- [ufw_block_analyzer](https://github.com/thiswillbeyourgithub/ufw_block_analyzer) : Une correspondance entre les connexions bloquées dans les journaux UFW et le projet Docker Compose dont elles proviennent.
- [btrfs_cow_disabler](https://github.com/thiswillbeyourgithub/BTRFS_CoW_Disabler) : *[Archivé]* Un moyen de désactiver le Copy-on-Write sur des fichiers Btrfs existants en les copiant vers de nouveaux fichiers avec vérification des sommes de contrôle.
- [docker_volume_backup](https://github.com/thiswillbeyourgithub/docker_volume_backup) : Une sauvegarde sûre des volumes d'un conteneur, en l'arrêtant pendant la copie puis en le redémarrant.
- [ShellArgParser](https://github.com/thiswillbeyourgithub/ShellArgParser) : Une ligne de code qui transforme des arguments de style Python en variables shell, car analyser des arguments en shell est pénible.
- [IndexableNewsboat](https://github.com/thiswillbeyourgithub/IndexableNewsboat) : Un moyen de rendre les entrées RSS de [newsboat](https://newsboat.org/) consultables avec un moteur de recherche de bureau comme [Recoll](https://www.lesbonscomptes.com/recoll/).
- [MediaDurationRecursiveChecker](https://github.com/thiswillbeyourgithub/MediaDurationRecursiveChecker) : Un moyen de connaître la durée totale des rushs d'un disque dur, fait pour ma compagne qui travaille dans la production vidéo.
- [MediaMetadataExtractor](https://github.com/thiswillbeyourgithub/MediaMetadataExtractor) : Un script pour extraire les métadonnées techniques de gros lots de fichiers vidéo, sans les ouvrir un par un (également pour ma compagne).
- [MediaSizeOrHashMatcher](https://github.com/thiswillbeyourgithub/MediaSizeOrHashMatcher) : Un moyen de trouver quels fichiers vidéo d'un dossier existent déjà dans un autre, même sous un autre nom.
- [llm_agent](https://github.com/thiswillbeyourgithub/llm_agent) : *[Archivé]* Un test pour voir si un agent LangChain simple pouvait être ajouté à l'outil en ligne de commande [llm](https://llm.datasette.io/) de Simon Willison.
- [fancontrol_autohealing_config](https://github.com/thiswillbeyourgithub/fancontrol_autohealing_config) : Une correction du contrôle des ventilateurs qui s'arrêtait après les redémarrages parce que Linux renumérote les périphériques hwmon.
- [prompt_GPT3](https://github.com/thiswillbeyourgithub/prompt_GPT3) : *[Archivé]* Un moyen rapide de créer des cartes Anki à trous et des traductions depuis le terminal avec GPT-3.
- [pdfannots](https://github.com/thiswillbeyourgithub/pdfannots) : Un fork qui adapte l'extraction des surlignages et commentaires de PDF à ma propre prise de notes.

## Autres
*8 projets jusqu'à présent*
- [FUTOmeter](https://github.com/thiswillbeyourgithub/FUTOmeter) : *[Idée]* L'ébauche d'un moyen respectueux de la vie privée pour que des applications libres mesurent leur usage localement et affichent des demandes de dons au bon moment, dans l'esprit de FUTO.

---

# Contributions au Code
Voici une courte liste de certains projets auxquels j'ai contribué. Il peut s'agir de code, de documentation, d'idées, etc. Cela peut aller de petites contributions à de grands projets à de nombreuses petites contributions.
*Avertissement : Dans certains cas, j'ai compté des contributions qui n'ont pas été fusionnées car elles ont aidé le projet d'une manière ou d'une autre.*

- [openai](https://github.com/openai/openai-python/pull/733/files) : Correction d'un bug de longue date lié à whisper lorsque certains types de fichiers audio étaient fournis.
- [joblib](https://github.com/joblib/joblib/pull/1613) : Correction et clarification de certains comportements liés à l'expiration du cache.
- [open-webui](https://github.com/open-webui/open-webui/pulls?q=author%3Athiswillbeyourgithub+) : Backend, frontend, rapports de bugs, doc, ...
- [karakeep](https://github.com/karakeep-app/karakeep/pulls?q=author%3Athiswillbeyourgithub+) : Backend, frontend, primes, rapports de bugs, doc, ...
- [i3](https://github.com/i3/i3/pull/6438) : Correction de bug qui spammait mes journaux et endommageait mes SSD.
- [mwmbl](https://github.com/mwmbl/mwmbl/pulls?q=author%3Athiswillbeyourgithub+) : Documentation et code principalement lié au backend (changement de toute la db vers [LMDB](https://en.wikipedia.org/wiki/Lightning_Memory-Mapped_Database), amélioration des performances en changeant diverses bibliothèques, idées sur la décentralisation, ...).
- [academicpages.github.io](https://github.com/academicpages/academicpages.github.io/issues?q=thiswillbeyourgithub) : Ce site est un fork de academicpages. J'ai fait plusieurs contributions au cours du temps.
- ...

Vous pouvez consulter [tous les issues Github que j'ai créés](https://github.com/search?q=author%3Athiswillbeyourgithub+&type=issues&query=author%3Athiswillbeyourgithub+is%3Aissue&s=created&o=desc).

Vous pouvez consulter [toutes les pull requests que j'ai créées](https://github.com/search?q=author%3Athiswillbeyourgithub+&type=pullrequests&query=author%3Athiswillbeyourgithub+is%3Aissue&s=created&o=desc).
