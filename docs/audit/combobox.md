# Combobox Angular Parity Audit

## Scope
- Angular files: `packages/angular/combobox/combobox-root.ts`, `packages/angular/combobox/combobox-root-provider.ts`, `packages/angular/combobox/combobox-input.ts`, `packages/angular/combobox/combobox-trigger.ts`, `packages/angular/combobox/combobox-empty.ts`, `packages/angular/combobox/combobox.types.ts`, `packages/angular/combobox/public-api.ts`, `packages/angular/combobox/combobox.stories.ts`, `packages/angular/combobox/examples/`, `packages/angular/combobox/combobox-example-styles.ts`, `packages/angular/combobox/combobox.spec.ts`
- React files: `packages/react/src/components/combobox/combobox-root.tsx`, `packages/react/src/components/combobox/combobox-root-provider.tsx`, `packages/react/src/components/combobox/combobox-input.tsx`, `packages/react/src/components/combobox/combobox-trigger.tsx`, `packages/react/src/components/combobox/combobox-empty.tsx`, `packages/react/src/components/combobox/combobox.stories.tsx`, `packages/react/src/components/combobox/examples/`, `packages/react/src/components/combobox/tests/`
- Storybook/style files: `.storybook/modules/combobox.module.css`, `.storybook/modules/field.module.css`, `packages/angular/combobox/combobox-example-styles.ts`

## Summary
- Status: Implementation parity tightened for public root callbacks, trigger props, Field-described input accessibility, and empty-state semantics. Angular still has substantial deferred Storybook/example coverage compared with React.
- Highest-risk gaps: Missing `aria-describedby` on combobox inputs inside `arkFieldRoot`; missing `focusable` trigger prop; missing outside-interaction event outputs; Angular Storybook covers 5 demos while React covers 17.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API parity | Root did not expose `focusOutside`, `pointerDownOutside`, or `interactOutside` even though Zag `ComboboxProps` extends dismissable outside handlers and React forwards the callbacks. | `packages/react/src/components/combobox/combobox-root.tsx` split props include `onFocusOutside`, `onInteractOutside`, `onPointerDownOutside`; `@zag-js/combobox` exports outside event types. | `packages/angular/combobox/combobox-root.ts`, `packages/angular/combobox/combobox.types.ts`, `packages/angular/combobox/public-api.ts` | Added typed Angular outputs and wired them into the machine context. |
| Public API parity | Trigger did not accept the Zag `focusable` option, so consumers could not opt the trigger into normal tab focus. | `packages/react/src/components/combobox/combobox-trigger.tsx` splits `focusable` and passes it to `getTriggerProps`. | `packages/angular/combobox/combobox-trigger.ts` | Added a boolean transformed `focusable` input and forwarded it to `api().getTriggerProps`. |
| Accessibility parity | Combobox input inside `arkFieldRoot` received Field ids/state through `useCombobox`, but not Field helper/error `aria-describedby`. | `packages/react/src/components/combobox/combobox-input.tsx` merges `field?.ariaDescribedby` onto the input. | `packages/angular/combobox/combobox-input.ts` | Injected optional Field context and merged `aria-describedby` into input props when present. |
| Accessibility parity | Empty state rendered with `role="status"`, differing from React's non-live `role="presentation"` semantics. | `packages/react/src/components/combobox/combobox-empty.tsx` renders `role="presentation"`. | `packages/angular/combobox/combobox-empty.ts` | Changed the Angular empty part role to `presentation` while preserving conditional display. |
| Story parity | Angular stories are missing React demos: `Context`, `Grouping`, `Links`, `Multiple`, `RehydrateValue`, `Creatable`, `LimitResults`, `HighlightMatchingText`, `Dynamic`, `CustomObject`, `AsyncSearch`, `Virtualized`, `AutoHighlight`, and `InlineAutocomplete`. | `packages/react/src/components/combobox/combobox.stories.tsx` and `packages/react/src/components/combobox/examples/` | `packages/angular/combobox/combobox.stories.ts`, `packages/angular/combobox/examples/` | Deferred: advanced demo migration remains larger than the focused API/a11y fix. |
| Styling parity | Angular example styles are a reduced selector set and do not cover React module selectors such as `Indicators`, `Tags`, `Status`, `Spinner`, `ItemTitle`, `ItemSubtitle`, or `Scroller`. | `.storybook/modules/combobox.module.css` | `packages/angular/combobox/combobox-example-styles.ts` | Deferred with story migration; current fixed demos still render with existing Angular styles. |
| Functionality parity | Angular has no direct equivalent to React `Combobox.Context` render prop or `Combobox.ItemContext` render prop. | `packages/react/src/components/combobox/combobox-context.tsx`, `packages/react/src/components/combobox/combobox-item-context.tsx` | Angular exports `injectArkComboboxContext` and `injectArkComboboxItemContext`. | No change: Angular uses DI helpers instead of render-prop components per directive-centric API requirements. |
| Test parity | Existing Angular specs cover selection, filtering, controlled channels, forms, field state, clear trigger, empty state, portaled context, and event deduplication, but not new focusable/describedby specifics or outside callback public types. | `packages/react/src/components/combobox/tests/combobox.test.tsx` | `packages/angular/combobox/combobox.spec.ts` | Added focused Angular coverage for trigger `focusable`, Field `aria-describedby`, empty role, and outside callback public types. |

## Implementation Plan
1. Add root outside-interaction event types/outputs and wire them to Zag callbacks.
2. Add `focusable` input to `ArkComboboxTrigger` and pass it to `getTriggerProps`.
3. Merge optional Field `ariaDescribedby` into `ArkComboboxInput` props.
4. Align `ArkComboboxEmpty` role with React.
5. Add focused Angular specs for the changed behavior.
6. Run combobox specs, typecheck, and `git diff --check`.

## Verification
- [ ] Typecheck/build: `bun run --cwd packages/angular typecheck` completed TypeScript checks and the Angular package build, then failed in `scripts/hide-private-entrypoints.ts` because `packages/angular/dist/package.json` did not exist.
- [x] Component tests: `bun run --cwd packages/angular test:ci combobox/combobox.spec.ts` passed.
- [ ] Storybook render: Not run; no story implementation changes in this pass.
- [ ] Manual/visual checks: Deferred; advanced story/style parity remains open.

## Commit
- Hash:
- Message: `fix(angular): align combobox parity`
