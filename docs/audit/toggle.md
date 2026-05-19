# Toggle Angular Parity Audit

## Scope
- Angular files: `packages/angular/toggle/toggle-root.ts`, `packages/angular/toggle/toggle-indicator.ts`, `packages/angular/toggle/use-toggle.ts`, `packages/angular/toggle/use-toggle-context.ts`, `packages/angular/toggle/public-api.ts`, `packages/angular/toggle/toggle.spec.ts`, `packages/angular/toggle/toggle.stories.ts`, `packages/angular/toggle/examples/*`, `packages/angular/toggle/toggle-example-styles.ts`
- React files: `packages/react/src/components/toggle/toggle-root.tsx`, `packages/react/src/components/toggle/toggle-indicator.tsx`, `packages/react/src/components/toggle/use-toggle.ts`, `packages/react/src/components/toggle/use-toggle-context.ts`, `packages/react/src/components/toggle/toggle-context.tsx`, `packages/react/src/components/toggle/index.ts`
- Storybook/style files: `packages/react/src/components/toggle/toggle.stories.tsx`, `packages/react/src/components/toggle/examples/*`, `.storybook/modules/toggle.module.css`, `packages/angular/toggle/toggle.stories.ts`, `packages/angular/toggle/examples/*`, `packages/angular/toggle/toggle-example-styles.ts`

## Summary
- Status: Fixed and verified.
- Highest-risk gaps: Angular now exposes a template context directive equivalent for the React `Toggle.Context` story; Angular indicator examples now demonstrate the pressed/fallback rendering pattern. No implementation gaps remain for the audited Toggle surface.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API parity | React exports `Toggle.Context`; Angular only exposed `injectArkToggleContext`, requiring a helper component for template usage. | `packages/react/src/components/toggle/toggle-context.tsx`, `packages/react/src/components/toggle/examples/context.tsx` | `packages/angular/toggle/use-toggle-context.ts`, `packages/angular/toggle/examples/context.ts` | Add standalone `ArkToggleContext` structural/template directive with typed `{ $implicit, api }` signal context and export it from `public-api.ts`. |
| Story parity | The Angular Context story used a nested component solely to inject context, so it did not mirror the React inline context render story. | `packages/react/src/components/toggle/examples/context.tsx` | `packages/angular/toggle/examples/context.ts` | Rewrite the story to use `<ng-template arkToggleContext let-toggle="api">`. |
| Story parity | The Angular Indicator and Controlled stories changed icon fill via the root state, but did not make the fallback/pressed content branch visible in the template. | `packages/react/src/components/toggle/examples/indicator.tsx`, `packages/react/src/components/toggle/examples/controlled.tsx` | `packages/angular/toggle/examples/indicator.ts`, `packages/angular/toggle/examples/controlled.ts` | Use Angular `@if` branches inside `[arkToggleIndicator]` to show unfilled fallback content when off and filled content when on. |
| Functionality parity | `pressed`, `defaultPressed`, `disabled`, context provider, root/indicator Zag prop application, boolean transforms, disabled semantics, keyboard/click behavior, and state attributes already align. | `packages/react/src/components/toggle/toggle-root.tsx`, `packages/react/src/components/toggle/use-toggle.ts` | `packages/angular/toggle/toggle-root.ts`, `packages/angular/toggle/toggle-indicator.ts`, `packages/angular/toggle/toggle.spec.ts` | No change. Existing tests cover controlled/uncontrolled, static boolean attributes, disabled clicks, data attributes, provider injection, and indicator state. |
| Styling parity | React module CSS and Angular example styles match layout, spacing, colors, hover, focus-visible, disabled, icon, indicator, and `data-state='on'` selectors. | `.storybook/modules/toggle.module.css` | `packages/angular/toggle/toggle-example-styles.ts` | No change. |

## Implementation Plan
1. Add `ArkToggleContext` and `ToggleContextTemplate` following the existing Angular context directive pattern.
2. Export the new directive and type from the toggle secondary entry point.
3. Update Angular Context, Controlled, and Indicator examples to exercise inline context and fallback/pressed rendering parity.
4. Extend the toggle spec public surface and story coverage for the new directive.
5. Run focused toggle tests, typecheck, and diff hygiene checks.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed. This ran `tsc -p tsconfig.json --noEmit`, `tsc -p tsconfig.spec.json --noEmit`, package build, and `scripts/check-forms-isolation.ts` (`forms isolation: ok`).
- [x] Component tests: `bun run --cwd packages/angular test:ci toggle/toggle.spec.ts` passed with 1 file and 17 tests.
- [x] Storybook render: `bun run --cwd packages/angular storybook` compiled and reported Storybook ready at `http://localhost:6007/`; port 6006 was already occupied, and the dev server was stopped after startup.
- [x] Manual/visual checks: Source-level comparison confirmed `packages/angular/toggle/toggle-example-styles.ts` matches `.storybook/modules/toggle.module.css` for root layout, icon sizing, hover, pressed, focus-visible, disabled, and indicator selectors. No screenshot capture was performed.

## Commit
- Hash: `61140dcc1`
- Message: `fix(angular): align toggle with react parity`
