---
title: "Outils"
lang: fr
ref: tools
permalink: /fr/tools
redirect_from:
    - /outils
    - /fr/outils
---

{% include french_translation_disclaimer.md %}

{% include base_path %}

Sur cette page, j'essaie de garder une trace des ressources qui peuvent être utiles aux internes en psychiatrie. Dans chaque section, je fais de mon mieux pour ordonner par ordre d'importance.

{% include toc_wide %}

# Outils pratiques
*Certains de ces outils sont de moi ; leurs descriptions complètes sont sur [PROJETS](./projects). (Pour être clair : aucune donnée de patient n'est jamais impliquée, pas même anonymisée, et pas même sur des serveurs que j'héberge moi-même.)*

- J'ai fait [psychiatheque](https://psychiatheque.olicorne.org), une recherche dans les recommandations de psychiatrie qui affiche le passage correspondant sur sa page d'origine, pour lire la source elle-même plutôt qu'un résumé. [Instance publique](https://psychiatheque.olicorne.org), [code source du logiciel](https://github.com/thiswillbeyourgithub/justelesdocs).

- J'ai fait [justelesRCP](https://justelesrcp.olicorne.org) pour consulter plus vite les données des médicaments : les RCP officiels (données ouvertes ANSM/BDPM/EMA, environ 15 600 médicaments) sur un site rapide et sans publicité, avec une recherche en langage naturel basée sur l'IA. [Instance publique](https://justelesrcp.olicorne.org), [code source](https://github.com/thiswillbeyourgithub/justelesRCP).

- J'ai fait [neurarium](https://neurarium.olicorne.org/?lang=fr), un atlas de neuroanatomie en 3D couvrant les régions, les projections, les récepteurs, les psychotropes et leur métabolisme, avec un niveau de sourçage indiqué sur chaque entrée pour savoir ce qui est solide et ce qui l'est moins. [Instance publique](https://neurarium.olicorne.org/?lang=fr), [code source](https://github.com/thiswillbeyourgithub/neurarium).

  <a href="https://neurarium.olicorne.org/?lang=fr"><img alt="capture de neurarium" src="{{ base_path }}/images/neurarium.webp" onerror="this.onerror=null;this.src='https://raw.githubusercontent.com/thiswillbeyourgithub/neurarium/refs/heads/main/docs/images/preview.webp';"></a>

- J'ai fait [DrugsMap](https://drugsmap.olicorne.org/), à partir des données de [neurarium](https://neurarium.olicorne.org/?lang=fr), pour voir d'un coup d'œil quels psychotropes ont des profils de récepteurs proches, par exemple les antipsychotiques selon D2 vs 5-HT2A ou les antidépresseurs selon SERT vs NET. [Instance publique](https://drugsmap.olicorne.org/), [code source](https://github.com/thiswillbeyourgithub/neurarium/blob/main/public/drugs-map/README.fr.md).

  <a href="https://drugsmap.olicorne.org/#dmcat=antipsychotic_atypical,antipsychotic_conventional&dmmkt=0&dmtgt=aadc,comt,d1,d2,d3,d4,d5,dat,mao_b,vmat2,ache,bche,m1,m2,m3,m4,m5,nachr_a4b2,nachr_a7,h1,h2,h3,h4"><img alt="capture de DrugsMap" src="{{ base_path }}/images/drugsmap.fr.png" onerror="this.onerror=null;this.src='https://raw.githubusercontent.com/thiswillbeyourgithub/neurarium/refs/heads/main/public/drugs-map/screenshot.fr.png';"></a>

- Sur [pdf.olicorne.org](https://pdf.olicorne.org) j'héberge des outils PDF (rotation, suppression de pages, découpage, fusion, reconnaissance de texte, etc.) qui tournent entièrement dans votre navigateur : votre PDF n'atteint jamais un serveur. Il s'agit d'une instance de [BentoPDF](https://github.com/alam00000/bentopdf).

- J'ai fait [WebSend](https://websend.olicorne.org) pour numériser des documents sans scanner à plat : ouvrez la page sur votre téléphone et sur l'ordinateur, et la photo passe directement de l'un à l'autre, chiffrée de bout en bout. [Instance publique](https://websend.olicorne.org), [code source](https://github.com/thiswillbeyourgithub/WebSend).

- J'ai fait [Parakeet Web](https://parakeetweb.olicorne.org) pour transcrire la parole en texte sur des machines verrouillées : le modèle tourne dans le navigateur lui-même, donc rien n'est envoyé nulle part. Il peut charger un affinage médical français que j'ai entraîné ([modèle](https://huggingface.co/Olicorne/parakeet-tdt-0.6b-v3-UltiMed-onnx), à partir d'un [jeu de données](https://huggingface.co/datasets/Olicorne/UltiMed-ASR-FR-v1) ouvert que j'ai construit pour l'occasion) : **7-8x moins d'erreurs que le modèle de base sur le vocabulaire médical technique**, la parole ordinaire restant pour ainsi dire inchangée. Les deux sont sous licence libre, donc n'importe quelle équipe ou n'importe quel éditeur peut les réutiliser plutôt que de les refaire. [Instance publique](https://parakeetweb.olicorne.org), [code source](https://github.com/thiswillbeyourgithub/parakeet_web).

# Prescription

- [Recherche par indication française](https://www.psychopharma.fr/recherche) sur [PsychoPharma.fr](https://www.psychopharma.fr).
- [Équivalence entre benzodiazépines](https://www.psychopharma.fr/equivalence) sur [PsychoPharma.fr](https://www.psychopharma.fr).
- [Conversion mg/ml/gouttes](https://www.psychopharma.fr/conversion) sur [PsychoPharma.fr](https://www.psychopharma.fr).
- [Switch d'antidépresseurs](https://www.psychopharma.fr/switch) sur [PsychoPharma.fr](https://www.psychopharma.fr), et une version en anglais sur [Psychiatrienet](https://wiki.psychiatrienet.nl/wiki/SwitchAntidepressants). Les deux diffèrent parfois, il vaut donc la peine de vérifier les deux.
- Pour la prescription chez l'enfant et l'adolescent : [Pharmacologie SFPEADA](https://pharmacologie.sfpeada.fr), par la [Société Française de Psychiatrie de l'Enfant et de l'Adolescent](https://sfpeada.fr).

## Informations générales sur les médicaments
- [ClinPGx (anciennement PharmGKB)](https://www.clinpgx.org/) ([décrit ci-dessous](#interactions-enzymatiques)).
- Le `Résumé des Caractéristiques du Produit` accessible via la [Base de données publique du médicament](https://base-donnees-publique.medicaments.gouv.fr/).
- [Vidal](https://www.vidal.fr/) ainsi que [Hoptimal Vidal](https://hoptimal.vidal.fr/) (version « hôpital »).
- Pour savoir quels médicaments sont indisponibles aux patients : [Disponibilité des produits de santé](https://ansm.sante.fr/disponibilites-des-produits-de-sante/medicaments)
- Pour la pharmacologie des médicaments de neurologie et de psychiatrie : le site du [Collège National de Pharmacologie Médicale](https://pharmacomedicale.org/medicaments/par-specialites/category/neurologie-psychiatrie-3).

## Interactions enzymatiques
- [PharmFreq](https://pharmfreq.com/) : de jolis widgets qui cartographient la fréquence mondiale des variants pharmacogénétiques. Pratique pour estimer la probabilité d'un phénotype métaboliseur donné chez un patient selon l'origine géographique de sa famille.
- M'a été recommandé : [DDI-Predictor](https://www.ddi-predictor.org/), par les Hospices Civils de Lyon et / ou l'Université Claude Bernard Lyon I, Lyon, France.
- Semble plutôt complet et m'a été recommandé : [ClinPGx (anciennement PharmGKB)](https://www.clinpgx.org/).
    - J'ai remarqué au moins une fois une simplification assez importante : le texte sur ClinPGx mentionnait un cytochrome comme étant le principal, alors que la source expliquait en fait que celui-ci était celui qui se liait le plus à la molécule mais comme il était moins présent, il n'était en fait pas le principal métaboliseur du médicament donné.
    - Ma conclusion est que la manière la plus fiable de vérifier les voies enzymatiques des médicaments est d'utiliser ClinPGx pour raisonner mais ensuite de lire tous les résumés des sources sous-jacentes pour réduire les chances que cela se reproduise.
- [Drug Interaction Flockhart Table](https://medicine.iu.edu/internal-medicine/specialties/clinical-pharmacology/drug-interaction-flockhart-table) ([tableau principal](https://drug-interactions.medicine.iu.edu/main-table), [recherche](https://drug-interactions.medicine.iu.edu/search)) : initialement prometteur, semble citer les sources de manière systématique mais pas encore sûr de l'exhaustivité, 2021 initialement mais serait mis à jour 2 fois par an.
    - Mais : ne mentionne pas par exemple la lamotrigine, et seulement une partie des interactions enzymatiques connues de la venlafaxine.
- En français, de Suisse :
    - Bon tableau, m'a souvent été recommandé, 2017 : [Interactions médicamenteuses, cytochromes P450 et P-glycoprotéine (Pgp)](https://www.hug.ch/sites/interhug/files/structures/pharmacologie_et_toxicologie_cliniques/a5_cytochromes_6_2.pdf)
    - Uniquement sur les antidépresseurs, 2013 : [Dosage plasmatique des médicaments antidépresseurs](https://www.revmed.ch/revue-medicale-suisse/2013/revue-medicale-suisse-377/dosage-plasmatique-des-medicaments-antidepresseurs)
- [SuperCYPsPred](https://insilico-cyp.charite.de/SuperCYPsPred/), 2020 : ce site web de recherche semblait contenir des outils prometteurs mais ils semblaient mal gérer leurs certificats HTTPS.

## Effets indésirables

- [VigiAccess](https://www.vigiaccess.org/), par l'OMS ([accès aux données VigiBase](https://who-umc.org/vigibase-data-access/)) : effets indésirables des médicaments tels que déclarés dans le monde, par exemple pour vérifier si un médicament a déjà été impliqué dans des cas de catatonie. Il s'agit de déclarations spontanées, elles n'indiquent donc pas la fréquence d'un effet.

# Formules, échelles cliniques et scores

- [Calcul du QTc](https://www.psychopharma.fr/qtc) sur [PsychoPharma.fr](https://www.psychopharma.fr).
- [Calcul de la charge anticholinergique (ACBcalc)](https://www.acbcalc.com/).
- Pour la catatonie, j'ai trouvé très utiles les [vidéos de la BFCRS (Bush-Francis Catatonia Rating Scale)](https://www.urmc.rochester.edu/psychiatry/divisions/collaborative-care-and-wellness/bush-francis-catatonia-rating-scale/bfcrs) de l'Université de Rochester : chaque item de l'échelle est illustré par une vidéo, ce qui rend les signes bien plus faciles à reconnaître.

# Clinique
- Fiches de rappel du [Tutorat TECT](https://tutorat-tect.org/fiches-de-stage/), pratiques pour revoir les bases : [ECG](https://tutorat-tect.org/wp-content/uploads/fiches-stage/Fiche%20ECG.pdf) ([copie]({{ base_path }}/tutorat_TECT/Fiche%20ECG.pdf)), [radiologie thoracique](https://tutorat-tect.org/wp-content/uploads/fiches-stage/Fiche%20Radiologie%20Thoracique.pdf) ([copie]({{ base_path }}/tutorat_TECT/Fiche%20Radiologie%20Thoracique.pdf)), [biologie](https://tutorat-tect.org/wp-content/uploads/fiches-stage/Fiche%20Biologie.pdf) ([copie]({{ base_path }}/tutorat_TECT/Fiche%20Biologie.pdf)).

# Psychothérapie
- [TCC Montréal](https://tccmontreal.com/) : une très bonne ressource en français sur les thérapies cognitives et comportementales (TCC).

# Divers

- [Code de la santé publique : soins psychiatriques](https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072665/LEGISCTA000006155032/#LEGISCTA000024316521), les lois françaises encadrant les soins psychiatriques, sur Légifrance. Toujours utile d'avoir le cadre légal officiel sous la main.
    - Soins sans consentement à la demande d'un tiers ou en cas de péril imminent : [articles L3212-1 et suivants](https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072665/LEGISCTA000006171189/#LEGISCTA000024316653).
    - Soins sans consentement sur décision du représentant de l'État : [articles L3213-1 et suivants](https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006072665/LEGISCTA000006171188/#LEGISCTA000024316589).
    - Personne de confiance : [article L1111-6](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000054137811).
    - Secret médical : [article L1110-4](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000043895798), et la définition de l'équipe de soins : [article L1110-12](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000031919050).
- [History of Psychiatry](https://jillykid.github.io/psychiatric_timeline/), frise chronologique interactive par [jillykid](https://bsky.app/profile/jillykid.bsky.social) : psychopharmacologie, neurosciences et psychothérapie côte à côte, décennie par décennie.
