# Toast Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/toast/*`, `packages/angular/src/toast/examples/*`, `packages/angular/src/toast/toast.stories.ts`, `packages/angular/src/toast/toast.spec.ts`
- React files: `packages/react/src/components/toast/*`, `packages/react/src/components/toast/examples/*`, `packages/react/src/components/toast/tests/*`
- Storybook/style files: `.storybook/modules/toast.module.css`, `packages/angular/src/toast/toast-example-styles.ts`

## Summary
- Status: Re-audited, no new gaps found; previous fixes verified still in place.
- Highest-risk gaps (historical, all fixed): Angular Storybook previously omitted `Types`, `PromiseToast`, and `VaryingHeight` stories, and Angular demo CSS did not exercise the React reference's type-specific colors, indicators, close/action trigger placement, or stack animation variables. The current Angular sources now match the React reference for story coverage, example copy, store options, and demo styling.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story parity | All React story exports (`Basic`, `Action`, `Duration`, `MaxToasts`, `Placement`, `PromiseToast`, `Types`, `Update`, `VaryingHeight`) are present in Angular. | `packages/react/src/components/toast/toast.stories.tsx` | `packages/angular/src/toast/toast.stories.ts` | No change: parity reached in prior commit. |
| Example parity | Example component copy, store options (`overlap`, `gap`, `max`, `placement`), action labels, duration tables, descriptions, and indicator wiring match the React examples. | `packages/react/src/components/toast/examples/*.tsx` | `packages/angular/src/toast/examples/*.ts` | No change: parity reached in prior commit. |
| Styling parity | Angular `toast-example-styles.ts` exposes the same root layout, animation variables (`--x`, `--y`, `--scale`, `--z-index`, `--height`, `--opacity`), placement-specific shadows, type-specific colors (info, loading, success, error, warning), indicator, action trigger, close trigger, and `spin` keyframes as `.storybook/modules/toast.module.css`. Angular substitutes concrete hex/rgba values for the React `var(--demo-*)` tokens because the Angular Storybook does not define those CSS custom properties. | `.storybook/modules/toast.module.css` | `packages/angular/src/toast/toast-example-styles.ts` | No change: parity reached in prior commit. |
| Public API | Angular exposes a directive-centric API (`ArkToaster`, `ArkToastRoot`, `ArkToastTitle`, `ArkToastDescription`, `ArkToastActionTrigger`, `ArkToastCloseTrigger`, `injectArkToastContext`, `injectArkToastContextCarrier`, `createToaster`, `toastAnatomy`) versus React's `Toast` namespace with a `Toast.Context` render-callback part. The Angular equivalent of `Toast.Context` is `#root="arkToast"` plus `injectArkToastContext()`. | `packages/react/src/components/toast/toast.ts`, `packages/react/src/components/toast/toast-context.tsx`, `packages/react/src/components/toast/index.ts` | `packages/angular/src/toast/public-api.ts`, `packages/angular/src/toast/use-toast-context.ts` | No change: this follows the Angular package technical requirements (directive + DI in lieu of a render-callback context part). |
| Toaster prop surface | React `Toaster` accepts a render-callback child `(toast) => ReactNode`; Angular `ArkToaster` accepts an `itemTemplate: TemplateRef<{ $implicit: ToastOptions }>` with `ngTemplateOutletInjector` set to the root carrier so descendants resolve `injectArkToastContext()` after portaling. | `packages/react/src/components/toast/toaster.tsx` | `packages/angular/src/toast/toaster.ts` | No change: matches the technical requirement for Svelte-snippet/React-render-prop parity via `TemplateRef` + `*ngTemplateOutlet` with an injector-aware carrier. |
| Anatomy | `toastAnatomy` exported from both implementations with identical shape. | `packages/react/src/components/toast/toast.anatomy.ts` | `packages/angular/src/toast/toast.anatomy.ts` | No change. |
| Test parity | React tests cover a11y/show-hide on a basic example. Angular `toast.spec.ts` covers public surface smoke types, create/remove, close trigger, action trigger, duration auto-dismiss, max limit, update, dynamic content context carrier (root + host provider preservation through `ngTemplateOutletInjector`), subscribe cleanup on destroy, and SSR (server `PLATFORM_ID`) construction. | `packages/react/src/components/toast/tests/*` | `packages/angular/src/toast/toast.spec.ts` | No change: Angular coverage exceeds the React reference for the surface that matters in this package. |

## Implementation Plan
1. Confirm all React stories are exported by Angular (`toast.stories.ts`).
2. Confirm Angular example copy, store options, action labels, indicator wiring, and duration tables match each React example.
3. Confirm `toast-example-styles.ts` covers every selector and CSS custom property defined in `.storybook/modules/toast.module.css`, including placement-specific shadows, type-specific colors, indicator, action trigger, close trigger, and `spin` keyframes.
4. Run focused toast specs to confirm behavior parity remains intact.

## Verification
- [x] Component tests: `bun run --cwd packages/angular test:ci src/toast/toast.spec.ts` passed with 1 file and 10 tests (re-run during re-audit; ~1.4s).
- [ ] Typecheck/build: `bun run --cwd packages/angular typecheck` was run; it fails on a pre-existing, unrelated error in `src/navigation-menu/navigation-menu.spec.ts` (index-signature access). No toast files participate in that failure; this is not introduced by the toast audit.
- [ ] Storybook render: Not re-run during re-audit because the prior audit already confirmed Storybook readiness for the toast stories and no toast story or example files changed in this re-audit pass.
- [ ] Manual/visual checks: Not run in browser automation. Visual parity reviewed by static comparison of `.storybook/modules/toast.module.css` against `packages/angular/src/toast/toast-example-styles.ts`.

## Commit
- Hash: <to-be-filled>
- Message: `fix(angular): align toast with react parity`
