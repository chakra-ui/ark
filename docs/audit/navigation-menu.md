# Navigation Menu Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/navigation-menu/*`, `packages/angular/src/navigation-menu/examples/*`
- React files: `packages/react/src/components/navigation-menu/*`, `packages/react/src/components/navigation-menu/examples/*`
- Storybook/style files: `packages/angular/src/navigation-menu/navigation-menu.stories.ts`, `.storybook/modules/navigation-menu.module.css`, `packages/angular/src/navigation-menu/navigation-menu-example-styles.ts`

## Summary
- Status: Re-audited. Public API, story coverage, controlled/uncontrolled behavior, link select output, trigger disabled override, indicator/arrow/item-indicator parts, viewport/positioner alignment, and demo styling all match React. One viewport-related design gap remains deferred (Content auto-portaling into Viewport via Zag proxy props), tracked below.
- Highest-risk gaps: Resolved in earlier passes. Only the Content -> Viewport portal/proxy bridge is still outstanding; it requires a non-trivial Angular template/portal approach beyond the directive-only public surface.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API / accessibility | Root and root-provider host elements apply `getRootProps()` so root `data-scope`, `data-part`, `id`, `dir`, and orientation attrs are emitted. | `packages/react/src/components/navigation-menu/navigation-menu-root.tsx`, `navigation-menu-root-provider.tsx` | `packages/angular/src/navigation-menu/navigation-menu-root.ts`, `navigation-menu-root-provider.ts` | Already fixed: both directives call `applyArkProps` with `api().getRootProps()`. Verified by spec assertions on `data-scope` / `data-part`. |
| Public API | Link exposes the Zag `onSelect` callback through an Angular `(select)` output, preserving `preventDefault()` semantics for close-on-click. | `packages/react/src/components/navigation-menu/navigation-menu-link.tsx` | `packages/angular/src/navigation-menu/navigation-menu-link.ts` | Already fixed: `(select)` output wired through `getLinkProps({ onSelect })`; preventDefault coverage in spec. |
| Public API | Trigger can override an ancestor item `disabled` via optional input, otherwise inherits item disabled state. | `packages/react/src/components/navigation-menu/navigation-menu-trigger.tsx` | `packages/angular/src/navigation-menu/navigation-menu-trigger.ts` | Already fixed: optional `[disabled]` with `optionalBooleanAttribute` transform; spec covers `[disabled]="false"` under `disabled` ancestor item. |
| Story parity | React exports `Context`; Angular Storybook story present with directive `exportAs` + template ref pattern. | `packages/react/src/components/navigation-menu/examples/context.tsx`, `navigation-menu.stories.tsx` | `packages/angular/src/navigation-menu/navigation-menu.stories.ts`, `examples/context.ts` | Already fixed: Angular `Context` story registers `NavigationMenuContextExample`; spec asserts `value: none` output. |
| Story parity | Angular adds an extra `WithIndicator` story not present in React, demonstrating `arkNavigationMenuItemIndicator`. | n/a | `packages/angular/src/navigation-menu/examples/with-indicator.ts`, stories file | Acceptable Angular addition (no React regression). Marked as `No change`. |
| Story/style parity | Angular viewport story renders the three React menus (Products / Company / Developers) with matching column widths and the standalone Pricing link plus Indicator + Arrow. | `packages/react/src/components/navigation-menu/examples/viewport.tsx` | `packages/angular/src/navigation-menu/examples/viewport.ts` | Already fixed: example mirrors React content groups, widths (`--products`, `--company`, `--developers`), align, and Indicator/Arrow placement. |
| Styling parity | Angular example CSS in `navigation-menu-example-styles.ts` is the attribute-selector translation of `.storybook/modules/navigation-menu.module.css` (colors, indicator/arrow sizing, viewport layout, motion selectors, hover/focus/disabled/current states). | `.storybook/modules/navigation-menu.module.css` | `packages/angular/src/navigation-menu/navigation-menu-example-styles.ts` | Already fixed: side-by-side source comparison confirms parity for layout/spacing/animation/data-state behaviors. |
| Render strategy / viewport portal | React `Content` uses Zag's `api.isViewportRendered`, `getViewportNode()`, `getViewportProxyProps`, and `getTriggerProxyProps` to portal its DOM into `Viewport` and emit proxy nodes for indicator/measurement. Angular `Content` renders in place and does not portal into `Viewport`. | `packages/react/src/components/navigation-menu/navigation-menu-content.tsx` | `packages/angular/src/navigation-menu/navigation-menu-content.ts`, `navigation-menu-viewport.ts` | Deferred. Requires a dedicated Angular template/portal pattern (TemplateRef capture + viewport-target portal + proxy node directives) that exceeds the directive-only public surface. Tracked in this audit; no implementation change in this pass. |
| Spec hygiene | Minor biome `useLiteralKeys` info on `getListProps()['id']` indexed access in `navigation-menu.spec.ts`. | n/a | `packages/angular/src/navigation-menu/navigation-menu.spec.ts` | Fixed: rewritten as `.id` literal-key access. |

## Implementation Plan
1. Re-read React source, Angular source, and React/Angular stories/examples to confirm parity status.
2. Confirm previously-fixed gaps remain closed (root props, link select, trigger disabled override, Context story, viewport demo content, demo styling).
3. Apply spec hygiene fix (literal-key access) flagged by biome.
4. Re-run navigation-menu spec, entrypoints spec, lint, and Angular typecheck.
5. Stage only navigation-menu files plus this audit and commit.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` succeeded. Angular package builds end-to-end including the navigation-menu entry point.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/navigation-menu/navigation-menu.spec.ts` -> 22 tests passing.
- [x] Lint: `bun biome lint packages/angular/src/navigation-menu docs/audit/navigation-menu.md` clean after the literal-key spec fix.
- [ ] Storybook render: Not run in browser during this re-audit pass.
- [ ] Manual/visual checks: Not run in browser; demo CSS continues to mirror `.storybook/modules/navigation-menu.module.css` by source comparison.

## Deferred Gaps
- Content auto-portaling into Viewport via Zag's `isViewportRendered` / `getViewportProxyProps` / `getTriggerProxyProps`. Requires an Angular-native portal/proxy design (TemplateRef + viewport-target portaled view + proxy directives) consistent with `docs/technical-requirements.md` portal context-carrier rules. Tracked here for a follow-up pass.

## Commit
- Hash: To be recorded after commit.
- Message: `fix(angular): align navigation-menu with react parity`
