# Projet — Guide du Software Engineer à l'ère de l'IA agentique

## 1. Vision du projet

Nous souhaitons construire un livre de référence consacré à l'évolution du métier de développeur logiciel à l'ère de l'intelligence artificielle agentique.

Ce livre doit permettre à un développeur professionnel de comprendre comment l'IA transforme son métier, quelles compétences il doit développer ou préserver, et comment intégrer efficacement les agents IA dans ses pratiques d'ingénierie.

**Notre ambition n'est pas de créer un tutoriel sur Claude Code, Codex ou un outil particulier.**

Nous voulons produire un guide de Software Engineering adapté à un monde où les agents IA peuvent écrire, modifier, tester et parfois livrer du code avec une autonomie croissante.

Le guide doit privilégier les concepts, principes et méthodes durables plutôt que les fonctionnalités éphémères des outils.

## 2. Thèse fondamentale

Le développement logiciel connaît une transformation importante.

Historiquement, une grande partie du travail du développeur consistait à écrire et maintenir du code.

Avec l'IA agentique, une part croissante de cette production peut être déléguée à des agents.

La valeur du développeur se déplace progressivement vers :

- La compréhension des problèmes et des besoins.
- La conception des systèmes logiciels.
- La rédaction de spécifications exploitables.
- La transmission du contexte aux agents.
- L'orchestration et la supervision du travail agentique.
- La vérification de la qualité, de la sécurité et de la fiabilité.
- La prise de décisions architecturales.
- La maîtrise et la maintenance des logiciels produits.

Toutefois, notre hypothèse est que les compétences fondamentales du Software Engineering restent indispensables.

**Savoir faire produire du code à une IA n'est pas équivalent à savoir concevoir, comprendre et maîtriser un système logiciel.**

Cette proposition constitue le fil conducteur du livre. Elle doit aussi pouvoir être discutée et confrontée à des preuves, et non être considérée comme une vérité incontestable.

## 3. Public cible

Le guide s'adresse principalement aux développeurs professionnels qui possèdent déjà une expérience de programmation.

Il doit être compréhensible par un développeur intermédiaire, tout en présentant suffisamment de profondeur pour intéresser un ingénieur expérimenté.

Le livre doit permettre au lecteur de passer d'une utilisation opportuniste de l'IA pour générer du code à une pratique méthodique, critique et rigoureuse de l'ingénierie logicielle avec des agents.

## 4. Structure du livre

Le chapitrage a été défini et validé. Il comprend cinq parties et 17 chapitres.

### Partie I — Comprendre le changement

1. Du Software Engineering à l'Agentic Engineering
2. Le nouveau rôle du développeur
3. Les capacités et les limites de l'IA agentique

### Partie II — Développer les compétences fondamentales

4. Les fondamentaux du Software Engineering
5. Apprendre et progresser à l'ère des agents
6. Développer son jugement d'ingénieur

### Partie III — Diriger les agents

7. De l'intention à la spécification
8. Le Context Engineering
9. L'environnement de travail des agents (Harness Engineering)
10. Délégation, autonomie et orchestration

### Partie IV — Construire des logiciels fiables

11. Architecture et maintenabilité
12. Comprendre, reprendre et faire évoluer du code existant
13. Tests, évaluations et vérification
14. Code review, sécurité et livraison

### Partie V — Industrialiser et faire évoluer son métier

15. Le Loop Engineering
16. Les Software Factories
17. L'avenir du métier d'ingénieur logiciel

**Important : le chapitre 12 couvre aussi bien le legacy traditionnel que le code généré par IA.**

Nous considérons qu'un logiciel récemment produit par vibe coding peut déjà présenter les difficultés d'un système legacy : manque de compréhension, décisions non documentées, tests insuffisants et architecture incontrôlée.

L'ancienneté du code n'est donc pas le critère central de cette réflexion.

## 5. Méthode de construction du livre

Nous avons choisi une approche documentaire avant de commencer la rédaction.

Plutôt que de demander à une IA de rédiger spontanément un livre sur le sujet, nous voulons d'abord constituer un corpus de références techniques de qualité.

Ce corpus servira à identifier les concepts essentiels, comparer les approches, construire les argumentations et établir une progression pédagogique cohérente.

### Sources initiales

**Source 1 : Addy Osmani**

https://addyosmani.com/blog/

Ses publications constituent le socle initial du projet. Elles abordent notamment l'Agentic Engineering, les compétences du développeur, le Context Engineering, les spécifications, la qualité du code, les software factories et le Loop Engineering.

**Source 2 : Claude Developer Blog (Anthropic)**

https://claude.dev/

Cette source apporte des explications techniques et des retours d'expérience sur la conception et l'utilisation d'agents : outils, contextes, skills, harnesses, évaluations, orchestration, sécurité et code review.

D'autres auteurs pourront être ajoutés, notamment Kent Beck, Martin Fowler et John Ousterhout, lorsque le corpus existant ne couvre pas suffisamment un sujet.

### Corpus existant

Le corpus a d'abord été constitué dans un document Markdown unique (`guide_ia_agentique_corpus_v1_2_integre.md`, conservé dans l'historique git). Depuis la v1.3, il est découpé en pages dans le dossier `content/`, qui est la seule version maintenue :

- `content/1.presentation.md` : périmètre, sources et mode de lecture du corpus.
- Un dossier par partie (`content/2.partie-1-…` à `content/6.partie-5-…`), une page par chapitre.
- `content/7.syntheses/` : une synthèse par chapitre, rédigée par un agent IA (voir §10).
- `content/8.annexes/` : lacunes éditoriales et principes de rédaction.

Le nombre de références et leur répartition par site sont donnés par `npm run check` et repris dans `content/1.presentation.md`.

Les articles sont directement classés sous les 17 chapitres de notre livre.

Ces pages sont publiées sous forme de site Docus (Nuxt Content), modifiable avec Nuxt Studio : `npm run dev`, puis http://localhost:4170 (port fixé dans `nuxt.config.ts` ; ne pas utiliser 3000, réservé à d'autres applications).

**Il ne faut pas créer des sections séparées par auteur, site ou source.**

L'organisation documentaire suit exclusivement la progression pédagogique du livre. Chaque référence doit être affectée à un chapitre principal, avec éventuellement des renvois vers d'autres chapitres.

## 6. Notre démarche éditoriale

Le travail comprend plusieurs étapes successives.

### Étape A — Constitution du corpus (déjà engagée)

Identifier les publications pertinentes, vérifier les liens, puis rattacher chaque article à son chapitre principal.

Pour chaque référence, conserver au minimum :

- Le titre exact.
- L'auteur et la source.
- L'URL d'origine.
- La date de publication, lorsqu'elle est disponible.
- Les concepts importants.
- Sa contribution pédagogique au chapitre.

Éviter les doublons et ne pas inventer de références.

### Étape B — Analyse de couverture

Examiner chacun des 17 chapitres afin de déterminer si le corpus permet réellement de traiter le sujet avec la profondeur souhaitée.

Identifier les concepts absents, les arguments insuffisamment étayés, les contradictions entre sources et les éventuelles références supplémentaires nécessaires.

L'objectif n'est pas d'accumuler le plus grand nombre possible de liens.

**Nous cherchons la meilleure couverture intellectuelle et pédagogique possible.**

### Étape C — Construction du contenu pédagogique

À partir du corpus, établir pour chaque chapitre :

- Les questions auxquelles il doit répondre.
- Les connaissances préalables.
- Les concepts à enseigner.
- Les thèses défendues par les auteurs.
- Les éventuelles objections ou controverses.
- Les exemples techniques et études de cas.
- Les compétences que le lecteur doit acquérir.
- Les liens logiques avec les chapitres précédents et suivants.

Chaque chapitre doit apporter un apprentissage distinct, tout en s'inscrivant dans une progression cohérente.

### Étape D — Rédaction du livre

La rédaction viendra seulement après la consolidation du corpus et la validation des objectifs pédagogiques.

Le livre ne devra pas être une simple compilation, traduction ou paraphrase des articles.

Il devra constituer une synthèse originale, structurée, critique et pédagogique, respectant les droits d'auteur et attribuant correctement les idées empruntées.

## 7. Principes de qualité

Le guide devra respecter plusieurs exigences :

**Rigueur intellectuelle :** distinguer les faits établis, les observations empiriques, les hypothèses et les prédictions.

**Esprit critique :** ne pas considérer les positions d'Addy Osmani ou d'Anthropic comme des vérités absolues.

**Neutralité technologique :** privilégier les principes transférables entre différents agents, modèles et environnements.

**Profondeur technique :** expliquer les mécanismes et les compromis, plutôt que proposer uniquement des recettes.

**Applicabilité :** illustrer les concepts avec des exemples issus de situations réelles de développement logiciel.

**Durabilité :** éviter qu'une évolution d'un outil rende obsolète une partie importante du livre.

**Traçabilité :** permettre de retrouver les références qui étayent les idées et les recommandations.

## 8. Consignes de travail pour Codex

Ce projet doit être considéré comme un projet éditorial et documentaire, et non comme une application logicielle à développer.

Les pages du dossier `content/` constituent le point de départ.

Il faut préserver les cinq parties, les 17 chapitres et l'intégration directe des références dans les chapitres.

Toute modification doit favoriser la clarté, la cohérence, la pertinence et la qualité documentaire.

Lors de l'ajout de références, privilégier leur contribution réelle au contenu plutôt que leur popularité ou leur nouveauté.

Ne pas rédiger spontanément l'intégralité du livre. La recherche documentaire, l'analyse critique, la structuration pédagogique et la rédaction sont des étapes distinctes qui doivent rester contrôlables.

## 9. Résultat final recherché

À terme, nous voulons disposer d'un véritable manuel d'Agentic Software Engineering.

Un ouvrage qui enseigne non seulement **comment travailler avec des agents IA**, mais surtout **comment rester un ingénieur logiciel compétent, autonome, critique et responsable lorsque les agents réalisent une part croissante du travail de développement**.

Le livre doit aider son lecteur à devenir un meilleur ingénieur grâce à l'IA, et non simplement un utilisateur plus habile d'outils de génération de code.
## 10. Veille et synthèses

Le corpus est enrichi par un agent IA, lancé à la demande ou par une automation hebdomadaire (voir « Exécution automatique » ci-dessous). Cinq skills décrivent son travail ; leurs règles font foi :

- `/auteurs` (`.claude/skills/auteurs/SKILL.md`) repère les chapitres où les voix manquent, propose de nouveaux auteurs de référence, vérifie leur légitimité et inscrit ceux que Benjamin accepte.
- `/sources` (`.claude/skills/sources/SKILL.md`) tient les registres : où chercher pour chaque auteur suivi, et les publications à consulter plus tard.
- `/veille` (`.claude/skills/veille/SKILL.md`) trouve les nouvelles publications des auteurs suivis, les lit à la source, rédige les entrées proposées et un rapport, puis enchaîne sur `/mise-a-jour`. Elle ne modifie pas `content/`.
- `/mise-a-jour` (`.claude/skills/mise-a-jour/SKILL.md`) intègre les propositions au guide, met à jour la présentation, les lacunes et les synthèses des chapitres touchés, contrôle et commite directement sur `main`. Elle sert aussi quand Benjamin demande d'ajouter des références précises.
- `/synthese <n°|tous>` (`.claude/skills/synthese/SKILL.md`) rédige ou met à jour, pour un chapitre, une synthèse des positions des auteurs : points d'accord, points de désaccord, état des preuves, angles morts.

Fichiers de veille :

- `veille/sources.yml` : où chercher (auteurs suivis, flux vérifiés, archives, date de dernière veille). C'est une liste de veille, pas une organisation du corpus : la règle « pas de section par auteur » (§5) reste valable.
- `veille/a-consulter.yml` : file de travail (publications repérées mais pas encore lues, auteurs proposés à évaluer, auteurs refusés).
- `veille/ecartees.yml` : publications examinées et non retenues, avec la raison.
- `veille/propositions/` : un fichier d'entrées proposées par passage de veille, intégré par `/mise-a-jour`.
- `veille/rapports/` : un rapport par passage (ajouts, rejets, points à vérifier).

Scripts (à lancer depuis la racine du dépôt) :

- `npm run check` : cohérence du corpus (doublons, total annoncé, synthèses et leurs citations). Doit réussir avant chaque commit.
- `npm run feeds -- check [nom]` : vérifie que les flux répondent.
- `npm run feeds -- list [nom] [--since AAAA-MM-JJ]` : liste les publications nouvelles des sources, sans celles déjà traitées.
- `npm run entries -- <propositions.md> [--dry-run]` : insère les entrées proposées sous leur chapitre et met à jour le total.

Exécution automatique :

- Une automation Nimbalyst (`nimbalyst-local/automations/veille-hebdomadaire.md`, locale, non versionnée) tourne chaque lundi : veille chaque semaine ; entretien des sources et propositions d'auteurs le premier lundi du mois ; réécriture complète des synthèses le premier lundi de janvier, avril, juillet et octobre.
- En exécution automatique, le travail se fait dans un worktree dédié, sur une branche `auto/AAAA-MM-JJ`, et aboutit à une pull request. Jamais de commit sur `main` : le merge publie le site (Render).
- Si une pull request `auto/…` est encore ouverte, l'automation ne lance rien et le signale.
- Les étapes interactives restent à Benjamin : accepter un auteur (`/auteurs <nom>`), relire et merger les pull requests, passer une synthèse en `relue`.

Règles communes :

- Toute référence est lue à sa source avant d'être ajoutée. Ce qui n'a pas pu être lu en entier est marqué **À vérifier**.
- Format d'une entrée : `- **Central|Complémentaire · Site** [Titre exact](URL) — Auteur, date. …`, sans crochets autour de l'étiquette (Nuxt Studio et Nuxt Content les réécrivent).
- Une synthèse ne cite que les références de son chapitre. Elle est marquée « Rédigée par un agent IA » et porte un `statut` (`non relue` ou `relue`). Seul Benjamin passe une synthèse en `relue`.
- Une synthèse n'est pas une rédaction du livre (étape D) : elle prépare les étapes B et C.
- Les registres YAML de `veille/` doivent rester valides : les scripts les lisent.
