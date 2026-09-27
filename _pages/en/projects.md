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

A word on scale before you scroll: most of what follows is itch-scratching. Small tools I built because something annoyed me, published in case it annoys you too. The work I'd want to be judged on is grouped under [Larger projects](#larger-projects). AI multiplied how much I can ship, but the foundations predate it: [wdoc](#wdoc), [AnnA](#anna) and [AnkiAIUtils](#ankiaiutils) were written by hand. (To be clear: no patient data is ever involved in any of it, not even anonymized, and not even on servers I run myself.)

My code repositories are hosted on [github](https://github.com/thiswillbeyourgithub/):

[![(click if this doesn't load)](https://gstats.olicorne.org)](https://uncached.gstats.olicorne.org)

*Individual project count on this page: 134*

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
*24 projects so far*
- [justelesRCP](https://justelesrcp.olicorne.org): I needed the official French drug reference sheets (RCP) from the public ANSM/BDPM data as a fast static site with free natural-language search, no ads and no tracking, and I host it at [justelesrcp.olicorne.org](https://justelesrcp.olicorne.org).
- [neurarium](https://neurarium.olicorne.org/?lang=en): I wanted a 3D, source-graded atlas linking brain anatomy, pathways, receptors and psychiatric drugs in one searchable model, and I host it at [neurarium.olicorne.org](https://neurarium.olicorne.org/?lang=en).

### Medical audio transcription

#### UltiMed

Common transcription software makes too many mistakes on medical text. UltiMed is my attempt at an open alternative: a dataset, a finetuned model, and the scripts behind them.

- [parakeet-tdt-0.6b-v3-UltiMed-onnx](https://huggingface.co/Olicorne/parakeet-tdt-0.6b-v3-UltiMed-onnx): I needed a French medical finetune of Parakeet, optimized for CPU and the browser, which makes 7 to 8 times fewer errors on technical medical text than the base model.
- [UltiMed-ASR-FR-v1](https://huggingface.co/datasets/Olicorne/UltiMed-ASR-FR-v1): I wanted to make decent French medical dictation something any software vendor can offer for free, so I published 3,105 hours of machine-spoken, dictation-style sentences under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), with no patient data involved.
    - [UltiMed-ASR-FR-v1-scripts](https://github.com/thiswillbeyourgithub/UltiMed-ASR-FR-v1-scripts): I wanted others to be able to rebuild the dataset, or adapt it to another specialty or language.
    - [UltiMed-ASR-FR-v1-Voxtral](https://github.com/thiswillbeyourgithub/UltiMed-ASR-FR-v1-Voxtral): I needed a local text-to-speech model to read every sentence of the dataset aloud.
    - [UltiMed-ASR-FR-v1-NeMo_training_scripts](https://github.com/thiswillbeyourgithub/UltiMed-ASR-FR-v1-NeMo_training_scripts): I wanted the finetuning run to be reproducible.
- [parakeet-tdt-0.6b-v3-optimized-onnx](https://huggingface.co/Olicorne/parakeet-tdt-0.6b-v3-optimized-onnx): I needed an ONNX export of [Parakeet TDT 0.6b v3](https://huggingface.co/nvidia/parakeet-tdt-0.6b-v3) tuned for CPU and browser inference, with no cap on audio length.
- [Parakeet Web](https://github.com/thiswillbeyourgithub/parakeet_web): I wanted voice transcription that runs entirely in the browser, and I host a free instance at [parakeetweb.olicorne.org](https://parakeetweb.olicorne.org) that serves both of my models.
- [AudioCrowd](https://github.com/thiswillbeyourgithub/AudioCrowd): *[Archived]* I needed a small Gradio app where several volunteers could record sentences at the same time to build a speech recognition dataset.

### Other larger projects

- [SAM3-Skin-HeartRate](https://github.com/thiswillbeyourgithub/SAM3-Skin-HeartRate): I wanted to reimplement [faceHR](https://github.com/ajsteele/faceHR) with automatic skin segmentation (SAM 3) to amplify the color changes from blood flow, with arterial punctures in mind.
- [PrevMed](https://github.com/PrevMedOrg/PrevMed) (short for *Preventive Medicine*): A team needed a minimal platform where non-technical users write clinical questionnaires in YAML with no personal data stored (I was paid to design and then build it).
- [wdoc](https://github.com/thiswillbeyourgithub/wdoc){: #wdoc}: I needed a RAG tool to query and summarize documents of any kind (PDFs, YouTube videos, Anki, web pages, and more) with any LLM. (To be clear: no patient data is ever involved, not even anonymized, and not even on servers I run myself.)
    - [OmniQA](https://github.com/thiswillbeyourgithub/OmniQA): *[Archived]* I wanted to index any kind of document and ask an LLM questions about it, the ancestor of [wdoc](#wdoc).
- [repeng-research-fork](https://github.com/thiswillbeyourgithub/repeng-research-fork): I needed a fork to explore questions raised in [repeng](https://github.com/vgel/repeng/)'s issues, adding features such as chat-format inputs and Qwen3 support, which I proposed upstream.
- `REDACTED NAME` (private repo): I needed a library that handles the many differences between clustering methods (no inference, fuzzy clusters, label remapping) in order to benchmark them all, the subject of my M1 internship at [NeuroSpin](https://fr.wikipedia.org/wiki/NeuroSpin).
- [gradio_pharmacokinetic_simulator](https://github.com/thiswillbeyourgithub/gradio_pharmacokinetic_simulator): I wanted an interactive plot of plasma concentrations over time under different dosing regimens, to train my pharmacokinetic intuition.
    - [med-pharmacokinetic-simulator](https://github.com/thiswillbeyourgithub/Med-pharmacokinetic-simulator): A friend needed an R/Shiny simulation of immediate-release methylphenidate to plan doses around sleep, years before the Gradio version (one of my very first coding projects).
- [ADHD_european_drug_map](https://github.com/thiswillbeyourgithub/ADHD-european-drug-map): A friend suggested it: I needed to download the EMA's medication list automatically and map which ADHD drugs are authorized in each country.
- KnQuant (not yet pushed): *[Unfinished]* I wanted to turn unstructured text into knowledge triplets searchable with multi-modal embeddings.
- [QuestEA](https://github.com/thiswillbeyourgithub/QuestEA): I wanted to see whether combining patients' answers with embeddings of the questions could let different psychiatric questionnaires be compared.
- [WebSend](https://github.com/thiswillbeyourgithub/WebSend): I needed to transfer phone photos to a firewalled computer, end-to-end encrypted over WebRTC through a server that cannot read them, and I host a free instance at [websend.olicorne.org](https://websend.olicorne.org).
- [AiFormParser](https://github.com/thiswillbeyourgithub/AiFormParser): *[Unfinished]* I needed to turn paper clinical questionnaires into spreadsheets without the patient data ever leaving the browser.
- [sleep_tracker_pinetime](https://github.com/thiswillbeyourgithub/SleepTk_pinetime_sleep_tracker): I needed a sleep tracker for [wasp-os](https://github.com/wasp-os/wasp-os) with an alarm timed to my sleep cycles, which I have used every night since about 2021.
    - [InfiniSleep-tracking](https://github.com/thiswillbeyourgithub/InfiniSleep-tracking): I needed my watch to record my sleep on its own, with the longer battery life of [InfiniTime](https://github.com/InfiniTimeOrg/InfiniTime).
    - I use [my Gadgetbridge fork](https://codeberg.org/thiswillbeyourgithub/Gadgetbridge-infinisleep-tracking) to poll the data from the watch.

## Machine learning
*6 projects so far*

- [LLM Presidio Like PII Remover](https://github.com/thiswillbeyourgithub/LLM_presidio_like_PII_remover): I wanted to see how well small local LLMs can spot personal information in text, using plain-language definitions instead of trained models.
    - [PII French Medical Test Suite](https://github.com/thiswillbeyourgithub/PII_french_medical_test_suite): I needed a way to measure how well these models detect personal information in French medical sentences containing fake data.
- [Beta-Variational-Autoencoder](https://github.com/thiswillbeyourgithub/Beta-Variational-Autoencoder): I needed a simple beta-VAE with a scikit-learn interface for another project and could not find one.
- [GridSearchReductor](https://github.com/thiswillbeyourgithub/GridSearchReductor): I needed to run fewer experiments than a full grid search while still covering the parameter space reasonably well.
- [repeng-research-fork](https://github.com/thiswillbeyourgithub/repeng-research-fork): *See above*
- `REDACTED NAME`: *See above*

## Anki
*[Anki](https://github.com/ankitects/anki/) is an open source flashcard/spaced repetition memorization system*
*14 projects so far*

- [Stahl Ankifier](https://github.com/thiswillbeyourgithub/StahlAnkifier): I needed to memorize the *Prescriber's Guide* (Stahl) as a psychiatry resident, and turning the PDF into cards by hand would have taken months.
- [Voice2Anki](https://github.com/thiswillbeyourgithub/Voice2Anki): I needed to create good flashcards quickly by speaking them, in my own phrasing, on any subject.
- [AnkiAiUtils](https://github.com/thiswillbeyourgithub/AnkiAIUtils){: #ankiaiutils}: I needed extra help with the cards I kept failing, such as an explanation, a mnemonic or an illustration added automatically.
- [AnnA_anki_neuronal_Appendix](https://github.com/thiswillbeyourgithub/AnnA_Anki_neuronal_Appendix){: #anna}: I needed to stop reviewing near-identical cards on the same day, and to get through a backlog without losing retention.
- [py_ankiconnect](https://github.com/thiswillbeyourgithub/py_ankiconnect): I needed a simple way to talk to Anki from my Python projects and from the command line.
- [AnkiAutoMindmap](https://github.com/thiswillbeyourgithub/AnkiAutoMindmap): I needed an overview of everything I had written on a topic (for example headaches), as mind maps built from my cards.
- [i3_seach_anki_collection](https://github.com/thiswillbeyourgithub/i3_search_anki_collection): I needed an i3 key binding that opens a search prompt and shows the matching cards in Anki's browser.
- [HapaxPredator](https://github.com/thiswillbeyourgithub/HapaxPredator): I needed an add-on that lists every word in the selected cards by frequency, so that rare words (often misspellings) stand out.
- [IndexableAnki](https://github.com/thiswillbeyourgithub/IndexableAnki): *[Archived]* I needed to export each Anki card as a text file so that [Recoll](https://www.lesbonscomptes.com/recoll/) could index it (since superseded by [wdoc](#wdoc)'s Anki parser).
- [anki_PrioriTag](https://github.com/thiswillbeyourgithub/anki_Prioritag): I needed a filtered deck built from the tags that contain the most forgotten cards.
- [anki_autobury_added_today](https://github.com/thiswillbeyourgithub/anki_autobury_added_today): I needed to bury the cards I created today so they would not come up for review before the next day.
- [Anki Semantic Search](https://github.com/thiswillbeyourgithub/Anki-Semantic-Search): *[Archived]* I needed to find cards by meaning, not only by the exact words they contain.
- [pdf2anki](https://github.com/thiswillbeyourgithub/pdf2anki): I needed to search inside my PDFs with Anki's search, which handles several keywords and partial words well.
- [clozolkor](https://github.com/thiswillbeyourgithub/Clozolkor): I needed to reveal long cloze cards (lists, steps) one item at a time, instead of all at once.

## Karakeep
*[Karakeep](https://github.com/karakeep-app/karakeep) is an open source read it later app*
*3 projects so far*

- [karakeep_python_api](https://github.com/thiswillbeyourgithub/karakeep_python_api): I needed an unofficial Python client and CLI for the [Karakeep](https://karakeep.app/) API, which my Karakeep tools build on.
- [Karanki](https://github.com/thiswillbeyourgithub/Karanki): *[Unfinished]* I needed to sync my Karakeep highlights with Anki both ways, with each highlight color mapped to a deck with its own target retention.
- [freshrss_to_karakeep](https://github.com/thiswillbeyourgithub/freshrss_to_karakeep): I needed a scheduled job that sends the items I mark as favorites in [FreshRSS](https://github.com/FreshRSS/FreshRSS) to Karakeep with a "freshrss" tag.

## Logseq
*[Logseq](https://github.com/logseq/logseq) is an open source PKM (Personal Knowledge Management) app*
*4 projects so far*

- [LogseqMarkdownParser](https://github.com/thiswillbeyourgithub/LogseqMarkdownParser): I needed a small library and CLI to access the properties of Logseq blocks, with JSON output to use with `jq`.
- [wallabag_to_logseq_and_omnivore](https://github.com/thiswillbeyourgithub/wallabag_to_logseq_and_omnivore): *[Archived]* I needed to import my read Wallabag articles and highlights into Logseq, and send the unread ones to Omnivore.
- [LogseqPDFImporter](https://github.com/thiswillbeyourgithub/LogseqPDFImporter): I needed to import PDFs annotated in other readers into Logseq, keeping highlight colors and area highlights as images.
- [MdXLogseqTODOSync](https://github.com/thiswillbeyourgithub/MdXLogseqTODOSync): I needed to sync the TODO items between delimiters in two Markdown files, so that updating my Logseq graph updates a repository's README.

## Open-WebUI
*[Open-WebUI](https://github.com/open-webui/open-webui/issues) is a self hosted AI platform*
*2 projects so far*

- [Open-WebUI Knowledge Zotero Sync](https://github.com/thiswillbeyourgithub/openwebui-knowledge-zotero-sync): I needed to sync my Zotero library into an Open WebUI knowledge base (a fork of [stoerr/openwebui-knowledgesync](https://github.com/stoerr/openwebui-knowledgesync), to be retired once my Zotero connector lands in the official [oikb](https://github.com/open-webui/oikb)).
- [openwebui_custom_pipes_filters](https://github.com/thiswillbeyourgithub/openwebui_custom_pipes_filters): I needed my own collection of Open WebUI filters, tools and templates, for example to pass user metadata to Langfuse or to limit chat length.

## Smartwatch
*Mainly for [wasp-os](https://github.com/wasp-os/wasp-os) and [InfiniTime](https://github.com/InfiniTimeOrg/InfiniTime) on the [pinetime](https://pine64.org/devices/pinetime/)*
*3 projects so far*

- [InfiniSleep-tracking](https://github.com/thiswillbeyourgithub/InfiniSleep-tracking): *See above*
- [sleep_tracker_pinetime](https://github.com/thiswillbeyourgithub/SleepTk_pinetime_sleep_tracker):  *See above*
- [pomodoro_wasp_os](https://github.com/thiswillbeyourgithub/Pomodoro-wasp-os): I needed a Pomodoro app for [wasp-os](https://github.com/wasp-os/wasp-os) with presets, configurable vibration patterns and settings that persist between sessions.

## API
*I made my own "reference" libraries to make my other projects more interoperable*
*5 projects so far*

- [freshrss_python_api](https://github.com/thiswillbeyourgithub/freshrss_python_api): I needed a typed Python wrapper around the FreshRSS Fever API to fetch, mark and organize feed items from scripts.
- [caldav_tasks_api](https://github.com/thiswillbeyourgithub/Caldav-Tasks-API): I needed a library and CLI to create, fetch and delete CalDAV tasks, which my Home Assistant voice setup and other tools build on.
    - [caldav_cal_api](https://github.com/thiswillbeyourgithub/Caldav-Cal-API): I needed for calendar events (VEVENTs) what caldav_tasks_api gives me for tasks, with the same layout and naming.
- [karakeep_python_api](https://github.com/thiswillbeyourgithub/karakeep_python_api): *See above*
- [py_ankiconnect](https://github.com/thiswillbeyourgithub/py_ankiconnect): *See above*

## Productivity
*Tools I use, used or made*
*14 projects so far*

- [claude_usage](https://github.com/thiswillbeyourgithub/claude_usage): I needed to read my Claude.ai plan usage from the command line, and a skill that lets Claude Code wait out the 5-hour limit and then resume on its own.
- [MacroMaker](https://github.com/thiswillbeyourgithub/MacroMaker): *[Unfinished]* I needed to record mouse sequences as readable YAML files and replay them, using OCR to find where to click.
- [save_to_zotero](https://github.com/thiswillbeyourgithub/save_to_zotero): I needed to turn web pages into clean PDFs with proper metadata in Zotero, so I could read and annotate them on every device after [Omnivore](https://github.com/omnivore-app/omnivore) shut down.
- [mini_LiTOY](https://github.com/thiswillbeyourgithub/mini_LiTOY): I needed to rank my to-do list by pairwise ELO comparisons ("which matters more?"), in a minimal library that other tools could build on.
    - [LiTOY](https://github.com/thiswillbeyourgithub/LiTOY-aka-List-that-Outlives-You): *[Archived]* I needed to rank all my goals, short and long term, using pairwise comparisons on importance and time cost, each turned into ELO scores.
- [BrownieCutter](https://github.com/thiswillbeyourgithub/BrownieCutter): *[Archived]* I needed a [CookieCutter](https://cookiecutter.readthedocs.io/)-like script that creates a ready-to-use template for each new FOSS tool (it generated itself).
- [zsh-ai](https://github.com/thiswillbeyourgithub/zsh-ai): I needed to describe what I want in plain words, press a key, and pick a suggested command with fzf (based on [muePatrick/zsh-ai-commands](https://github.com/muePatrick/zsh-ai-commands)).
- [HAL](https://github.com/thiswillbeyourgithub/HAL): A friend asked me to make this for her boss, an executive at a well-known company, who needed a single daily email summarizing the last 24 hours of mail and labeling unread messages along the way.
- [github_discussion_parser](https://github.com/thiswillbeyourgithub/github_discussion_parser): I needed to export each GitHub discussion, with all its comments and replies, as a structured Markdown file that an LLM can read.
- [systemd_unit_maker](https://github.com/thiswillbeyourgithub/systemd_unit_maker): I needed to turn a command into a systemd service and timer in one line, with a chance to review the units before installing them.
- [SAIC (SimpleAICommits)](https://github.com/thiswillbeyourgithub/SimpleAICcommits): I needed commit messages suggested from my staged diff that follow my own past commits, and let me pick one with fzf.
- [Quick_Whisper_Typer](https://github.com/thiswillbeyourgithub/Quick-Whisper-Typer): I needed to press a key, speak, and have the transcription typed wherever my cursor was, as a minimal alternative to [AquaVoice](https://withaqua.com/).
- [simple_voice_chat](https://github.com/thiswillbeyourgithub/simple_voice_chat): I needed a voice chat interface where I can freely combine speech-to-text, LLM and text-to-speech providers, built on [fastrtc](https://github.com/gradio-app/fastrtc).
- [AiderBuilder](https://github.com/thiswillbeyourgithub/AiderBuilder): *[Archived]* I needed a minimal zsh script that turns [aider](https://aider.chat/) into a recursive agent, which I used to build several of the smaller tools on this page.

## "Rot" tools
*Tools leveraging deterministic time-based codes*
*3 projects so far*

- [wormrot.sh](https://github.com/thiswillbeyourgithub/wormrot.sh): I needed [magic-wormhole](https://magic-wormhole.readthedocs.io/) codes that both computers derive from the time and a shared secret, so I never have to pass one along.
- [fowlrot.sh](https://github.com/thiswillbeyourgithub/fowlrot.sh): I needed the same time-based code rotation as [wormrot.sh](https://github.com/thiswillbeyourgithub/wormrot.sh), applied to [fowl](https://github.com/meejah/fowl/) connections.
- [knockd_rotator](https://github.com/thiswillbeyourgithub/knockd_rotator): I needed [knockd](https://github.com/jvinet/knock) sequences that the client and the server both derive from the time and a shared secret, to prevent replay attacks.

## Ntfy
*[ntfy.sh](https://ntfy.sh) makes it easy to send and receive notifications, I use it a lot for monitoring*
*8 projects so far*

- [ntfy_nmap_watcher](https://github.com/thiswillbeyourgithub/ntfy_nmap_watcher): I needed to scan my servers from the outside to catch outdated [ufw-docker](https://github.com/chaifeng/ufw-docker) rules that left services exposed by mistake.
- [Daily_Fact_Ntfy](https://github.com/thiswillbeyourgithub/Daily_Fact_Ntfy): I wanted an LLM to send me an interesting fact about a chosen topic at a random time of day.
- [Ntfy_CSV_Reminders](https://github.com/thiswillbeyourgithub/Ntfy_CSV_Reminders): I needed reminders for recurring tasks, each sent with a 1/n chance per day, to avoid notification fatigue.
- [ntfy_systemd](https://github.com/thiswillbeyourgithub/ntfy_systemd): I needed a phone notification with the unit's status whenever a systemd service failed or became degraded.
- [ntfy_syncthing_conflict_checker](https://github.com/thiswillbeyourgithub/ntfy_syncthing_conflict_checker): I needed to scan all my Syncthing folders for conflict files and get notified when some appeared.
- [ntfy_fail2ban](https://github.com/thiswillbeyourgithub/ntfy_fail2ban): I needed a periodic summary of the IPs found, banned or blocked by Fail2Ban and UFW, sent to my phone.
- [weather_notifier](https://github.com/thiswillbeyourgithub/weather_notifier): I needed a phone alert when rain was forecast or when the next days would be warmer or colder than usual.
- [allocine_checker](https://github.com/thiswillbeyourgithub/Allocine_Checker): I needed an alert when old films like *Stalker* or *Solaris* were screened in theaters around me.

## Miscellaneous Tools
*46 projects so far*
- [ICD-11_to_Langchain_Documents](https://github.com/thiswillbeyourgithub/ICD-11_to_langchain): I needed to search ICD-11 codes by meaning rather than by exact keywords.
- [gpu_nvidia_vram_healthspan](https://github.com/thiswillbeyourgithub/gpu_nvidia_vram_healthspan): I needed to keep my GPU's memory from overheating, since the stock fan curve only reacts to the core temperature.
- [xlsx_move_comments_to_inside_cells](https://github.com/thiswillbeyourgithub/xlsx_move_comments_to_inside_cells): Comments in some `.xlsx` files were invisible in Nextcloud's mobile viewer, so this script moves them into the cells.
- [envlocker](https://github.com/thiswillbeyourgithub/envlocker): I needed to keep API keys out of my `.zshrc` in plain text without adding a secrets manager.
- [ufw-docker-recap](https://github.com/thiswillbeyourgithub/ufw-docker-recap): I needed to double-check which container ports my firewall really exposed.
- [ntrig-calib](https://github.com/thiswillbeyourgithub/ntrig-calib): I needed to fix a dead touchscreen zone on a Surface Pro 3 under Linux (reverse-engineered with Claude from the Windows calibration tool).
- [Sanoid Docker Snapshots Cleanup](https://github.com/thiswillbeyourgithub/sanoid_docker_snapshots_cleanup): I needed to reclaim the backup space taken by ZFS snapshots of Docker containers that no longer existed.
- [Umami Apprise Notifier](https://github.com/thiswillbeyourgithub/umami_apprise_notifier): I needed to know when someone visited my website without checking the analytics dashboard myself.
- [Website Link Checker](https://github.com/thiswillbeyourgithub/website_link_checker): I needed to find the broken links on this website before visitors did.
- [srt_ai_translator](https://github.com/thiswillbeyourgithub/srt_ai_translator): I needed subtitles in a language that no one had translated them into.
- [GPU Docker Monitor](https://github.com/thiswillbeyourgithub/nvidia-smi-docker-matcher): I needed to know which container was taking up VRAM before restarting anything.
- [gradioSearcher](https://github.com/thiswillbeyourgithub/GradioSearcher): *[Unfinished]* I needed a simple interface to look inside the vector databases built by [wdoc](#wdoc).
- [systemd_last_run](https://github.com/thiswillbeyourgithub/systemd_last_run): I needed to spot systemd timers that had silently stopped running.
- [vps-backup](https://github.com/thiswillbeyourgithub/vps_backup): I needed compressed, timestamped backups of my VPS that only keep the last few copies.
- [iroh_send](https://github.com/thiswillbeyourgithub/iroh-send): I needed to send files and folders directly from one machine to another, with no intermediary server.
- [adb_newpipe_exporter](https://github.com/thiswillbeyourgithub/adb_newpipe_exporter): I needed to back up NewPipe's database from my computer, so this script drives the app's export menus over ADB.
- [autopassad](https://github.com/thiswillbeyourgithub/autopassad): I needed a script that spots "continue" or "skip" on screen with OCR and clicks it.
- [Umami Data Fetcher](https://github.com/thiswillbeyourgithub/umami_data_fetcher): I needed to save the privacy-preserving analytics of olicorne.org before umami.is deleted them after 6 months.
- [Home Assistant CalDAV client](https://github.com/thiswillbeyourgithub/Home-Assistant-CalDAV-client): I needed to say "I have to do the dishes" to Home Assistant and have it appear in my Nextcloud tasks.
- [LiteLLM Proxy OpenRouter Price Updater](https://github.com/thiswillbeyourgithub/litellm_proxy_openrouter_price_updater): *[Archived]* I needed accurate cost tracking in LiteLLM, whose OpenRouter prices lagged behind the real ones.
- [OpenRouter to Langfuse Model Pricing Sync](https://github.com/thiswillbeyourgithub/openrouter_cost_into_langfuse/): *[Archived]* I needed to track what my LLM calls actually cost, so this copies OpenRouter's prices into Langfuse.
- [git_scripts_keeper](https://github.com/thiswillbeyourgithub/git_scripts_keeper): I needed a history of changes in folders that no configuration tool tracked, so this commits them periodically.
- [OCR_with_format](https://github.com/thiswillbeyourgithub/OCR_with_format): I needed pytesseract to keep the text's layout and spacing instead of flattening it.
- [HumanReadableSeed](https://github.com/thiswillbeyourgithub/HumanReadableSeed): I needed to share an [edgevpn](https://github.com/mudler/edgevpn/) base64 token by voice or in writing, so this turns it into a checkable sequence of words.
- [PersistDict](https://github.com/thiswillbeyourgithub/PersistDict): I needed a dictionary-like cache that survives restarts for [wdoc](#wdoc), instead of relying on LangChain's.
- [whisper_audio_splitter](https://github.com/thiswillbeyourgithub/whisper_audio_splitter): I needed to record Anki cards out loud in one session, saying "stop" between each, and get one audio file per card.
- [corpus_matcher](https://github.com/thiswillbeyourgithub/corpus_matcher): I needed a library to find where a slightly altered piece of text came from in a large corpus.
- [speech.sh](https://github.com/thiswillbeyourgithub/speech.sh): I needed to type and have it read aloud when I suddenly lost my voice (made in 30 minutes).
- [OpenrouterModelFilter](https://github.com/thiswillbeyourgithub/OpenrouterModelFilter): I needed a filtered list of OpenRouter models.
- [iptables_rate_limit_modifier](https://github.com/thiswillbeyourgithub/iptables_rate_limit_modifier): I needed less aggressive rate limiting in UFW.
- [Load_Average_Balancer.sh](https://github.com/thiswillbeyourgithub/load_average_balancer): I needed to delay heavy tasks while the CPU was busy.
- [PDF_batch_decryptor](https://github.com/thiswillbeyourgithub/PDF_batch_decryptor): I needed to decrypt many PDFs in bulk.
- [Spotify_tts](https://github.com/thiswillbeyourgithub/Spotify_tts): I wanted to learn the titles of the songs I was listening to without looking at the screen.
- [ufw_auto_ssh_whitelist](https://github.com/thiswillbeyourgithub/ufw_auto_ssh_whitelist): I needed to allow my current SSH IP through the firewall when prompted, and clean those rules up after 30 days.
- [ufw_block_analyzer](https://github.com/thiswillbeyourgithub/ufw_block_analyzer): I needed to map blocked connections in the UFW logs back to the Docker Compose project they came from.
- [btrfs_cow_disabler](https://github.com/thiswillbeyourgithub/BTRFS_CoW_Disabler): *[Archived]* I needed to disable Copy-on-Write on existing Btrfs files by copying them to new files with checksum verification.
- [docker_volume_backup](https://github.com/thiswillbeyourgithub/docker_volume_backup): I needed to back up a container's volumes safely, stopping it during the copy and restarting it afterwards.
- [ShellArgParser](https://github.com/thiswillbeyourgithub/ShellArgParser): I needed a one-liner that turns Python-style arguments into shell variables, because parsing arguments in shell annoyed me.
- [IndexableNewsboat](https://github.com/thiswillbeyourgithub/IndexableNewsboat): I needed my [newsboat](https://newsboat.org/) RSS entries to be searchable with a desktop search engine like [Recoll](https://www.lesbonscomptes.com/recoll/).
- [MediaDurationRecursiveChecker](https://github.com/thiswillbeyourgithub/MediaDurationRecursiveChecker): My partner, who works in video production, needed to know the total duration of the footage on a hard drive.
- [MediaMetadataExtractor](https://github.com/thiswillbeyourgithub/MediaMetadataExtractor): My partner also needed the technical metadata of large batches of video files, without opening them one by one.
- [MediaSizeOrHashMatcher](https://github.com/thiswillbeyourgithub/MediaSizeOrHashMatcher): I needed to find which video files in one folder already existed in another, even under a different name.
- [llm_agent](https://github.com/thiswillbeyourgithub/llm_agent): *[Archived]* I wanted to see whether a simple LangChain agent could be added to Simon Willison's [llm](https://llm.datasette.io/) command-line tool.
- [fancontrol_autohealing_config](https://github.com/thiswillbeyourgithub/fancontrol_autohealing_config): My fan control stopped working after reboots because Linux renumbered the hwmon devices.
- [prompt_GPT3](https://github.com/thiswillbeyourgithub/prompt_GPT3): *[Archived]* I needed a quick way to create Anki cloze cards and translations from the terminal with GPT-3.
- [pdfannots](https://github.com/thiswillbeyourgithub/pdfannots): A fork I made to adapt the extraction of PDF highlights and comments to my own note-taking.

## Others
*8 projects so far*
- [FUTOmeter](https://github.com/thiswillbeyourgithub/FUTOmeter): *[Idea]* I wanted to sketch a privacy-preserving way for FOSS apps to measure usage locally and show well-timed donation prompts, in the spirit of FUTO.

---

# Code Contributions
This is a short list of some projects I contributed to. It can be code, documentation, ideas, etc. It can be anything from small contributions to large projects to many small contributions.
*Disclaimer: In some cases I counted contributions that were not merged because it helped the project one way or another.*

- [openai](https://github.com/openai/openai-python/pull/733/files): fixed a long standing bug related to whisper when given some type of audio files.
- [joblib](https://github.com/joblib/joblib/pull/1613): fixed and clarified some behaviors related to cache expiration
- [open-webui](https://github.com/open-webui/open-webui/pulls?q=author%3Athiswillbeyourgithub+): backend, frontend, bug reports, doc, ...
- [karakeep](https://github.com/karakeep-app/karakeep/pulls?q=author%3Athiswillbeyourgithub+): backend, frontend, bounties, bug reports, doc, ...
- [i3](https://github.com/i3/i3/pull/6438): bugfix that was spamming my logs and hurting my SSDs.
- [mwmbl](https://github.com/mwmbl/mwmbl/pulls?q=author%3Athiswillbeyourgithub+): Documentation and code mostly related to backend (changing the entire db to [LMDB](https://en.wikipedia.org/wiki/Lightning_Memory-Mapped_Database), improving performance by changing various libs, ideas about decentralizing, ...)
- [academicpages.github.io](https://github.com/academicpages/academicpages.github.io/issues?q=thiswillbeyourgithub): This entire website is a fork of academicpages. I contributed somewhat over time.
- ...

You can browse [all the GitHub issues I created](https://github.com/search?q=author%3Athiswillbeyourgithub+&type=issues&query=author%3Athiswillbeyourgithub+is%3Aissue&s=created&o=desc).

You can browse [all the GitHub pull requests I created](https://github.com/search?q=author%3Athiswillbeyourgithub+&type=pullrequests&query=author%3Athiswillbeyourgithub+is%3Aissue&s=created&o=desc).
