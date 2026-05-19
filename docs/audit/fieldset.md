# Fieldset Angular Parity Audit

## Scope
- Angular files: `packages/angular/fieldset/`, `packages/angular/fieldset/examples/`, `packages/angular/fieldset/fieldset.stories.ts`, `packages/angular/fieldset/fieldset.spec.ts`
- React files: `packages/react/src/components/fieldset/`, `packages/react/src/components/fieldset/examples/`, `packages/react/src/components/fieldset/fieldset.stories.tsx`, `packages/react/src/components/fieldset/fieldset.test.tsx`
- Storybook/style files: `.storybook/modules/fieldset.module.css`, `.storybook/modules/field.module.css`, `.storybook/modules/select.module.css`, `.storybook/modules/checkbox.module.css`, `packages/angular/fieldset/fieldset-example-styles.ts`

## Summary
- Status: Fixed Angular fieldset parity gaps that are actionable without adding new component entry points.
- Highest-risk gaps:
  - Angular Storybook styling diverges from the React fieldset module and makes fieldsets render as bordered cards.
  - React exports a `PhoneInput` fieldset composition story that Angular does not cover.
  - React exports a `WithCheckbox` story, but the Angular package does not currently expose an `@ark-ui/angular/checkbox` entry point to compose the equivalent primitive story.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story parity | Missing `PhoneInput` story and example | `packages/react/src/components/fieldset/examples/phone-input.tsx`, `packages/react/src/components/fieldset/fieldset.stories.tsx` | `packages/angular/fieldset/examples/`, `packages/angular/fieldset/fieldset.stories.ts` | Add Angular `FieldsetPhoneInputExample` using `@ark-ui/angular/select`, portal context carrier, and focus handoff. |
| Story parity | Missing `WithCheckbox` story | `packages/react/src/components/fieldset/examples/with-checkbox.tsx`, `packages/react/src/components/fieldset/fieldset.stories.tsx` | `packages/angular/fieldset/fieldset.stories.ts` | Deferred: no `@ark-ui/angular/checkbox` entry point exists yet, so mirroring this would either use the wrong primitive or expand component scope. |
| Styling parity | Fieldset examples use a card border, `0.5rem` gap, padding, and different text sizes/colors from React CSS | `.storybook/modules/fieldset.module.css` | `packages/angular/fieldset/fieldset-example-styles.ts` | Align root, legend, helper, and error text selectors to the React fieldset module; add nested field and select styling needed for fieldset stories. |
| Functionality parity | Root provider story includes a demo-only toggle not present in React | `packages/react/src/components/fieldset/examples/root-provider.tsx` | `packages/angular/fieldset/examples/root-provider.ts` | Keep as no change for now: it exercises Angular `RootProvider` signal propagation already covered by specs and does not alter component API. |
| Public API | Angular root sets a deterministic root `id` attribute while React only uses the id to derive descendant ids | `packages/react/src/components/fieldset/use-fieldset.ts` | `packages/angular/fieldset/use-fieldset.ts` | No change: deterministic host ids are already part of the Angular `FieldsetResolvedIds` contract and do not weaken accessibility. |
| Accessibility/tests | Angular has behavior tests for attrs, ids, provider, and nested field inheritance but does not cover the new `PhoneInput` composition | `packages/react/src/components/fieldset/fieldset.test.tsx` | `packages/angular/fieldset/fieldset.spec.ts` | Add a focused spec that renders the phone input story and verifies select/input composition. |

## Implementation Plan
1. Add the Angular `PhoneInput` example with select collection, portaled content, and input focus callback.
2. Export the `PhoneInput` Storybook story beside the existing React-matched stories.
3. Update fieldset example styles to match the React fieldset module and cover nested field/select presentation.
4. Add Angular specs for the new phone input story and preserve existing public API tests.
5. Run focused fieldset tests, Angular typecheck, and `git diff --check`.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` attempted; failed before build on unrelated existing `src/collapsible/collapsible.spec.ts(79,73): error TS4111: Property 'id' comes from an index signature, so it must be accessed with ['id'].`
- [x] Component tests: `bun run --cwd packages/angular test:ci fieldset/fieldset.spec.ts` passed, 1 file and 13 tests.
- [x] Storybook render: `bun run --cwd packages/angular storybook` started successfully and reported `Storybook ready!` at `http://localhost:6006/`; stopped after startup verification.
- [x] Manual/visual checks: Compared React fieldset/field/select/checkbox CSS modules against Angular example styles in source. Browser visual inspection was not performed.

## Deferred Gaps
- `WithCheckbox`: deferred because this repository does not currently provide an Angular checkbox component or `@ark-ui/angular/checkbox` entry point to compose the equivalent primitive story.
- `RootProvider` story parity: Angular keeps the demo-only toggle because it exercises root-provider signal propagation without changing the public component API.

## Commit
- Hash: See commit containing this audit.
- Message: `fix(angular): align fieldset with react parity`
