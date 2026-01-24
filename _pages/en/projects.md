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

My code repositories are hosted on [github](https://github.com/thiswillbeyourgithub/):

[![(click if this doesn't load)](https://gstats.olicorne.org)](https://uncached.gstats.olicorne.org)

*Individual project count on this page: 104*


*I would never have been able to write code without the open source movement, the countless tutorials shared freely online, and the culture of publishing source code and scripts. I am deeply grateful to everyone who has contributed to making programming knowledge accessible. These projects are my attempt to give back and help others on their journey, just as so many have helped me.*
{: .notice--info}

<details><summary><i>A note on what I call "projects"</i></summary>
<ul>
    <li><i>I count as "project" only what I made myself. Hence it does not include my code contributions to other projects. See at <a href="#code-contributions">the bottom</a> if you want to read some of my contributions.</i></li>
</ul>
</details>

<details><summary><i>A note on authorship</i></summary>
<ul>
    <li><i>Although I've been using AI for many years, I didn't use it for coding until circa 2024. Since then, when I want AI-based assistance I almost exclusively use <a href="https://aider.chat/">aider</a> with the <b>--attribute-author</b> argument so you can see which projects and commits where done with or without it.</i></li>
    <li><i>As of December 2025 aider seems to have been unmaintained for months but I'm not sure which replacement to use in the future.</i></li>
</ul>
</details>

<details><summary><i>A note on licensing</i></summary>
<ul>
    <li><i>Most if not all of my projects are released under the <a href="https://www.gnu.org/licenses/agpl-3.0.en.html">AGPLv3 license</a>. Previously I used almost exclusively the <a href="https://www.gnu.org/licenses/gpl-3.0.en.html">GPLv3 license</a>.</i></li>
</ul>
</details>

<br>

{% include toc_wide %}

## Medicine & Computer Science
*17 projects so far*
- [Open-WebUI Knowledge Zotero Sync](https://github.com/thiswillbeyourgithub/openwebui-knowledge-zotero-sync): synchronizes zotero or a directory to a knowledge base in [OpenWebUI](https://docs.openwebui.com/). To be more efficient when catching up on recent psychiatry research.
- [Parakeet Web](https://github.com/thiswillbeyourgithub/parakeet_web): **WIP** voice transcription directly inside the browser (no data sent to any server). Working on a french medical finetuned model.
- [ICD-11_to_Langchain_Documents](https://github.com/thiswillbeyourgithub/ICD-11_to_langchain): Convert ICD-11 data into langchain Document objects for enhanced retrieval and search applications. To make a [gradioSearcher](https://github.com/thiswillbeyourgithub/GradioSearcher)-based search engine for ICD-11 classification codes.
- [PrevMed](https://github.com/PrevMedOrg/PrevMed) (short for *Preventive Medicine*): A minimalist platform enabling non-technical users to create clinical questionnaires without storing personal data. *Note: I was paid to design then build this solution.*
- [QuestEA](https://github.com/thiswillbeyourgithub/QuestEA): Research project merging numerical survey responses with semantic question embeddings to enhance patient data analysis and uncover hidden patterns in medical questionnaires.
- [wdoc](https://github.com/thiswillbeyourgithub/wdoc): Multi-modal document querying and summarization system integrating diverse content types with advanced [RAG](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) capabilities and LLM-powered semantic processing for comprehensive information extraction.
    - [OmniQA](https://github.com/thiswillbeyourgithub/OmniQA): Document indexing tool for seamless querying of any file format using large language models and vector search technology. Was superseeded by **wdoc**.
- [repeng-research-fork](https://github.com/thiswillbeyourgithub/repeng-research-fork): fork of [repeng](https://github.com/vgel/repeng/) by [@vgel](https://github.com/vgel), to try to investigate personal theories about LLMs. This is relevant for LLM interpretability.
- `REDACTED NAME`: A private repo (but hopefully later open source) library to comprehensively use *all* of [scikit-learn](https://scikit-learn.org/)'s clustering techniques on any data then running *all* metrics with a complex plot pipelines to pick the best results. This is less easy than it sounds because clustering have varying types of outputs, not all allow inference, some metrics are intrinsic while others are based on labels, clusters can be fuzzy, can have to be merged or split, need to be remapped etc. Subject of my M1 internship at [NeuroSpin](https://fr.wikipedia.org/wiki/NeuroSpin).
- [sleep_tracker_pinetime](https://github.com/thiswillbeyourgithub/SleepTk_pinetime_sleep_tracker): Smartwatch app for optimal wake up vibration patterns to wake up feeling fresh. Been using this every night for years (since about 2021, as of 2026).
- [Stahl Ankifier](https://github.com/thiswillbeyourgithub/StahlAnkifier): Convert the book `Prescriber's Guide - Stahl's Essential Psychopharmacology` PDF into [Anki flashcards](https://apps.ankiweb.net/) to make better psychiatrists.
- [gradio_pharmacokinetic_simulator](https://github.com/thiswillbeyourgithub/gradio_pharmacokinetic_simulator): Pharmacokinetic simulation tool to help me improve my intuition about drug accumulation.
    - [med-pharmacokinetic-simulator](https://github.com/thiswillbeyourgithub/Med-pharmacokinetic-simulator): Its predecessor many years prior. One of my very first coding projects!
- [ADHD_european_drug_map](https://github.com/thiswillbeyourgithub/ADHD-european-drug-map): Data visualization tool for tracking and mapping the availability of ADHD medications across European countries using official EMA data sources.
- KnQuant (not yet pushed): Advanced text processing library that converts unstructured text into searchable knowledge triplets using multi-modal embeddings and parallel processing architecture.
- [Beta-Variational-Autoencoder](https://github.com/thiswillbeyourgithub/Beta-Variational-Autoencoder): Deep learning model implementing beta-variational autoencoder architecture for dimensionality reduction and data compression using the scikit-learn API.
- [GridSearchReductor](https://github.com/thiswillbeyourgithub/GridSearchReductor): Statistical optimization tool leveraging stratified sampling to reduce parameter search space while maintaining effective parameter coverage in experiments. Vibecoded.

## Anki
*[Anki](https://github.com/ankitects/anki/) is an open source flashcard/spaced repetition memorization system*
*14 projects so far*

- [Stahl Ankifier](https://github.com/thiswillbeyourgithub/StahlAnkifier): *See above*
- [Voice2Anki](https://github.com/thiswillbeyourgithub/Voice2Anki): Universal language learning tool combining speech recognition and AI to automatically generate and manage personalized flashcards from voice recordings with adaptive formatting and intelligent memory features.
- [AnkiAiUtils](https://github.com/thiswillbeyourgithub/AnkiAIUtils)): Advanced toolkit that enhances Anki flashcards through automated AI-powered generation of explanations, mnemonics, illustrations and reformulations, with support for personalized memory systems and semantic similarity matching.
- [AnnA_anki_neuronal_Appendix](https://github.com/thiswillbeyourgithub/AnnA_Anki_neuronal_Appendix): Machine learning system that optimizes Anki flashcard review order by analyzing semantic similarities to prevent reviewing related cards together, improving retention while reducing daily workload.
- [py_ankiconnect](https://github.com/thiswillbeyourgithub/py_ankiconnect): Library that simplifies interaction with Anki flashcard software through its AnkiConnect API, offering both command-line and Python interfaces.
- [AnkiAutoMindmap](https://github.com/thiswillbeyourgithub/AnkiAutoMindmap): Tool for automated generation of mindmaps and mermaid diagrams based on Anki flashcard content and tag hierarchies.
- [i3_seach_anki_collection](https://github.com/thiswillbeyourgithub/i3_search_anki_collection): Integration tool enabling quick Anki flashcard searches directly from the i3 window manager interface.
- [HapaxPredator](https://github.com/thiswillbeyourgithub/HapaxPredator): Text analysis tool for identifying and displaying word frequencies in Anki flashcards to detect potential misspellings and facilitate natural language processing tasks.
- [IndexableAnki](https://github.com/thiswillbeyourgithub/IndexableAnki): Tool that converts Anki flashcards into searchable text files for desktop search engine integration.
- [anki_PrioriTag](https://github.com/thiswillbeyourgithub/anki_Prioritag): Tool for automatically prioritizing Anki flashcard reviews by analyzing tag-based failure patterns and generating targeted filtered decks for optimal learning efficiency.
- [anki_autobury_added_today](https://github.com/thiswillbeyourgithub/anki_autobury_added_today): Automation utility that identifies and buries newly added Anki cards to prevent them from appearing in the same study session.
- [Anki Semantic Search](https://github.com/thiswillbeyourgithub/Anki-Semantic-Search): Semantic search engine utilizing fastText's multilingual word vectors to intelligently search through Anki flashcard collections based on meaning rather than exact matches.
- [pdf2anki](https://github.com/thiswillbeyourgithub/pdf2anki): Tool for batch-converting PDF documents into Anki flashcards with searchable text and page images, enabling multi-keyword search across PDF content within Anki's interface.
- [clozolkor](https://github.com/thiswillbeyourgithub/Clozolkor): Advanced spaced repetition flashcard template enabling sequential reveal of cloze deletions with customizable hints, shortcuts, and cross-platform compatibility.

## Karakeep
*[Karakeep](https://github.com/karakeep-app/karakeep) is an open source read it later app*
*3 projects so far*

- [karakeep_python_api](https://github.com/thiswillbeyourgithub/karakeep_python_api): Python interface and command-line tool providing comprehensive access to Karakeep's bookmarking API with automated testing, data validation, and community-contributed scripts.
- [Karanki](https://github.com/thiswillbeyourgithub/Karanki): Bidirectional synchronization tool for automating flashcard creation from highlights with color-coded retention levels and intelligent state tracking capabilities.
- [freshrss_to_karakeep](https://github.com/thiswillbeyourgithub/freshrss_to_karakeep): Integration tool connecting FreshRSS RSS reader with Karakeep bookmarking service for automated content curation and seamless article transfer between platforms.

## Logseq
*[Logseq](https://github.com/logseq/logseq) is an open source PKM (Personal Knowledge Management) app*
*4 projects so far*

- [LogseqMarkdownParser](https://github.com/thiswillbeyourgithub/LogseqMarkdownParser): Parser and utility library supporting seamless reading, manipulation and export of Logseq markdown files with properties and blocks.
- [wallabag_to_logseq_and_omnivore](https://github.com/thiswillbeyourgithub/wallabag_to_logseq_and_omnivore): Python script for seamless migration of articles and highlights from Wallabag to Logseq and Omnivore reading platforms, ensuring continuity of reading history and annotations.
- [LogseqPDFImporter](https://github.com/thiswillbeyourgithub/LogseqPDFImporter): Tool for importing and converting PDF annotations from various PDF readers into Logseq's native format, preserving highlights, colors, and area annotations.
- [MdXLogseqTODOSync](https://github.com/thiswillbeyourgithub/MdXLogseqTODOSync): Synchronization tool for maintaining TODO items across different markdown file formats with support for pattern filtering, custom delimiters, and nested bullet point preservation.

## Open-WebUI
*[Open-WebUI](https://github.com/open-webui/open-webui/issues) is a self hosted AI platform*
*1 project so far*

- [openwebui_custom_pipes_filters](https://github.com/thiswillbeyourgithub/openwebui_custom_pipes_filters): Comprehensive suite of custom filters, tools, and pipes designed to enhance OpenWebUI's functionality with message tracking, cost monitoring, and extended chat capabilities.

## Smartwatch
*Mainly for [wasp-os](https://github.com/wasp-os/wasp-os) on the [pinetime](https://pine64.org/devices/pinetime/)*
*2 projects so far*

- [sleep_tracker_pinetime](https://github.com/thiswillbeyourgithub/SleepTk_pinetime_sleep_tracker):  *See above*
- [pomodoro_wasp_os](https://github.com/thiswillbeyourgithub/Pomodoro-wasp-os): Customizable Pomodoro timer application for PineTime smartwatches featuring multiple presets, vibration patterns, and persistent settings.

## API
*I made my own "reference" libraries to make my other projects more interoperable*
*4 projects so far*

- [freshrss_python_api](https://github.com/thiswillbeyourgithub/freshrss_python_api): Python wrapper and API client for the FreshRSS Fever API, enabling programmatic management of RSS feeds, items, and categories with robust error handling and type safety.
- [caldav_tasks_api](https://github.com/thiswillbeyourgithub/Caldav-Tasks-API): Python library and CLI tool for advanced CalDAV task management with features like task synchronization, ELO-based prioritization, and comprehensive task manipulation capabilities.
- [karakeep_python_api](https://github.com/thiswillbeyourgithub/karakeep_python_api): *See above*
- [py_ankiconnect](https://github.com/thiswillbeyourgithub/py_ankiconnect): *See above*

## Productivity
*Tools I use, used or made*
*14 projects so far*

- [MacroMaker](https://github.com/thiswillbeyourgithub/MacroMaker): Record, store, and replay mouse automation sequences with integrated OCR.
- [save_to_zotero](https://github.com/thiswillbeyourgithub/save_to_zotero): Advanced command-line tool for automated webpage archival to PDF with metadata extraction and seamless integration into Zotero's reference management system across multiple devices.
- [mini_LiTOY](https://github.com/thiswillbeyourgithub/mini_LiTOY): Minimalist implementation of the ELO-based task prioritization algorithm, enabling automated ranking of to-do lists through interactive comparisons and score calculations.
    - [LiTOY](https://github.com/thiswillbeyourgithub/LiTOY-aka-List-that-Outlives-You): Smart prioritization tool utilizing pairwise comparisons and ELO ratings to rank personal goals based on importance and time investment.
- [BrownieCutter](https://github.com/thiswillbeyourgithub/BrownieCutter): Template generator for Python projects that automates boilerplate code creation and project structure setup with customizable configurations.
    - Archived because my main setup now involves [aider](https://aider.chat) instead.
- [zsh-ai](https://github.com/thiswillbeyourgithub/zsh-ai): Terminal companion that leverages AI language models to suggest and explain shell commands based on natural language queries with fuzzy-finder integration.
- [HAL](https://github.com/thiswillbeyourgithub/HAL): Email summarization and labeling tool that processes daily incoming messages, leveraging LLMs to generate concise summaries and assign categorization labels while maintaining robust security measures and cost controls.
- [github_discussion_parser](https://github.com/thiswillbeyourgithub/github_discussion_parser): Parser tool that extracts and formats GitHub repository discussions into XML-like Markdown files optimized for Large Language Model processing.
- [systemd_unit_maker](https://github.com/thiswillbeyourgithub/systemd_unit_maker): Command-line automation tool for generating and managing systemd service and timer units with customizable templates and interactive configuration options.
- [SAIC (SimpleAICommits)](https://github.com/thiswillbeyourgithub/SimpleAICcommits): Command line tool leveraging OpenAI models to automatically generate semantic commit messages based on git diffs and commit history.
- [Quick_Whisper_Typer](https://github.com/thiswillbeyourgithub/Quick-Whisper-Typer): Speech recognition tool for hands-free text input, voice commands processing, and AI conversation, featuring low-latency transcription and multilingual support.
- [simple_voice_chat](https://github.com/thiswillbeyourgithub/simple_voice_chat): Conversational interface integrating various speech-to-text, language model, and text-to-speech services for real-time voice interactions with AI assistants.
- [AiderBuilder](https://github.com/thiswillbeyourgithub/AiderBuilder): Minimal script and prompt to give [aider.chat](https://aider.chat/) some autonomy by running in a loop and coordinating with itself using a text file.

## "Rot" tools
*Tools leveraging deterministic time-based codes*
*3 projects so far*

- [wormrot.sh](https://github.com/thiswillbeyourgithub/wormrot.sh): Secure file transfer automation system using time-synchronized codes and a shared secret for seamless transmission between trusted devices.
- [fowlrot.sh](https://github.com/thiswillbeyourgithub/fowlrot.sh): Time-based code generation system for secure peer-to-peer connections using synchronized, deterministic codes derived from pre-shared secrets.
- [knockd_rotator](https://github.com/thiswillbeyourgithub/knockd_rotator): Security enhancement to port knocking via time-based sequence rotation and synchronization between client and server, leveraging shared secrets and deterministic generation to prevent replay attacks.

## Ntfy
*[ntfy.sh](https://ntfy.sh) makes it easy to send and receive notifications, I use it a lot for monitoring*
*8 projects so far*

- [ntfy_nmap_watcher](https://github.com/thiswillbeyourgithub/ntfy_nmap_watcher): Monitor external server ports with automated nmap scans and instant notifications for UFW configuration changes.
- [Daily_Fact_Ntfy](https://github.com/thiswillbeyourgithub/Daily_Fact_Ntfy): Notification system that generates and delivers AI-powered interesting facts about user-specified topics through ntfy.sh at randomized intervals.
- [Ntfy_CSV_Reminders](https://github.com/thiswillbeyourgithub/Ntfy_CSV_Reminders): Probability-based notification system for managing recurring tasks with randomized timing to prevent notification fatigue.
- [ntfy_systemd](https://github.com/thiswillbeyourgithub/ntfy_systemd): Monitoring system that tracks systemd service failures and sends instant notifications through ntfy with detailed status reports.
- [ntfy_syncthing_conflict_checker](https://github.com/thiswillbeyourgithub/ntfy_syncthing_conflict_checker): Monitoring tool for detecting and reporting file conflicts in Syncthing shared folders with support for local and remote notifications.
- [ntfy_fail2ban](https://github.com/thiswillbeyourgithub/ntfy_fail2ban): Security monitoring tool that integrates Fail2Ban with ntfy.sh to deliver real-time notifications about potential intrusion attempts and IP blocks.
- [weather_notifier](https://github.com/thiswillbeyourgithub/weather_notifier): Weather notification system that monitors rainfall forecasts and temperature variations while delivering mobile alerts through ntfy.sh integration.
- [allocine_checker](https://github.com/thiswillbeyourgithub/Allocine_Checker): Movie monitoring tool that automatically checks theater listings for specific films and sends notifications when they become available.

## Miscellaneous Tools
*37 projects so far*
- [Website Link Checker](https://github.com/thiswillbeyourgithub/website_link_checker): Python CLI tool for crawling websites to identify and report broken links, with features like rate limiting and regex filtering.
- [srt_ai_translator](https://github.com/thiswillbeyourgithub/srt_ai_translator): A subtitle translator leveraging OpenAI-compatible APIs for context-aware and efficient SRT translations.
- [GPU Docker Monitor](https://github.com/thiswillbeyourgithub/nvidia-smi-docker-matcher): Efficiently map GPU processes to Docker containers for easier resource management.
- [gradioSearcher](https://github.com/thiswillbeyourgithub/GradioSearcher): A Gradio GUI tool for searching FAISS vector databases.
- [systemd_last_run](https://github.com/thiswillbeyourgithub/systemd_last_run): Command-line tool for querying and displaying the last run times of systemd units with sorting options.
- [vps-backup](https://github.com/thiswillbeyourgithub/vps_backup): Simple script for creating compressed tar backups on a VPS with automatic rotation and timestamping.
- [iroh_send](https://github.com/thiswillbeyourgithub/iroh-send): a script using [iroh](https://github.com/n0-computer/iroh) to easily send files or directories from one device to another.
- [adb_newpipe_exporter](https://github.com/thiswillbeyourgithub/adb_newpipe_exporter): An adb script to automatically export your [NewPipe](https://github.com/TeamNewPipe/NewPipe) db.
- [autopassad](https://github.com/thiswillbeyourgithub/autopassad): A (hopefully) cross platform python script to automatically click on 'skip' or 'continue' on ads.
- [Umami Data Fetcher](https://github.com/thiswillbeyourgithub/umami_data_fetcher): A CLI tool to backup and save [Umami](https://umami.is) analytics data in multiple formats with automatic resume, logging, and multi-website support. This was made to store the privacy preserving analytics for olicorne.org, as umami.is deletes data after 6 months.
- [Home Assistant CalDAV client](https://github.com/thiswillbeyourgithub/Home-Assistant-CalDAV-client): A CalDAV client for automating task management with Home Assistant, Nextcloud, and voice commands.
- [LiteLLM Proxy OpenRouter Price Updater](https://github.com/thiswillbeyourgithub/litellm_proxy_openrouter_price_updater): CLI tool for updating [LiteLLM](https://github.com/BerriAI/litellm) proxy pricing configurations using [OpenRouter](https://openrouter.ai/) API data.
- [OpenRouter to Langfuse Model Pricing Sync](https://github.com/thiswillbeyourgithub/openrouter_cost_into_langfuse/): A Python script that automatically syncs model pricing data from [OpenRouter](https://openrouter.ai/) to Langfuse's pricing page.
- [git_scripts_keeper](https://github.com/thiswillbeyourgithub/git_scripts_keeper): Automated version control utility for tracking and committing changes across multiple Git repositories through periodic monitoring and auto-generated commit messages.
- [OCR_with_format](https://github.com/thiswillbeyourgithub/OCR_with_format): OCR tool using pytesseract to maintain original text formatting and spacing while performing optical character recognition on images.
- [HumanReadableSeed](https://github.com/thiswillbeyourgithub/HumanReadableSeed): Bidirectional conversion tool transforming cryptographic tokens into human-readable word sequences while ensuring data integrity through automatic verification checks.
- [PersistDict](https://github.com/thiswillbeyourgithub/PersistDict): Thread-safe persistent dictionary implementation with automatic expiration, metadata tracking, and customizable serialization using LMDB as backend storage.
- [whisper_audio_splitter](https://github.com/thiswillbeyourgithub/whisper_audio_splitter): Speech-to-text based audio splitting tool that automatically segments audio files at detected keywords while supporting multiple STT backends and parallel processing capabilities.
- [corpus_matcher](https://github.com/thiswillbeyourgithub/corpus_matcher): Optimized substring matching library utilizing dual-algorithm approach with parallel processing and configurable parameters for efficient text search in large corpora.
- [speech.sh](https://github.com/thiswillbeyourgithub/speech.sh): Text-to-speech interface utilizing OpenAI's API with caching capabilities and system-wide integration options for Linux environments.
- [OpenrouterModelFilter](https://github.com/thiswillbeyourgithub/OpenrouterModelFilter): Command-line utility for filtering and sorting OpenRouter API models based on customizable criteria such as pricing, context length, and model characteristics.
- [iptables_rate_limit_modifier](https://github.com/thiswillbeyourgithub/iptables_rate_limit_modifier): Network management tool that automatically adjusts rate-limiting thresholds in iptables rules to prevent false positives while maintaining security against malicious traffic.
- [Load_Average_Balancer.sh](https://github.com/thiswillbeyourgithub/load_average_balancer): System resource management tool for delaying CPU-intensive tasks until optimal load conditions are met, integrating with backup solutions like restic.
- [PDF_batch_decryptor](https://github.com/thiswillbeyourgithub/PDF_batch_decryptor): Command-line tool for automated decryption of multiple password-protected PDF files using qpdf and pdfinfo utilities.
- [Spotify_tts](https://github.com/thiswillbeyourgithub/Spotify_tts): Music player companion that announces currently playing tracks using either basic or AI-powered text-to-speech synthesis.
- [ufw_auto_ssh_whitelist](https://github.com/thiswillbeyourgithub/ufw_auto_ssh_whitelist): Automated firewall management system for SSH connections with dynamic whitelisting and rule cleanup capabilities.
- [ufw_block_analyzer](https://github.com/thiswillbeyourgithub/ufw_block_analyzer): Real-time monitoring and analysis system for UFW firewall logs with Docker network context enrichment and structured TOML output.
- [btrfs_cow_disabler](https://github.com/thiswillbeyourgithub/BTRFS_CoW_Disabler): Command-line utility for disabling Copy-on-Write functionality on Btrfs filesystems through atomic file operations and checksum verification.
- [docker_volume_backup](https://github.com/thiswillbeyourgithub/docker_volume_backup): Robust data backup solution for Docker containers with automated volume management, container state handling, and detailed logging capabilities.
- [ShellArgParser](https://github.com/thiswillbeyourgithub/ShellArgParser): Command-line utility for converting Python-style arguments into shell environment variables, simplifying argument parsing in shell scripts.
- [IndexableNewsboat](https://github.com/thiswillbeyourgithub/IndexableNewsboat): Command line tool that exports RSS entries from Newsboat into text files for seamless integration with desktop search engines.
- [MediaDurationRecursiveChecker](https://github.com/thiswillbeyourgithub/MediaDurationRecursiveChecker): Media duration analysis tool that recursively scans directories to calculate total duration and size of media files while providing real-time processing estimates. Also as a MacOS app.
- [MediaMetadataExtractor](https://github.com/thiswillbeyourgithub/MediaMetadataExtractor): Metadata extraction tool for media files that provides comprehensive technical information in Excel and JSON formats, supporting various video and audio formats with a user-friendly GUI interface. Also as a MacOS app.
- [MediaSizeOrHashMatcher](https://github.com/thiswillbeyourgithub/MediaSizeOrHashMatcher): Media file comparison tool utilizing size-based matching and parallel hash computation for efficient duplicate detection across directories. Also as a MacOS app.
- [llm_agent](https://github.com/thiswillbeyourgithub/llm_agent): Plugin system enabling intelligent task automation through multiple search engines, autonomous web browsing, file manipulation, and shell access with built-in safety controls and persistent memory capabilities.
- [fancontrol_autohealing_config](https://github.com/thiswillbeyourgithub/fancontrol_autohealing_config): Configuration parser and updater that maintains fan control settings across system reboots by automatically detecting and adjusting hardware monitoring device numbers.
- [prompt_GPT3](https://github.com/thiswillbeyourgithub/prompt_GPT3): Command-line interface for OpenAI's GPT-3 featuring conversation logging, vim mode, and specialized modes for flashcard creation and translation tasks.
- [pdfannots](https://github.com/thiswillbeyourgithub/pdfannots): Text extraction tool for PDF documents that processes annotations, highlights, and comments into formatted Markdown, JSON, or EDN outputs for academic paper reviews and document analysis.

## Others
*1 project so far*
- [FUTOmeter](https://github.com/thiswillbeyourgithub/FUTOmeter): Library suite for privacy-preserving usage tracking and context-aware donation prompts in FOSS applications, enabling sustainable funding through data-driven user engagement metrics.

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

If you're interested in all the issues I created: [click here](https://github.com/search?q=author%3Athiswillbeyourgithub+&type=issues&query=author%3Athiswillbeyourgithub+is%3Aissue&s=created&o=desc).

If you're interested in all the pull requests I created: [click here](https://github.com/search?q=author%3Athiswillbeyourgithub+&type=pullrequests&query=author%3Athiswillbeyourgithub+is%3Aissue&s=created&o=desc).
