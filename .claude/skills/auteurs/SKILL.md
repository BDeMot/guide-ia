---
name: auteurs
description: Élargit les auteurs de référence du guide IA agentique. Repère les chapitres où les voix manquent, propose des auteurs ou des équipes de recherche, vérifie leur légitimité et leur lien avec la thèse, puis inscrit ceux que Benjamin accepte. À utiliser quand Benjamin demande d'autres auteurs, des références sur un thème, d'évaluer un auteur précis, ou lance /auteurs (éventuellement suivi d'un nom ou d'un numéro de chapitre).
---

# Élargir les auteurs de référence

Relire d'abord `CLAUDE.md` : la thèse (§2), la structure (§4) et les principes de qualité (§7). Un auteur de référence sert le livre s'il apporte une voix qui manque, pas parce qu'il est connu.

Argument facultatif :
- un nom : évaluer cet auteur seulement (aller à l'étape 3) ;
- un numéro de chapitre ou un thème : chercher des auteurs pour ce besoin ;
- rien : partir des besoins de tout le corpus.

## 1. Repérer les besoins

Lire :
- les synthèses `content/7.syntheses/*.md` : le champ `auteurs:` du frontmatter (en dessous de 4 auteurs distincts, le chapitre manque de voix) et la section **Angles morts** ;
- l'annexe `content/8.annexes/01.lacunes-editoriales-identifiees.md` ;
- la section `auteurs:` de `veille/a-consulter.yml` (pistes déjà notées) et la section `refuses:` (ne pas reproposer sans fait nouveau) ;
- `veille/sources.yml`, pour ne pas proposer un auteur déjà suivi.

Dresser la liste des besoins : chapitres trop minces, chapitres dominés par un seul auteur (Addy Osmani en particulier), types de preuve absents (recherche mesurée, retours d'industrie, positions contraires à la thèse).

## 2. Chercher des candidats

Pour chaque besoin, partir des pistes de `a-consulter.yml`, puis chercher sur le web : auteurs cités par les références du chapitre, chercheurs publiés sur le sujet, praticiens qui écrivent sur leur pratique avec des agents.

Un auteur de référence remplit au moins une de ces conditions :
- il a publié un livre de référence ou des travaux de recherche relus par des pairs en génie logiciel ;
- il est un praticien reconnu, avec une production écrite de fond et durable sur son métier ;
- c'est une équipe ou une institution qui publie des études avec leur méthode.

Et il publie, depuis 2025, sur le développement logiciel avec des agents ou des LLM, ou bien il fait autorité sur un fondamental qui manque au corpus (chapitres 4, 5, 6, 11, 12).

À privilégier : la recherche mesurée, les positions qui contredisent ou nuancent la thèse, les auteurs indépendants des éditeurs d'outils. Un auteur lié à un éditeur reste possible, avec l'intérêt commercial signalé.

À éviter : les comptes sans texte de fond (fils de réseaux sociaux, vidéos courtes), le marketing, les auteurs qui ne font que reprendre ceux déjà suivis.

Garder 3 à 6 candidats par passage, les plus utiles au livre.

## 3. Vérifier chaque candidat

Ne jamais présenter un auteur ou une publication sans l'avoir vérifié à la source :
- identité et rôle (page personnelle, page institutionnelle, éditeur du livre) ;
- une à trois publications récentes en rapport avec la thèse, lues avec WebFetch : titre exact, date, URL, idée principale ;
- position par rapport à la thèse du livre : la soutient, la nuance ou la contredit ;
- où il publie : blog, newsletter, chaîne, revue (sans encore enregistrer de flux, c'est le travail de /sources).

Ne rien inventer. Ce qui n'a pas pu être vérifié est dit comme tel.

## 4. Proposer à Benjamin

Présenter les candidats avec un outil de question interactif (`mcp__nimbalyst__PromptForUserInput`, champ multiSelect), un élément par candidat :
- titre : le nom ;
- sous-titre : pourquoi il compte (légitimité en une ligne), chapitres visés, position par rapport à la thèse, publication repérée la plus utile.

Précocher les candidats recommandés. Ajouter un champ libre pour les remarques.

Si aucun outil interactif n'est disponible (exécution automatique), ne rien inscrire dans `sources.yml` : écrire les candidats dans la section `auteurs:` de `veille/a-consulter.yml`, avec leurs champs et une ligne `recommandation:`, et s'arrêter là.

## 5. Inscrire la décision

- **Candidat accepté** : appliquer la skill `sources` (mode « ajouter ») pour l'inscrire dans `veille/sources.yml` avec ses flux. Ajouter ses publications vérifiées à l'étape 3 dans la section `publications:` de `veille/a-consulter.yml`, pour que /veille les traite. Le retirer de la section `auteurs:` s'il y figurait.
- **Candidat refusé** : le déplacer dans la section `refuses:` de `veille/a-consulter.yml`, avec `nom`, `raison` (la remarque de Benjamin, ou « refusé par Benjamin »), `date`.
- **Candidat laissé de côté** : le garder dans la section `auteurs:`.

## 6. Commit

Lancer `npm run check`. Commiter directement sur `main` : `docs(veille): auteurs de référence, N ajoutés`, avec la liste des auteurs ajoutés et refusés dans le corps du message.

Dans la réponse, dire qui a été ajouté et quelles publications attendent /veille. Proposer de lancer /veille sur ces nouvelles sources.
