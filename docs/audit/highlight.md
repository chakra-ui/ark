# Highlight Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/highlight/highlight.ts`, `packages/angular/src/highlight/public-api.ts`, `packages/angular/src/highlight/highlight.stories.ts`, `packages/angular/src/highlight/highlight-example-styles.ts`, `packages/angular/src/highlight/examples/*.ts`, `packages/angular/src/highlight/highlight.spec.ts`
- React files: `packages/react/src/components/highlight/highlight.tsx`, `packages/react/src/components/highlight/use-highlight.ts`, `packages/react/src/components/highlight/index.ts`, `packages/react/src/components/highlight/examples/*.tsx`, `packages/react/src/components/highlight/highlight.stories.tsx`
- Storybook/style files: `.storybook/modules/highlight.module.css`, `.storybook/modules/field.module.css`

## Summary
- Status: Fixed (re-audited)
- Highest-risk gaps (closed):
  - Angular previously exposed only the `highlightWord` utility, while React/Solid/Vue/Svelte expose a renderable Highlight component. Closed via `ArkHighlightComponent`.
  - Angular Storybook examples manually repeated chunk rendering instead of exercising the public component surface. Closed by rewriting examples to use `<ark-highlight>`.
  - Angular examples did not match the React demo module styling for text, marks, layout, labels, and dynamic-query input. Closed via shared `highlightExampleStyles` mirroring `highlight.module.css` and the relevant `field.module.css` `Input` selectors.
- Remaining (intentional) deltas:
  - React `Highlight` spreads arbitrary `<mark>` props (className, style, data-*, aria-*) onto every match. Angular exposes only `markClass` (`NgClass` value), which is sufficient for every shipped React example and story. Adding broader spread would require either a directive instance per chunk or a token bag input; flagged as a `No change` design note rather than gold-plated.
  - Non-matching chunks are rendered inside `<span>` (instead of React's bare text Fragment) to keep Angular template whitespace deterministic. This is the same call as the original audit and remains intentional.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Public API parity | Missing renderable Highlight component for `query`, `text`, `ignoreCase`, `matchAll`, `exactMatch`. | `packages/react/src/components/highlight/highlight.tsx` | `packages/angular/src/highlight/highlight.ts` | Fixed: `ArkHighlightComponent` backed by `highlightWord`, exported from the highlight entry point alongside the utility. |
| Public API parity | React exports `useHighlight` hook returning chunks. | `packages/react/src/components/highlight/use-highlight.ts` | `packages/angular/src/highlight/highlight.ts` | `highlightWord` is re-exported from `@zag-js/highlight-word`; callers can `computed(() => highlightWord(...))` in Angular code, matching how the component itself consumes it. No additional wrapper needed in idiomatic Angular signal code. Documented as `No change`. |
| Public API parity | Native `<mark>` prop forwarding (`className`, `style`, `data-*`, `aria-*`) beyond `markClass`. | `packages/react/src/components/highlight/highlight.tsx` | `packages/angular/src/highlight/highlight.ts` | `No change`: every React story and example only uses `className`, which `markClass` covers via `NgClass`. Broader spread would either require N directive instances or a custom attribute-bag input and is not justified by current stories. Recorded as a deferred design enhancement. |
| Story parity | Stories previously rendered chunks manually instead of exercising the component API. | `packages/react/src/components/highlight/examples/*.tsx` | `packages/angular/src/highlight/examples/*.ts` | Fixed: examples use `<ark-highlight>` with matching story names (`Basic`, `DynamicQuery`, `ExactMatch`, `IgnoreCase`, `MatchAll`, `Multiple`, `RepeatingText`) and matching prop combinations. |
| Styling parity | Missing React `.Text`, `.Mark`, `.Root`, `.Label`, `.Section`, and field `.Input` styles. | `.storybook/modules/highlight.module.css`, `.storybook/modules/field.module.css` | `packages/angular/src/highlight/highlight-example-styles.ts` | Fixed: shared `highlightExampleStyles` mirrors the React selectors and includes the `Input` focus/placeholder rules used by the dynamic query example. |
| Functionality parity | Component rendering, runtime text validation, and dynamic query updates not covered. | `packages/react/src/components/highlight/highlight.tsx` | `packages/angular/src/highlight/highlight.spec.ts` | Fixed: added host component tests for dynamic query updates, repeating text, runtime `text` validation, and example mounting alongside the existing `highlightWord` utility coverage. |
| Accessibility parity | Both implementations render matched text as semantic `<mark>` elements; no roles or keyboard behavior involved. | `packages/react/src/components/highlight/highlight.tsx` | `packages/angular/src/highlight/highlight.ts` | Fixed/Verified: matches render as `<mark>`, non-matches render as text-equivalent `<span>` to avoid Angular template whitespace drift. |

## Implementation Plan
1. Provide `ArkHighlightComponent` that validates `text`, computes chunks with `highlightWord`, renders matches as `<mark>` with optional `markClass`, and renders non-matches as `<span>` for stable whitespace.
2. Use `optionalBooleanAttribute` so `ignoreCase`, `matchAll`, and `exactMatch` accept attribute-style (`ignoreCase`), property-style (`[ignoreCase]="true"`), and string forms while preserving `undefined` defaults for the utility.
3. Mirror React demo styles in a shared `highlightExampleStyles` string and apply matching `.Text`, `.Mark`, `.Root`, `.Section`, `.Label`, `.Input` classes in each example.
4. Wire examples 1:1 to React story names and prop combinations.
5. Cover component rendering, dynamic query updates, repeating matches, runtime `text` validation, and example mounting in the spec.
6. Run focused Highlight tests, Angular package typecheck/build, and `git diff --check`.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` succeeded; ng-packagr built every entry point and `forms isolation: ok` was reported.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/highlight/highlight.spec.ts` passes with 19 tests (utility behavior, host component dynamic query, repeating matches, text validation, and all seven example mounts).
- [ ] Storybook render: `bun run --cwd packages/angular storybook` prompts interactively when port 6006 is occupied and cannot be confirmed in a headless re-audit run. Story setup is exercised indirectly by the example-mount spec cases.
- [ ] Manual/visual checks: Deferred because Storybook was not opened in a browser during this re-audit. Styling was verified against `.storybook/modules/highlight.module.css` and `.storybook/modules/field.module.css` in code; example classes match React selectors 1:1.

## Commit
- Hash: recorded after commit
- Message: `fix(angular): align highlight with react parity`
