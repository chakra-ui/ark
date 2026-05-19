# Signature Pad Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/signature-pad/`, `packages/angular/src/signature-pad/examples/`, `packages/angular/src/signature-pad/signature-pad.spec.ts`
- React files: `packages/react/src/components/signature-pad/`, `packages/react/src/components/signature-pad/examples/`, `packages/react/src/components/signature-pad/tests/`
- Storybook/style files: `packages/angular/src/signature-pad/signature-pad.stories.ts`, `packages/angular/src/signature-pad/signature-pad-example-styles.ts`, `.storybook/modules/signature-pad.module.css`

## Summary
- Status: Fixed and verified where the shared workspace allowed
- Highest-risk gaps:
  - Angular Storybook was missing the React `WithField` example, so Field label/helper/error integration was not visible.
  - Angular tests did not cover the React-tested Field integration contract for required, disabled, readonly, helper text, error text, and label/control IDs.
  - Angular demo styles diverged from the React signature pad module for root sizing, disabled treatment, segment sizing/focus, clear-trigger hover/disabled states, guide positioning, and image preview treatment.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story parity | Missing `WithField` story | `packages/react/src/components/signature-pad/signature-pad.stories.tsx`, `examples/with-field.tsx` | `packages/angular/src/signature-pad/signature-pad.stories.ts` | Add `examples/with-field.ts` and export `WithField` story. |
| Story parity | Root provider demo did not show path count from machine API | `packages/react/src/components/signature-pad/examples/root-provider.tsx` | `packages/angular/src/signature-pad/examples/root-provider.ts` | Add output that reads `signaturePad.api().paths.length`. |
| Story parity | Image preview demo omitted the preview label used by React | `packages/react/src/components/signature-pad/examples/image-preview.tsx` | `packages/angular/src/signature-pad/examples/image-preview.ts` | Add the preview label and align image class styling. |
| Styling parity | Angular example styles were simpler than React module and missed several state selectors | `.storybook/modules/signature-pad.module.css` | `packages/angular/src/signature-pad/signature-pad-example-styles.ts` | Align root/control/segment/path/guide/clear-trigger/image selectors and states. |
| Test parity | Field integration behavior was covered in React but not Angular | `packages/react/src/components/signature-pad/tests/signature-pad.test.tsx` | `packages/angular/src/signature-pad/signature-pad.spec.ts` | Add Angular specs for Field state, helper/error text, and label-to-control wiring. |
| API parity | Root inputs, root-provider, context, parts, hidden input, and public type exports were already present | `packages/react/src/components/signature-pad/index.ts`, `signature-pad.ts` | `packages/angular/src/signature-pad/public-api.ts`, component directives | No change. |
| Functionality parity | Drawing, clear trigger, data URL, hidden input props, disabled/read-only drawing guard, and SSR-safe construction were already covered | React implementation/tests | `packages/angular/src/signature-pad/signature-pad.spec.ts` | No change. |

## Implementation Plan
1. Add the missing Angular `WithField` example and Storybook export.
2. Align Angular root-provider and image-preview examples with React story behavior.
3. Update Angular example CSS to match the React signature pad module selectors and state treatment.
4. Add Angular Field integration specs.
5. Run the signature-pad spec, typecheck, and diff checks; record results.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` attempted; blocked by unrelated parallel select work: `select/select.spec.ts(541,34): error TS2339: Property 'getSnapshot' does not exist on type 'SelectService<any>'.`
- [x] Component tests: `bun run --cwd packages/angular test:ci src/signature-pad/signature-pad.spec.ts` passed; 14 tests passed.
- [x] Storybook render: `bun run --cwd packages/angular storybook` started on port 6007 because 6006 was occupied; webpack compiled to 100% without a signature-pad error, then the watch process was interrupted.
- [x] Manual/visual checks: Compared Angular examples/styles against React `Basic`, `ImagePreview`, `RootProvider`, and `WithField`; Angular now includes the missing story and aligned state/style selectors. Browser pixel inspection deferred because Storybook was only smoke-started in the shared workspace.

## Commit
- Hash: Recorded in final status after commit.
- Message: `fix(angular): align signature-pad parity`
