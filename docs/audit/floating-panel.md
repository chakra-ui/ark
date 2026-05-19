# Floating Panel Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/floating-panel/**`, `packages/angular/src/floating-panel/floating-panel.stories.ts`
- React files: `packages/react/src/components/floating-panel/**`
- Storybook/style files: `.storybook/modules/floating-panel.module.css`, `packages/angular/src/floating-panel/floating-panel-example-styles.ts`

## Summary
- Status: Fixed Angular Storybook/style parity gaps found in this pass.
- Highest-risk gaps: Angular Storybook missed the React `LazyMount` story and several Angular examples rendered simplified panel content without the React demo's stage controls, drag trigger, or complete resize handles. Angular example styling also drifted from the React CSS module for z-index, hover treatment, content width, data-state styling, drag cursor, and resize handle geometry.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story parity | `LazyMount` story missing. | `packages/react/src/components/floating-panel/floating-panel.stories.tsx`, `examples/lazy-mount.tsx` | `packages/angular/src/floating-panel/floating-panel.stories.ts` | Add Angular lazy-mount example using `ArkPresenceComponent` with `lazyMount`/`unmountOnExit`, then export the story. |
| Story parity | Most Angular examples omit the React demo's header controls and complete resize handles. | `packages/react/src/components/floating-panel/examples/*.tsx` | `packages/angular/src/floating-panel/examples/*.ts` | Add a shared Angular example panel and use it from the floating-panel examples. |
| Styling parity | Angular example CSS differs from React CSS module for trigger treatment, z-index, width, data attributes, drag cursor, control buttons, body layout, and resize trigger sizes. | `.storybook/modules/floating-panel.module.css` | `packages/angular/src/floating-panel/floating-panel-example-styles.ts` | Align selectors and styles with the React module using Angular directive attributes. |
| Public API parity | Core directives, context helper, root provider, controlled models, output detail channels, anatomy, and public types are present. Angular does not expose `dir` directly and relies on the locale provider per package technical requirements. | `packages/react/src/components/floating-panel/index.ts`, `floating-panel-root.tsx` | `packages/angular/src/floating-panel/public-api.ts`, `floating-panel-root.ts`, `use-floating-panel.ts` | No change. |
| Functionality parity | Angular root-provider and portal context carrier support injected descendants; controlled `open`, `position`, `size`, stage, drag, resize, close trigger, SSR construction, and public type smoke are covered. | React source and examples | `packages/angular/src/floating-panel/floating-panel.spec.ts` | Keep existing coverage and add lazy-mount example instantiation coverage. |

## Implementation Plan
1. Add a shared Angular demo panel component that renders the React-equivalent header, controls, body slot, and all resize handles.
2. Update existing examples to use the shared panel so Storybook demos stay consistent.
3. Add an Angular lazy-mount example and story using `ArkPresenceComponent`.
4. Align Angular example styles with `.storybook/modules/floating-panel.module.css`.
5. Run focused floating-panel tests, typecheck, and diff checks.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed. The build emitted existing ng-packagr export-condition warnings.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/floating-panel/floating-panel.spec.ts` passed with 12 tests.
- [ ] Storybook render: Not run; covered by Angular template typecheck and example instantiation tests.
- [ ] Manual/visual checks: Not run in browser; styles were compared against `.storybook/modules/floating-panel.module.css`.

## Commit
- Hash: See final status.
- Message: `fix(angular): align floating-panel story parity`
