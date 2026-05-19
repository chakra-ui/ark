# Floating Panel Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/floating-panel/**` (root, root-provider, all part directives, `use-floating-panel.ts`, `use-floating-panel-context.ts`, `floating-panel.types.ts`, `public-api.ts`, `floating-panel-example-styles.ts`, examples, spec, stories)
- React files: `packages/react/src/components/floating-panel/**` (root, root-provider, all parts, `use-floating-panel.ts`, `use-floating-panel-context.ts`, `floating-panel.ts` namespace, `index.ts`, examples)
- Storybook/style files: `.storybook/modules/floating-panel.module.css`, `packages/angular/src/floating-panel/floating-panel-example-styles.ts`

## Summary
- Status: Re-audited. The previous pass already closed the discovered gaps. Re-inspection found no new behavioral, story, or styling drift that warrants implementation changes. The Angular root deliberately delegates presence (`lazyMount`/`unmountOnExit`/`onExitComplete`/`present`) to `<ark-presence>` rather than re-exposing React's `UsePresenceProps` on the root directive; this matches the dialog/popover Angular convention and is recorded as `No change`.
- Highest-risk gaps remaining: none. Storybook visual verification still requires a browser session — flagged below.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story parity | All seven React stories (`Basic`, `ControlledOpen`, `ControlledPosition`, `ControlledSize`, `LazyMount`, `AnchorPosition`, `Context`) plus an Angular-only `RootProvider` story are wired up. | `packages/react/src/components/floating-panel/floating-panel.stories.tsx` | `packages/angular/src/floating-panel/floating-panel.stories.ts` | No change. |
| Example parity | Each example uses the shared `floating-panel-demo-panel` (header, drag trigger, title, four stage controls, body slot, eight resize handles) so demos mirror the React JSX. | `packages/react/src/components/floating-panel/examples/*.tsx` | `packages/angular/src/floating-panel/examples/*.ts`, `examples/panel.ts` | No change. |
| Public API parity | Anatomy, directives (Root, RootProvider, Trigger, Positioner, Content, Control, Header, Body, Title, CloseTrigger, DragTrigger, ResizeTrigger, StageTrigger, Context), DI tokens, `useFloatingPanel`, and detail types match the React surface. Angular omits `dir` (locale provider) and React's `UsePresenceProps` on root by design. | `packages/react/src/components/floating-panel/index.ts`, `floating-panel-root.tsx`, `floating-panel-root-provider.tsx` | `packages/angular/src/floating-panel/public-api.ts`, `floating-panel-root.ts`, `floating-panel-root-provider.ts` | No change. |
| Functionality parity | Controlled `[(open)]`, `[(position)]`, `[(size)]`; outputs `openChange`, `positionChange`, `positionDetailsChange`, `positionChangeEnd`, `sizeChange`, `sizeDetailsChange`, `sizeChangeEnd`, `stageChange`; stage/close/drag/resize triggers; portal context carrier; SSR construction; per-key context diffing; single-emission rule. All covered by directive logic and tests. | React source and `examples/` | `floating-panel-root.ts`, `floating-panel-root-provider.ts`, `floating-panel.spec.ts` | No change. |
| Presence integration | React `FloatingPanelRoot`/`RootProvider` wrap `PresenceProvider`, and `FloatingPanelContent` merges `getPresenceProps()` + unmounts when `presence.unmounted`. Angular delegates presence to `<ark-presence>` wrapping the portal subtree (`lazy-mount.ts`). Same outcome, idiomatic per `docs/technical-requirements.md` directive-centric API. | `floating-panel-root.tsx`, `floating-panel-content.tsx`, `floating-panel-root-provider.tsx` | `floating-panel-root.ts`, `floating-panel-content.ts`, `examples/lazy-mount.ts` | No change (documented architectural difference). |
| Styling parity | Angular example styles mirror React CSS module: trigger padding/border/hover, positioner z-index, content layout/border/shadow + `data-topmost`/`data-behind`, header grab cursors, title typography + svg sizing, body flex/overflow, control flex gap, stage/close button sizing, resize trigger axis dimensions, and focus-visible outlines. | `.storybook/modules/floating-panel.module.css` | `packages/angular/src/floating-panel/floating-panel-example-styles.ts` | No change. |
| Test parity | Spec covers public surface, `useFloatingPanel` fallback id, trigger toggle, controlled open single-emission, controlled position/size single-emission, drag/resize end details, close trigger, stage trigger emission, portal injector composition, server-platform construction, root-provider sharing, and example instantiation for Basic, LazyMount, RootProvider. | `packages/react/src/components/floating-panel/**/*.test.tsx` (none beyond Storybook play tests) | `packages/angular/src/floating-panel/floating-panel.spec.ts` | No change. |

## Implementation Plan
1. Re-read the existing audit and Angular implementation.
2. Re-diff React vs Angular source, examples, stories, styles, and exports.
3. Confirm no new gaps surface; document the deliberate presence delegation difference under `No change`.
4. Run typecheck + the focused floating-panel spec; record results.
5. Commit the audit refresh with the standard message.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` — passed. `forms isolation: ok`. Pre-existing ng-packagr export-condition warnings only.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/floating-panel/floating-panel.spec.ts` — 12/12 tests passed (1.46s).
- [ ] Storybook render: Not run; no browser tooling available in this session. Examples are covered by the example-instantiation test and template typecheck via the package build.
- [ ] Manual/visual checks: Not run in browser; CSS was diffed against `.storybook/modules/floating-panel.module.css` and matches by selector and rule.

## Commit
- Hash: b548bcbfa
- Message: `fix(angular): align floating-panel with react parity`
