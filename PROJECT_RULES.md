# PROJECT RULES: Aethrix Nexus Nova

- BRAND: dark theme only. Palette "Obsidian Amber": bg-0 #0a0805, bg-1 #120e08, surface-1 #17120a, surface-2 #1e1810, text #f5f3ee, text-2 #b7ae9c, text-3 #7d7566, accent #ffd426, ember #ff9f1c, copper #b45309, success #34d399, danger #f87171. Borders rgba(255,255,255,0.07) and rgba(255,255,255,0.14). Accent yellow covers at most ~10% of any screen. NO neon magenta/violet/cyan, no rainbow gradients.
- TYPE: headings Space Grotesk 700, letter-spacing -0.03em, text-wrap balance, fluid clamp sizes. Body Plus Jakarta Sans, line-height 1.65. Mono only for small badges/labels (12px).
- CODE: TypeScript strict, no `any`, small components in feature folders (src/components/sections/*, src/components/ui/*, src/lib/*), server components by default, "use client" only where needed.
- MOTION: animate only transform and opacity. Always respect prefers-reduced-motion. 60fps target.
- PERFORMANCE: heavy things (three.js) are dynamically imported with ssr:false and have a static fallback. Use next/image for images.
- HONESTY: do not invent real client names, logos, certifications or metrics. Any demo case study or number must be clearly labeled "Concept / Reference Architecture".
- WORKFLOW: do exactly the step I request, nothing more. Never rewrite files from earlier steps unless I ask. At the end of every step: run `npm run build` and `npm run lint`, fix errors, then list every file you created/changed and STOP.
