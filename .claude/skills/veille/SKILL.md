---
name: veille
description: Fait la veille du corpus du guide IA agentique. Examine les nouvelles publications des sources de veille/sources.yml, ajoute celles qui éclairent la thèse du livre sous leur chapitre principal dans content/, met à jour les synthèses des chapitres touchés et commite. À utiliser quand Benjamin demande la veille, de chercher de nouveaux articles pour le corpus, ou lance /veille (éventuellement suivi d'un nom de source).
---

# Veille du corpus

Avant de commencer, relire `CLAUDE.md`, en particulier la thèse (§2), la structure du livre (§4), l'étape A (§6) et les principes de qualité (§7). La veille sert la thèse du livre, pas l'actualité : le but est la meilleure couverture intellectuelle, pas le plus grand nombre de liens.

Argument facultatif : un nom de source de `veille/sources.yml`. Sans argument, examiner toutes les sources.

## 1. Lister les candidats

Pour chaque source de `veille/sources.yml` :

- Lire le flux (`flux`) ou, s'il vaut `manuel`, la page `archive` ou `site`, complétée par une recherche web ciblée sur l'auteur et la thèse.
- Ne garder que les publications postérieures à `derniere_veille`. Si `derniere_veille` vaut `null`, remonter jusqu'au 1er janvier 2025.
- Écarter sans les lire les URL déjà présentes dans `content/` (`grep -rF "<url>" content/`) ou dans `veille/ecartees.yml`.
- Ajouter aux candidats les publications de `veille/ecartees.yml` marquées `reconsiderer: true` : de bonnes publications écartées seulement à cause du plafond d'un passage précédent. Si elles sont retenues, les retirer de `ecartees.yml`.
- Appliquer les consignes du champ `notes` de la source.

## 2. Sélectionner

Une publication n'est retenue que si elle apporte quelque chose à un chapitre précis du livre en lien avec la thèse :

- un concept, une méthode, un retour d'expérience détaillé, une mesure ou une étude ;
- ou une position qui contredit, nuance ou confirme celles déjà présentes dans le chapitre. Les positions contraires à la thèse sont recherchées, pas écartées.

Écarter :

- les tutoriels d'outil sans principe transférable ;
- les annonces commerciales et les nouvelles de produit ;
- les redites d'une idée déjà présente dans le chapitre, sans élément nouveau ;
- les billets d'humeur sans argument.

Limites : 10 ajouts au plus par passage, et au plus 4 par nouvelle source (`derniere_veille: null`). Choisir les plus utiles au livre, pas les plus récents.

Chaque publication écartée après examen est ajoutée à `veille/ecartees.yml`, avec une raison d'une ligne. Une publication utile écartée seulement à cause du plafond reçoit `reconsiderer: true` et, si possible, le chapitre visé dans la raison. Les publications hors sujet repérées sur leur seul titre n'y sont pas listées : le rapport en donne le nombre.

## 3. Lire à la source

Lire chaque publication retenue à son URL d'origine (WebFetch). Ne jamais écrire une annotation à partir du seul titre, d'un résumé tiers ou de la mémoire du modèle.

- Si la publication n'est lisible qu'en partie (contenu payant, page trop longue, vidéo sans transcription), l'annotation le dit et se termine par **À vérifier :** suivi de ce qui n'a pas été lu.
- Si elle est inaccessible, l'écarter, sauf si elle est importante et que des sources secondaires fiables en rapportent le contenu. Dans ce cas, citer ces sources dans l'annotation et marquer **À vérifier**.
- Relever le titre exact, l'auteur réel (qui peut différer du site), la date de publication et l'URL canonique.

## 4. Classer et rédiger l'entrée

Choisir un seul chapitre principal parmi les 17 (`content/2.partie-1-…` à `content/6.partie-5-…`). Les autres chapitres concernés vont dans `Renvois`.

Ajouter l'entrée à la fin des entrées « Central » ou « Complémentaire » du chapitre, au format exact :

```markdown
- **Central · Site** [Titre exact](URL) — Auteur, date. Concepts importants et contribution au chapitre, en deux à quatre phrases. Renvois : 3, 11. **Limite :** …
```

- `Central` : référence structurante pour le chapitre. `Complémentaire` : approfondissement ou étude de cas. Être économe en « Central ».
- `Site` : le site de publication, en nom court (`Addy Osmani`, `claude.dev`, `martinfowler.com`, `Kent Beck`, `Pragmatic Engineer`, `Simon Willison`, `METR`, `DORA`, `YouTube`…). L'auteur est précisé dans l'annotation quand il diffère du site.
- Pas de crochets autour de l'étiquette : la syntaxe de Nuxt Content les supprime à l'affichage.
- Mentions finales, si besoin :
  - **Limite :** dépendance à un outil ou à un modèle, échantillon réduit, intérêt commercial ;
  - **Attention :** risque de mauvaise lecture ;
  - **Contrepoint** à <auteur> : la publication contredit une référence du chapitre ;
  - **À vérifier :** ce qui n'a pas été lu à la source.
- Rédiger en français, garder les termes techniques en anglais (spec, harness, mock…), paraphraser, et ne citer que de courts extraits entre guillemets.

## 5. Mettre à jour le reste du corpus

- `content/1.presentation.md` : mettre à jour la ligne « **Corpus :** N références, dont … » avec les comptes par site donnés par `npm run check`.
- `content/8.annexes/01.lacunes-editoriales-identifiees.md` : si un ajout comble, même en partie, une lacune listée, l'indiquer sur la ligne du chapitre.
- `veille/sources.yml` : mettre `derniere_veille` à la date du jour pour chaque source examinée.
- Si une source de grande valeur apparaît en dehors de la liste, ne pas l'ajouter à `sources.yml` : la proposer dans le rapport.

## 6. Synthèses

Pour chaque chapitre qui a reçu au moins une référence, appliquer la skill `synthese` à ce chapitre.

## 7. Rapport, contrôle et commit

Écrire `veille/rapports/AAAA-MM-JJ.md`. S'il existe déjà, ajouter `-2`, `-3`… Il contient :

- **Ajouts** : pour chaque ajout, le chapitre, le titre avec son lien et une phrase de justification.
- **Écartés** : pour chaque publication écartée, le titre et la raison.
- **À vérifier** : les références ajoutées qui portent cette mention.
- **Sources proposées** : les sources rencontrées qui mériteraient d'être suivies.
- **Synthèses mises à jour** : les chapitres concernés.

Lancer `npm run check`. Corriger toute erreur avant de commiter.

Commiter directement sur `main`, avec le message `docs(corpus): veille du AAAA-MM-JJ, N ajouts` et la liste des ajouts dans le corps du message.

Dans la réponse à Benjamin, résumer le rapport en quelques lignes et donner le lien vers le fichier.
