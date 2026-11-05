# Guide du Software Engineer à l'ère de l'IA agentique

Corpus documentaire d'un manuel d'Agentic Software Engineering, publié sous forme de site [Docus](https://docus.dev) et modifiable avec [Nuxt Studio](https://nuxt.studio).

Le projet, sa méthode et ses principes sont décrits dans [CLAUDE.md](CLAUDE.md).

## Contenu

Le corpus est dans `content/` : une page de présentation, un dossier par partie du livre avec une page par chapitre, les synthèses par chapitre, des anthologies commentées sur des thèmes transversaux et des annexes. Les préfixes numériques (`2.`, `07.`…) fixent l'ordre de la navigation et n'apparaissent pas dans les URL.

## Veille et synthèses

Le corpus est enrichi par un agent IA, avec cinq commandes Claude Code :

| Commande | Rôle |
|---|---|
| `/auteurs [nom ou chapitre]` | Proposer et évaluer de nouveaux auteurs de référence. |
| `/sources` | Enregistrer où chercher (flux, archives), noter une publication à lire plus tard, vérifier les flux. |
| `/veille [source]` | Trouver les nouvelles publications des auteurs suivis et rédiger les entrées proposées. Enchaîne sur `/mise-a-jour`. |
| `/mise-a-jour [propositions]` | Intégrer les références au guide, mettre à jour les synthèses, contrôler et commiter. |
| `/synthese 13` ou `/synthese tous` | Rédiger ou mettre à jour la synthèse des positions des auteurs d'un chapitre. |

Les registres de veille sont dans `veille/` : `sources.yml` (où chercher), `a-consulter.yml` (file de travail), `ecartees.yml` (rejets), `propositions/` et `rapports/`.

Scripts :

- `npm run check` : cohérence du corpus (URL en double, total annoncé, citations des synthèses).
- `npm run feeds -- check` : état des flux suivis.
- `npm run feeds -- list [nom]` : publications nouvelles depuis la dernière veille.
- `npm run entries -- <fichier> [--dry-run]` : insertion des entrées proposées.

## Lancer le site en local

```bash
npm install
npm run dev
```

Le site est servi sur http://localhost:4170 (port fixé dans `nuxt.config.ts`, car 3000 est pris par d'autres applications). En local, Nuxt Studio s'ouvre avec le bouton flottant en bas à gauche et modifie directement les fichiers de `content/`.

## Publication

Pas encore configurée. Nuxt Studio en production nécessite :

- un dépôt GitHub (à renseigner dans `studio.repository` de `nuxt.config.ts`) ;
- un hébergeur qui exécute du code serveur (Vercel, Netlify…) ;
- une OAuth App GitHub (`STUDIO_GITHUB_CLIENT_ID`, `STUDIO_GITHUB_CLIENT_SECRET`).
