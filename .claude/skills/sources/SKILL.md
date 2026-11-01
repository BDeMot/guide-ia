---
name: sources
description: Tient les registres de veille du guide IA agentique. Enregistre où chercher les publications d'un auteur (flux RSS/Atom vérifiés, archives, chaînes) dans veille/sources.yml, note une publication à consulter plus tard dans veille/a-consulter.yml, et vérifie que les flux répondent. À utiliser quand Benjamin donne un auteur ou un site à suivre, un article à noter pour plus tard, demande de vérifier les flux, ou lance /sources ; aussi appelée par la skill auteurs.
---

# Registres de veille

Deux fichiers, tous deux en YAML valide :
- `veille/sources.yml` : **où chercher**. Une entrée par auteur ou équipe suivi.
- `veille/a-consulter.yml` : **quoi lire plus tard**. Publications repérées mais pas encore lues (`publications:`), auteurs proposés à évaluer (`auteurs:`), auteurs refusés (`refuses:`).

Ces registres servent la veille ; le corpus reste organisé par chapitre (CLAUDE.md §5).

Trois modes, selon la demande :

## Ajouter une source

Pour un auteur ou une équipe à suivre.

1. Vérifier qu'il n'est pas déjà dans `sources.yml`.
2. Trouver où il publie : site, blog, newsletter, chaîne vidéo, page de publications.
3. Trouver le flux. Essayer, dans l'ordre :
   - la balise `<link rel="alternate" type="application/rss+xml">` ou `application/atom+xml` de la page d'accueil (`curl -sL -A 'Mozilla/5.0' <url> | grep -i 'application/\(rss\|atom\)'`) ;
   - les chemins courants : `/feed`, `/feed/`, `/rss.xml`, `/atom.xml`, `/feed.xml`, `/index.xml` ;
   - Substack : `https://<nom>.substack.com/feed` ; Medium : `https://<nom>.medium.com/feed` ; WordPress : `/feed/` ;
   - YouTube : `https://www.youtube.com/feeds/videos.xml?channel_id=<id>`. L'identifiant de la chaîne est le `browseId` en `UC…` le plus fréquent dans le HTML de la page de la chaîne. Vérifier que le titre du flux est bien celui de la chaîne.
4. Si aucun flux n'existe : `flux: manuel`, et `archive:` pointe vers la page qui liste les publications.
5. Ajouter l'entrée dans la dernière section de `sources.yml` (créer une section `# --- Sources ajoutées en vX.Y` si la version du corpus a changé) :

   ```yaml
     - nom: Prénom Nom (Organisation)
       site: https://…
       flux: https://…            # ou une liste, ou « manuel »
       archive: https://…         # facultatif
       chapitres: [5, 17]
       derniere_veille: null
       notes: "Consignes de filtrage : ce qu'il faut garder, ce qui est hors sujet, limites d'accès."
   ```

   Toujours mettre `notes` entre guillemets : un deux-points dans le texte casse le YAML.
6. Vérifier avec `npm run feeds -- check "<nom>"` : chaque flux doit répondre et contenir des éléments.

## Noter une publication à consulter

Pour une publication repérée qu'on ne lit pas tout de suite (plafond de /veille atteint, page inaccessible, suggestion de Benjamin).

1. Vérifier qu'elle n'est ni dans le corpus (`grep -rF "<url>" content/`), ni dans `veille/ecartees.yml`, ni déjà dans la file.
2. L'ajouter à la section `publications:` de `veille/a-consulter.yml` :

   ```yaml
     - url: https://…
       titre: "Titre exact s'il est connu"
       source: nom de la source dans sources.yml, ou « hors sources suivies »
       raison: "Chapitre visé et intérêt pour le livre."
       ajoute_le: AAAA-MM-JJ
       origine: "Qui ou quoi l'a repérée (veille du …, Benjamin, synthèse du chapitre N…)."
   ```

/veille traite cette file en priorité au passage suivant.

## Vérifier les flux

1. Lancer `npm run feeds -- check`.
2. Pour chaque flux en erreur : chercher la nouvelle adresse (étape 3 de « Ajouter une source »), sinon passer la source en `flux: manuel` avec une `archive:` et une note qui explique pourquoi.
3. Signaler les sources dont le dernier élément a plus d'un an : elles sont peut-être devenues inactives. Le noter dans `notes`, sans les retirer : la décision revient à Benjamin.

## Fin

Valider le YAML : `node -e "require('yaml').parse(require('fs').readFileSync('veille/sources.yml','utf8')); require('yaml').parse(require('fs').readFileSync('veille/a-consulter.yml','utf8'))"`.

Quand la skill est appelée seule, commiter sur `main` : `docs(veille): sources, …` (ajout de X, N publications notées, flux corrigés). Quand elle est appelée par /auteurs, laisser /auteurs commiter.
