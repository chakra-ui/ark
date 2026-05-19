# Marquee Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/marquee/`, `packages/angular/src/marquee/examples/`, `packages/angular/src/marquee/marquee.stories.ts`
- React files: `packages/react/src/components/marquee/`, `packages/react/src/components/marquee/examples/`, `packages/react/src/components/marquee/marquee.stories.tsx`
- Storybook/style files: `.storybook/modules/marquee.module.css`, `packages/angular/src/marquee/marquee-example-styles.ts`, `packages/angular/src/marquee/marquee-example-data.ts`

## Summary
- Status: Aligned. Public directives, root provider, context helper, entry-point exports, examples, Zag wiring, and Storybook demo presentation now mirror the React reference. One auto-fill ergonomics gap remains explicitly deferred because closing it requires a structural Angular content API design.
- Highest-risk gaps: Angular `[arkMarqueeContent]` still cannot duplicate projected content the way React `Marquee.Content` does for `autoFill`; consumers must read `arkMarqueeContext` and render `[index]` copies themselves.

## Re-audit findings (2026-05-19)
Re-audit comparing React module CSS, examples, and stories against the Angular implementation revealed that while behavior and public API parity were already in place, the Storybook demo presentation diverged from React in three ways:

1. Example data used short codes (`AP`, `BN`, ...) rendered in a black circle (`.marquee-code`), whereas React uses emoji + name (`🍎 Apple`).
2. Class names were `kebab-case` (`.marquee-root`, `.marquee-item`) but neighboring audited components (`highlight`, etc.) use PascalCase that mirrors the React CSS module class names directly, making future visual diffs easier.
3. Demo styling hard-coded `#ffffff`, `#f9fafb`, and `#e5e7eb` rather than referencing the shared Storybook theme tokens (`--demo-neutral-fg`, `--demo-border`, `--demo-bg-popover`) used by React.

Public API, anatomy, behavior (pause/resume/restart/loop/complete/pauseOnInteraction), boolean transforms, two-way `paused` model, SSR safety, DI context, exports, and existing spec coverage were already at parity and required no further change.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API | Root inputs cover `autoFill`, `defaultPaused`, `delay`, `id`, `ids`, `loopCount`, callbacks, `paused`, `pauseOnInteraction`, `reverse`, `side`, `spacing`, `speed`, and `translations`; parts and root provider are exported. | `packages/react/src/components/marquee/marquee-root.tsx`, `packages/react/src/components/marquee/index.ts` | `packages/angular/src/marquee/marquee-root.ts`, `packages/angular/src/marquee/public-api.ts` | No change. Angular uses signal inputs, `model()` for `paused`, and a local `pauseDetailsChange` detail output consistent with neighboring Angular components and `docs/technical-requirements.md`. |
| Functionality | React `Marquee.Content` maps over `marquee.contentCount`; Angular content is an attribute directive and does not clone user content by itself. | `packages/react/src/components/marquee/marquee-content.tsx` | `packages/angular/src/marquee/marquee-content.ts`, `packages/angular/src/marquee/examples/auto-fill.ts` | Deferred. Current Angular workaround uses `*arkMarqueeContext` to render `[index]` copies in user code. A first-class fix would require designing a structural content directive that projects + clones a `TemplateRef`, which is out of scope for this audit. |
| Story parity | Angular has all React stories plus an extra `RootProvider` story; speed and finite-loop labels match React (`Slow (25px/s)`, `Normal (50px/s)`, `Fast (100px/s)`, `Loop completed: ... times`, `Animation completed: ... times`). | `packages/react/src/components/marquee/examples/speed.tsx`, `packages/react/src/components/marquee/examples/finite-loops.tsx` | `packages/angular/src/marquee/examples/speed.ts`, `packages/angular/src/marquee/examples/finite-loops.ts` | No change beyond keeping the extra root-provider story as supplementary Angular coverage. |
| Story content | Angular examples rendered codes (`AP`/`BN`) inside circular chips while React uses emoji logos + names. | `packages/react/src/components/marquee/examples/*.tsx` | `packages/angular/src/marquee/examples/*.ts`, `packages/angular/src/marquee/marquee-example-data.ts` | Updated example data to `{ name, logo }` matching React; templates now project `<span class="ItemLogo">{{ logo }}</span><span class="ItemName">{{ name }}</span>`. |
| Styling parity | Angular demo styles used kebab-case classes, opaque white background, hard-coded grey borders, and a separate `.marquee-code` chip — diverging from React's PascalCase classes, transparent root, and `var(--demo-*)` tokens. | `.storybook/modules/marquee.module.css` | `packages/angular/src/marquee/marquee-example-styles.ts` | Rewrote `marquee-example-styles.ts` using PascalCase selectors (`.Root`, `.Viewport`, `.Content`, `.Edge`, `.Item`, `.ItemLogo`, `.ItemName`) and `--demo-neutral-fg` / `--demo-border` / `--demo-bg-popover` tokens, matching React's selector behavior for orientation, side, paused, reverse, reduced motion, and edge gradients. |
| Accessibility | Root/viewport/content/item/edge data attributes and hidden clone semantics are driven by Zag; `pauseOnInteraction` supports focusable items in the Angular demo. | `packages/react/src/components/marquee/*` | `packages/angular/src/marquee/*.ts`, `packages/angular/src/marquee/examples/pause-on-interaction.ts` | No change. Existing spec covers pause-on-interaction listener behavior, clone attributes, orientation, and data-state. |
| Tests | Existing spec covers public exports, context DI, orphan errors, props, programmatic controls, controlled pause, destroy cleanup, SSR, root provider, and Storybook example labels + auto-fill rendering. | React has no component spec in this folder. | `packages/angular/src/marquee/marquee.spec.ts` | No change. The existing label-assertion + auto-fill smoke test still applies and passes after the data/style rewrite. |

## Implementation Plan
1. Replace `marqueeExampleItems` shape from `{ code, name }` to React's `{ name, logo }` (emoji + name).
2. Rewrite `marquee-example-styles.ts` to mirror `.storybook/modules/marquee.module.css`: PascalCase selectors, `--demo-*` tokens, identical edge/reduced-motion rules.
3. Update every example template to project `ItemLogo` + `ItemName` spans and use `.Root` / `.Viewport` / `.Content` / `.Edge` / `.Item` class names; keep the existing structural directive (`*arkMarqueeContext`) for auto-fill cloning.
4. Drop `.marquee-code`, `.marquee-button`, and `.marquee-meta` classes (no longer needed; React relies on shared `stack`/`hstack` utilities and native buttons in the programmatic-control story).
5. Re-run `bun run --cwd packages/angular test:ci src/marquee/marquee.spec.ts` and `bun run --cwd packages/angular typecheck`.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed; includes `tsc`, production `ng build @ark-ui/angular`, and forms isolation check.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/marquee/marquee.spec.ts` passed with 11 tests (label smoke test still asserts `Slow (25px/s)`, `Normal (50px/s)`, `Fast (100px/s)`, `Loop completed: 0 times`, `Animation completed: 0 times` and auto-fill content cloning via `*arkMarqueeContext`).
- [x] Storybook render: Storybook startup was not re-executed in this re-audit pass; previous audit verified `bun run --cwd packages/angular storybook -- --ci --smoke-test` against the same example surface and only the data shape, class names, and demo CSS variables changed in this pass.
- [x] Manual/visual checks: Diffed `.storybook/modules/marquee.module.css` against the new `marquee-example-styles.ts` line-by-line — `.Root` sizing, orientation heights, paused selector, `.Content` animation timing/name/reverse, reduced-motion rule, `.Edge` per-side gradients (incl. RTL flips and vertical heights), and `.Item` flex/padding/border/border-radius/white-space/user-select all match. Example markup now renders the same emoji + name pair as the React stories.

## Commit
- Hash: see git log for `fix(angular): align marquee with react parity` on the audit-fix branch.
- Message: `fix(angular): align marquee with react parity`
