# Navigation Menu Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/navigation-menu/*`, `packages/angular/src/navigation-menu/examples/*`
- React files: `packages/react/src/components/navigation-menu/*`, `packages/react/src/components/navigation-menu/examples/*`
- Storybook/style files: `packages/angular/src/navigation-menu/navigation-menu.stories.ts`, `.storybook/modules/navigation-menu.module.css`, `packages/angular/src/navigation-menu/navigation-menu-example-styles.ts`

## Summary
- Status: Fixed with one deferred design gap.
- Highest-risk gaps: Root/root-provider host props, link selection output, trigger disabled override, missing Context story, and demo styling/story parity were addressed. Viewport content auto-portaling/proxy behavior remains deferred because it needs a dedicated Angular template/portal design beyond this directive-only pass.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API / accessibility | Root and root-provider host elements provide context but do not apply `getRootProps()`, so root `data-scope`, `data-part`, `id`, `dir`, and orientation attrs are missing. | `packages/react/src/components/navigation-menu/navigation-menu-root.tsx`, `navigation-menu-root-provider.tsx` | `packages/angular/src/navigation-menu/navigation-menu-root.ts`, `navigation-menu-root-provider.ts` | Fixed: both directives apply `api().getRootProps()` with `applyArkProps`; specs cover root attrs. |
| Public API | Link does not expose the Zag/React `onSelect` callback surface. | `packages/react/src/components/navigation-menu/navigation-menu-link.tsx` | `packages/angular/src/navigation-menu/navigation-menu-link.ts` | Fixed: added `(select)` output wired to `getLinkProps({ onSelect })`, including preventDefault close behavior coverage. |
| Public API | Trigger cannot override an ancestor item `disabled` state. | `packages/react/src/components/navigation-menu/navigation-menu-trigger.tsx` | `packages/angular/src/navigation-menu/navigation-menu-trigger.ts` | Fixed: added optional `[disabled]` input and use it when present, otherwise inherit item disabled. |
| Story parity | React exports `Context`; Angular does not. | `packages/react/src/components/navigation-menu/examples/context.tsx`, `navigation-menu.stories.tsx` | `packages/angular/src/navigation-menu/navigation-menu.stories.ts` | Fixed: added Angular context example using `#root="arkNavigationMenu"` and exported it from Storybook. |
| Story/style parity | Angular viewport story has fewer menus/items and lacks the React grid layout/classes. | `packages/react/src/components/navigation-menu/examples/viewport.tsx` | `packages/angular/src/navigation-menu/examples/viewport.ts` | Fixed: expanded Angular viewport example to mirror React content groups and widths. |
| Styling parity | Angular example CSS diverges from React module: trigger/link colors, indicator/arrow sizing, viewport layout, motion selectors, hover/focus/disabled/current states. | `.storybook/modules/navigation-menu.module.css` | `packages/angular/src/navigation-menu/navigation-menu-example-styles.ts` | Fixed: aligned Angular attribute-selector styles with the React module behavior. |
| Render strategy / viewport portal | React `Content` ports content into the viewport using proxy nodes when a viewport is rendered. Angular has no component-level content portal/proxy equivalent for this directive-only implementation. | `packages/react/src/components/navigation-menu/navigation-menu-content.tsx` | `packages/angular/src/navigation-menu/navigation-menu-content.ts`, `navigation-menu-viewport.ts` | Deferred: document as a design gap requiring a dedicated Angular template/portal pattern beyond this focused pass. |

## Implementation Plan
1. Apply root props in root and root-provider directives and add focused specs.
2. Add missing link select output and trigger disabled override support with specs.
3. Add the missing Angular Context story/example.
4. Expand viewport example content and align demo styles to the React CSS module.
5. Run component tests, typecheck if public types changed, and `git diff --check`.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` attempted; blocked by unrelated existing `number-input/use-number-input.ts(53,9): error TS1117: An object literal cannot have multiple properties with the same name.`
- [x] Component tests: `bun run --cwd packages/angular test:ci src/navigation-menu/navigation-menu.spec.ts` passed, 22 tests.
- [x] Entry point tests: `bun run --cwd packages/angular test:ci src/entrypoints.spec.ts` passed, 56 tests.
- [x] Lint: `bun biome lint packages/angular/src/navigation-menu docs/audit/navigation-menu.md` passed.
- [ ] Storybook render: Not run in browser during this pass.
- [ ] Manual/visual checks: Not run in browser; demo CSS was source-compared against `.storybook/modules/navigation-menu.module.css`.

## Commit
- Hash: Recorded in final status after commit.
- Message: `fix(angular): align navigation menu parity`
