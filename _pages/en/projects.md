---
ref: projects
permalink: /en/projects
title: "Projects"
author_profile: true
lang: en
redirect_from:
    - /project
    - /projects
---

In this page, you can read the exhaustive list of coding projects I've created over the years. It's quite long so use the table of content below to browse.

A word on scale before you scroll: most of what follows is itch-scratching. Small tools I built because something annoyed me, published in case it annoys you too. The work I'd want to be judged on is grouped under [Larger projects](#larger-projects). AI multiplied how much I can ship, but the foundations predate it: [wdoc](#wdoc), [AnnA](#anna) and [AnkiAIUtils](#ankiaiutils) were written by hand. (To be clear: no patient data is ever involved in any of this, not even anonymized, and not even on servers I run myself.)

My code repositories are hosted on [github](https://github.com/thiswillbeyourgithub/):

[![(click if this doesn't load)](https://gstats.olicorne.org)](https://uncached.gstats.olicorne.org)

*Individual project count on this page: 136*

*Some of my projects are also published on [PyPI](https://pypi.org/user/thiswillbeyourgithub/), totaling more than 7k downloads per month (as of March 2026).*


*I would never have been able to write code without the open source movement, the countless tutorials shared freely online, and the culture of publishing source code and scripts. I am deeply grateful to everyone who has contributed to making programming knowledge accessible. These projects are my attempt to give back and help others on their journey, just as so many have helped me.*
{: .notice--info}

<details><summary><i>A note on what I call "projects"</i></summary>
<ul>
    <li><i>I count as "project" only what I made myself. Hence it does not include my code contributions to other projects. See at <a href="#code-contributions">the bottom</a> if you want to read some of my contributions.</i></li>
</ul>
</details>

<details><summary><i>A note on "vibecoding"</i></summary>
<ul>
    <li><i>For the most part I am not <a href="https://simonwillison.net/2025/Mar/19/vibe-coding/">vibecoding</a> these projects: I try to write careful technical specifications, I use unit tests as often as I can, and I take responsibility for the design decisions behind the code. On the rare occasions where a small side project was vibecoded, its README says so explicitly.</i></li>
</ul>
</details>

<details><summary><i>A note on authorship</i></summary>
<ul>
    <li><i>Although I've been using AI for many years, I didn't use it for coding until circa 2024. Since then, when I want AI-based assistance I almost exclusively use <a href="https://aider.chat/">aider</a> with the <b>--attribute-author</b> argument so you can see which projects and commits where done with or without it.</i></li>
    <li><i>As of December 2025 aider seems to have been unmaintained for months. Since early 2026 I've switched to <a href="https://github.com/anthropics/claude-code">Claude Code</a> and it has (once again) revolutionized my productivity. Not only because I can now take on more ambitious projects, but more importantly because it's no longer just about coding. Managing many other things becomes automatable. The term "assistant" is now more appropriate than just "developer aid" as far as I'm concerned.</i></li>
</ul>
</details>

<details><summary><i>A note on licensing</i></summary>
<ul>
    <li><i>Most if not all of my projects are released under the <a href="https://www.gnu.org/licenses/agpl-3.0.en.html">AGPLv3 license</a>. Previously I used almost exclusively the <a href="https://www.gnu.org/licenses/gpl-3.0.en.html">GPLv3 license</a>.</i></li>
</ul>
</details>

<br>

{% include toc_wide %}

## Medicine / Computer Science / Larger projects
{: #larger-projects}
*26 projects so far*
- [justelesdocs](https://github.com/thiswillbeyourgithub/justelesdocs/blob/main/README.md): An AI search over hundreds of PDFs at once: you ask a question in plain language and land on the matching passage, highlighted on its original page, no ads and no tracking.
    - [psychiatheque](https://psychiatheque.olicorne.org): Over 500 psychiatry guidelines and recommendations ([HAS](https://www.has-sante.fr/) and international bodies) searchable in one question, in French or English (free public instance at [psychiatheque.olicorne.org](https://psychiatheque.olicorne.org)).
- [justelesRCP](https://justelesrcp.olicorne.org): A fast static site for the official French drug reference sheets (RCP), built from the public [ANSM](https://ansm.sante.fr/)/[BDPM](https://base-donnees-publique.medicaments.gouv.fr/) data, with free AI-powered search, no ads and no tracking (free public instance at [justelesrcp.olicorne.org](https://justelesrcp.olicorne.org)).
- [neurarium](https://neurarium.olicorne.org/?lang=en): A 3D, source-graded atlas linking brain anatomy, pathways, receptors and psychiatric drugs in one searchable model (free public instance at [neurarium.olicorne.org](https://neurarium.olicorne.org/?lang=en)).

### Medical audio transcription

#### UltiMed

Common transcription software makes too many mistakes on medical text. UltiMed is my attempt at an open alternative: a dataset, a finetuned model, and the scripts behind them.

- [parakeet-tdt-0.6b-v3-UltiMed-onnx](https://huggingface.co/Olicorne/parakeet-tdt-0.6b-v3-UltiMed-onnx): A French medical finetune of [Parakeet](https://huggingface.co/nvidia/parakeet-tdt-0.6b-v3), optimized for CPU and the browser, with 7 to 8 times fewer errors on technical medical text than the base model (testable in [Parakeet Web](https://parakeetweb.olicorne.org)).
- [UltiMed-ASR-FR-v1](https://huggingface.co/datasets/Olicorne/UltiMed-ASR-FR-v1): An open French medical speech dataset: 3,105 hours of machine-spoken, dictation-style sentences under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), with no patient data involved, so that any software vendor can offer decent French medical dictation for free.
    - [UltiMed-ASR-FR-v1-scripts](https://github.com/thiswillbeyourgithub/UltiMed-ASR-FR-v1-scripts): The generation pipeline, so that others can rebuild the dataset or adapt it to another specialty or language.
    - [UltiMed-ASR-FR-v1-Voxtral](https://github.com/thiswillbeyourgithub/UltiMed-ASR-FR-v1-Voxtral): The carefully optimized local text-to-speech model that read every sentence of the dataset aloud.
    - [UltiMed-ASR-FR-v1-NeMo_training_scripts](https://github.com/thiswillbeyourgithub/UltiMed-ASR-FR-v1-NeMo_training_scripts): The scripts to reproduce the finetuning run, done on my own machine.
- [parakeet-tdt-0.6b-v3-optimized-onnx](https://huggingface.co/Olicorne/parakeet-tdt-0.6b-v3-optimized-onnx): A version of NVIDIA's [Parakeet](https://huggingface.co/nvidia/parakeet-tdt-0.6b-v3) speech recognition model heavily optimized to run on low-end machines and in the browser.
- [Parakeet Web](https://github.com/thiswillbeyourgithub/parakeet_web): Voice transcription that runs entirely in the browser, serving multiple models including my own (free public instance at [parakeetweb.olicorne.org](https://parakeetweb.olicorne.org)).
- [AudioCrowd](https://github.com/thiswillbeyourgithub/AudioCrowd): *[Archived]* A small [Gradio](https://www.gradio.app/) app where several volunteers could record sentences at the same time to build a speech recognition dataset.

### Other larger projects

- [SAM3-Skin-HeartRate](https://github.com/thiswillbeyourgithub/SAM3-Skin-HeartRate): A reimplementation of [faceHR](https://github.com/ajsteele/faceHR) with automatic skin segmentation ([SAM 3](https://github.com/facebookresearch/sam3)) to amplify the color changes from blood flow, with arterial punctures in mind.
- [PrevMed](https://github.com/PrevMedOrg/PrevMed) (short for *Preventive Medicine*): A minimal, free and open-source platform where non-technical users write clinical questionnaires in YAML with no personal data stored (I was paid to design and then build it).
- [wdoc](https://github.com/thiswillbeyourgithub/wdoc){: #wdoc}: A tool to query and summarize documents of any kind (PDFs, YouTube videos, Anki, web pages, and more) with any LLM. (To be clear: no patient data is ever involved, not even anonymized, and not even on servers I run myself.)
    - [OmniQA](https://github.com/thiswillbeyourgithub/OmniQA): *[Archived]* A tool to index any kind of document and ask an LLM questions about it, the ancestor of [wdoc](#wdoc).
- [repeng-research-fork](https://github.com/thiswillbeyourgithub/repeng-research-fork): A fork to explore questions raised in [repeng](https://github.com/vgel/repeng/)'s issues, adding features such as chat-format inputs and [Qwen3](https://github.com/QwenLM/Qwen3) support, proposed upstream.
- `REDACTED NAME` (private repo): A library that handles the many differences between clustering methods (no inference, fuzzy clusters, label remapping) in order to benchmark them all, the subject of my M1 internship at [NeuroSpin](https://fr.wikipedia.org/wiki/NeuroSpin).
- [gradio_pharmacokinetic_simulator](https://github.com/thiswillbeyourgithub/gradio_pharmacokinetic_simulator): An interactive plot of plasma concentrations over time under different dosing regimens, to train pharmacokinetic intuition.
    - [med-pharmacokinetic-simulator](https://github.com/thiswillbeyourgithub/Med-pharmacokinetic-simulator): An R/[Shiny](https://shiny.posit.co/) simulation of immediate-release methylphenidate made for a friend to plan doses around sleep, years before the Gradio version (one of my very first coding projects).
- [ADHD_european_drug_map](https://github.com/thiswillbeyourgithub/ADHD-european-drug-map): A map of which ADHD drugs are authorized in each European country, built automatically from the [EMA](https://www.ema.europa.eu/)'s medication list (suggested by a friend).
- KnQuant (not yet pushed): *[Unfinished]* A library to turn unstructured text into knowledge triplets searchable with multi-modal embeddings.
- [QuestEA](https://github.com/thiswillbeyourgithub/QuestEA): An exploration of whether embeddings and some math can extract more information from survey data, for example by letting different psychiatric questionnaires be compared.
- [WebSend](https://github.com/thiswillbeyourgithub/WebSend): A secure way to transfer phone photos to a firewalled computer, end-to-end encrypted over [WebRTC](https://webrtc.org/) through a server that cannot read them (free public instance at [websend.olicorne.org](https://websend.olicorne.org)).
- [AiFormParser](https://github.com/thiswillbeyourgithub/AiFormParser): *[Unfinished]* A way to turn paper clinical questionnaires into spreadsheets without the patient data ever leaving the browser.
- [sleep_tracker_pinetime](https://github.com/thiswillbeyourgithub/SleepTk_pinetime_sleep_tracker): A sleep tracker for [wasp-os](https://github.com/wasp-os/wasp-os) with an alarm timed to sleep cycles (used every night since about 2021).
    - [InfiniSleep-tracking](https://github.com/thiswillbeyourgithub/InfiniSleep-tracking): A fork of [InfiniTime](https://github.com/InfiniTimeOrg/InfiniTime) so that the watch records sleep on its own, with InfiniTime's longer battery life.
    - I use [my Gadgetbridge fork](https://codeberg.org/thiswillbeyourgithub/Gadgetbridge-infinisleep-tracking) to poll the data from the watch.

## Machine learning
*6 projects so far*

- [LLM Presidio Like PII Remover](https://github.com/thiswillbeyourgithub/LLM_presidio_like_PII_remover): An exploration of how well small local LLMs can spot personal information in text, using plain-language definitions instead of trained models.
    - [PII French Medical Test Suite](https://github.com/thiswillbeyourgithub/PII_french_medical_test_suite): A way to measure how well these models detect personal information in French medical sentences containing fake data.
- [Beta-Variational-Autoencoder](https://github.com/thiswillbeyourgithub/Beta-Variational-Autoencoder): A simple beta-VAE with a [scikit-learn](https://scikit-learn.org/) interface, made for another project because none could be found.
- [GridSearchReductor](https://github.com/thiswillbeyourgithub/GridSearchReductor): A way to run fewer experiments than a full grid search while still covering the parameter space reasonably well.
- [repeng-research-fork](https://github.com/thiswillbeyourgithub/repeng-research-fork): *See above*
- `REDACTED NAME`: *See above*

## Anki
*[Anki](https://github.com/ankitects/anki/) is an open source flashcard/spaced repetition memorization system*
*14 projects so far*

- [Stahl Ankifier](https://github.com/thiswillbeyourgithub/StahlAnkifier): A way to turn the *Prescriber's Guide* (Stahl) into Anki cards, made as a psychiatry resident because doing it by hand would have taken months.
- [Voice2Anki](https://github.com/thiswillbeyourgithub/Voice2Anki): A way to create good flashcards quickly by speaking them, in my own phrasing, on any subject.
- [AnkiAiUtils](https://github.com/thiswillbeyourgithub/AnkiAIUtils){: #ankiaiutils}: A tool that adds extra help to the cards I kept failing, such as an explanation, a mnemonic or an illustration.
- [AnnA_anki_neuronal_Appendix](https://github.com/thiswillbeyourgithub/AnnA_Anki_neuronal_Appendix){: #anna}: A way to stop reviewing near-identical cards on the same day, and to get through a backlog without losing retention.
- [py_ankiconnect](https://github.com/thiswillbeyourgithub/py_ankiconnect): A simple way to talk to Anki from Python projects and from the command line.
- [AnkiAutoMindmap](https://github.com/thiswillbeyourgithub/AnkiAutoMindmap): A tool to build mind maps from the cards, for an overview of everything written on a topic (for example headaches).
- [i3_seach_anki_collection](https://github.com/thiswillbeyourgithub/i3_search_anki_collection): An [i3](https://i3wm.org/) key binding that opens a search prompt and shows the matching cards in Anki's browser.
- [HapaxPredator](https://github.com/thiswillbeyourgithub/HapaxPredator): An add-on that lists every word in the selected cards by frequency, so that rare words (often misspellings) stand out.
- [IndexableAnki](https://github.com/thiswillbeyourgithub/IndexableAnki): *[Archived]* An export of each Anki card as a text file so that [Recoll](https://www.lesbonscomptes.com/recoll/) can index it (since superseded by [wdoc](#wdoc)'s Anki parser).
- [anki_PrioriTag](https://github.com/thiswillbeyourgithub/anki_Prioritag): A filtered deck built from the tags that contain the most forgotten cards.
- [anki_autobury_added_today](https://github.com/thiswillbeyourgithub/anki_autobury_added_today): A script that buries the cards created today so they do not come up for review before the next day.
- [Anki Semantic Search](https://github.com/thiswillbeyourgithub/Anki-Semantic-Search): *[Archived]* A way to find cards by meaning, not only by the exact words they contain.
- [pdf2anki](https://github.com/thiswillbeyourgithub/pdf2anki): A way to search inside PDFs with Anki's search, which handles several keywords and partial words well.
- [clozolkor](https://github.com/thiswillbeyourgithub/Clozolkor): A note template that reveals long cloze cards (lists, steps) one item at a time, instead of all at once.

## Karakeep
*[Karakeep](https://github.com/karakeep-app/karakeep) is an open source read it later app*
*3 projects so far*

- [karakeep_python_api](https://github.com/thiswillbeyourgithub/karakeep_python_api): An unofficial Python client and CLI for the [Karakeep](https://karakeep.app/) API, which my Karakeep tools build on.
- [Karanki](https://github.com/thiswillbeyourgithub/Karanki): *[Unfinished]* A two-way sync between Karakeep highlights and Anki, with each highlight color mapped to a deck with its own target retention.
- [freshrss_to_karakeep](https://github.com/thiswillbeyourgithub/freshrss_to_karakeep): A scheduled job that sends the items marked as favorites in [FreshRSS](https://github.com/FreshRSS/FreshRSS) to Karakeep with a "freshrss" tag.

## Logseq
*[Logseq](https://github.com/logseq/logseq) is an open source PKM (Personal Knowledge Management) app*
*4 projects so far*

- [LogseqMarkdownParser](https://github.com/thiswillbeyourgithub/LogseqMarkdownParser): A small library and CLI to access the properties of Logseq blocks, with JSON output to use with [`jq`](https://jqlang.org/).
- [wallabag_to_logseq_and_omnivore](https://github.com/thiswillbeyourgithub/wallabag_to_logseq_and_omnivore): *[Archived]* A migration of read [Wallabag](https://wallabag.org/) articles and highlights into Logseq, sending the unread ones to [Omnivore](https://github.com/omnivore-app/omnivore).
- [LogseqPDFImporter](https://github.com/thiswillbeyourgithub/LogseqPDFImporter): A way to import PDFs annotated in other readers into Logseq, keeping highlight colors and area highlights as images.
- [MdXLogseqTODOSync](https://github.com/thiswillbeyourgithub/MdXLogseqTODOSync): A sync of the TODO items between delimiters in two Markdown files, so that updating my Logseq graph updates a repository's README.

## Open-WebUI
*[Open-WebUI](https://github.com/open-webui/open-webui/issues) is a self hosted AI platform*
*2 projects so far*

- [Open-WebUI Knowledge Zotero Sync](https://github.com/thiswillbeyourgithub/openwebui-knowledge-zotero-sync): A sync of a [Zotero](https://www.zotero.org/) library into an Open WebUI knowledge base (a fork of [stoerr/openwebui-knowledgesync](https://github.com/stoerr/openwebui-knowledgesync), to be retired once my Zotero connector lands in the official [oikb](https://github.com/open-webui/oikb)).
- [openwebui_custom_pipes_filters](https://github.com/thiswillbeyourgithub/openwebui_custom_pipes_filters): A collection of Open WebUI filters, tools and templates, for example to pass user metadata to [Langfuse](https://langfuse.com/) or to limit chat length.

## Smartwatch
*Mainly for [wasp-os](https://github.com/wasp-os/wasp-os) and [InfiniTime](https://github.com/InfiniTimeOrg/InfiniTime) on the [pinetime](https://pine64.org/devices/pinetime/)*
*3 projects so far*

- [InfiniSleep-tracking](https://github.com/thiswillbeyourgithub/InfiniSleep-tracking): *See above*
- [sleep_tracker_pinetime](https://github.com/thiswillbeyourgithub/SleepTk_pinetime_sleep_tracker): *See above*
- [pomodoro_wasp_os](https://github.com/thiswillbeyourgithub/Pomodoro-wasp-os): A Pomodoro app for [wasp-os](https://github.com/wasp-os/wasp-os) with presets, configurable vibration patterns and settings that persist between sessions.

## API
*I made my own "reference" libraries to make my other projects more interoperable*
*5 projects so far*

- [freshrss_python_api](https://github.com/thiswillbeyourgithub/freshrss_python_api): A typed Python wrapper around the FreshRSS Fever API to fetch, mark and organize feed items from scripts.
- [caldav_tasks_api](https://github.com/thiswillbeyourgithub/Caldav-Tasks-API): A library and CLI to create, fetch and delete CalDAV tasks, which my [Home Assistant](https://www.home-assistant.io/) voice setup and other tools build on.
    - [caldav_cal_api](https://github.com/thiswillbeyourgithub/Caldav-Cal-API): The same as caldav_tasks_api for calendar events (VEVENTs), with the same layout and naming.
- [karakeep_python_api](https://github.com/thiswillbeyourgithub/karakeep_python_api): *See above*
- [py_ankiconnect](https://github.com/thiswillbeyourgithub/py_ankiconnect): *See above*

## Productivity
*Tools I use, used or made*
*14 projects so far*

- [claude_usage](https://github.com/thiswillbeyourgithub/claude_usage): A CLI to read the Claude.ai plan usage, and a skill that lets [Claude Code](https://github.com/anthropics/claude-code) wait out the 5-hour limit and then resume on its own.
- [MacroMaker](https://github.com/thiswillbeyourgithub/MacroMaker): *[Unfinished]* A recorder for mouse sequences, stored as readable YAML files and replayed using OCR to find where to click.
- [save_to_zotero](https://github.com/thiswillbeyourgithub/save_to_zotero): A way to turn web pages into clean PDFs with proper metadata in Zotero, to read and annotate them on every device after [Omnivore](https://github.com/omnivore-app/omnivore) shut down.
- [mini_LiTOY](https://github.com/thiswillbeyourgithub/mini_LiTOY): A minimal library to rank a to-do list by pairwise ELO comparisons ("which matters more?"), that other tools can build on.
    - [LiTOY](https://github.com/thiswillbeyourgithub/LiTOY-aka-List-that-Outlives-You): *[Archived]* A way to rank all goals, short and long term, using pairwise comparisons on importance and time cost, each turned into ELO scores.
- [BrownieCutter](https://github.com/thiswillbeyourgithub/BrownieCutter): *[Archived]* A [CookieCutter](https://cookiecutter.readthedocs.io/)-like script that creates a ready-to-use template for each new FOSS tool (it generated itself).
- [zsh-ai](https://github.com/thiswillbeyourgithub/zsh-ai): A way to describe a task in plain words, press a key, and pick a suggested command with [fzf](https://github.com/junegunn/fzf) (based on [muePatrick/zsh-ai-commands](https://github.com/muePatrick/zsh-ai-commands)).
- [HAL](https://github.com/thiswillbeyourgithub/HAL): A single daily email summarizing the last 24 hours of mail and labeling unread messages along the way, made at a friend's request for her boss, an executive at a well-known company.
- [github_discussion_parser](https://github.com/thiswillbeyourgithub/github_discussion_parser): An export of each GitHub discussion, with all its comments and replies, as a structured Markdown file that an LLM can read.
- [systemd_unit_maker](https://github.com/thiswillbeyourgithub/systemd_unit_maker): A way to turn a command into a [systemd](https://systemd.io/) service and timer in one line, with a chance to review the units before installing them.
- [SAIC (SimpleAICommits)](https://github.com/thiswillbeyourgithub/SimpleAICcommits): A tool that suggests commit messages from the staged diff, following my own past commits, picked with fzf.
- [Quick_Whisper_Typer](https://github.com/thiswillbeyourgithub/Quick-Whisper-Typer): A way to press a key, speak, and have the transcription typed wherever the cursor is, as a minimal alternative to [AquaVoice](https://withaqua.com/).
- [simple_voice_chat](https://github.com/thiswillbeyourgithub/simple_voice_chat): A voice chat interface that freely combines speech-to-text, LLM and text-to-speech providers, built on [fastrtc](https://github.com/gradio-app/fastrtc).
- [AiderBuilder](https://github.com/thiswillbeyourgithub/AiderBuilder): *[Archived]* A minimal zsh script that turns [aider](https://aider.chat/) into a recursive agent, used to build several of the smaller tools on this page.

## "Rot" tools
*Tools leveraging deterministic time-based codes*
*3 projects so far*

- [wormrot.sh](https://github.com/thiswillbeyourgithub/wormrot.sh): A script so that both computers derive [magic-wormhole](https://magic-wormhole.readthedocs.io/) codes from the time and a shared secret, so that none has to be passed along.
- [fowlrot.sh](https://github.com/thiswillbeyourgithub/fowlrot.sh): The same time-based code rotation as [wormrot.sh](https://github.com/thiswillbeyourgithub/wormrot.sh), applied to [fowl](https://github.com/meejah/fowl/) connections.
- [knockd_rotator](https://github.com/thiswillbeyourgithub/knockd_rotator): A script so that the client and the server both derive [knockd](https://github.com/jvinet/knock) sequences from the time and a shared secret, to prevent replay attacks.

## Ntfy
*[ntfy.sh](https://ntfy.sh) makes it easy to send and receive notifications, I use it a lot for monitoring*
*8 projects so far*

- [ntfy_nmap_watcher](https://github.com/thiswillbeyourgithub/ntfy_nmap_watcher): A script that scans my servers from the outside to catch outdated [ufw-docker](https://github.com/chaifeng/ufw-docker) rules that left services exposed by mistake.
- [Daily_Fact_Ntfy](https://github.com/thiswillbeyourgithub/Daily_Fact_Ntfy): A script that sends an interesting fact about a chosen topic, written by an LLM, at a random time of day.
- [Ntfy_CSV_Reminders](https://github.com/thiswillbeyourgithub/Ntfy_CSV_Reminders): A script that sends reminders for recurring tasks, each with a 1/n chance per day, to avoid notification fatigue.
- [ntfy_systemd](https://github.com/thiswillbeyourgithub/ntfy_systemd): A script that sends a phone notification with the unit's status whenever a systemd service fails or becomes degraded.
- [ntfy_syncthing_conflict_checker](https://github.com/thiswillbeyourgithub/ntfy_syncthing_conflict_checker): A script that scans all [Syncthing](https://syncthing.net/) folders for conflict files and sends a notification when some appear.
- [ntfy_fail2ban](https://github.com/thiswillbeyourgithub/ntfy_fail2ban): A script that sends a periodic summary of the IPs found, banned or blocked by [Fail2Ban](https://github.com/fail2ban/fail2ban) and [UFW](https://launchpad.net/ufw) to my phone.
- [weather_notifier](https://github.com/thiswillbeyourgithub/weather_notifier): A script that sends a phone alert when rain is forecast or when the next days will be warmer or colder than usual.
- [allocine_checker](https://github.com/thiswillbeyourgithub/Allocine_Checker): A script that sends an alert when old films like *Stalker* or *Solaris* are screened in theaters nearby.

## Miscellaneous Tools
*46 projects so far*
- [ICD-11_to_Langchain_Documents](https://github.com/thiswillbeyourgithub/ICD-11_to_langchain): A way to search [ICD-11](https://icd.who.int/) codes by meaning rather than by exact keywords.
- [gpu_nvidia_vram_healthspan](https://github.com/thiswillbeyourgithub/gpu_nvidia_vram_healthspan): A way to keep the GPU's memory from overheating, since the stock fan curve only reacts to the core temperature.
- [xlsx_move_comments_to_inside_cells](https://github.com/thiswillbeyourgithub/xlsx_move_comments_to_inside_cells): A script that moves `.xlsx` comments into the cells, because they were invisible in [Nextcloud](https://nextcloud.com/)'s mobile viewer.
- [envlocker](https://github.com/thiswillbeyourgithub/envlocker): A way to keep API keys out of `.zshrc` in plain text without adding a secrets manager.
- [ufw-docker-recap](https://github.com/thiswillbeyourgithub/ufw-docker-recap): A double-check of which container ports the firewall really exposes.
- [ntrig-calib](https://github.com/thiswillbeyourgithub/ntrig-calib): A fix for a dead touchscreen zone on a Surface Pro 3 under Linux (reverse-engineered with Claude from the Windows calibration tool).
- [Sanoid Docker Snapshots Cleanup](https://github.com/thiswillbeyourgithub/sanoid_docker_snapshots_cleanup): A way to reclaim the backup space taken by [ZFS](https://openzfs.org/) snapshots of [Docker](https://www.docker.com/) containers that no longer exist.
- [Umami Apprise Notifier](https://github.com/thiswillbeyourgithub/umami_apprise_notifier): A notification when someone visits my website, without checking the analytics dashboard.
- [Website Link Checker](https://github.com/thiswillbeyourgithub/website_link_checker): A way to find the broken links on this website before visitors do.
- [srt_ai_translator](https://github.com/thiswillbeyourgithub/srt_ai_translator): A tool to translate subtitles into languages that no one had translated them into.
- [GPU Docker Monitor](https://github.com/thiswillbeyourgithub/nvidia-smi-docker-matcher): A way to know which container is taking up VRAM before restarting anything.
- [gradioSearcher](https://github.com/thiswillbeyourgithub/GradioSearcher): *[Unfinished]* A simple interface to look inside the vector databases built by [wdoc](#wdoc).
- [systemd_last_run](https://github.com/thiswillbeyourgithub/systemd_last_run): A way to spot systemd timers that have silently stopped running.
- [vps-backup](https://github.com/thiswillbeyourgithub/vps_backup): A script for compressed, timestamped backups of my VPS that only keeps the last few copies.
- [iroh_send](https://github.com/thiswillbeyourgithub/iroh-send): A way to send files and folders directly from one machine to another, with no intermediary server.
- [adb_newpipe_exporter](https://github.com/thiswillbeyourgithub/adb_newpipe_exporter): A backup of [NewPipe](https://newpipe.net/)'s database from a computer, by driving the app's export menus over [ADB](https://developer.android.com/tools/adb).
- [autopassad](https://github.com/thiswillbeyourgithub/autopassad): A script that spots "continue" or "skip" on screen with OCR and clicks it.
- [Umami Data Fetcher](https://github.com/thiswillbeyourgithub/umami_data_fetcher): A way to save the privacy-preserving analytics of olicorne.org before [umami.is](https://umami.is/) deletes them after 6 months.
- [Home Assistant CalDAV client](https://github.com/thiswillbeyourgithub/Home-Assistant-CalDAV-client): A way to say "I have to do the dishes" to Home Assistant and have it appear in my Nextcloud tasks.
- [LiteLLM Proxy OpenRouter Price Updater](https://github.com/thiswillbeyourgithub/litellm_proxy_openrouter_price_updater): *[Archived]* A script to keep [LiteLLM](https://github.com/BerriAI/litellm)'s [OpenRouter](https://openrouter.ai/) prices up to date, since they lagged behind the real ones.
- [OpenRouter to Langfuse Model Pricing Sync](https://github.com/thiswillbeyourgithub/openrouter_cost_into_langfuse/): *[Archived]* A copy of OpenRouter's prices into Langfuse, to track what LLM calls actually cost.
- [git_scripts_keeper](https://github.com/thiswillbeyourgithub/git_scripts_keeper): A history of changes in folders that no configuration tool tracks, committed periodically.
- [OCR_with_format](https://github.com/thiswillbeyourgithub/OCR_with_format): A way for [pytesseract](https://github.com/madmaze/pytesseract) to keep the text's layout and spacing instead of flattening it.
- [HumanReadableSeed](https://github.com/thiswillbeyourgithub/HumanReadableSeed): A way to share an [edgevpn](https://github.com/mudler/edgevpn/) base64 token by voice or in writing, by turning it into a checkable sequence of words.
- [PersistDict](https://github.com/thiswillbeyourgithub/PersistDict): A dictionary-like cache that survives restarts, made for [wdoc](#wdoc) instead of relying on [LangChain](https://github.com/langchain-ai/langchain)'s.
- [whisper_audio_splitter](https://github.com/thiswillbeyourgithub/whisper_audio_splitter): A way to record Anki cards out loud in one session, saying "stop" between each, and get one audio file per card.
- [corpus_matcher](https://github.com/thiswillbeyourgithub/corpus_matcher): A library to find where a slightly altered piece of text came from in a large corpus.
- [speech.sh](https://github.com/thiswillbeyourgithub/speech.sh): A way to type text and have it read aloud, made in 30 minutes when I suddenly lost my voice.
- [OpenrouterModelFilter](https://github.com/thiswillbeyourgithub/OpenrouterModelFilter): A script to filter the list of OpenRouter models.
- [iptables_rate_limit_modifier](https://github.com/thiswillbeyourgithub/iptables_rate_limit_modifier): A script to make UFW's rate limiting less aggressive.
- [Load_Average_Balancer.sh](https://github.com/thiswillbeyourgithub/load_average_balancer): A way to delay heavy tasks while the CPU is busy.
- [PDF_batch_decryptor](https://github.com/thiswillbeyourgithub/PDF_batch_decryptor): A way to decrypt many PDFs in bulk.
- [Spotify_tts](https://github.com/thiswillbeyourgithub/Spotify_tts): A way to learn the titles of the songs playing, without looking at the screen.
- [ufw_auto_ssh_whitelist](https://github.com/thiswillbeyourgithub/ufw_auto_ssh_whitelist): A way to allow the current SSH IP through the firewall when prompted, and clean those rules up after 30 days.
- [ufw_block_analyzer](https://github.com/thiswillbeyourgithub/ufw_block_analyzer): A mapping of blocked connections in the UFW logs back to the [Docker Compose](https://docs.docker.com/compose/) project they came from.
- [btrfs_cow_disabler](https://github.com/thiswillbeyourgithub/BTRFS_CoW_Disabler): *[Archived]* A way to disable Copy-on-Write on existing [Btrfs](https://btrfs.readthedocs.io/) files by copying them to new files with checksum verification.
- [docker_volume_backup](https://github.com/thiswillbeyourgithub/docker_volume_backup): A safe backup of a container's volumes, stopping it during the copy and restarting it afterwards.
- [ShellArgParser](https://github.com/thiswillbeyourgithub/ShellArgParser): A one-liner that turns Python-style arguments into shell variables, because parsing arguments in shell is annoying.
- [IndexableNewsboat](https://github.com/thiswillbeyourgithub/IndexableNewsboat): A way to make [newsboat](https://newsboat.org/) RSS entries searchable with a desktop search engine like [Recoll](https://www.lesbonscomptes.com/recoll/).
- [MediaDurationRecursiveChecker](https://github.com/thiswillbeyourgithub/MediaDurationRecursiveChecker): A way to know the total duration of the footage on a hard drive, made for my partner who works in video production.
- [MediaMetadataExtractor](https://github.com/thiswillbeyourgithub/MediaMetadataExtractor): A script to extract the technical metadata of large batches of video files, without opening them one by one (also for my partner).
- [MediaSizeOrHashMatcher](https://github.com/thiswillbeyourgithub/MediaSizeOrHashMatcher): A way to find which video files in one folder already exist in another, even under a different name.
- [llm_agent](https://github.com/thiswillbeyourgithub/llm_agent): *[Archived]* A test of whether a simple LangChain agent could be added to [Simon Willison](https://simonwillison.net/)'s [llm](https://llm.datasette.io/) command-line tool.
- [fancontrol_autohealing_config](https://github.com/thiswillbeyourgithub/fancontrol_autohealing_config): A fix for fan control stopping after reboots because Linux renumbers the hwmon devices.
- [prompt_GPT3](https://github.com/thiswillbeyourgithub/prompt_GPT3): *[Archived]* A quick way to create Anki cloze cards and translations from the terminal with GPT-3.
- [pdfannots](https://github.com/thiswillbeyourgithub/pdfannots): A fork adapting the extraction of PDF highlights and comments to my own note-taking.

## Others
*8 projects so far*
- [FUTOmeter](https://github.com/thiswillbeyourgithub/FUTOmeter): *[Idea]* A sketch of a privacy-preserving way for FOSS apps to measure usage locally and show well-timed donation prompts, in the spirit of [FUTO](https://futo.org/).

---

# Code Contributions
This is a short list of some projects I contributed to. It can be code, documentation, ideas, etc. It can be anything from small contributions to large projects to many small contributions.
*Disclaimer: In some cases I counted contributions that were not merged because it helped the project one way or another.*

- [openai](https://github.com/openai/openai-python/pull/733/files): Fixed a long standing bug related to whisper when given some type of audio files.
- [joblib](https://github.com/joblib/joblib/pull/1613): Fixed and clarified some behaviors related to cache expiration.
- [open-webui](https://github.com/open-webui/open-webui/pulls?q=author%3Athiswillbeyourgithub+): Backend, frontend, bug reports, doc, ...
- [karakeep](https://github.com/karakeep-app/karakeep/pulls?q=author%3Athiswillbeyourgithub+): Backend, frontend, bounties, bug reports, doc, ...
- [i3](https://github.com/i3/i3/pull/6438): Bugfix that was spamming my logs and hurting my SSDs.
- [mwmbl](https://github.com/mwmbl/mwmbl/pulls?q=author%3Athiswillbeyourgithub+): Documentation and code mostly related to backend (changing the entire db to [LMDB](https://en.wikipedia.org/wiki/Lightning_Memory-Mapped_Database), improving performance by changing various libs, ideas about decentralizing, ...).
- [academicpages.github.io](https://github.com/academicpages/academicpages.github.io/issues?q=thiswillbeyourgithub): This entire website is a fork of academicpages. I contributed somewhat over time.
- ...

You can browse [all the GitHub issues I created](https://github.com/search?q=author%3Athiswillbeyourgithub+&type=issues&query=author%3Athiswillbeyourgithub+is%3Aissue&s=created&o=desc).

You can browse [all the GitHub pull requests I created](https://github.com/search?q=author%3Athiswillbeyourgithub+&type=pullrequests&query=author%3Athiswillbeyourgithub+is%3Aissue&s=created&o=desc).
