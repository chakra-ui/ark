# Splitter Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/splitter/`
- React files: `packages/react/src/components/splitter/`
- Storybook/style files: `packages/angular/src/splitter/splitter.stories.ts`, `packages/angular/src/splitter/examples/`, `packages/angular/src/splitter/splitter-example-styles.ts`, `.storybook/modules/splitter.module.css`

## Summary
- Status: Re-audited. Previously fixed gaps remain closed and no new parity drift was found between the React and Angular sources, stories, examples, or demo styles. All nine React story exports have matching Angular `StoryObj` entries with parity-aligned example components and CSS treatments.
- Highest-risk gaps (historical, now closed): Angular Storybook lacked the React `DynamicCollapsible` example, the collapsible demo default sizes did not match React, the context demo only exposed one panel action, and Angular demo styles missed React's resize-trigger focus/dragging/disabled states and visual handle treatment.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story parity | `DynamicCollapsible` story and example were missing. | `packages/react/src/components/splitter/examples/dynamic-collapsible.tsx`, `packages/react/src/components/splitter/splitter.stories.tsx` | `packages/angular/src/splitter/examples/dynamic-collapsible.ts`, `packages/angular/src/splitter/splitter.stories.ts` | Closed: Angular dynamic-collapsible example added with `useSplitter`, `arkSplitterRootProvider`, `ResizeObserver`-based root width tracking, and an `effect()` that collapses/expands panel `a` when the root drops below 600px. |
| Story parity | Collapsible example seeded `[15, 85]` while React seeds `[15, 20]`. | `packages/react/src/components/splitter/examples/collapsible.tsx` | `packages/angular/src/splitter/examples/collapsible.ts` | Closed: Angular `defaultSize` is `[15, 20]`. |
| Story parity | Context example only provided a resize action for panel `a`; React provides actions for both panels. | `packages/react/src/components/splitter/examples/context.tsx` | `packages/angular/src/splitter/examples/context.ts` | Closed: `SplitterPanelActions` is parameterized via `panelId` input and rendered inside both panels. |
| Styling parity | Angular Storybook styles lacked React module's min-height, trigger cursor/inset border, focus/dragging colors, disabled state, and indicator focus-visible styling. | `.storybook/modules/splitter.module.css` | `packages/angular/src/splitter/splitter-example-styles.ts` | Closed: Angular example styles match the React module behaviour (rose focus/dragging colors, disabled cursor, indicator focus-visible outline, thumb sizing) using Angular-local class names. |
| Public API | Angular exports are directive-centric and prefixed (`ArkSplitterRoot`, `createSplitterRegistry`, `getSplitterLayout`) rather than React namespace aliases. | `packages/react/src/components/splitter/splitter.ts` | `packages/angular/src/splitter/public-api.ts` | No change; this follows `docs/technical-requirements.md` (directive-centric public API with `Ark` prefix, DI-based context, no React-style namespace alias). |
| Functionality | `resizeStart` emits no details. | `@zag-js/splitter` `onResizeStart?: () => void` | `packages/angular/src/splitter/splitter-root.ts` | No change; Zag's callback is void, so the `OutputEmitterRef<void>` matches the upstream contract. |
| Type names | Angular types are `Splitter`-prefixed (`SplitterPanelData`, `SplitterExpandCollapseDetails`, ...). React re-exports the bare Zag names. | `packages/react/src/components/splitter/splitter.ts` | `packages/angular/src/splitter/splitter.types.ts`, `public-api.ts` | No change; the Angular package follows `docs/technical-requirements.md` prefix convention for entry-point exports. |

## Implementation Plan
1. Confirm story coverage: re-verified `Basic`, `Collapsible`, `Context`, `MultiplePanels`, `Nested`, `ResizeIndicator`, `RootProvider`, `Vertical`, and `DynamicCollapsible` all exist with matching example components.
2. Confirm example argument parity (panel ids, defaults, registries, controlled vs root-provider variants).
3. Confirm example styles still mirror `.storybook/modules/splitter.module.css` selectors and data-state behaviour.
4. Re-run splitter Vitest spec and Angular build/typecheck-equivalent steps.

## Verification
- [x] Component tests: `bun run --cwd packages/angular test:ci src/splitter/splitter.spec.ts` passed with 11 tests on this re-audit.
- [x] Typecheck/build: `bun run --cwd packages/angular build` passed for every entry point including `@ark-ui/angular/src/splitter`. `bun run --cwd packages/angular typecheck` was attempted but failed in an unrelated component (`navigation-menu/navigation-menu.spec.ts(124,73): error TS4111: Property 'id' comes from an index signature, so it must be accessed with ['id'].`); the splitter sources and spec compile cleanly under the same task.
- [ ] Storybook render: not re-attempted on this pass. Prior attempt failed on unrelated Angular cache `ENOENT` errors and an unrelated `ArkTabsRootProvider` type mismatch; no splitter-specific blocker was observed.
- [x] Manual/visual checks: Cross-referenced React `splitter.module.css`, `splitter.stories.tsx`, and each `examples/*.tsx` against the Angular counterparts. No diffs detected in story names, args, ids, default sizes, registries, orientation, or class-to-selector mapping. No browser visual check executed.

## Commit
- Hash: TBD on commit
- Message: `fix(angular): align splitter with react parity`
