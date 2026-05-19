# Select Angular Parity Audit

## Scope
- Angular files: `packages/angular/select/**`
- React files: `packages/react/src/components/select/**`
- Storybook/style files: `packages/angular/select/select.stories.ts`, `packages/angular/select/select-example-styles.ts`, `.storybook/modules/select.module.css`

## Summary
- Status: Fixed Angular select parity gaps for outside-interaction callback outputs, Storybook example coverage, and demo styling.
- Highest-risk gaps: Angular still does not expose a direct `Select.Context` render-prop part; Angular examples use root template references or `useSelect()`/`arkSelectRootProvider` instead, which matches the package's directive-centric Angular pattern.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API | Root accepted Zag `onFocusOutside`, `onPointerDownOutside`, and `onInteractOutside` through React props, but Angular had no corresponding outputs or exported event types. | `packages/react/src/components/select/select-root.tsx`, `packages/react/src/components/select/select.ts` | `packages/angular/select/select-root.ts`, `packages/angular/select/select.types.ts`, `packages/angular/select/public-api.ts` | Added `focusOutside`, `pointerDownOutside`, and `interactOutside` outputs and exported the matching event types. |
| Story parity | Angular Storybook only covered `Basic`, `Controlled`, `Multiple`, `WithField`, and `RootProvider`. | `packages/react/src/components/select/select.stories.tsx` | `packages/angular/select/select.stories.ts`, `packages/angular/select/examples/` | Added Angular stories/examples for `Async`, `FormLibrary`, `FullyControlled`, `Grouping`, `LazyMount`, `MaxSelected`, `Overflow`, `ReactiveCollection`, `SelectAll`, and `SelectOnHighlight`. |
| Styling parity | Angular example styles missed React's max width, full-width trigger, indicators overlay, focus/invalid states, content max-height, popover shadow, checked color, scrollbar, and open/closed animations. | `.storybook/modules/select.module.css` | `packages/angular/select/select-example-styles.ts` | Expanded Angular demo CSS to mirror React selectors and states using Angular directive selectors. |
| Root provider demo | React root-provider story shows selected state and clear/indicator controls; Angular story was minimal. | `packages/react/src/components/select/examples/root-provider.tsx` | `packages/angular/select/examples/root-provider.ts` | Added selected output and indicator markup while keeping the Angular `useSelect()` root-provider pattern. |
| Field demo | Angular field example used different label/helper/error text and option data, making visual and a11y comparison noisy. | `packages/react/src/components/select/examples/with-field.tsx` | `packages/angular/select/examples/with-field.ts` | Aligned visible text and framework options with React. |
| Test parity | Existing Angular tests covered selection, forms, portals, and public surface but not the outside-interaction callback channels. | `packages/react/src/components/select/tests/select.test.tsx` | `packages/angular/select/select.spec.ts` | Added focused coverage that verifies the new output handlers are wired through the Zag service props. |
| Context helper | React exposes `Select.Context` as a render-prop component used by `SelectAll`; Angular has no equivalent directive. | `packages/react/src/components/select/select-context.tsx`, `packages/react/src/components/select/examples/select-all.tsx` | `packages/angular/select/public-api.ts`, `packages/angular/select/examples/select-all.ts` | No change: Angular examples use `#root="arkSelectRoot"` and direct `root.api()` access, consistent with documented Angular template-reference patterns. |
| Presence/lazy mount | React root owns presence props and content consumes them through `PresenceProvider`; Angular directives cannot project conditional descendants internally. | `packages/react/src/components/select/select-root.tsx`, `packages/react/src/components/select/examples/lazy-mount.tsx` | `packages/angular/select/examples/lazy-mount.ts` | Used explicit `<ark-presence>` around portaled select content, matching Angular dialog/popover lazy-mount examples. |

## Implementation Plan
1. Export select outside-interaction event types and add Angular root outputs.
2. Add a spec that exercises the callback-to-output mapping through the local Zag service.
3. Add missing Angular Storybook examples for the React story set.
4. Bring Angular select demo styling in line with React's CSS module.
5. Verify with focused tests, TypeScript passes, Storybook startup, and diff checks.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular tsc -p tsconfig.json --noEmit` passed; `bun run --cwd packages/angular tsc -p tsconfig.spec.json --noEmit` passed. `bun run --cwd packages/angular typecheck` passed both TypeScript phases and built `@ark-ui/angular/select`, then failed in `scripts/hide-private-entrypoints.ts` because `/Users/ryanmahoney/Documents/ng-ark/packages/angular/dist/package.json` did not exist after the package build.
- [x] Component tests: `bun run --cwd packages/angular test:ci select/select.spec.ts` passed, 19 tests.
- [x] Storybook render: `bun run --cwd packages/angular storybook -- --port 6007` reached "Storybook ready" at `http://localhost:6007/`; port 6006 was already occupied.
- [ ] Manual/visual checks: Deferred; Storybook startup was verified, but no browser side-by-side visual pass was performed.

## Commit
- Hash: 9edac0f89
- Message: `fix(angular): align select with react parity`
