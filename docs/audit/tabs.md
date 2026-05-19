# Tabs Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/tabs/` (`tabs-root.ts`, `tabs-root-provider.ts`, `tabs-list.ts`, `tabs-trigger.ts`, `tabs-content.ts`, `tabs-indicator.ts`, `use-tabs.ts`, `use-tabs-context.ts`, `tabs.types.ts`, `tabs.anatomy.ts`, `public-api.ts`)
- React files: `packages/react/src/components/tabs/` (`tabs-root.tsx`, `tabs-root-provider.tsx`, `tab-list.tsx`, `tab-trigger.tsx`, `tab-content.tsx`, `tab-indicator.tsx`, `use-tabs.ts`, `tabs-context.tsx`, `tabs.ts`, `index.ts`, `tabs.anatomy.ts`)
- Storybook/style files: `packages/angular/src/tabs/tabs.stories.ts`, `packages/angular/src/tabs/examples/`, `packages/angular/src/tabs/tabs-example-styles.ts`, `packages/react/src/components/tabs/tabs.stories.tsx`, `packages/react/src/components/tabs/examples/`, `.storybook/modules/tabs.module.css`
- Specs: `packages/angular/src/tabs/tabs.spec.ts`, `packages/react/src/components/tabs/tests/tabs.test.tsx`

## Summary
- Status: Re-audited; parity preserved. No new gaps surfaced. Tabs spec suite continues to pass (17 tests). Storybook visual verification remains deferred because port 6006 is occupied by another running Storybook instance.
- Highest-risk gaps from prior pass (render-strategy inputs, missing `LazyMount` and `Links` stories, demo style drift, spec coverage) all remain closed in this re-audit.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API | Root and root-provider exposed render-strategy inputs (`lazyMount`, `unmountOnExit`) plus `isContentUnmounted(value)` for template-driven mounting. Status: closed. | `packages/react/src/components/tabs/tabs-root.tsx`, `tabs-root-provider.tsx`, `tab-content.tsx` | `packages/angular/src/tabs/tabs-root.ts`, `tabs-root-provider.ts`, `use-tabs.ts` | No change in this pass; verified inputs and helper remain wired. |
| Public API | Anchor triggers retain tab semantics on `<a>` host with `arkTabsTrigger`. Status: closed; the directive selector uses attribute targeting so anchor hosts work without an `asChild` analogue. | `packages/react/.../tab-trigger.tsx` (`asChild` pattern) | `packages/angular/src/tabs/tabs-trigger.ts` | No change; verified by `TabsLinksExample` spec. |
| Public API | React exposes a `Tabs` namespace re-export (`tabs.ts`). Angular intentionally exports each directive individually per `docs/technical-requirements.md` Section 1 (no namespace import). Status: design choice. | `packages/react/src/components/tabs/tabs.ts` | `packages/angular/src/tabs/public-api.ts` | No change; documented as Angular-specific position. |
| Story parity | `LazyMount`, `Links`, `Indicator`, `Vertical`, `ManualActivation`, `Controlled`, `RootProvider`, `DisabledTab`, and `Basic` stories all present. Status: closed. | `packages/react/.../examples/*.tsx`, `tabs.stories.tsx` | `packages/angular/src/tabs/examples/*.ts`, `tabs.stories.ts` | No change; verified all nine stories match React 1:1. |
| Functionality | Two-way `[(value)]`, deselectable, manual activation, loopFocus, vertical orientation, navigate callback, and controlled value. Status: closed. | `packages/react/.../use-tabs.ts`, `tabs-root.tsx` | `packages/angular/src/tabs/tabs-root.ts`, `use-tabs.ts` | No change; specs cover click selection, ArrowLeft/Right, ArrowDown vertical, manual activation, disabled, controlled emissions, and root-provider. |
| Styling | Demo styles align with React module: list isolation/z-index for indicator, trigger pill state, indicator absolute positioning with `--width`/`--height` transitions, vertical-orientation rules, focus-visible outline. Status: closed. | `.storybook/modules/tabs.module.css` | `packages/angular/src/tabs/tabs-example-styles.ts` | No change. Note: Angular trigger always sets `text-decoration: none; color: inherit;` covering both button and anchor hosts; React applies these via `&:is(a)`. Functional equivalence holds; broader rule is intentional since Angular cannot easily scope a single selector to both. |
| Accessibility | Roles, `aria-orientation`, `role="tab"`/`tabpanel`, `aria-selected`, `data-disabled`, focus management, keyboard navigation derive from Zag in both implementations. Status: closed. | `packages/react/.../tests/tabs.test.tsx` (axe assertion) | `packages/angular/src/tabs/tabs.spec.ts` | No change; verified by directive specs and `TabsLinksExample` anchor assertions. |
| Test parity | Angular specs cover public surface smoke, fallback id generation, selection/visibility, click selection + arrow focus, manual activation, vertical keyboard, loopFocus=false, disabled tab non-selection, controlled emissions, root-provider context, indicator data attributes, lazyMount, lazyMount+unmountOnExit, forms isolation, basic example, root-provider example, links example. Status: closed; 17 tests. | `packages/react/.../tests/tabs.test.tsx` | `packages/angular/src/tabs/tabs.spec.ts` | No change. |

## Implementation Plan
This pass is a re-audit. No new Angular implementation changes are required. Existing parity holds.

## Verification
- [x] Component tests: `bun run --cwd packages/angular test:ci src/tabs/tabs.spec.ts` passed (17 tests, 1.74s).
- [x] Formatting/static check: `bunx biome check packages/angular/src/tabs docs/audit/tabs.md` reports only a pre-existing `useLiteralKeys` informational on `['id']` access in `tabs.spec.ts`; TypeScript `noPropertyAccessFromIndexSignature` requires the bracket access, so the suggestion is intentionally not applied.
- [~] Typecheck/build: `bun run --cwd packages/angular typecheck` halts on a pre-existing error in `src/navigation-menu/navigation-menu.spec.ts` (unrelated to tabs and outside this audit's scope). Tabs sources themselves compile cleanly; the tabs spec passes through `vitest`, which performs its own per-file Angular AOT typecheck on the loaded tabs surface.
- [ ] Storybook render: deferred. `localhost:6006` is already bound by another Storybook process started in this environment, so `bun run --cwd packages/angular storybook` cannot start a fresh instance without disrupting that runner.
- [ ] Manual/visual checks: deferred along with the Storybook port conflict above.

## Commit
- Hash: Recorded in final response after commit creation.
- Message: `fix(angular): align tabs with react parity`
