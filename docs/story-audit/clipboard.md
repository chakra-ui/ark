# Clipboard Angular Story Parity Audit

## Scope
- Angular story: `packages/angular/clipboard/clipboard.stories.ts`
- Angular examples: `packages/angular/clipboard/examples/basic.ts`, `context.ts`, `controlled.ts`, `copy-status.ts`, `timeout.ts`, `root-provider.ts`, `value-text.ts`, `icons.ts`
- Angular styles: `packages/angular/clipboard/clipboard-example-styles.ts`
- React story: `packages/react/src/components/clipboard/clipboard.stories.tsx`
- React examples: `packages/react/src/components/clipboard/examples/basic.tsx`, `context.tsx`, `controlled.tsx`, `copy-status.tsx`, `timeout.tsx`, `root-provider.tsx`, `value-text.tsx`
- React styles: `.storybook/modules/clipboard.module.css`, `.storybook/modules/button.module.css`

## Summary
- Status: Angular story inventory and example behavior match React after aligning the custom example button styling.
- Highest-risk gaps: The Angular story surface uses framework-local inline styles instead of CSS modules, so shared React helper styles must be translated manually when examples import `button.module.css`.

## Story Inventory
| Story name | React | Angular | Notes |
| --- | --- | --- | --- |
| Basic | Yes | Yes | Same value, label, input, trigger, indicator, and copied icon states. |
| Context | Yes | Yes | Same context-driven copy button and copied/copy label toggle. |
| Controlled | Yes | Yes | Same controlled URL value and `Change Url` action. Angular uses a signal and two-way binding. |
| CopyStatus | Yes | Yes | Same copy-count increment on copied status and trigger with value text. |
| Timeout | Yes | Yes | Same 5000ms timeout and timeout label. |
| RootProvider | Yes | Yes | Same root provider hook/useClipboard example and output for value/copied state. |
| ValueText | Yes | Yes | Same value text plus trigger surface. |

## Example Data Sources
| Example | Data origin | Shape | Dynamic/async | Divergence |
| --- | --- | --- | --- | --- |
| Basic | Hard-coded `https://ark-ui.com` value. | Single string value. | Clipboard copied state from machine. | No data divergence. |
| Context | Hard-coded `https://ark-ui.com` value from root context. | Single string value plus context API. | Copy action invokes `clipboard.copy()` and toggles copied state. | No data divergence. |
| Controlled | Initial `https://ark-ui.com`; button changes to `https://chakra-ui.com`. | Single mutable string value. | User event updates state. | React uses `useState`; Angular uses `signal` with `[(value)]`. No change. |
| CopyStatus | Hard-coded `https://ark-ui.com`; local count starts at 0. | String value plus numeric count. | `onStatusChange`/`statusChange` increments only when copied. | No data divergence. |
| Timeout | Hard-coded `https://ark-ui.com` with timeout 5000. | String value plus numeric timeout. | Copied state remains active for 5 seconds. | No data divergence. |
| RootProvider | `useClipboard` initialized with `https://ark-ui.com`. | Clipboard API object. | Machine state drives output and root provider. | Angular passes `context: () => ({ value })`; framework-idiomatic equivalent. |
| ValueText | Hard-coded `https://ark-ui.com` value. | Single string value. | Clipboard value text reads machine value. | No data divergence. |

## Sections / Structure
- Meta differences: Both stories use `title: 'Components / Clipboard'`; neither defines `parameters`, `decorators`, `argTypes`, `args`, or `tags` at meta level.
- Decorator differences: React re-exports component examples directly. Angular uses per-story `moduleMetadata` imports and a template render for each standalone example component. This is consistent with neighboring Angular stories.
- Per-story decorators / args / controls: Both stacks expose the same story names in the same order with no per-story args or controls.

## Styling
| Element | React selector / class | Angular selector / class | Gap | Fix |
| --- | --- | --- | --- | --- |
| Root | `.Root` from `clipboard.module.css` | `[arkClipboard]`, `[arkClipboardRootProvider]` | Equivalent layout, width, gap, and color. | No change. |
| Label | `.Label` | `[arkClipboardLabel]` | Equivalent text size, line height, weight, and color. | No change. |
| Control | `.Control` | `[arkClipboardControl]` | Equivalent flex row and gap. | No change. |
| Input | `.Input` | `input[arkClipboardInput]` | Equivalent padding, border, focus, placeholder, and disabled states. | No change. |
| Clipboard trigger | `.Trigger` | `[arkClipboardTrigger]` | Equivalent icon button sizing and states. | No change. |
| Indicator | `.Indicator` | `[arkClipboardIndicator]` | Equivalent inline-flex centering. | No change. |
| Value text | `.ValueText` where React applies it | `[arkClipboardValueText]` | Angular applies the same text styling to all value text examples; values match visible surface. | No change. |
| Context/Controlled action button | `.Root` from `button.module.css` | `.button` | Angular `.button` was styled like `.Trigger`, making it shorter and narrower than React's shared button. | Update `.button` to mirror `button.module.css` Root sizing, padding, icon sizing, and disabled treatment. |
| Stack wrapper | Global `.stack` | `.stack` in clipboard example styles | Equivalent column stack with 0.75rem gap. | No change. |

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Styling | Context and Controlled standalone action buttons did not match React shared button dimensions. | `.storybook/modules/button.module.css` `.Root` | `packages/angular/clipboard/clipboard-example-styles.ts` `.button` | Translate shared button sizing and state styles into the local `.button` selector while leaving clipboard triggers unchanged. |

## Implementation Plan
1. Keep the Angular story exports unchanged because the inventory, order, and render strategy already match React.
2. Update only `packages/angular/clipboard/clipboard-example-styles.ts` so `.button` mirrors React `button.module.css` instead of reusing clipboard trigger dimensions.
3. Run narrow verification for Angular typecheck and `git diff --check`; record results here.

## Deferred (component-level work)
- None.

## Verification
- [x] Clipboard spec: `bun run --cwd packages/angular test:ci clipboard/clipboard.spec.ts` passed, 1 file / 15 tests.
- [x] git diff --check: `git diff --check` passed.
- [ ] Angular package typecheck: `bun run --cwd packages/angular typecheck` failed after TypeScript completed and `@ark-ui/angular/clipboard` built; `scripts/hide-private-entrypoints.ts` could not find `packages/angular/dist/package.json`.
- [ ] Targeted TypeScript checks: `bunx tsc -p packages/angular/tsconfig.json --noEmit` failed on unrelated missing combobox example imports; `bunx tsc -p packages/angular/tsconfig.spec.json --noEmit` failed on an unrelated `@ark-ui/angular/providers/locale` import in `packages/angular/progress/progress.spec.ts`.
- [ ] Storybook startup: `bun run --cwd packages/angular storybook` stopped because port 6006 was occupied; retrying `bun run --cwd packages/angular storybook -- --port 6007` reached preview compilation but failed on unrelated missing combobox example modules.
- [ ] Visual check of each story: Not completed because Storybook could not compile due unrelated combobox story errors.

## Commit
- Hash: See this audit's commit in git history.
- Message: `fix(angular): align clipboard story with react parity`
