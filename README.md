# Guide du Software Engineer à l'ère de l'IA agentique

Corpus documentaire d'un manuel d'Agentic Software Engineering, publié sous forme de site [Docus](https://docus.dev) et modifiable avec [Nuxt Studio](https://nuxt.studio).

Le projet, sa méthode et ses principes sont décrits dans [CLAUDE.md](CLAUDE.md).

## Contenu

Le corpus est dans `content/` : une page de présentation, un dossier par partie du livre avec une page par chapitre, les synthèses par chapitre et des annexes. Les préfixes numériques (`2.`, `07.`…) fixent l'ordre de la navigation et n'apparaissent pas dans les URL.

## Veille et synthèses

Le corpus est enrichi par un agent IA, avec deux commandes Claude Code :

- `/veille` : ajoute les nouvelles publications des sources de `veille/sources.yml` et écrit un rapport dans `veille/rapports/`.
- `/synthese 13` ou `/synthese tous` : rédige la synthèse des positions des auteurs d'un chapitre, dans `content/7.syntheses/`.

`npm run check` contrôle la cohérence du corpus : URL en double, total annoncé, citations des synthèses.

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
