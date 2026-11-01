---
name: synthese
description: Rédige ou met à jour la synthèse d'un chapitre du guide IA agentique dans content/7.syntheses/ (points d'accord, points de désaccord, état des preuves, angles morts), à partir des seules références du chapitre. À utiliser quand Benjamin demande une synthèse, lance /synthese avec un numéro de chapitre ou « tous », ou quand la skill mise-a-jour a ajouté des références à un chapitre.
---

# Synthèse d'un chapitre

Argument : un numéro de chapitre (`13`), plusieurs (`7 8`) ou `tous`.

Une synthèse prépare l'analyse de couverture (étape B) et la construction pédagogique (étape C) de `CLAUDE.md`. Ce n'est pas la rédaction du livre (étape D) : elle confronte les positions des auteurs, elle n'enseigne pas le sujet.

## Mise à jour partielle ou réécriture

Quand la synthèse existe déjà et que le chapitre a reçu peu de références (trois au plus), la mettre à jour plutôt que la réécrire : relire la synthèse entière, intégrer chaque nouvelle référence là où elle change quelque chose (un accord renforcé, une nouvelle position dans un désaccord, une nouvelle observation dans l'état des preuves, un angle mort comblé), puis mettre à jour `references`, `auteurs`, la date et le bandeau.

La réécrire entièrement si le chapitre a reçu plus de trois références, si un nouveau désaccord apparaît qui réorganise les sections, ou si Benjamin le demande.

Dans les deux cas, toutes les règles ci-dessous s'appliquent.

## Matériau autorisé

Seules les références du chapitre, dans `content/<partie>/NN.<slug>.md`, sont utilisables.

- Partir des annotations. Relire une référence à la source (WebFetch) dès qu'une affirmation de la synthèse dépend d'un point que l'annotation ne couvre pas.
- Ne rien ajouter qui vienne d'une source extérieure au chapitre ou de la mémoire du modèle. Si une idée importante manque, elle va dans **Angles morts**.
- Une référence marquée **À vérifier** peut être citée, mais l'affirmation qui en dépend le signale.

## Fichier

Le fichier est `content/7.syntheses/NN.<slug>.md`, avec le même `NN.<slug>` que le chapitre. Le contrôle `npm run check` exige ce nom.

```markdown
---
title: "Synthèse — Chapitre 13. Tests, évaluations et vérification"
description: "Points d'accord et de désaccord entre les auteurs du corpus sur ce chapitre."
navigation:
  title: "13. Tests, évaluations et vérification"
synthese:
  date: 2026-10-30
  statut: non relue
  references: 7
  auteurs: 6
---

::warning
Synthèse rédigée par un agent IA le 30 octobre 2026, à partir des 7 références du [chapitre 13](/partie-4-construire-des-logiciels-fiables/tests-evaluations-et-verification). **Non relue.** Chaque affirmation renvoie à une référence du chapitre ; la vérifier à la source avant de la reprendre.
::

## Question du chapitre

## Points d'accord

## Points de désaccord

## État des preuves

## Angles morts
```

- `references` : nombre d'entrées du chapitre.
- `auteurs` : nombre d'auteurs ou d'équipes distincts. Un même auteur publié sur deux sites compte une fois.
- L'URL du chapitre est son chemin sans les préfixes numériques.

## Contenu des sections

**Question du chapitre** : en deux ou trois phrases, la question à laquelle le chapitre doit répondre, d'après son titre dans `CLAUDE.md` §4 et ses références.

**Points d'accord** : les idées partagées par au moins deux auteurs distincts. Pour chaque point, une phrase pour l'idée, puis qui la soutient, avec un lien vers chaque référence : `Kent Beck ([Augmented Coding](URL)) et Birgitta Böckeler ([I still care about the code](URL))`. Un accord entre deux articles du même auteur n'est pas un accord entre auteurs.

**Points de désaccord** : une sous-section `###` par sujet de désaccord, avec :

- chaque position en présence, qui la défend et le lien vers sa référence ;
- **Nature du désaccord :** faits (les auteurs n'observent pas la même chose), méthode (ils mesurent ou raisonnent différemment), valeurs (ils ne visent pas le même but), ou contexte (chacun a raison dans sa situation) ;
- **Ce qui permettrait de trancher :** le type de preuve qui manque.

Ne pas fabriquer de désaccord. Des auteurs qui traitent des sujets différents ne sont pas en désaccord. S'il n'y a aucun désaccord réel, le dire.

**État des preuves** : classer les principales affirmations du chapitre selon CLAUDE.md §7, avec leurs liens :

- faits établis ;
- observations empiriques (expérience, étude, mesure : préciser l'échantillon quand l'annotation le donne) ;
- retours d'expérience et opinions ;
- prédictions.

**Angles morts** : ce que le chapitre devrait couvrir d'après `CLAUDE.md` §4 et §6, et qu'aucune référence ne traite. Proposer le type de source à chercher. Ne pas citer de titre précis qui ne serait pas vérifié.

## Règles

- Chaque affirmation porte au moins un lien vers une référence du chapitre. Aucun autre lien externe.
- Si le chapitre compte moins de 3 auteurs distincts, ne pas rédiger d'accords ni de désaccords. Écrire sous le bandeau : « Corpus insuffisant pour une synthèse : N auteur(s) distinct(s). » Remplir seulement **Question du chapitre** et **Angles morts**, en listant ce qu'il faudrait chercher.
- Rester neutre : présenter les positions sans trancher. Ne pas présenter la thèse du livre comme acquise.
- Rédiger en français, garder les termes techniques en anglais, paraphraser.
- Toute modification, partielle ou complète, remet `statut: non relue` et le bandeau « **Non relue.** », même si la version précédente était relue.
- Quand Benjamin a relu une synthèse, il passe `statut: relue` et remplace « **Non relue.** » par « Relue par Benjamin le … ». Ne pas le faire à sa place.

## Lien depuis le chapitre

La page du chapitre commence, juste après son frontmatter, par :

```markdown
::tip{to="/syntheses/<slug>"}
Synthèse des positions des auteurs sur ce chapitre (rédigée par un agent IA).
::
```

L'ajouter si elle manque. Ne pas la dupliquer.

## Contrôle

Lancer `npm run check`. Toute URL citée hors du chapitre est une erreur à corriger.

Quand la skill est appelée seule, et non par la skill `mise-a-jour`, commiter sur `main` avec le message `docs(syntheses): chapitre(s) N…`.
