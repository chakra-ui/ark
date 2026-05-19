# Frame Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/frame/frame.ts`, `packages/angular/src/frame/frame.stories.ts`, `packages/angular/src/frame/examples/basic.ts`, `packages/angular/src/frame/examples/script.ts`, `packages/angular/src/frame/examples/src-doc.ts`, `packages/angular/src/frame/examples/inherit-styles.ts`, `packages/angular/src/frame/frame.spec.ts`, `packages/angular/src/frame/public-api.ts`
- React files: `packages/react/src/components/frame/frame.tsx`, `packages/react/src/components/frame/frame-content.tsx`, `packages/react/src/components/frame/index.ts`
- Storybook/style files: `packages/react/src/components/frame/frame.stories.tsx`, `packages/react/src/components/frame/examples/basic.tsx`, `packages/react/src/components/frame/examples/script.tsx`, `packages/react/src/components/frame/examples/src-doc.tsx`, `packages/react/src/components/frame/examples/inherit-styles.tsx`, `packages/angular/src/frame/frame.stories.ts`, `packages/angular/src/frame/examples/*.ts`

## Summary
- Status: Fixed, with Storybook visual verification deferred by unrelated Storybook module resolution errors.
- Highest-risk gaps: Projected Angular children now receive a live iframe document through `injectArkEnvironment`, so nested Ark primitives resolve portal/focus/root-node behavior against the frame document once mounted. Angular Storybook styles now control the internal `<iframe>` through component-level fill styles. The Basic example now uses `head` projection like React.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Functionality | Children rendered inside the frame are wrapped in React `EnvironmentProvider` so descendants resolve the iframe document; Angular projected content used the parent injector and default document. | `packages/react/src/components/frame/frame.tsx` `EnvironmentProvider value={() => frameRef?.contentDocument ?? document}` | `packages/angular/src/frame/frame.ts` | Create embedded content/head views with an injector that provides `ARK_ENVIRONMENT_TOKEN` with `getRootNode` returning the iframe document. |
| Styling parity | React examples style the actual iframe. Angular examples style the component host, but the internal iframe did not reliably fill the host and kept browser default iframe styling. | React examples pass `style` directly to `<Frame>`/`iframe`. | `packages/angular/src/frame/frame.ts`, `packages/angular/src/frame/examples/*.ts` | Add component host/iframe styles so the internal iframe fills the styled host; align example border values and remove extra radius. |
| Story parity | React Basic demonstrates `head` injection for frame-local styles. Angular Basic used custom `srcdoc` CSS, leaving the `head` API covered only indirectly by tests. | `packages/react/src/components/frame/examples/basic.tsx` | `packages/angular/src/frame/examples/basic.ts` | Use an Angular `TemplateRef` head style in Basic and keep content/copy aligned with React. |
| Story parity | React Storybook exports `Basic`, `Script`, and `SrcDoc`; React has an additional `inherit-styles` example not exported as a story. | `packages/react/src/components/frame/frame.stories.tsx`, `packages/react/src/components/frame/examples/inherit-styles.tsx` | `packages/angular/src/frame/frame.stories.ts` | No change: Angular keeps `InheritStyles` visible because the matching React example exists and it documents an Angular-specific style inheritance workflow. |
| Test parity | React has no component test file for Frame; Angular had tests for rendering, srcdoc, head projection, resize cleanup, and SSR construction but lacked environment-provider coverage. | No React test file present under `packages/react/src/components/frame`. | `packages/angular/src/frame/frame.spec.ts` | Add an Angular spec proving projected descendants inject the iframe document environment. |

## Implementation Plan
1. Provide iframe-scoped `ARK_ENVIRONMENT_TOKEN` when creating projected content and head embedded views.
2. Add component-level host/iframe styles so Storybook host styling controls the visible iframe dimensions.
3. Align Angular Basic/Script/SrcDoc example copy and frame styling with React, and use the `head` input in Basic.
4. Add focused specs for iframe environment propagation and existing behavior.
5. Run frame specs, typecheck, and `git diff --check`; document results.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed. The command completed `tsc`, `ng build @ark-ui/angular --configuration=production`, `scripts/hide-private-entrypoints.ts`, and `scripts/check-forms-isolation.ts`; it emitted existing ng-packagr export-condition warnings.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/frame/frame.spec.ts` passed with 1 file and 8 tests.
- [x] Storybook render: `bun run --cwd packages/angular storybook -- --port 6011 --ci` was attempted, but Storybook failed before serving because unrelated stories import unresolved package paths: `field/examples/custom-control.ts` imports `@ark-ui/angular`, and date-input/format locale examples import `@ark-ui/angular/providers/locale`.
- [ ] Manual/visual checks: Deferred because Storybook did not finish compiling for unrelated module resolution errors.

## Commit
- Hash: Recorded in final status after commit creation.
- Message: `fix(angular): align frame with react parity`
