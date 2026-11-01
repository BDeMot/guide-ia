---
name: veille
description: Trouve les nouvelles publications des auteurs de référence du guide IA agentique en rapport avec la thèse du livre. Parcourt la file veille/a-consulter.yml et les sources de veille/sources.yml, lit chaque publication à la source, rédige les entrées proposées et un rapport, puis enchaîne sur la skill mise-a-jour. À utiliser quand Benjamin demande la veille, de chercher de nouveaux articles, ou lance /veille (éventuellement suivi d'un nom de source).
---

# Veille

Relire d'abord `CLAUDE.md`, en particulier la thèse (§2), la structure (§4), l'étape A (§6) et les principes de qualité (§7). La veille sert la thèse du livre, pas l'actualité : le but est la meilleure couverture intellectuelle, pas le plus grand nombre de liens.

Cette skill **trouve et rédige** ; elle ne modifie pas `content/`. L'intégration au guide est faite par la skill `mise-a-jour`, appelée à la fin.

Argument facultatif : un nom (ou une partie de nom) de source de `veille/sources.yml`. Sans argument, traiter la file puis toutes les sources.

## 1. Lister les candidats

Dans cet ordre :

1. **La file** : la section `publications:` de `veille/a-consulter.yml`. Ces publications ont déjà été jugées intéressantes ; les traiter en premier.
2. **Les flux** : `npm run feeds -- list [nom]`. Le script liste les publications postérieures à `derniere_veille` (1er janvier 2025 pour une source jamais examinée) et écarte celles déjà dans le corpus ou dans `veille/ecartees.yml`.
3. **Les sources manuelles et les archives** que le script signale : les consulter avec WebFetch, ou par une recherche web ciblée sur l'auteur et le sujet. Un flux ne contient souvent que les derniers éléments : pour une source jamais examinée, parcourir aussi son archive.

Appliquer les consignes du champ `notes` de chaque source.

## 2. Sélectionner

Une publication n'est retenue que si elle apporte quelque chose à un chapitre précis en lien avec la thèse :
- un concept, une méthode, un retour d'expérience détaillé, une mesure ou une étude ;
- ou une position qui contredit, nuance ou confirme celles déjà présentes dans le chapitre. Les positions contraires à la thèse sont recherchées, pas écartées.

Lire la page du chapitre visé avant de décider, pour ne pas ajouter une redite.

Écarter : les tutoriels d'outil sans principe transférable, les annonces commerciales et nouvelles de produit, les redites sans élément nouveau, les billets d'humeur sans argument.

Plafonds : 10 ajouts au plus par passage, 4 au plus par source jamais examinée. Choisir les plus utiles au livre, pas les plus récents.

## 3. Lire à la source

Lire chaque publication retenue à son URL d'origine (WebFetch). Ne jamais écrire une annotation à partir du seul titre, d'un résumé tiers ou de la mémoire du modèle.

Si la lecture directe échoue :
- Medium et quelques blogs refusent les robots : lire le texte complet dans leur flux RSS (balise `content:encoded`) ;
- page disparue ou bloquée : copie de la Wayback Machine (`https://web.archive.org/web/<url>`) ;
- vidéo ou podcast : transcription publiée par l'éditeur, sinon transcription automatique ; le dire dans l'annotation ;
- PDF : l'extraire dans un dossier temporaire, hors du dépôt.

Si la publication n'est lisible qu'en partie (contenu payant, document trop long), l'annotation le dit et se termine par **À vérifier :** suivi de ce qui n'a pas été lu. Si elle est illisible et importante, la laisser dans la file plutôt que de l'annoter de seconde main.

Relever le titre exact, l'auteur réel (qui peut différer du site), la date de publication et l'URL canonique.

## 4. Rédiger les propositions

Écrire `veille/propositions/AAAA-MM-JJ.md` (ajouter `-2`, `-3`… si le fichier existe) :

```markdown
---
date: AAAA-MM-JJ
sources: [Simon Willison, METR]
statut: proposé
---

## 13
- **Complémentaire · Site** [Titre exact](URL) — Auteur, date. Concepts importants et contribution au chapitre, en deux à quatre phrases. Renvois : 3, 11. **Limite :** …
  - Pourquoi : une phrase sur ce que la référence apporte au livre.
```

Règles du format (le script `npm run entries` les vérifie) :
- un titre `## N` par chapitre principal (1 à 17), puis une entrée par ligne ;
- `Central` pour une référence structurante, `Complémentaire` pour un approfondissement ou une étude de cas ; être économe en « Central » ;
- `Site` : le site de publication en nom court (`Addy Osmani`, `martinfowler.com`, `arXiv`, `YouTube`…) ; l'auteur est précisé dans l'annotation quand il diffère ;
- pas de crochets autour de l'étiquette ;
- mentions finales si besoin : **Limite :** (outil, échantillon, intérêt commercial), **Attention :** (risque de mauvaise lecture, mode de lecture inhabituel), **Contrepoint** à <référence du chapitre>, **À vérifier :** ;
- rédiger en français, garder les termes techniques en anglais, paraphraser, ne citer que de courts extraits ;
- la ligne indentée `- Pourquoi :` est ignorée par le script ; elle sert au rapport.

Vérifier le fichier : `npm run entries -- veille/propositions/<fichier>.md --dry-run`.

## 5. Mettre à jour les registres

- `veille/ecartees.yml` : ajouter chaque publication lue et non retenue (`url`, `titre`, `source`, `date_examen`, `raison` d'une ligne). Les publications hors sujet repérées sur leur seul titre n'y sont pas listées : le rapport en donne le nombre.
- `veille/a-consulter.yml` : retirer les publications traitées. Y ajouter (skill `sources`, mode « noter ») les publications utiles laissées de côté à cause du plafond ou d'une lecture impossible.
- `veille/sources.yml` : mettre `derniere_veille` à la date du jour pour chaque source examinée.
- Si une source de valeur apparaît en dehors de la liste, l'ajouter à la section `auteurs:` de `veille/a-consulter.yml` pour la skill `auteurs`.

## 6. Rapport

Écrire `veille/rapports/AAAA-MM-JJ.md` (même suffixe que le fichier de propositions) :
- **Ajouts proposés** : tableau chapitre, référence avec lien, pourquoi ;
- **Écartées** : nombre, et les cas notables avec leur raison ;
- **À vérifier** : les références qui portent cette mention ;
- **Mis en file** : les publications ajoutées à `a-consulter.yml` ;
- **Auteurs proposés** : ceux ajoutés à la file pour /auteurs.

## 7. Enchaîner

S'il y a au moins une proposition, appliquer la skill `mise-a-jour` au fichier de propositions : c'est elle qui intègre, met à jour les synthèses, contrôle et commite.

S'il n'y a aucune proposition, lancer `npm run check` puis commiter les registres et le rapport sur `main` : `docs(veille): veille du AAAA-MM-JJ, aucun ajout`.
