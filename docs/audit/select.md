# Select Angular Parity Audit

## Scope
- Angular files: `packages/angular/select/**`
- React files: `packages/react/src/components/select/**`
- Storybook/style files: `packages/angular/select/select.stories.ts`, `packages/angular/select/select-example-styles.ts`, `.storybook/modules/select.module.css`

## Summary
- Status: Fixed Angular select parity gaps for outside-interaction callback outputs, Storybook example coverage (including the previously missing `DynamicItems` story), and demo styling.
- Highest-risk gaps: Angular still does not expose a direct `Select.Context` render-prop part; Angular examples use root template references or `useSelect()`/`arkSelectRootProvider` instead, which matches the package's directive-centric Angular pattern.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API | Root accepted Zag `onFocusOutside`, `onPointerDownOutside`, and `onInteractOutside` through React props, but Angular had no corresponding outputs or exported event types. | `packages/react/src/components/select/select-root.tsx`, `packages/react/src/components/select/select.ts` | `packages/angular/select/select-root.ts`, `packages/angular/select/select.types.ts`, `packages/angular/select/public-api.ts` | Added `focusOutside`, `pointerDownOutside`, and `interactOutside` outputs and exported the matching event types (verified still present during re-audit). |
| Story parity | Re-audit found Angular Storybook still missed the `DynamicItems` story exposed by React. | `packages/react/src/components/select/select.stories.tsx`, `packages/react/src/components/select/examples/dynamic-items.tsx` | `packages/angular/select/select.stories.ts`, `packages/angular/select/examples/dynamic-items.ts` | Added `SelectDynamicItemsExample` and a matching `DynamicItems` story that mirrors the React demo using a signal-driven collection. |
| Story parity | Earlier audit added Angular stories/examples for `Async`, `FormLibrary`, `FullyControlled`, `Grouping`, `LazyMount`, `MaxSelected`, `Overflow`, `ReactiveCollection`, `SelectAll`, and `SelectOnHighlight`. | `packages/react/src/components/select/select.stories.tsx` | `packages/angular/select/select.stories.ts`, `packages/angular/select/examples/` | Verified still in place; no further changes needed. |
| Styling parity | Angular example styles missed React's max width, full-width trigger, indicators overlay, focus/invalid states, content max-height, popover shadow, checked color, scrollbar, and open/closed animations. | `.storybook/modules/select.module.css` | `packages/angular/select/select-example-styles.ts` | Verified the Angular demo CSS continues to mirror React selectors and states using Angular directive selectors. |
| Root provider demo | React root-provider story shows selected state and clear/indicator controls. | `packages/react/src/components/select/examples/root-provider.tsx` | `packages/angular/select/examples/root-provider.ts` | Verified Angular story exposes selected output and indicator markup while keeping the `useSelect()` root-provider pattern. |
| Field demo | Angular field example previously diverged from React label/helper/error text and option data. | `packages/react/src/components/select/examples/with-field.tsx` | `packages/angular/select/examples/with-field.ts` | Verified visible text and framework options remain aligned with React. |
| Test parity | Existing Angular tests covered selection, forms, portals, and public surface but not the outside-interaction callback channels. | `packages/react/src/components/select/tests/select.test.tsx` | `packages/angular/select/select.spec.ts` | Verified focused coverage that exercises the outside-interaction outputs through Zag service props (19 specs total). |
| Context helper | React exposes `Select.Context` as a render-prop component used by `SelectAll`; Angular has no equivalent directive. | `packages/react/src/components/select/select-context.tsx`, `packages/react/src/components/select/examples/select-all.tsx` | `packages/angular/select/public-api.ts`, `packages/angular/select/examples/select-all.ts` | No change: Angular examples use `#root="arkSelectRoot"` and direct `root.api()` access, consistent with documented Angular template-reference patterns. |
| Presence/lazy mount | React root owns presence props and content consumes them through `PresenceProvider`; Angular directives cannot project conditional descendants internally. | `packages/react/src/components/select/select-root.tsx`, `packages/react/src/components/select/examples/lazy-mount.tsx` | `packages/angular/select/examples/lazy-mount.ts` | No change: Angular uses explicit `<ark-presence>` around portaled select content, matching dialog/popover lazy-mount examples. |

## Implementation Plan
1. Re-audit the React vs Angular story sets and add any missing Angular story coverage (this re-audit: `DynamicItems`).
2. Keep the Angular root output/type surface aligned with the Zag callback set.
3. Verify with focused tests, TypeScript passes, and diff checks.

## Verification
- [x] Typecheck/build: `cd packages/angular && bun run tsc -p tsconfig.json --noEmit` exited 0.
- [x] Component tests: `cd packages/angular && bun run test:ci select/select.spec.ts` passed all 19 specs.
- [ ] Storybook render: Deferred during re-audit; previous audit confirmed `bun run --cwd packages/angular storybook` startup with the existing story set, and the new `DynamicItems` story reuses the same example component pattern as the verified stories.
- [ ] Manual/visual checks: Deferred; no browser side-by-side visual pass performed in this re-audit.

## Commit
- Hash: 07f7cd1ef
- Message: `fix(angular): align select with react parity`
