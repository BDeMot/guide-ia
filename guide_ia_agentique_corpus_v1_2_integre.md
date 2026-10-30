# Guide du développeur à l’ère de l’IA agentique
## Bibliographie intégrée — v1.3 (30 octobre 2026)

**Structure validée :** 5 parties, 17 chapitres. **Corpus :** 89 références, dont 51 publiées sur [le blog d’Addy Osmani](https://addyosmani.com/blog/), 14 sur [claude.dev](https://claude.dev/), 16 sur [martinfowler.com](https://martinfowler.com/) (dont 13 de la série [Exploring Generative AI](https://martinfowler.com/articles/exploring-gen-ai.html), signées par des auteurs de Thoughtworks), 4 sur [la newsletter de Kent Beck](https://newsletter.kentbeck.com/), 2 interviews de [The Pragmatic Engineer](https://newsletter.pragmaticengineer.com/), 1 document GitHub et 1 post X.

**Nouveautés v1.3 :** ajout de références de Martin Fowler et Thoughtworks, Kent Beck, John Ousterhout et Robert C. Martin, pour contraster les positions d’Addy Osmani et d’Anthropic et combler une partie des lacunes listées en fin de document. Les références marquées **À vérifier** n’ont pas pu être lues intégralement à la source.

Chaque article figure **directement sous son chapitre principal**, quelle que soit sa provenance. Les renvois vers d’autres chapitres sont indiqués dans les annotations ; ils ne constituent pas une deuxième affectation.

**Lecture :** « Central » = référence structurante pour le chapitre ; « Complémentaire » = approfondissement ou étude de cas. L’étiquette (« Addy Osmani », « claude.dev », « martinfowler.com », « Kent Beck », « Pragmatic Engineer », « GitHub », « X ») indique le **site de publication** ; l’auteur est précisé dans l’annotation lorsqu’il diffère (certains articles de claude.dev sont signés par Addy Osmani, la plupart des articles de martinfowler.com ne sont pas de Martin Fowler).

Les articles alimentent une rédaction originale ; ne pas en reproduire le contenu intégral sans autorisation.

# Partie I — Comprendre le changement

## Chapitre 1. Du Software Engineering à l’Agentic Engineering

- **[Central · Addy Osmani]** [Agentic Engineering](https://addyosmani.com/blog/agentic-engineering/) — Définit précisément le vibe coding, l’AI-assisted engineering et l’agentic engineering; texte de cadrage.
- **[Complémentaire · martinfowler.com]** [Agentic Engineering](https://martinfowler.com/bliki/AgenticProgramming.html) — Martin Fowler, 21 mai 2026. Définition indépendante de celle d’Osmani : vibe coding (on ne regarde pas le code) contre agentic engineering (on reste attentif au code et on le relit). Présente le harness comme un ensemble de *guides* (règles données à l’agent) et de *sensors* (tests, revues). « Les humains restent responsables de ce que fait le logiciel et de son fonctionnement. » Renvois : 2, 9.

## Chapitre 2. Le nouveau rôle du développeur

- **[Central · Addy Osmani]** [The New Software Lifecycle](https://addyosmani.com/blog/new-sdlc-vibe-coding/) — Décrit le déplacement des activités dans le cycle de développement.
- **[Complémentaire · Addy Osmani]** [The Factory Model: How Coding Agents Changed Software Engineering](https://addyosmani.com/blog/factory-model/) — Présente le développeur comme concepteur et exploitant d’un système de production. Renvois utiles : chapitres 16.
- **[Complémentaire · Addy Osmani]** [The Efficiency Paradox: Why Making Software Easier to Write Means We’ll Write Exponentially More](https://addyosmani.com/blog/the-efficiency-paradox/) — Met en perspective le gain de productivité et l’augmentation des volumes de code.
- **[Complémentaire · Addy Osmani]** [Is the IDE dead?](https://addyosmani.com/blog/death-of-the-ide/) — Analyse le déplacement du poste de travail de l’éditeur vers l’orchestration. Renvois utiles : chapitres 9.
- **[Complémentaire · martinfowler.com]** [The role of developer skills in agentic coding](https://martinfowler.com/articles/exploring-gen-ai/13-role-of-developer-skills.html) — Birgitta Böckeler, 25 mars 2025. Même les sessions réussies ont exigé un pilotage constant par le développeur. Classe les erreurs de l’IA selon leur rayon d’impact : délai avant commit, friction dans le flux de l’équipe, maintenabilité à long terme. L’expérience du développeur est ce qui détecte ces erreurs. Renvois : 3, 6, 11. **Limite :** observations sur des outils de 2025.

## Chapitre 3. Les capacités et les limites de l’IA agentique

- **[Central · Addy Osmani]** [The 80% Problem in Agentic Coding](https://addyosmani.com/blog/the-80-problem-in-agentic-coding/) — Détaille la dette de compréhension, les hypothèses erronées et le goulet de vérification. Renvois utiles : chapitres 11,12.
- **[Complémentaire · Addy Osmani]** [How Good Is AI at Coding React (Really)?](https://addyosmani.com/blog/how-good-is-ai-at-coding-react-really/) — Cas d’étude des capacités et défaillances de l’IA sur un domaine concret. Renvois utiles : chapitres 13.
- **[Complémentaire · martinfowler.com]** [LLMs bring new nature of abstraction](https://martinfowler.com/articles/2025-nature-abstraction.html) — Martin Fowler, 24 juin 2025. Compare l’arrivée des LLM au passage de l’assembleur aux langages de haut niveau, avec une différence : on ne fait pas que monter en abstraction, on passe à des outils non déterministes. Un prompt versionné ne garantit pas le même comportement. Renvois : 1, 13.
- **[Complémentaire · Kent Beck]** [Genie Wants to Leap](https://newsletter.kentbeck.com/p/genie-wants-to-leap) — Kent Beck, 12 mai 2025. Construction d’une implémentation de Smalltalk avec un agent (le « genie ») : l’agent bute sur une « falaise de complexité » et prend parfois des raccourcis destructeurs, comme supprimer des tests. Propose la technique des *parallels* (ancienne et nouvelle implémentation coexistent, tests verts à chaque étape). Renvois : 12, 13.

# Partie II — Développer les compétences fondamentales

## Chapitre 4. Les fondamentaux du Software Engineering

- **[Central · Addy Osmani]** [Treat AI-Generated code as a draft](https://addyosmani.com/blog/treat-ai-generated-code-as-a-draft/) — Affirme que le code généré doit être travaillé, lu, testé et assumé. Renvois utiles : chapitres 14.
- **[Complémentaire · Addy Osmani]** [Becoming a good engineer is about collecting experience.](https://addyosmani.com/blog/collect-experience/) — Justifie l’importance de l’expérience concrète pour bâtir des modèles mentaux. Renvois utiles : chapitres 5.
- **[Central · martinfowler.com]** [Conversation: LLMs and the what/how loop](https://www.martinfowler.com/articles/convo-what-how.html) — Unmesh Joshi, Rebecca Parsons et Martin Fowler, 21 janvier 2026. Programmer, c’est relier le domaine (le « quoi ») à un modèle computationnel (le « comment »), dans une boucle continue et non un transfert à sens unique. Rôle des abstractions alignées sur le domaine, de la charge cognitive, du TDD et du choix des représentations. Les LLM aident à traduire et explorer, mais le développeur reste l’architecte du modèle de domaine. Renvois : 7, 11.
- **[Complémentaire · martinfowler.com]** [I still care about the code](https://martinfowler.com/articles/exploring-gen-ai/i-still-care-about-the-code.html) — Birgitta Böckeler, 9 juillet 2025. Les LLM sont des « inférenceurs », pas des compilateurs : leur sortie demande une évaluation du risque selon l’impact, la probabilité et la détectabilité d’une erreur. Quand l’impact est fort et la détectabilité faible, lire le code reste indispensable. Renvois : 14. **Contrepoint** à la position de Robert C. Martin (chapitre 14).
- **[Complémentaire · GitHub]** [A Philosophy of Software Design vs Clean Code](https://github.com/johnousterhout/aposd-vs-clean-code) — John Ousterhout et Robert C. Martin, discussion de septembre 2024 à février 2025. Débat entre les deux auteurs sur trois fondamentaux : longueur des méthodes, commentaires et TDD. Hors IA, mais utile pour montrer que les « bonnes pratiques » sont elles-mêmes discutées. Renvois : 11, 13. **Attention :** document long, lu partiellement.

## Chapitre 5. Apprendre et progresser à l’ère des agents

- **[Central · Addy Osmani]** [Agentic Skill Decay](https://addyosmani.com/blog/agentic-skill-decay/) — Décrit l’érosion possible des compétences et la nécessité d’un entraînement délibéré.
- **[Central · Addy Osmani]** [Don’t Outsource the Learning](https://addyosmani.com/blog/dont-outsource-learning/) — Distingue l’achèvement d’une tâche de l’acquisition de connaissances.
- **[Complémentaire · Addy Osmani]** [Cognitive Surrender](https://addyosmani.com/blog/cognitive-surrender/) — Distingue délégation cognitive maîtrisée et abandon du jugement. Renvois utiles : chapitres 6.
- **[Complémentaire · Kent Beck]** [Take My Toil, Leave Me My Struggle](https://newsletter.kentbeck.com/p/take-my-toil-leave-me-my-struggle) — Kent Beck, 20 octobre 2026. À partir de l’image d’une « RoboGym » qui soulèverait les poids à la place de l’utilisateur, interroge des agents conçus pour faire l’effort mental à notre place, alors que cet effort a une valeur en soi. **À vérifier :** article en grande partie payant, seule l’introduction a été lue.

## Chapitre 6. Développer son jugement d’ingénieur

- **[Central · Addy Osmani]** [Earning taste and judgment](https://addyosmani.com/blog/earning-judgment/) — Analyse l’acquisition du discernement technique quand les agents absorbent les répétitions.
- **[Complémentaire · Addy Osmani]** [Critical Thinking during the age of AI](https://addyosmani.com/blog/critical-thinking-during-the-age/) — Donne un cadre pour interroger les hypothèses et les résultats. Renvois utiles : chapitres 3.

# Partie III — Diriger les agents

## Chapitre 7. De l’intention à la spécification

- **[Central · Addy Osmani]** [How to write a good spec for AI agents](https://addyosmani.com/blog/good-spec/) — Méthode de rédaction des objectifs, frontières, tâches et critères de réussite.
- **[Central · Addy Osmani]** [The Intent Debt](https://addyosmani.com/blog/intent-debt/) — Explique ce qui se perd lorsque les raisons d’une décision ne sont pas matérialisées. Renvois utiles : chapitres 11,12.
- **[Complémentaire · claude.dev]** [Using Claude Code: Spending your effort](https://claude.dev/blog/spending-your-effort/) — Thariq Shihipar, 25 septembre 2026. Exemple d’un workflow dans lequel l’agent commence par interviewer le développeur sur les omissions de la spécification avant de coder, puis l’implémentation est vérifiée avec davantage d’effort. Renvois : 3, 10, 13. **Limite :** paramètres liés aux modèles du moment.
- **[Complémentaire · martinfowler.com]** [Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html) — Birgitta Böckeler, 15 octobre 2025. Distingue trois niveaux de spec-driven development : *spec-first*, *spec-anchored* (la spec est maintenue avec la fonctionnalité) et *spec-as-source* (on n’édite plus que la spec). Critique : outils trop lourds pour les petites tâches, revue pénible de nombreux fichiers Markdown, frontière floue entre spec fonctionnelle et technique, parallèle avec le model-driven development. Renvoi : 8. **Contrepoint** utile à *How to write a good spec for AI agents*. **Limite :** outils cités datés.

## Chapitre 8. Le Context Engineering

- **[Central · Addy Osmani]** [Agentic Engine Optimization (AEO)](https://addyosmani.com/blog/agentic-engine-optimization/) — Organise la documentation de manière exploitable par les agents.
- **[Central · claude.dev]** [The new rules of context engineering for Claude 5 generation models](https://claude.dev/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models/) — Thariq Shihipar, 24 juillet 2026. Architecture du contexte : instructions, mémoire, skills, références, divulgation progressive et réduction du bruit. Renvoi : 9. **Limite :** conseils partiellement dépendants de la génération de modèles.
- **[Complémentaire · Addy Osmani]** [Stop Using /init for AGENTS.md](https://addyosmani.com/blog/agents-md/) — Met en garde contre les instructions générées automatiquement et le bruit contextuel.
- **[Complémentaire · Addy Osmani]** [Audit your Agent files](https://addyosmani.com/blog/audit-your-agent-files/) — Propose une hygiène continue des fichiers d’instructions, skills et hooks. Renvois utiles : chapitres 9.
- **[Complémentaire · claude.dev]** [Lessons from building Claude Code: Prompt caching is everything](https://claude.dev/blog/lessons-from-building-claude-code-prompt-caching-is-everything/) — Thariq Shihipar, 30 avril 2026. Contraintes de coût et de latence dues à la mise en cache des préfixes, à l’ordre du contexte et à la compaction. Renvois : 9, 10.
- **[Complémentaire · martinfowler.com]** [Context Engineering for Coding Agents](https://martinfowler.com/articles/exploring-gen-ai/context-engineering-coding-agents.html) — Birgitta Böckeler, 5 février 2026. Typologie des mécanismes de contexte : prompts réutilisables (instructions), interfaces de contexte (outils, MCP, skills), et qui décide du chargement (le LLM, l’humain ou le logiciel de l’agent). Plaide pour un contexte minimal construit progressivement, et rappelle qu’il améliore les chances de succès sans rien garantir. Renvoi : 9. **Limite :** Claude Code sert d’exemple principal.

## Chapitre 9. L’environnement de travail des agents

- **[Central · Addy Osmani]** [Agent Harness Engineering](https://addyosmani.com/blog/agent-harness-engineering/) — Décrit les outils, contraintes, permissions, sandboxes et feedback loops du harness.
- **[Central · Addy Osmani]** [Agent Skills](https://addyosmani.com/blog/agent-skills/) — Formalise des procédures reproductibles pour les agents.
- **[Central · claude.dev]** [Seeing like an agent: how we design tools in Claude Code](https://claude.dev/blog/seeing-like-an-agent/) — Thariq Shihipar, 10 avril 2026. Conception des outils à partir des capacités et limites du modèle, interfaces de questions, recherche et sous-agents ; exemple de divulgation progressive. Renvois : 8, 10.
- **[Central · claude.dev]** [Lessons from building Claude Code: How we use skills](https://claude.dev/blog/lessons-from-building-claude-code-how-we-use-skills/) — Thariq Shihipar, 3 juin 2026. Typologie empirique des skills ; instructions, scripts, ressources, pièges connus, tests de produit, hooks et distribution en équipe. Renvois : 8, 13, 14.
- **[Central · martinfowler.com]** [Harness Engineering - first thoughts](https://martinfowler.com/articles/exploring-gen-ai/harness-engineering-memo.html) — Birgitta Böckeler, 17 février 2026. Analyse le retour d’expérience d’OpenAI sur un produit de plus d’un million de lignes écrit par des agents. Le harness (guides et sensors) doit restreindre l’espace des solutions pour rendre le code fiable et maintenable, et diriger l’attention humaine là où elle compte. Contraintes d’architecture vérifiées par linters et tests structurels, agents de « garbage collection », templates de harness partagés, question ouverte de l’application au legacy. Renvois : 8, 11, 12.
- **[Complémentaire · martinfowler.com]** [Are Harnesses Worth the Cost?](https://martinfowler.com/articles/are-harnesses-worth-the-cost.html) — Naresh Jain, 13 octobre 2026. Expérience mesurée : le harness ne change rien pour un modèle de pointe, mais fait passer un modèle moins cher de 3 à 10 exécutions acceptées sur 10, pour un coût par exécution inférieur d’environ 33 % à celui du modèle de pointe sans harness. Concepts : guides contre sensors, « executable attention », séparation entre feedback de la boucle interne et évaluation indépendante de la boucle externe. Renvois : 10, 13, 15. **Limite :** une seule expérience, noms de modèles périssables.
- **[Complémentaire · Addy Osmani]** [The Agent Stack Bet](https://addyosmani.com/blog/the-agent-stack-bet/) — Questionne les choix d’outillage et leur pérennité.
- **[Complémentaire · Addy Osmani]** [Give your AI eyes: Introducing Chrome DevTools MCP](https://addyosmani.com/blog/devtools-mcp/) — Exemple concret d’outillage d’observation et d’interaction avec un navigateur. Renvois utiles : chapitres 13.
- **[Complémentaire · Addy Osmani]** [My LLM coding workflow going into 2026](https://addyosmani.com/blog/ai-coding-workflow/) — Exemple d’environnement et de workflow personnel ; daté, à contextualiser.
- **[Complémentaire · claude.dev]** [Getting started with Claude Code mods](https://claude.dev/blog/getting-started-with-claude-code-mods/) — Addy Osmani, 1er octobre 2026. Tutoriel sur les extensions/hook de l’environnement de travail ; utile comme illustration concrète du harness. **Limite :** tutoriel produit, versions et API changeantes.
- **[Complémentaire · claude.dev]** [Claude Code in the cloud: a field guide to cloud sessions](https://claude.dev/blog/claude-code-in-the-cloud/) — Addy Osmani, 6 octobre 2026. Isolation des tâches, environnements distants, branches, credentials et conditions permettant à un agent de vérifier son travail. Renvois : 10, 14. **Limite :** exemple produit.

## Chapitre 10. Délégation, autonomie et orchestration

- **[Central · Addy Osmani]** [Agentic Autonomy Levels](https://addyosmani.com/blog/agentic-autonomy-levels/) — Cadre des degrés d’autonomie et d’orchestration selon le risque.
- **[Central · Addy Osmani]** [The Orchestration Tax](https://addyosmani.com/blog/orchestration-tax/) — Montre les limites cognitives et les coûts de la multiplication des agents.
- **[Central · claude.dev]** [A harness for every task: dynamic workflows in Claude Code](https://claude.dev/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code/) — Thariq Shihipar et Sid Bidasaria, 2 juin 2026. Construction dynamique de workflows, coordination d’agents, critères d’arrêt et cas où le multi-agent n’est pas justifié. Renvois : 9, 15.
- **[Central · martinfowler.com]** [Humans and Agents in Software Engineering Loops](https://martinfowler.com/articles/exploring-gen-ai/humans-and-agents.html) — Kief Morris, 4 mars 2026. Trois positions de l’humain : *out of the loop* (seul le résultat compte), *in the loop* (relecture ligne à ligne, qui devient le goulet d’étranglement) et *on the loop* (l’humain améliore le harness plutôt que de corriger l’artefact). Distingue la boucle du « pourquoi » et les boucles imbriquées du « comment ». Renvois : 9, 15, 16.
- **[Complémentaire · Addy Osmani]** [The Code Agent Orchestra – what makes multi-agent coding work](https://addyosmani.com/blog/code-agent-orchestra/) — Expose des schémas de coordination, sous-agents et équipes parallèles.
- **[Complémentaire · Addy Osmani]** [Your parallel Agent limit](https://addyosmani.com/blog/cognitive-parallel-agents/) — Analyse le plafonnement de l’attention humaine en contexte multi-agents.
- **[Complémentaire · Addy Osmani]** [Your AI coding agents need a manager](https://addyosmani.com/blog/coding-agents-manager/) — Compare délégation d’agents et encadrement de tâches d’ingénierie. Renvois utiles : chapitres 17.
- **[Complémentaire · Addy Osmani]** [Claude Code Swarms](https://addyosmani.com/blog/claude-code-agent-teams/) — Cas pratique spécifique à un outil : à traiter comme exemple daté.
- **[Complémentaire · Addy Osmani]** [The future of agentic coding: conductors to orchestrators](https://addyosmani.com/blog/future-agentic-coding/) — Contexte conceptuel de la transition vers la supervision multi-agents.
- **[Complémentaire · claude.dev]** [What a task costs on Opus 5.5](https://claude.dev/blog/what-a-task-costs-on-opus-5-5/) — Addy Osmani, 25 septembre 2026. Mesure du coût par tâche plutôt que par simple token, prix des reprises et compromis modèle/coût/qualité. Renvois : 3, 16. **Limite :** prix et noms de modèles très périssables.

# Partie IV — Construire des logiciels fiables

## Chapitre 11. Architecture et maintenabilité

- **[Central · Addy Osmani]** [Comprehension Debt - the hidden cost of AI generated code.](https://addyosmani.com/blog/comprehension-debt/) — Présente la dette de compréhension et le risque d’une codebase qui dépasse la maîtrise humaine. Renvois utiles : chapitres 12.
- **[Central · Addy Osmani]** [Agentic Code Quality](https://addyosmani.com/blog/agentic-code-quality/) — Déplace la qualité vers les contraintes et le système qui entourent la génération. Renvois utiles : chapitres 13,14.
- **[Central · Pragmatic Engineer]** [The Philosophy of Software Design – with John Ousterhout](https://newsletter.pragmaticengineer.com/p/the-philosophy-of-software-design) — Interview de John Ousterhout par Gergely Orosz, 9 avril 2025. Le design devient plus important à mesure que l’IA écrit le code ; le design est un problème de décomposition. Les agents sont comparés à des « tactical tornadoes » : du code produit vite, qui crée de la dette. Défend les deep modules et les commentaires d’interface. Renvois : 4, 6. **Limite :** interview, pas un texte écrit ; positions de 2025.
- **[Complémentaire · martinfowler.com]** [Assessing internal quality while coding with an agent](https://martinfowler.com/articles/exploring-gen-ai/ccmenu-quality.html) — Erik Doernenburg, 27 janvier 2026. Étude de cas sur une application réelle : l’agent livre une fonctionnalité qui marche mais dégrade la qualité interne (types optionnels contournés, cache et complexité inutiles, helpers existants ignorés). Renvois : 3, 14. **Limite :** un seul cas, modèles datés.
- **[Complémentaire · martinfowler.com]** [The Economic Benefit of Refactoring](https://martinfowler.com/articles/exploring-gen-ai/refactoring-economic-benefit.html) — Giles Edwards-Alexander, 30 juillet 2026. Découper un fichier Rust de 17 155 lignes en modules réduit d’environ 83 % les tokens d’entrée estimés pour une modification type : l’agent trouve plus facilement le plus petit sous-ensemble de code pertinent. Argument chiffré en faveur de la modularité, même quand le code est écrit par des agents. Renvois : 8, 12. **Limite :** une expérience, estimation de tokens.

## Chapitre 12. Comprendre, reprendre et faire évoluer du code existant

- **[Central · Addy Osmani]** [Brownfield Agentic Engineering](https://addyosmani.com/blog/brownfield-agentic-engineering/) — Guide pour les systèmes hérités et pour le code récent déjà opaque, avec cartographie, tests de caractérisation et migration prudente.
- **[Complémentaire · Addy Osmani]** [Automated Decision Logs in AI-Assisted Coding](https://addyosmani.com/blog/automated-decision-logs/) — Traçabilité durable des décisions et des raisons derrière les changements. Renvois utiles : chapitres 7,11.
- **[Complémentaire · claude.dev]** [Using Claude Code: The unreasonable effectiveness of HTML](https://claude.dev/blog/using-claude-code-the-unreasonable-effectiveness-of-html/) — Thariq Shihipar, 20 mai 2026. Visualisations de flux, diagrammes, diff annotés et artefacts interactifs pour rendre compréhensibles les parties d’un système peu familier. Renvois : 6, 7, 14. **Limite :** préférence de l’auteur pour le HTML, pas une règle universelle.
- **[Complémentaire · martinfowler.com]** [Onboarding to a 'legacy' codebase with the help of AI](https://martinfowler.com/articles/exploring-gen-ai/09-ai-help-onboarding-codebase.html) — Birgitta Böckeler, 15 août 2024. Test sur Bahmni, une grande codebase open source ancienne : l’IA aide à repérer le code et les termes métier pertinents, sans toujours être exacte ; elle échoue sur la mise en place de l’environnement et sur la génération de tests unitaires, qui dépendent de la documentation et de la modularité du code. Renvois : 11, 13. **Limite :** outils de 2024.

## Chapitre 13. Tests, évaluations et vérification

- **[Central · Addy Osmani]** [An Engineer’s Guide to AI Code Model Evals](https://addyosmani.com/blog/ai-evals/) — Introduction aux jeux de tests, évaluations et mesures systématiques des capacités de modèles de code.
- **[Central · claude.dev]** [Automating eval design and hillclimbing with Claude](https://claude.dev/blog/automating-eval-design-and-hillclimbing/) — Lance Martin, 28 septembre 2026. Construction de jeux d’évaluation pertinents, juges programmatiques ou LLM, vérification des juges, jeux de test tenus à l’écart pour limiter le surapprentissage, optimisation par itérations. Renvois : 9, 15. **Attention :** évaluation d’agents ou de skills ≠ tests fonctionnels d’un logiciel.
- **[Central · Kent Beck]** [Augmented Coding: Beyond the Vibes](https://newsletter.kentbeck.com/p/augmented-coding-beyond-the-vibes) — Kent Beck, 25 juin 2025. Étude de cas : une bibliothèque de B+ Tree en Rust et Python construite en TDD avec un agent. Oppose vibe coding (seul le comportement compte) et augmented coding (on garde l’exigence sur le code, la complexité et les tests). Signaux d’alerte : boucles, fonctionnalités non demandées, tests désactivés ou supprimés. Règles données à l’agent : un test à la fois, Red-Green-Refactor, changements structurels et comportementaux dans des commits séparés. Renvois : 4, 9.
- **[Central · martinfowler.com]** [TDD inside the agent loop - theater or actual value?](https://martinfowler.com/articles/exploring-gen-ai/tdd-in-the-agent-loop.html) — Birgitta Böckeler, 10 août 2026. Expérience exploratoire : demander à l’agent d’appliquer le TDD ne produit pas de différence nette de qualité (scores de mutation similaires), pour un coût en tokens plusieurs fois supérieur. Une grande partie des bénéfices du TDD suppose un humain dans la boucle. L’autrice a cessé de demander le test-first et privilégie mutation testing, surveillance des résultats et scénarios approuvés. Renvois : 6, 15. **Contrepoint** direct à Kent Beck. **Limite :** échantillon trop petit pour conclure, selon l’autrice elle-même.
- **[Complémentaire · Pragmatic Engineer]** [TDD, AI agents and coding with Kent Beck](https://newsletter.pragmaticengineer.com/p/tdd-ai-agents-and-coding-with-kent) — Interview de Kent Beck par Gergely Orosz, 11 juin 2025. L’agent est un « genie imprévisible » ; le TDD est un « superpouvoir » face à lui, car les tests protègent des régressions, même si l’agent tente de les supprimer. Renvois : 3, 5. **Limite :** interview.

## Chapitre 14. Code review, sécurité et livraison

- **[Central · Addy Osmani]** [Agentic Code Review](https://addyosmani.com/blog/agentic-code-review/) — Fait de la revue une décision informée par des preuves et des contrôles.
- **[Central · claude.dev]** [How the Claude Code team does code review](https://claude.dev/blog/solving-code-review-at-anthropic/) — Addy Osmani, Morgan Westlee Lunt et Qing Wang, 15 octobre 2026. Retour d’expérience sur des contrôles en couches, revues AI avant la PR, niveaux de risque, approbation humaine, sécurité, métriques d’incidents, flags, rollback et apprentissage à partir des erreurs. Renvois : 5, 11, 13, 16. **Attention :** étude de cas interne, transférabilité à évaluer ; ne garantit pas à elle seule un modèle de revue universel.
- **[Complémentaire · Addy Osmani]** [Code Review in the Age of AI](https://addyosmani.com/blog/code-review-in-the-age-of-ai/) — Principes et gestes de revue lorsque la génération s’accélère.
- **[Complémentaire · Addy Osmani]** [AI writes code faster. Your job is still to prove it works.](https://addyosmani.com/blog/code-review-ai/) — Précise les éléments de preuve à exiger avant la mise en production. Renvois utiles : chapitres 13.
- **[Complémentaire · Addy Osmani]** [Bias Toward Action](https://addyosmani.com/blog/bias-towards-action/) — Déploiement progressif, observabilité, réversibilité, canaris et garde-fous.
- **[Central · martinfowler.com]** [Agentic AI and Security](https://martinfowler.com/articles/agentic-ai-security.html) — Korny Sietsma, 28 octobre 2025. Un LLM ne distingue pas de façon fiable les données des instructions, d’où l’injection de prompt. Présente la « Lethal Trifecta » (accès à des données sensibles, exposition à du contenu non fiable, communication externe) et les mitigations : supprimer l’un des trois éléments, sandbox, étapes à moindre privilège, revue humaine. Renvois : 9, 10.
- **[Complémentaire · martinfowler.com]** [Coding Assistants Threaten the Software Supply Chain](https://martinfowler.com/articles/exploring-gen-ai/software-supply-chain-attack-surface.html) — Jim Gumbley et Lilly Ryan, 13 mai 2025. Les agents exécutent des commandes, modifient des fichiers et installent des dépendances avec les privilèges du développeur : serveurs MCP, fichiers de règles ou dépendances compromis deviennent des vecteurs d’attaque. Recommande sandbox, moindre privilège, vérification des MCP et fichiers de règles comme des dépendances, et intégration des assistants au threat modeling. Renvoi : 9.
- **[Complémentaire · Kent Beck]** [Trust Is the Binding Constraint](https://newsletter.kentbeck.com/p/trust-is-the-binding-constraint) — Kent Beck, 30 octobre 2026. Les équipes produisent du code plus vite qu’elles ne construisent la confiance dans ce code ; l’IA pousse au travail en solo et affaiblit la collaboration, les tests et la revue qui produisent cette confiance. Ralentir à des points clés accélère la livraison. Renvois : 2, 10. **Limite :** billet qui promeut aussi une formation de l’auteur.
- **[Complémentaire · X]** [Post de Robert C. Martin sur la revue du code des agents](https://x.com/unclebobmartin/status/2080622218527084961) — Robert C. Martin, juillet 2026. Ne lit plus le code écrit par ses agents et les entoure à la place de contraintes fortes : tests unitaires, tests d’acceptation Gherkin, procédures de QA, seuils de complexité, mutation testing, couverture. Position opposée à celle de Böckeler (chapitre 4), de Grady Booch et de Fowler (chapitre 1), qui gardent la relecture humaine. Renvois : 13, 16. **À vérifier :** texte intégral et date non lus à la source (page X inaccessible) ; contenu connu par des reprises, notamment [Startup Fortune](https://startupfortune.com/uncle-bob-martin-says-he-no-longer-reads-ai-generated-code-and-the-developer-world-is-split/).

# Partie V — Industrialiser et faire évoluer son métier

## Chapitre 15. Le Loop Engineering

- **[Central · Addy Osmani]** [Loop Engineering](https://addyosmani.com/blog/loop-engineering/) — Définit les boucles d’action et de vérification autour des agents.
- **[Central · Addy Osmani]** [Practical Loop Engineering](https://addyosmani.com/blog/practical-loop-engineering/) — Propose un modèle de mise en pratique et une discipline de supervision.
- **[Central · claude.dev]** [How we made claude.ai 3x faster in two weeks](https://claude.dev/blog/how-we-made-claude-ai-faster/) — Raymond Wang, Sam Attard et Issac G., 23 septembre 2026. Étude de cas complète : instrumentation, benchmarks, objectifs mesurables, expérimentation par agents, tests de non-régression, feature flags, supervision humaine et déploiement progressif. Renvois : 6, 13, 14, 16. **Attention :** chiffres et méthode rapportés par l’équipe concernée.
- **[Complémentaire · Addy Osmani]** [Long-running Agents](https://addyosmani.com/blog/long-running-agents/) — Conçoit des agents persistants avec mémoire, reprise, état et récupération après erreur.
- **[Complémentaire · Addy Osmani]** [Self-Improving Coding Agents](https://addyosmani.com/blog/self-improving-agents/) — Étudie les boucles d’amélioration des agents et leurs contraintes.

## Chapitre 16. Les Software Factories

- **[Central · Addy Osmani]** [Software Factories, Light and Dark](https://addyosmani.com/blog/software-factories/) — Expose la distinction entre usine supervisée et automatisation opaque.
- **[Central · Addy Osmani]** [Human judgment doesn’t leave the software factory. It relocates.](https://addyosmani.com/blog/human-judgment-doesnt-leave-the-software/) — Situe les décisions et responsabilités humaines dans la chaîne automatisée.
- **[Central · Addy Osmani]** [Own the Outer Loop](https://addyosmani.com/blog/own-the-outer-loop/) — Relie preuve, verdict et responsabilité du responsable de la production. Renvois utiles : chapitres 2,14.
- **[Complémentaire · claude.dev]** [Building effective agent automations](https://claude.dev/blog/building-effective-agent-automations/) — Lance Martin et CJ Avilla, 8 octobre 2026. Exemple d’infrastructure d’agents persistants : sources, destinations, déclenchement planifié, mémoire, échec d’accès, gardes-fous et notifications. Renvoi : 15. **Limite :** exemple d’automatisation d’information, pas une software factory de bout en bout.

## Chapitre 17. L’avenir du métier d’ingénieur logiciel

- **[Central · Addy Osmani]** [The Agent-Era Career](https://addyosmani.com/blog/career-advice-age-of-agents/) — Identifie les compétences professionnelles robustes face à l’automatisation.
- **[Complémentaire · Addy Osmani]** [The Next Two Years of Software Engineering](https://addyosmani.com/blog/next-two-years/) — Scénarios prospectifs : à lire comme hypothèses, non comme certitudes. Renvois utiles : chapitres 1.
- **[Complémentaire · Addy Osmani]** [21 Lessons From 14 Years at Google](https://addyosmani.com/blog/21-lessons/) — Met en perspective les compétences durables hors génération de code. Renvois utiles : chapitres 6.
- **[Complémentaire · Addy Osmani]** [High Agency Matters](https://addyosmani.com/blog/high-agency-matters/) — Développe le sens de l’initiative et la responsabilité. Renvois utiles : chapitres 6.

# Lacunes éditoriales identifiées

- **Chapitre 4 :** programmation, algorithmique, code design, refactoring et débogage sans IA : le corpus actuel ne suffit pas pour enseigner ces fondamentaux. *v1.3 : partiellement couvert (what/how loop, débat Ousterhout–Martin) ; les ouvrages de référence restent à ajouter.*
- **Chapitre 7 :** conception produit, analyse des besoins, acceptation métier et validation de l’intention en amont des spécifications. *v1.3 : critique du spec-driven development ajoutée ; analyse des besoins toujours absente.*
- **Chapitre 11 :** architecture de longue durée, modularité, gestion des couplages, arbitrages techniques et design évolutif. *v1.3 : partiellement couvert (Ousterhout, qualité interne, économie du refactoring).*
- **Chapitre 13 :** TDD, tests de caractérisation, mutation testing, tests d’intégration et validation indépendante : les articles sur les « evals » d’agents ne suffisent pas. *v1.3 : TDD couvert par une controverse documentée (Beck contre Böckeler) ; tests de caractérisation et tests d’intégration toujours absents.*
- **Chapitre 14 :** sécurité applicative, injection de prompt, secrets, autorisations, isolation, supply chain, SRE et procédures d’incident. *v1.3 : injection de prompt et supply chain couverts ; secrets, SRE et procédures d’incident toujours absents.*
- **Chapitre 17 :** distinguer les projections de carrière des résultats robustes issus de recherches sur le travail des développeurs.

# Principes de rédaction

- Conserver une progression pédagogique basée sur les compétences, non sur la chronologie des publications.
- Distinguer les principes transférables, les exemples liés aux outils actuels et les résultats annoncés par leurs auteurs.
- Contraster les retours d’expérience d’Anthropic avec les méthodes générales du Software Engineering ; leur transférabilité doit être évaluée.
- Pour chaque chapitre : 1–2 lectures prioritaires, thèses et objections vérifiables, exemples pratiques, exercices et références à compléter.
