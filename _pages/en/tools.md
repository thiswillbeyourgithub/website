---
title: "Tools"
lang: en
ref: tools
permalink: /en/tools
redirect_from:
    - /tools
---

{% include base_path %}

On this page, I try to keep track of resource I think can be useful to psychiatry residents. In each section, I try my best to order by most important first.

{% include toc_wide %}

# Helper tools
- I built [neurarium](https://neurarium.olicorne.org/?lang=en): what started as a 3D neuroanatomy viewer is now an interactive, source-graded atlas of the human brain, mapping anatomy, wiring, receptors and psychiatric/recreational drugs onto one rotatable, searchable model. You can explode and peel the anatomy, trace neuron projections as color-coded arrows by type (excitatory, inhibitory, dopaminergic), and see how a given drug or receptor lights up and animates the structures it touches, with each detail panel linking outward to related nodes. A single search covers regions, pathways, receptors and drugs at once, every view is shareable as a deep link, and every node carries a provenance grade indicating how well-sourced it is. It stays deliberately framework-free: vanilla JavaScript and locally vendored [three.js](https://threejs.org/) with no build process, Python-generated data, served from a security-hardened Caddy container with a strict CSP. There's a public instance at [neurarium.olicorne.org](https://neurarium.olicorne.org/?lang=en) and the source is on [GitHub](https://github.com/thiswillbeyourgithub/neurarium).

  <a href="https://neurarium.olicorne.org/?lang=en"><img alt="neurarium" src="{{ base_path }}/images/neurarium.gif" onerror="this.onerror=null;this.src='https://raw.githubusercontent.com/thiswillbeyourgithub/neurarium/refs/heads/main/docs/images/screenshot.png';"></a>

- I made [WebSend](https://websend.olicorne.org): a browser-based, zero-install document scanner that lets you instantly transfer photos from your smartphone to any firewalled computer. Open the page on both devices, scan, done. No app, no cloud, no trace left behind. Under the hood: WebRTC end-to-end encryption, STUN/TURN/TURNS hole punching through corporate firewalls, and built-in cropping. The server either acts as a pure signaling relay (never touching your data) or, when direct peer-to-peer is impossible, forwards only fully encrypted blobs it cannot read. Running costs are negligible, so there's a free public instance at [websend.olicorne.org](https://websend.olicorne.org), and the source is on [GitHub](https://github.com/thiswillbeyourgithub/WebSend).


- I also made [Parakeet Web](https://github.com/thiswillbeyourgithub/parakeet_web): voice transcription directly inside the browser with a strong focus on privacy and security (no install, no data ever sent to any server). It runs on my own [SmoothQuant](https://github.com/mit-han-lab/smoothquant) [ONNX quantization of the model](https://huggingface.co/Olicorne/parakeet-tdt-0.6b-v3-smoothquant-onnx) ([discussion](https://github.com/Kieirra/murmure/issues/289#issuecomment-4636550052)) and my own phrase boosting implementation ([discussion](https://github.com/Kieirra/murmure/issues/338#issuecomment-4637778233)). I'm working on an improved medical model and better dictation features. There's a public instance at [parakeetweb.olicorne.org](https://parakeetweb.olicorne.org) (no ads, no tracking, no install, no accounts, completely free as in free beer and free speech).

- I made [justelesRCP](https://justelesrcp.olicorne.org): a fast, ad-free static site that makes the official French drug reference sheets (RCP, résumés des caractéristiques du produit, the regulator-approved documents describing each medication's indications, dosage and side effects) easier to consult, primarily for health professionals. Built from the public ANSM/BDPM open data, it covers roughly 15,600 medications, each a precomputed page with instant client-side search and A-Z browsing, no ads, no accounts, no tracking, served from a security-hardened, read-only Caddy container and hosted in France. There's a public instance at [justelesrcp.olicorne.org](https://justelesrcp.olicorne.org) and the source is on [GitHub](https://github.com/thiswillbeyourgithub/justelesRCP).

# Enzymatic interaction
- Seems rather complete and was recommended to me: [ClinPGx (formerly PharmGKB)](https://www.clinpgx.org/).
    - I noticed at least once a pretty wild oversimplification: the text on ClinPGx mentioned one cytochrome as being the main one, while the source actually explained that this one was actually the one that bound to the molecule the most but because it was less present it was actually not the main metabolizer of the given drug.
    - My conclusion is that the most reliable way to check enzymatic drug pathways is to use ClinPGx to reason but then read all the underlying sources's abstracts to reduce the chances of this happening again.
- Seemed promising, seems to cite sources extensively but not yet sure about exhaustivity, 2021 initially but updated twice a year apparently:
    - But: does not mention lamotrigin, and only a subset of the known venlafaxin interactions.
    - [Drug Interaction Flockhart Table](https://medicine.iu.edu/internal-medicine/specialties/clinical-pharmacology/drug-interaction-flockhart-table)
        - [https://drug-interactions.medicine.iu.edu/main-table](https://drug-interactions.medicine.iu.edu/main-table)
        - [https://drug-interactions.medicine.iu.edu/search](https://drug-interactions.medicine.iu.edu/search)
- In French from switzerland:
    - Good table, was often recommended to me, 2017: [Interactions médicamenteuses, cytochromes P450 et P-glycoprotéine (Pgp)](https://www.hug.ch/sites/interhug/files/structures/pharmacologie_et_toxicologie_cliniques/a5_cytochromes_6_2.pdf)
    - Only about antidepressants, 2013: [Dosage plasmatique des médicaments antidépresseurs](https://www.revmed.ch/revue-medicale-suisse/2013/revue-medicale-suisse-377/dosage-plasmatique-des-medicaments-antidepresseurs)
- This research website seemed to contain promising tools but they seemed to handle pretty badly their HTTPS certificates, 2020:
    - [https://insilico-cyp.charite.de/SuperCYPsPred/](https://insilico-cyp.charite.de/SuperCYPsPred/)


# General drug information
- [ClinPGx (formerly PharmGKB)](https://www.clinpgx.org/) ([described above](#enzymatic-interaction)).
- The `Resume des Caracteristiques du Produit` accessed through the [Base de donnee publique du medicament](https://base-donnees-publique.medicaments.gouv.fr/).
- [Vidal](https://www.vidal.fr/) as well as [Hoptimal Vidal](https://hoptimal.vidal.fr/) ("hospital" version).
- To know which drugs is unavailable to patients: [Disponibilité
des produits de santé](https://ansm.sante.fr/disponibilites-des-produits-de-sante/medicaments)

# Formulas and Scores

- [QTc calculation](https://www.psychopharma.fr/qtc) by [PsychoPharma.fr](https://www.psychopharma.fr).
