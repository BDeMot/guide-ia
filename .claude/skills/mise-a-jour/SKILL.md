---
name: mise-a-jour
description: Met le guide IA agentique à jour avec de nouvelles références. Intègre un fichier de propositions de veille sous les bons chapitres, met à jour la présentation, les lacunes et les synthèses des chapitres touchés, contrôle et commite. À utiliser à la fin de la skill veille, quand Benjamin demande d'ajouter des références précises au corpus, de mettre le guide à jour, ou lance /mise-a-jour (éventuellement suivi d'un fichier de propositions).
---

# Mise à jour du guide

Relire `CLAUDE.md` §5, §7 et §10. Le guide est le dossier `content/` ; il n'est modifié que par cette skill (et par `synthese`, qu'elle appelle).

## 1. Partir d'un fichier de propositions

Argument facultatif : un fichier `veille/propositions/*.md`. Sans argument, prendre le plus récent dont le frontmatter porte `statut: proposé`.

Si Benjamin donne directement des références à ajouter (URL, titres, auteurs), créer d'abord un fichier de propositions en appliquant les étapes 3 et 4 de la skill `veille` : lire chaque référence à la source, rédiger les entrées au format, noter les sources secondaires remplacées par leur source primaire. Les références qu'il ne faut pas ajouter (opinion sans argument, redite, compte rendu d'un texte disponible en original) vont dans `veille/ecartees.yml`, et la réponse finale dit pourquoi.

## 2. Intégrer les entrées

1. Contrôler : `npm run entries -- <fichier> --dry-run`. Corriger le fichier en cas d'erreur (format, chapitre inconnu, doublon).
2. Intégrer : `npm run entries -- <fichier>`. Le script place chaque entrée sous son chapitre (après les « Central » ou en fin de liste), met à jour la ligne « **Corpus :** » de `content/1.presentation.md` et passe le fichier en `statut: intégré`.
3. Noter la liste des chapitres touchés, donnée par le script.

## 3. Mettre à jour le reste du guide

- `content/1.presentation.md` : si une nouvelle source ou un nouveau type de preuve entre dans le corpus, le mentionner dans la ligne « **Nouveautés vX.Y :** » de la version en cours. Ne changer de numéro de version que si Benjamin le demande ou si l'ensemble des ajouts change la nature du corpus.
- `content/9.annexes/01.lacunes-editoriales-identifiees.md` : si un ajout comble, même en partie, une lacune listée, l'indiquer sur la ligne du chapitre ; si la veille a révélé une lacune nouvelle, l'ajouter.
- Renvois croisés : si une nouvelle entrée contredit ou corrige une entrée existante (date, attribution, renvoi faux), corriger l'entrée existante et le dire dans le message de commit.

## 4. Mettre à jour les synthèses

Pour chaque chapitre touché, appliquer la skill `synthese` à ce chapitre. Elle choisit entre une mise à jour partielle (quelques références ajoutées) et une réécriture, et remet la synthèse en `statut: non relue`.

## 5. Contrôler et commiter

1. `npm run check` doit afficher « Corpus cohérent. ».
2. Si le serveur de développement tourne (port 4170), vérifier que les pages des chapitres et des synthèses touchés répondent : `curl -s -o /dev/null -w '%{http_code}' http://localhost:4170/<chemin>`.
3. Commiter directement sur `main` tout ce qui a changé : `content/`, le fichier de propositions, le rapport et les registres de `veille/` le cas échéant. Message : `docs(corpus): <origine>, N ajouts` (par exemple « veille du 2026-11-08 » ou « références demandées par Benjamin »), puis une ligne par chapitre touché (`- ch. 13 : Auteur (titre court)`) et les synthèses mises à jour.

## 6. Archiver les nouvelles références

Après le commit, lancer `npm run archive` depuis la racine du dépôt principal. Le script n'archive que les références qui ne sont pas encore dans `sources/` : il enregistre chacune en Markdown dans `sources/<auteur>/` et met à jour `sources/README.md`. `sources/` est ignoré par git : rien à commiter.

En exécution automatique (worktree `auto/…`), ne pas le lancer : le worktree n'a pas l'archive et la recréerait en entier, pour la perdre ensuite. Le prochain `npm run archive` lancé dans le dépôt principal rattrapera les références ajoutées.

Un échec d'archivage ne bloque pas la mise à jour : le signaler dans la réponse.

## 7. Répondre

Résumer en quelques lignes : les références ajoutées par chapitre, ce qui change dans les synthèses (nouveaux accords ou désaccords), ce qui reste à vérifier, et les liens vers le rapport et les synthèses modifiées. Signaler les nouvelles références archivées avec le statut `court`, `partiel` ou `échec`.
