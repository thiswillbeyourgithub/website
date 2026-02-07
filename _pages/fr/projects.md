---
ref: projects
permalink: /fr/projects
title: "Projets"
author_profile: true
lang: fr
---

{% include french_translation_disclaimer.md %}

Sur cette page, vous pouvez lire la liste exhaustive des projets de programmation que j'ai créés au fil des années. Elle est assez longue, utilisez donc la table des matières ci-dessous pour naviguer.

Mes dépôts de code sont hébergés sur [github](https://github.com/thiswillbeyourgithub/):

[![(Cliquez ici si ca ne charge pas)](https://gstats.olicorne.org)](https://uncached.gstats.olicorne.org)

*Nombre de projets individuels sur cette page : 105*


*Je n'aurais jamais pu écrire du code sans le mouvement open source, les innombrables tutoriels partagés librement en ligne et la culture de publication du code source et des scripts. Je suis profondément reconnaissant envers tous ceux qui ont contribué à rendre les connaissances en programmation accessibles. Ces projets sont ma tentative de rendre la pareille et d'aider les autres dans leur parcours, tout comme tant de personnes m'ont aidé.*
{: .notice--info}

<details><summary><i>Une note sur le terme "Projet"</i></summary>
<ul>
    <li><i>Je compte comme "projet" uniquement ce que j'ai créé moi-même. Cela n'inclut donc pas mes contributions à d'autres projets. Consultez <a href="#contributions-au-code">le bas de la page</a> si vous souhaitez lire quelques-unes de mes contributions.</i></li>
</ul>
</details>

<details><summary><i>Une note sur la paternité</i></summary>
<ul>
    <li><i>Bien que j'utilise l'IA depuis de nombreuses années, je ne l'ai pas utilisée pour coder avant environ 2024. Depuis, lorsque je veux une assistance basée sur l'IA, j'utilise presque exclusivement <a href="https://aider.chat/">aider</a> avec l'argument <b>--attribute-author</b> afin que vous puissiez voir quels projets et commits ont été réalisés avec ou sans.</i></li>
    <li><i>Depuis décembre 2025, aider semble ne plus être maintenu depuis des mois, mais je ne suis pas sûr quel remplacement utiliser à l'avenir.</i></li>
</ul>
</details>

<details><summary><i>Une note sur les licences</i></summary>
<ul>
    <li><i>La plupart, sinon tous mes projets sont publiés sous la <a href="https://www.gnu.org/licenses/agpl-3.0.en.html">licence AGPLv3</a>. Auparavant, j'utilisais presque exclusivement la <a href="https://www.gnu.org/licenses/gpl-3.0.en.html">licence GPLv3</a>.</i></li>
</ul>
</details>

<br>

{% include toc_wide %}

## Médecine & Informatique
*17 projets jusqu'à présent*
- [Open-WebUI Knowledge Zotero Sync](https://github.com/thiswillbeyourgithub/openwebui-knowledge-zotero-sync): synchronise zotero ou un répertoire vers une base de connaissances dans [OpenWebUI](https://docs.openwebui.com/). Pour être plus efficace lors de la mise à jour sur la recherche récente en psychiatrie.
- [Parakeet Web](https://github.com/thiswillbeyourgithub/parakeet_web): **EN COURS** transcription vocale directement dans le navigateur (aucune donnée envoyée à un serveur). Travail sur un modèle affiné pour le français médical.
- [ICD-11_to_Langchain_Documents](https://github.com/thiswillbeyourgithub/ICD-11_to_langchain): Convertit les données ICD-11 en objets Document langchain pour des applications de recherche et récupération améliorées. Pour créer un moteur de recherche basé sur [gradioSearcher](https://github.com/thiswillbeyourgithub/GradioSearcher) pour les codes de classification ICD-11.
- [PrevMed](https://github.com/PrevMedOrg/PrevMed) (abréviation de *Preventive Medicine*): Une plateforme minimaliste permettant aux utilisateurs non techniques de créer des questionnaires cliniques sans stocker de données personnelles. *Note : J'ai été payé pour concevoir puis construire cette solution.*
- [QuestEA](https://github.com/thiswillbeyourgithub/QuestEA): Projet de recherche fusionnant les réponses numériques aux enquêtes avec les embeddings sémantiques des questions pour améliorer l'analyse des données des patients et découvrir des modèles cachés dans les questionnaires médicaux.
- [wdoc](https://github.com/thiswillbeyourgithub/wdoc): Système d'interrogation et de résumé de documents multi-modaux intégrant divers types de contenu avec des capacités [RAG](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) avancées et un traitement sémantique alimenté par LLM pour une extraction d'informations complète.
    - [OmniQA](https://github.com/thiswillbeyourgithub/OmniQA): Outil d'indexation de documents pour interroger de manière transparente tout format de fichier à l'aide de grands modèles de langage et de la technologie de recherche vectorielle. A été remplacé par **wdoc**.
- [repeng-research-fork](https://github.com/thiswillbeyourgithub/repeng-research-fork): fork de [repeng](https://github.com/vgel/repeng/) par [@vgel](https://github.com/vgel), pour tenter d'investiguer des théories personnelles sur les LLM. Ceci est pertinent pour l'interprétabilité des LLM.
- `NOM ANONYMISÉ`: Un dépôt privé (mais espérons-le plus tard open source) bibliothèque pour utiliser de manière exhaustive *toutes* les techniques de clustering de [scikit-learn](https://scikit-learn.org/) sur n'importe quelles données puis exécuter *toutes* les métriques avec des pipelines de tracé complexes pour choisir les meilleurs résultats. C'est moins facile qu'il n'y paraît car les clustering ont des types de sorties variables, tous ne permettent pas l'inférence, certaines métriques sont intrinsèques tandis que d'autres sont basées sur des étiquettes, les clusters peuvent être flous, doivent être fusionnés ou divisés, doivent être remappés, etc. Sujet de mon stage de M1 à [NeuroSpin](https://fr.wikipedia.org/wiki/NeuroSpin).
- [sleep_tracker_pinetime](https://github.com/thiswillbeyourgithub/SleepTk_pinetime_sleep_tracker): Application de montre connectée pour des schémas de vibration de réveil optimaux pour se réveiller en forme. J'utilise ceci chaque nuit depuis des années (depuis environ 2021, en 2026).
- [Stahl Ankifier](https://github.com/thiswillbeyourgithub/StahlAnkifier): Convertit le PDF du livre `Prescriber's Guide - Stahl's Essential Psychopharmacology` en [cartes mémoire Anki](https://apps.ankiweb.net/) pour former de meilleurs psychiatres.
- [gradio_pharmacokinetic_simulator](https://github.com/thiswillbeyourgithub/gradio_pharmacokinetic_simulator): Outil de simulation pharmacocinétique pour m'aider à améliorer mon intuition sur l'accumulation des médicaments.
    - [med-pharmacokinetic-simulator](https://github.com/thiswillbeyourgithub/Med-pharmacokinetic-simulator): Son prédécesseur de nombreuses années auparavant. L'un de mes tout premiers projets de programmation !
- [ADHD_european_drug_map](https://github.com/thiswillbeyourgithub/ADHD-european-drug-map): Outil de visualisation de données pour suivre et cartographier la disponibilité des médicaments TDAH dans les pays européens en utilisant les sources de données officielles de l'EMA.
- KnQuant (pas encore publié): Bibliothèque avancée de traitement de texte qui convertit le texte non structuré en triplets de connaissances recherchables en utilisant des embeddings multi-modaux et une architecture de traitement parallèle.
- [Beta-Variational-Autoencoder](https://github.com/thiswillbeyourgithub/Beta-Variational-Autoencoder): Modèle d'apprentissage profond implémentant une architecture beta-variational autoencoder pour la réduction de dimensionnalité et la compression de données utilisant l'API scikit-learn.
- [GridSearchReductor](https://github.com/thiswillbeyourgithub/GridSearchReductor): Outil d'optimisation statistique exploitant l'échantillonnage stratifié pour réduire l'espace de recherche de paramètres tout en maintenant une couverture efficace des paramètres dans les expériences. Codé à l'instinct.

## Anki
*[Anki](https://github.com/ankitects/anki/) est un système open source de cartes mémoire/répétition espacée*
*14 projets jusqu'à présent*

- [Stahl Ankifier](https://github.com/thiswillbeyourgithub/StahlAnkifier): *Voir ci-dessus*
- [Voice2Anki](https://github.com/thiswillbeyourgithub/Voice2Anki): Outil d'apprentissage linguistique universel combinant reconnaissance vocale et IA pour générer et gérer automatiquement des cartes mémoire personnalisées à partir d'enregistrements vocaux avec formatage adaptatif et fonctionnalités de mémoire intelligente.
- [AnkiAiUtils](https://github.com/thiswillbeyourgithub/AnkiAIUtils)): Boîte à outils avancée qui améliore les cartes mémoire Anki grâce à la génération automatisée alimentée par l'IA d'explications, de mnémoniques, d'illustrations et de reformulations, avec prise en charge des systèmes de mémoire personnalisés et de l'appariement de similarité sémantique.
- [AnnA_anki_neuronal_Appendix](https://github.com/thiswillbeyourgithub/AnnA_Anki_neuronal_Appendix): Système d'apprentissage automatique qui optimise l'ordre de révision des cartes mémoire Anki en analysant les similarités sémantiques pour éviter de réviser ensemble des cartes liées, améliorant la rétention tout en réduisant la charge de travail quotidienne.
- [py_ankiconnect](https://github.com/thiswillbeyourgithub/py_ankiconnect): Bibliothèque qui simplifie l'interaction avec le logiciel de cartes mémoire Anki via son API AnkiConnect, offrant des interfaces en ligne de commande et Python.
- [AnkiAutoMindmap](https://github.com/thiswillbeyourgithub/AnkiAutoMindmap): Outil pour la génération automatique de cartes mentales et de diagrammes mermaid basés sur le contenu des cartes mémoire Anki et les hiérarchies de tags.
- [i3_seach_anki_collection](https://github.com/thiswillbeyourgithub/i3_search_anki_collection): Outil d'intégration permettant des recherches rapides de cartes mémoire Anki directement depuis l'interface du gestionnaire de fenêtres i3.
- [HapaxPredator](https://github.com/thiswillbeyourgithub/HapaxPredator): Outil d'analyse de texte pour identifier et afficher les fréquences de mots dans les cartes mémoire Anki afin de détecter les fautes d'orthographe potentielles et faciliter les tâches de traitement du langage naturel.
- [IndexableAnki](https://github.com/thiswillbeyourgithub/IndexableAnki): Outil qui convertit les cartes mémoire Anki en fichiers texte recherchables pour l'intégration avec les moteurs de recherche de bureau.
- [anki_PrioriTag](https://github.com/thiswillbeyourgithub/anki_Prioritag): Outil pour prioriser automatiquement les révisions de cartes mémoire Anki en analysant les modèles d'échec basés sur les tags et en générant des decks filtrés ciblés pour une efficacité d'apprentissage optimale.
- [anki_autobury_added_today](https://github.com/thiswillbeyourgithub/anki_autobury_added_today): Utilitaire d'automatisation qui identifie et enterre les cartes Anki nouvellement ajoutées pour les empêcher d'apparaître dans la même session d'étude.
- [Anki Semantic Search](https://github.com/thiswillbeyourgithub/Anki-Semantic-Search): Moteur de recherche sémantique utilisant les vecteurs de mots multilingues de fastText pour rechercher intelligemment dans les collections de cartes mémoire Anki en fonction du sens plutôt que des correspondances exactes.
- [pdf2anki](https://github.com/thiswillbeyourgithub/pdf2anki): Outil pour la conversion par lots de documents PDF en cartes mémoire Anki avec texte recherchable et images de pages, permettant la recherche multi-mots-clés dans le contenu PDF au sein de l'interface d'Anki.
- [clozolkor](https://github.com/thiswillbeyourgithub/Clozolkor): Modèle de carte mémoire de répétition espacée avancé permettant la révélation séquentielle de suppressions de texte avec indices personnalisables, raccourcis et compatibilité multiplateforme.

## Karakeep
*[Karakeep](https://github.com/karakeep-app/karakeep) est une application open source de lecture différée*
*3 projets jusqu'à présent*

- [karakeep_python_api](https://github.com/thiswillbeyourgithub/karakeep_python_api): Interface Python et outil en ligne de commande fournissant un accès complet à l'API de bookmarking de Karakeep avec tests automatisés, validation de données et scripts contribués par la communauté.
- [Karanki](https://github.com/thiswillbeyourgithub/Karanki): Outil de synchronisation bidirectionnelle pour automatiser la création de cartes mémoire à partir de surlignages avec niveaux de rétention codés par couleur et capacités de suivi d'état intelligent.
- [freshrss_to_karakeep](https://github.com/thiswillbeyourgithub/freshrss_to_karakeep): Outil d'intégration connectant le lecteur RSS FreshRSS avec le service de bookmarking Karakeep pour la curation automatique de contenu et le transfert transparent d'articles entre plateformes.

## Logseq
*[Logseq](https://github.com/logseq/logseq) est une application open source de PKM (Personal Knowledge Management)*
*4 projets jusqu'à présent*

- [LogseqMarkdownParser](https://github.com/thiswillbeyourgithub/LogseqMarkdownParser): Analyseur et bibliothèque utilitaire prenant en charge la lecture, la manipulation et l'exportation transparentes de fichiers markdown Logseq avec propriétés et blocs.
- [wallabag_to_logseq_and_omnivore](https://github.com/thiswillbeyourgithub/wallabag_to_logseq_and_omnivore): Script Python pour la migration transparente d'articles et de surlignages de Wallabag vers les plateformes de lecture Logseq et Omnivore, assurant la continuité de l'historique de lecture et des annotations.
- [LogseqPDFImporter](https://github.com/thiswillbeyourgithub/LogseqPDFImporter): Outil pour importer et convertir les annotations PDF de divers lecteurs PDF dans le format natif de Logseq, préservant les surlignages, les couleurs et les annotations de zone.
- [MdXLogseqTODOSync](https://github.com/thiswillbeyourgithub/MdXLogseqTODOSync): Outil de synchronisation pour maintenir les éléments TODO sur différents formats de fichiers markdown avec prise en charge du filtrage par motif, des délimiteurs personnalisés et de la préservation des puces imbriquées.

## Open-WebUI
*[Open-WebUI](https://github.com/open-webui/open-webui/issues) est une plateforme IA auto-hébergée*
*1 projet jusqu'à présent*

- [openwebui_custom_pipes_filters](https://github.com/thiswillbeyourgithub/openwebui_custom_pipes_filters): Suite complète de filtres personnalisés, outils et pipes conçus pour améliorer les fonctionnalités d'OpenWebUI avec suivi des messages, surveillance des coûts et capacités de chat étendues.

## Smartwatch
*Principalement pour [wasp-os](https://github.com/wasp-os/wasp-os) sur la [pinetime](https://pine64.org/devices/pinetime/)*
*2 projets jusqu'à présent*

- [sleep_tracker_pinetime](https://github.com/thiswillbeyourgithub/SleepTk_pinetime_sleep_tracker): *Voir ci-dessus*
- [pomodoro_wasp_os](https://github.com/thiswillbeyourgithub/Pomodoro-wasp-os): Application de minuteur Pomodoro personnalisable pour les montres intelligentes PineTime avec plusieurs préréglages, modèles de vibration et paramètres persistants.

## API
*J'ai créé mes propres bibliothèques de "référence" pour rendre mes autres projets plus interopérables*
*4 projets jusqu'à présent*

- [freshrss_python_api](https://github.com/thiswillbeyourgithub/freshrss_python_api): Wrapper Python et client API pour l'API Fever de FreshRSS, permettant la gestion programmatique des flux RSS, des éléments et des catégories avec gestion robuste des erreurs et sécurité de type.
- [caldav_tasks_api](https://github.com/thiswillbeyourgithub/Caldav-Tasks-API): Bibliothèque Python et outil CLI pour la gestion avancée des tâches CalDAV avec des fonctionnalités telles que la synchronisation des tâches, la priorisation basée sur ELO et des capacités complètes de manipulation des tâches.
- [karakeep_python_api](https://github.com/thiswillbeyourgithub/karakeep_python_api): *Voir ci-dessus*
- [py_ankiconnect](https://github.com/thiswillbeyourgithub/py_ankiconnect): *Voir ci-dessus*

## Productivité
*Outils que j'utilise, ai utilisés ou créés*
*14 projets jusqu'à présent*

- [MacroMaker](https://github.com/thiswillbeyourgithub/MacroMaker): Enregistrer, stocker et rejouer des séquences d'automatisation de la souris avec OCR intégré.
- [save_to_zotero](https://github.com/thiswillbeyourgithub/save_to_zotero): Outil en ligne de commande avancé pour l'archivage automatisé de pages Web en PDF avec extraction de métadonnées et intégration transparente dans le système de gestion de références Zotero sur plusieurs appareils.
- [mini_LiTOY](https://github.com/thiswillbeyourgithub/mini_LiTOY): Implémentation minimaliste de l'algorithme de priorisation de tâches basé sur ELO, permettant le classement automatisé des listes de tâches par comparaisons interactives et calculs de scores.
    - [LiTOY](https://github.com/thiswillbeyourgithub/LiTOY-aka-List-that-Outlives-You): Outil de priorisation intelligent utilisant des comparaisons par paires et des classements ELO pour hiérarchiser les objectifs personnels en fonction de l'importance et de l'investissement en temps.
- [BrownieCutter](https://github.com/thiswillbeyourgithub/BrownieCutter): Générateur de modèles pour les projets Python qui automatise la création de code passe-partout et la configuration de la structure du projet avec des configurations personnalisables.
    - Archivé car ma configuration principale maintenant implique [aider](https://aider.chat) à la place.
- [zsh-ai](https://github.com/thiswillbeyourgithub/zsh-ai): Compagnon de terminal qui exploite les modèles de langage IA pour suggérer et expliquer les commandes shell basées sur des requêtes en langage naturel avec intégration de fuzzy-finder.
- [HAL](https://github.com/thiswillbeyourgithub/HAL): Outil de résumé et d'étiquetage d'e-mails qui traite les messages entrants quotidiens, exploitant les LLM pour générer des résumés concis et attribuer des étiquettes de catégorisation tout en maintenant des mesures de sécurité robustes et des contrôles de coûts.
- [github_discussion_parser](https://github.com/thiswillbeyourgithub/github_discussion_parser): Outil d'analyse qui extrait et formate les discussions de dépôts GitHub en fichiers Markdown de type XML optimisés pour le traitement par de grands modèles de langage.
- [systemd_unit_maker](https://github.com/thiswillbeyourgithub/systemd_unit_maker): Outil d'automatisation en ligne de commande pour générer et gérer des unités de service et de minuteur systemd avec des modèles personnalisables et des options de configuration interactives.
- [SAIC (SimpleAICommits)](https://github.com/thiswillbeyourgithub/SimpleAICcommits): Outil en ligne de commande exploitant les modèles OpenAI pour générer automatiquement des messages de commit sémantiques basés sur les diffs git et l'historique des commits.
- [Quick_Whisper_Typer](https://github.com/thiswillbeyourgithub/Quick-Whisper-Typer): Outil de reconnaissance vocale pour la saisie de texte mains libres, le traitement de commandes vocales et la conversation IA, avec transcription à faible latence et prise en charge multilingue.
- [simple_voice_chat](https://github.com/thiswillbeyourgithub/simple_voice_chat): Interface conversationnelle intégrant divers services de reconnaissance vocale, de modèle de langage et de synthèse vocale pour des interactions vocales en temps réel avec des assistants IA.
- [AiderBuilder](https://github.com/thiswillbeyourgithub/AiderBuilder): Script et prompt minimal pour donner à [aider.chat](https://aider.chat/) une certaine autonomie en s'exécutant en boucle et en se coordonnant avec lui-même via un fichier texte.

## Outils "Rot"
*Outils exploitant des codes déterministes basés sur le temps*
*3 projets jusqu'à présent*

- [wormrot.sh](https://github.com/thiswillbeyourgithub/wormrot.sh): Système d'automatisation de transfert de fichiers sécurisé utilisant des codes synchronisés dans le temps et un secret partagé pour une transmission transparente entre appareils de confiance.
- [fowlrot.sh](https://github.com/thiswillbeyourgithub/fowlrot.sh): Système de génération de codes basés sur le temps pour des connexions peer-to-peer sécurisées utilisant des codes synchronisés et déterministes dérivés de secrets pré-partagés.
- [knockd_rotator](https://github.com/thiswillbeyourgithub/knockd_rotator): Amélioration de la sécurité du port knocking via la rotation et la synchronisation de séquences basées sur le temps entre client et serveur, exploitant des secrets partagés et une génération déterministe pour prévenir les attaques par rejeu.

## Ntfy
*[ntfy.sh](https://ntfy.sh) facilite l'envoi et la réception de notifications, je l'utilise beaucoup pour la surveillance*
*8 projets jusqu'à présent*

- [ntfy_nmap_watcher](https://github.com/thiswillbeyourgithub/ntfy_nmap_watcher): Surveiller les ports de serveur externes avec des scans nmap automatisés et des notifications instantanées pour les changements de configuration UFW.
- [Daily_Fact_Ntfy](https://github.com/thiswillbeyourgithub/Daily_Fact_Ntfy): Système de notification qui génère et délivre des faits intéressants alimentés par l'IA sur des sujets spécifiés par l'utilisateur via ntfy.sh à intervalles aléatoires.
- [Ntfy_CSV_Reminders](https://github.com/thiswillbeyourgithub/Ntfy_CSV_Reminders): Système de notification basé sur les probabilités pour gérer les tâches récurrentes avec un timing aléatoire pour prévenir la fatigue des notifications.
- [ntfy_systemd](https://github.com/thiswillbeyourgithub/ntfy_systemd): Système de surveillance qui suit les échecs de service systemd et envoie des notifications instantanées via ntfy avec des rapports de statut détaillés.
- [ntfy_syncthing_conflict_checker](https://github.com/thiswillbeyourgithub/ntfy_syncthing_conflict_checker): Outil de surveillance pour détecter et signaler les conflits de fichiers dans les dossiers partagés Syncthing avec prise en charge des notifications locales et distantes.
- [ntfy_fail2ban](https://github.com/thiswillbeyourgithub/ntfy_fail2ban): Outil de surveillance de sécurité qui intègre Fail2Ban avec ntfy.sh pour délivrer des notifications en temps réel sur les tentatives d'intrusion potentielles et les blocages d'IP.
- [weather_notifier](https://github.com/thiswillbeyourgithub/weather_notifier): Système de notification météo qui surveille les prévisions de précipitations et les variations de température tout en délivrant des alertes mobiles via l'intégration ntfy.sh.
- [allocine_checker](https://github.com/thiswillbeyourgithub/Allocine_Checker): Outil de surveillance de films qui vérifie automatiquement les listes de cinéma pour des films spécifiques et envoie des notifications lorsqu'ils deviennent disponibles.

## Outils Divers
*38 projets jusqu'à présent*
- [Umami Apprise Notifier](https://github.com/thiswillbeyourgithub/umami_apprise_notifier): Un script Python qui vous notifie des récents visiteurs de l'analytique Umami via les notifications Apprise.
- [Website Link Checker](https://github.com/thiswillbeyourgithub/website_link_checker): Outil CLI Python pour parcourir les sites Web afin d'identifier et signaler les liens cassés, avec des fonctionnalités comme la limitation de débit et le filtrage par regex.
- [srt_ai_translator](https://github.com/thiswillbeyourgithub/srt_ai_translator): Un traducteur de sous-titres exploitant les API compatibles OpenAI pour des traductions SRT contextuelles et efficaces.
- [GPU Docker Monitor](https://github.com/thiswillbeyourgithub/nvidia-smi-docker-matcher): Mapper efficacement les processus GPU aux conteneurs Docker pour une gestion des ressources plus facile.
- [gradioSearcher](https://github.com/thiswillbeyourgithub/GradioSearcher): Un outil GUI Gradio pour rechercher dans les bases de données vectorielles FAISS.
- [systemd_last_run](https://github.com/thiswillbeyourgithub/systemd_last_run): Outil en ligne de commande pour interroger et afficher les dernières heures d'exécution des unités systemd avec options de tri.
- [vps-backup](https://github.com/thiswillbeyourgithub/vps_backup): Script simple pour créer des sauvegardes tar compressées sur un VPS avec rotation automatique et horodatage.
- [iroh_send](https://github.com/thiswillbeyourgithub/iroh-send): un script utilisant [iroh](https://github.com/n0-computer/iroh) pour envoyer facilement des fichiers ou répertoires d'un appareil à un autre.
- [adb_newpipe_exporter](https://github.com/thiswillbeyourgithub/adb_newpipe_exporter): Un script adb pour exporter automatiquement votre db [NewPipe](https://github.com/TeamNewPipe/NewPipe).
- [autopassad](https://github.com/thiswillbeyourgithub/autopassad): Un script python (espérons-le) multiplateforme pour cliquer automatiquement sur 'passer' ou 'continuer' sur les publicités.
- [Umami Data Fetcher](https://github.com/thiswillbeyourgithub/umami_data_fetcher): Un outil CLI pour sauvegarder et enregistrer les données d'analyse [Umami](https://umami.is) dans plusieurs formats avec reprise automatique, journalisation et prise en charge de plusieurs sites Web. Cela a été créé pour stocker les analyses respectueuses de la vie privée pour olicorne.org, car umami.is supprime les données après 6 mois.
- [Home Assistant CalDAV client](https://github.com/thiswillbeyourgithub/Home-Assistant-CalDAV-client): Un client CalDAV pour automatiser la gestion des tâches avec Home Assistant, Nextcloud et commandes vocales.
- [LiteLLM Proxy OpenRouter Price Updater](https://github.com/thiswillbeyourgithub/litellm_proxy_openrouter_price_updater): Outil CLI pour mettre à jour les configurations de tarification du proxy [LiteLLM](https://github.com/BerriAI/litellm) en utilisant les données de l'API [OpenRouter](https://openrouter.ai/).
- [OpenRouter to Langfuse Model Pricing Sync](https://github.com/thiswillbeyourgithub/openrouter_cost_into_langfuse/): Un script Python qui synchronise automatiquement les données de tarification des modèles d'[OpenRouter](https://openrouter.ai/) vers la page de tarification de Langfuse.
- [git_scripts_keeper](https://github.com/thiswillbeyourgithub/git_scripts_keeper): Utilitaire de contrôle de version automatisé pour suivre et commiter les modifications dans plusieurs dépôts Git via une surveillance périodique et des messages de commit auto-générés.
- [OCR_with_format](https://github.com/thiswillbeyourgithub/OCR_with_format): Outil OCR utilisant pytesseract pour maintenir le formatage et l'espacement du texte d'origine tout en effectuant la reconnaissance optique de caractères sur les images.
- [HumanReadableSeed](https://github.com/thiswillbeyourgithub/HumanReadableSeed): Outil de conversion bidirectionnelle transformant les jetons cryptographiques en séquences de mots lisibles par l'homme tout en assurant l'intégrité des données grâce à des vérifications automatiques.
- [PersistDict](https://github.com/thiswillbeyourgithub/PersistDict): Implémentation de dictionnaire persistant thread-safe avec expiration automatique, suivi des métadonnées et sérialisation personnalisable utilisant LMDB comme stockage backend.
- [whisper_audio_splitter](https://github.com/thiswillbeyourgithub/whisper_audio_splitter): Outil de découpage audio basé sur la reconnaissance vocale qui segmente automatiquement les fichiers audio aux mots-clés détectés tout en prenant en charge plusieurs backends STT et le traitement parallèle.
- [corpus_matcher](https://github.com/thiswillbeyourgithub/corpus_matcher): Bibliothèque de correspondance de sous-chaînes optimisée utilisant une approche à double algorithme avec traitement parallèle et paramètres configurables pour une recherche de texte efficace dans de grands corpus.
- [speech.sh](https://github.com/thiswillbeyourgithub/speech.sh): Interface de synthèse vocale utilisant l'API d'OpenAI avec capacités de mise en cache et options d'intégration à l'échelle du système pour les environnements Linux.
- [OpenrouterModelFilter](https://github.com/thiswillbeyourgithub/OpenrouterModelFilter): Utilitaire en ligne de commande pour filtrer et trier les modèles de l'API OpenRouter en fonction de critères personnalisables tels que la tarification, la longueur du contexte et les caractéristiques du modèle.
- [iptables_rate_limit_modifier](https://github.com/thiswillbeyourgithub/iptables_rate_limit_modifier): Outil de gestion de réseau qui ajuste automatiquement les seuils de limitation de débit dans les règles iptables pour prévenir les faux positifs tout en maintenant la sécurité contre le trafic malveillant.
- [Load_Average_Balancer.sh](https://github.com/thiswillbeyourgithub/load_average_balancer): Outil de gestion des ressources système pour retarder les tâches intensives en CPU jusqu'à ce que des conditions de charge optimales soient atteintes, s'intégrant avec des solutions de sauvegarde comme restic.
- [PDF_batch_decryptor](https://github.com/thiswillbeyourgithub/PDF_batch_decryptor): Outil en ligne de commande pour le décryptage automatisé de plusieurs fichiers PDF protégés par mot de passe à l'aide des utilitaires qpdf et pdfinfo.
- [Spotify_tts](https://github.com/thiswillbeyourgithub/Spotify_tts): Compagnon de lecteur de musique qui annonce les pistes en cours de lecture en utilisant une synthèse vocale de base ou alimentée par l'IA.
- [ufw_auto_ssh_whitelist](https://github.com/thiswillbeyourgithub/ufw_auto_ssh_whitelist): Système de gestion automatisée de pare-feu pour les connexions SSH avec liste blanche dynamique et capacités de nettoyage de règles.
- [ufw_block_analyzer](https://github.com/thiswillbeyourgithub/ufw_block_analyzer): Système de surveillance et d'analyse en temps réel pour les journaux de pare-feu UFW avec enrichissement du contexte réseau Docker et sortie TOML structurée.
- [btrfs_cow_disabler](https://github.com/thiswillbeyourgithub/BTRFS_CoW_Disabler): Utilitaire en ligne de commande pour désactiver la fonctionnalité Copy-on-Write sur les systèmes de fichiers Btrfs via des opérations de fichiers atomiques et la vérification de la somme de contrôle.
- [docker_volume_backup](https://github.com/thiswillbeyourgithub/docker_volume_backup): Solution de sauvegarde de données robuste pour les conteneurs Docker avec gestion automatisée des volumes, gestion de l'état des conteneurs et capacités de journalisation détaillées.
- [ShellArgParser](https://github.com/thiswillbeyourgithub/ShellArgParser): Utilitaire en ligne de commande pour convertir les arguments de style Python en variables d'environnement shell, simplifiant l'analyse des arguments dans les scripts shell.
- [IndexableNewsboat](https://github.com/thiswillbeyourgithub/IndexableNewsboat): Outil en ligne de commande qui exporte les entrées RSS de Newsboat en fichiers texte pour une intégration transparente avec les moteurs de recherche de bureau.
- [MediaDurationRecursiveChecker](https://github.com/thiswillbeyourgithub/MediaDurationRecursiveChecker): Outil d'analyse de durée de médias qui scanne récursivement les répertoires pour calculer la durée totale et la taille des fichiers multimédias tout en fournissant des estimations de traitement en temps réel. Également en tant qu'application MacOS.
- [MediaMetadataExtractor](https://github.com/thiswillbeyourgithub/MediaMetadataExtractor): Outil d'extraction de métadonnées pour fichiers multimédias qui fournit des informations techniques complètes dans les formats Excel et JSON, prenant en charge divers formats vidéo et audio avec une interface GUI conviviale. Également en tant qu'application MacOS.
- [MediaSizeOrHashMatcher](https://github.com/thiswillbeyourgithub/MediaSizeOrHashMatcher): Outil de comparaison de fichiers multimédias utilisant la correspondance basée sur la taille et le calcul de hash parallèle pour une détection efficace des doublons entre répertoires. Également en tant qu'application MacOS.
- [llm_agent](https://github.com/thiswillbeyourgithub/llm_agent): Système de plugins permettant l'automatisation intelligente des tâches via plusieurs moteurs de recherche, navigation Web autonome, manipulation de fichiers et accès shell avec contrôles de sécurité intégrés et capacités de mémoire persistante.
- [fancontrol_autohealing_config](https://github.com/thiswillbeyourgithub/fancontrol_autohealing_config): Analyseur et mise à jour de configuration qui maintient les paramètres de contrôle des ventilateurs à travers les redémarrages système en détectant et ajustant automatiquement les numéros de périphériques de surveillance matérielle.
- [prompt_GPT3](https://github.com/thiswillbeyourgithub/prompt_GPT3): Interface en ligne de commande pour GPT-3 d'OpenAI avec journalisation des conversations, mode vim et modes spécialisés pour la création de cartes mémoire et les tâches de traduction.
- [pdfannots](https://github.com/thiswillbeyourgithub/pdfannots): Outil d'extraction de texte pour documents PDF qui traite les annotations, surlignages et commentaires en sorties Markdown, JSON ou EDN formatées pour les revues d'articles académiques et l'analyse de documents.

## Autres
*1 projet jusqu'à présent*
- [FUTOmeter](https://github.com/thiswillbeyourgithub/FUTOmeter): Suite de bibliothèques pour le suivi d'utilisation respectueux de la vie privée et les invites de don contextuelles dans les applications FOSS, permettant un financement durable grâce à des métriques d'engagement utilisateur basées sur les données.

---

# Contributions au Code
Voici une courte liste de certains projets auxquels j'ai contribué. Il peut s'agir de code, de documentation, d'idées, etc. Cela peut aller de petites contributions à de grands projets à de nombreuses petites contributions.
*Avertissement : Dans certains cas, j'ai compté des contributions qui n'ont pas été fusionnées car elles ont aidé le projet d'une manière ou d'une autre.*

- [openai](https://github.com/openai/openai-python/pull/733/files): correction d'un bug de longue date lié à whisper lorsque certains types de fichiers audio étaient fournis.
- [joblib](https://github.com/joblib/joblib/pull/1613): correction et clarification de certains comportements liés à l'expiration du cache
- [open-webui](https://github.com/open-webui/open-webui/pulls?q=author%3Athiswillbeyourgithub+): backend, frontend, rapports de bugs, doc, ...
- [karakeep](https://github.com/karakeep-app/karakeep/pulls?q=author%3Athiswillbeyourgithub+): backend, frontend, primes, rapports de bugs, doc, ...
- [i3](https://github.com/i3/i3/pull/6438): correction de bug qui spammait mes journaux et endommageait mes SSD.
- [mwmbl](https://github.com/mwmbl/mwmbl/pulls?q=author%3Athiswillbeyourgithub+): Documentation et code principalement lié au backend (changement de toute la db vers [LMDB](https://en.wikipedia.org/wiki/Lightning_Memory-Mapped_Database), amélioration des performances en changeant diverses bibliothèques, idées sur la décentralisation, ...)
- [academicpages.github.io](https://github.com/academicpages/academicpages.github.io/issues?q=thiswillbeyourgithub): Ce site est un fork de academicpages. J'ai fait plusieurs contributions au cours du temps.
- ...

Si vous êtes intéressé par tous les problèmes que j'ai créés : [cliquez ici](https://github.com/search?q=author%3Athiswillbeyourgithub+&type=issues&query=author%3Athiswillbeyourgithub+is%3Aissue&s=created&o=desc).

Si vous êtes intéressé par toutes les pull requests que j'ai créées : [cliquez ici](https://github.com/search?q=author%3Athiswillbeyourgithub+&type=pullrequests&query=author%3Athiswillbeyourgithub+is%3Aissue&s=created&o=desc).
