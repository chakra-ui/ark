# Splitter Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/splitter/`
- React files: `packages/react/src/components/splitter/`
- Storybook/style files: `packages/angular/src/splitter/splitter.stories.ts`, `packages/angular/src/splitter/examples/`, `packages/angular/src/splitter/splitter-example-styles.ts`, `.storybook/modules/splitter.module.css`

## Summary
- Status: Fixed, with verification caveats from unrelated in-progress components.
- Highest-risk gaps: Angular Storybook lacked the React `DynamicCollapsible` example, the collapsible demo default sizes did not match React, the context demo only exposed one panel action, and Angular demo styles missed React's resize-trigger focus/dragging/disabled states and visual handle treatment.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story parity | `DynamicCollapsible` story and example were missing. | `packages/react/src/components/splitter/examples/dynamic-collapsible.tsx`, `packages/react/src/components/splitter/splitter.stories.tsx` | `packages/angular/src/splitter/examples/`, `packages/angular/src/splitter/splitter.stories.ts` | Add Angular dynamic-collapsible example and story using `useSplitter`, `arkSplitterRootProvider`, and browser-only width observation. |
| Story parity | Collapsible example seeded `[15, 85]` while React seeds `[15, 20]`. | `packages/react/src/components/splitter/examples/collapsible.tsx` | `packages/angular/src/splitter/examples/collapsible.ts` | Align `defaultSize` to `[15, 20]`. |
| Story parity | Context example only provided a resize action for panel `a`; React provides actions for both panels. | `packages/react/src/components/splitter/examples/context.tsx` | `packages/angular/src/splitter/examples/context.ts` | Parameterize the action component by panel id and render actions in both panels. |
| Styling parity | Angular Storybook styles lacked React module's min-height, trigger cursor/inset border, focus/dragging colors, disabled state, and indicator focus-visible styling. | `.storybook/modules/splitter.module.css` | `packages/angular/src/splitter/splitter-example-styles.ts` | Update Angular example styles to match the React demo behavior with Angular-local class names. |
| Public API | Angular exports are directive-centric and prefixed (`ArkSplitterRoot`, `createSplitterRegistry`, `getSplitterLayout`) rather than React namespace aliases. | `packages/react/src/components/splitter/splitter.ts` | `packages/angular/src/splitter/public-api.ts` | No change; this follows Angular package requirements and existing entry-point naming. |
| Functionality | `resizeStart` emits no details. | `@zag-js/splitter` `onResizeStart?: () => void` | `packages/angular/src/splitter/splitter-root.ts` | No change; Zag's callback is void in the installed splitter package. |

## Implementation Plan
1. Add the missing `DynamicCollapsible` Angular example and story export.
2. Align existing Angular examples with React story behavior.
3. Update Angular splitter example styles for resize-trigger and indicator states.
4. Run splitter tests, typecheck, and diff hygiene checks.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular build` passed. `bun run --cwd packages/angular typecheck` was attempted but failed in unrelated select test work: `select/select.spec.ts(541,34): error TS2339: Property 'getSnapshot' does not exist on type 'SelectService<any>'.`
- [x] Component tests: `bun run --cwd packages/angular test:ci src/splitter/splitter.spec.ts` passed with 11 tests.
- [ ] Storybook render: `bun run --cwd packages/angular storybook -- --port 6007` was attempted. The full preview failed before serving because of unrelated Angular cache write `ENOENT` errors across non-splitter stories and an unrelated `ArkTabsRootProvider` type mismatch.
- [x] Manual/visual checks: Compared React `splitter.module.css` and examples against Angular examples/styles; no browser visual check completed because Storybook did not serve.

## Commit
- Hash:
- Message: `fix(angular): align splitter parity`
