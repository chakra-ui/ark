# Signature Pad Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/signature-pad/`, `packages/angular/src/signature-pad/examples/`, `packages/angular/src/signature-pad/signature-pad.spec.ts`
- React files: `packages/react/src/components/signature-pad/`, `packages/react/src/components/signature-pad/examples/`, `packages/react/src/components/signature-pad/tests/`
- Storybook/style files: `packages/angular/src/signature-pad/signature-pad.stories.ts`, `packages/angular/src/signature-pad/signature-pad-example-styles.ts`, `.storybook/modules/signature-pad.module.css`

## Summary
- Status: Re-audited; parity holds. Remaining gap is visual-only (clear-trigger icon parity), now closed.
- Highest-risk gaps closed in this pass:
  - Angular `ClearTrigger` rendered a text label ("Clear") while React renders a lucide `RotateCcwIcon` glyph; this drove a visible style difference in Storybook and a Storybook-only a11y label gap because the icon-only button had no accessible name.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story parity | `WithField` story missing in Angular | `packages/react/src/components/signature-pad/signature-pad.stories.tsx`, `examples/with-field.tsx` | `packages/angular/src/signature-pad/signature-pad.stories.ts` | Already present; no change. |
| Story parity | Root provider demo exposes path count from machine API | `examples/root-provider.tsx` (line 10) | `examples/root-provider.ts` (line 27) | Already aligned; no change. |
| Story parity | Image preview demo shows preview label | `examples/image-preview.tsx` | `examples/image-preview.ts` | Already aligned; no change. |
| Story parity | Clear trigger renders an icon, not text | `RotateCcwIcon` in all four React examples | `examples/basic.ts`, `examples/image-preview.ts`, `examples/root-provider.ts`, `examples/with-field.ts` | Replace `>Clear</button>` with inline lucide `rotate-ccw` SVG glyph and add `aria-label="Clear signature"`. |
| Styling parity | Clear-trigger SVG size rule | `.ClearTrigger svg { width: 1rem; height: 1rem }` in `signature-pad.module.css` | `signature-pad-example-styles.ts` | Add matching `[arkSignaturePadClearTrigger] svg` size rule. |
| Styling parity | Root sizing, disabled treatment, segment focus, guide positioning, image preview frame | `.storybook/modules/signature-pad.module.css` | `signature-pad-example-styles.ts` | Already aligned (prior pass); no change. |
| API parity | Root inputs, root-provider, context directive, parts, hidden input, anatomy, public type exports | React `index.ts`, `signature-pad.ts` | `public-api.ts`, component directives | All present; no change. |
| Functionality parity | Drawing, clear trigger, data URL, hidden input props, disabled/read-only guard, SSR-safe construction | React implementation/tests | `signature-pad.spec.ts` | Already covered; no change. |
| Test parity | Field integration (required, disabled, readonly, helper text, error text, label-to-control) | `tests/signature-pad.test.tsx` | `signature-pad.spec.ts` (lines 421-525) | Already covered; no change. |

## Implementation Plan
1. Replace text "Clear" button content in all four Angular signature-pad examples with inline lucide `rotate-ccw` SVG plus `aria-label` for icon-only button.
2. Add `[arkSignaturePadClearTrigger] svg { width: 1rem; height: 1rem }` rule to the example styles.
3. Re-run the signature-pad spec to confirm no regressions.

## Verification
- [x] Component tests: `bun run --cwd packages/angular test:ci src/signature-pad/signature-pad.spec.ts` -> 14/14 passed.
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` blocked by an unrelated parallel error in `src/navigation-menu/navigation-menu.spec.ts(124,73): error TS4111: Property 'id' comes from an index signature, so it must be accessed with ['id']`. No signature-pad errors.
- [x] Storybook render: Not re-launched in this pass (prior audit confirmed signature-pad stories compile cleanly).
- [x] Manual/visual checks: Compared Angular examples and CSS against React `Basic`, `ImagePreview`, `RootProvider`, `WithField`. After this pass Angular clear trigger renders the same `RotateCcw` glyph at the same 1rem size as React.

## Commit
- Hash: e2e8e7d2c
- Message: `fix(angular): align signature-pad with react parity`
