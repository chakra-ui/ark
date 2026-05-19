# Popover Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/popover/`
- React files: `packages/react/src/components/popover/`
- Storybook/style files: `packages/angular/src/popover/popover.stories.ts`, `packages/angular/src/popover/popover-example-styles.ts`, `.storybook/modules/popover.module.css`

## Summary
- Status: Fixed direct Angular parity gaps; deferred React-only factory/asChild and cross-component WithDialog story parity.
- Highest-risk gaps: full package typecheck/build is currently blocked by an unrelated `pin-input` strict index-signature error before a full clean verification can complete.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API | Root did not expose `persistentElements`, `translations`, or outside/escape dismissal callback outputs. | `packages/react/src/components/popover/use-popover.ts`, `packages/vue/src/components/popover/popover.types.ts` | `packages/angular/src/popover/popover-root.ts`, `packages/angular/src/popover/popover.types.ts` | Add inputs, outputs, type exports, and forward Zag callbacks. |
| Public API | Trigger did not accept a `value`, so `triggerValue` / multi-trigger flows could not identify the opener. | `packages/react/src/components/popover/popover-trigger.tsx` | `packages/angular/src/popover/popover-trigger.ts` | Add a signal `value` input and pass it to `getTriggerProps`. |
| Stories | Angular stories covered only Basic, Controlled, DefaultOpen, Anchor, Arrow, Modal, RootProvider. | `packages/react/src/components/popover/popover.stories.tsx` | `packages/angular/src/popover/popover.stories.ts`, `packages/angular/src/popover/examples/` | Add direct Angular examples for close behavior, context, disable outside click, initial focus, lazy mount, multiple triggers, nested, positioning, and same width. |
| Styling | Angular demo styles missed module parity for content width, data-state animations, close trigger hover/focus, arrow tip border, body/input layout, anchor/indicator/group helpers. | `.storybook/modules/popover.module.css` | `packages/angular/src/popover/popover-example-styles.ts` | Align selectors and helper classes to the React CSS module. |
| Story parity | React `AsChild` and `Factory` rely on React factory/asChild APIs that do not map to Angular directives. | `packages/react/src/components/popover/examples/as-child.tsx`, `factory.tsx` | Angular popover examples | No change: Angular uses directive composition rather than React polymorphic factory/asChild. |
| Story parity | React `WithDialog` requires cross-component dialog layering coverage. | `packages/react/src/components/popover/examples/with-dialog.tsx` | Angular popover examples | Deferred as cross-component integration; base nested/layer behavior is covered by Nested. |

## Implementation Plan
1. Add missing root inputs, outputs, and type exports without changing React files.
2. Add `value` support to `ArkPopoverTrigger`.
3. Add focused specs for trigger value and example coverage.
4. Add missing Angular examples and Storybook exports for direct React parity demos.
5. Align demo styles with `.storybook/modules/popover.module.css`.

## Verification
- [x] Typecheck/build: `bun --cwd packages/angular tsc -p tsconfig.json --noEmit --noPropertyAccessFromIndexSignature false` passed for library sources. `bun run --cwd packages/angular typecheck` attempted; blocked by existing unrelated `pin-input/pin-input-input.ts:56` TS4111 (`rest.autocomplete` must be accessed as `rest['autocomplete']`). `bun --cwd packages/angular tsc -p tsconfig.spec.json --noEmit --noPropertyAccessFromIndexSignature false` attempted; blocked by unrelated dirty `select/select.spec.ts:541` (`getSnapshot` missing on `SelectService<any>`). `bun run --cwd packages/angular build` attempted; blocked by the same unrelated `pin-input` error before completing all entry points.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/popover/popover.spec.ts` passed, 21 tests.
- [x] Storybook render: `bun run --cwd packages/angular storybook` started on port 6007 after accepting the port prompt. First attempt hit an Angular webpack cache `ENOENT`; after creating `packages/angular/.angular/cache/21.2.11/babel-webpack`, Storybook compiled to 100% without popover errors before manual stop.
- [x] Manual/visual checks: Compared React `.storybook/modules/popover.module.css` and React popover examples against Angular styles/stories; no browser screenshot captured.

## Commit
- Hash: recorded in final status
- Message: `fix(angular): align popover with react parity`
