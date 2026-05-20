# Frame Angular Story Parity Audit

## Scope
- Angular story: `packages/angular/src/frame/frame.stories.ts`
- Angular examples: `packages/angular/src/frame/examples/basic.ts`, `packages/angular/src/frame/examples/script.ts`, `packages/angular/src/frame/examples/src-doc.ts`, `packages/angular/src/frame/examples/inherit-styles.ts`
- Angular styles: inline `styles` arrays in the Angular example components
- React story: `packages/react/src/components/frame/frame.stories.tsx`
- React examples: `packages/react/src/components/frame/examples/basic.tsx`, `packages/react/src/components/frame/examples/script.tsx`, `packages/react/src/components/frame/examples/src-doc.tsx`, `packages/react/src/components/frame/examples/inherit-styles.tsx`
- React styles: inline `style` props in the React example components; no `frame.module.css`

## Summary
- Status: Fixed Angular Storybook inventory to match React by removing the Angular-only exported `InheritStyles` story.
- Highest-risk gaps: none after the story export alignment. The unexported `inherit-styles` example exists in both stacks and is intentionally not exposed by either Storybook surface after this fix.

## Story Inventory
| Story name | React | Angular | Notes |
| --- | --- | --- | --- |
| `Basic` | Exported from `./examples/basic` | Story object importing `FrameBasicExample` through `moduleMetadata` | Same title, frame head background style, projected copy, padding, width, border, and auto-height intent. Angular wrapper is framework-idiomatic. |
| `Script` | Exported from `./examples/script` | Story object importing `FrameScriptExample` through `moduleMetadata` | Same mounted script behavior and rendered copy. Angular uses `viewChild` plus `(mount)` instead of a React ref plus `onMount`. |
| `SrcDoc` | Exported from `./examples/src-doc` | Story object importing `FrameSrcDocExample` through `moduleMetadata` | Same `srcdoc` HTML, external stylesheet/font links, title, copy, Open Sans heading, max width, and full width. |
| `InheritStyles` | Not exported by the React story | Removed from Angular story export | React has an example file but does not expose it in `frame.stories.tsx`; Angular should not expose an extra public Storybook story. |

## Example Data Sources
| Example | Data origin | Shape | Dynamic/async | Divergence |
| --- | --- | --- | --- | --- |
| `Basic` | Hard-coded example markup and inline head style | One `Frame` / `ark-frame` with a head style setting `body { background-color: #f0f0f0; }`; one padded `div` with `h1` and `p` | Frame mount and size observation are component-managed; no example-local async, randomness, or generated data | No visible story-surface divergence. Angular passes head content with `ng-template`. |
| `Script` | Hard-coded example markup and mount handler | One frame with a mount callback that appends a script logging `Hello from inside the frame!`; one padded `div` with `h1` and `p` | Mount handler runs when the iframe document is available; no timers or randomness | No visible story-surface divergence. Angular uses `script.textContent`; React uses `script.innerHTML`; both append the same script text. |
| `SrcDoc` | Hard-coded `srcdoc` string | HTML document with Font Awesome link, Open Sans link, `base target=_blank`, hidden overflow body, and a `div`; projected heading and two paragraphs | Frame mount and size observation are component-managed; external CSS/font links load from remote URLs | No visible story-surface divergence for copy and data. Angular uses `srcdoc` input casing; React uses `srcDoc`. |
| `InheritStyles` | Hard-coded example markup and inherited head cloning | One frame that clones parent document `style` and stylesheet links; heading and paragraph | Mount handler clones existing document head nodes; no timers or randomness | Not part of the public React Storybook export. Kept as an unexported Angular example file because React also retains the unexported example file. |

## Sections / Structure
- Meta differences: both stories use `title: 'Utilities / Frame'`; neither defines parameters, decorators, argTypes, args, tags, or controls at the meta level.
- Decorator differences: React re-exports function stories directly. Angular uses per-story `moduleMetadata` decorators to import standalone example components.
- Per-story decorators / args / controls: Angular applies per-story `moduleMetadata` imports and render templates; React examples define render functions in the example files. Neither stack defines story args or story-specific controls.

## Styling
| Element | React selector / class | Angular selector / class | Gap | Fix |
| --- | --- | --- | --- | --- |
| Basic frame | Inline `style={{ border: '1px solid #ccc', width: '100%', height: 'var(--height)' }}` | `.frame { border: 1px solid #ccc; display: block; height: var(--height, 180px); width: 100%; }` | Angular adds `display: block` for custom-element layout and a fallback height before ResizeObserver sets `--height`; visible intent matches | No change. |
| Basic content | Inline `style={{ padding: '40px' }}` | `.content { padding: 40px; }` | none | No change. |
| Basic frame head | React `head={<style>body { background-color: #f0f0f0; }</style>}` | Angular `[head]="frameHead"` with equivalent style content | none | No change. |
| Script frame | Same inline frame style as Basic | Same `.frame` style as Basic | Angular adds `display: block` and fallback height for custom-element layout | No change. |
| Script content | Inline `style={{ padding: '40px' }}` | `.content { padding: 40px; }` | none | No change. |
| SrcDoc frame | Inline `style={{ border: '1px solid #ccc', maxWidth: '800px', width: '100%' }}` | `.frame { border: 1px solid #ccc; display: block; max-width: 800px; width: 100%; height: var(--height, 180px); }` | Angular adds custom-element display and auto-height styling so the internal iframe has a stable height | No change. |
| SrcDoc heading | Inline `style={{ fontFamily: 'Open Sans, sans-serif' }}` | Inline `style="font-family: 'Open Sans', sans-serif"` | CSS font-family quoting differs but resolves to the same font stack | No change. |
| InheritStyles story entry | No public story export | Angular had a public story export | Angular exposed an extra story not present in React | Remove the Angular story export/import. |

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story inventory | Angular exposes `InheritStyles`, but React does not | `packages/react/src/components/frame/frame.stories.tsx` exports `Basic`, `Script`, and `SrcDoc` only | `packages/angular/src/frame/frame.stories.ts` | Remove `FrameInheritStylesExample` import and `InheritStyles` story export. |
| Example content | none for exported stories | `packages/react/src/components/frame/examples/basic.tsx`, `script.tsx`, `src-doc.tsx` | `packages/angular/src/frame/examples/basic.ts`, `script.ts`, `src-doc.ts` | No change. |
| Example styling | none requiring a story-surface change | React inline frame/content styles | Angular inline component styles | No change; Angular keeps framework layout helpers for the `ark-frame` custom element. |

## Implementation Plan
1. Document the React and Angular story inventories, example data, and styling surfaces.
2. Remove the Angular-only `InheritStyles` public story export and its now-unused import.
3. Leave example component files unchanged because the exported story examples already match React and the unexported inherit-styles example exists in both stacks.
4. Run the focused frame spec, Angular typecheck, Storybook startup, and whitespace checks.

## Deferred (component-level work)
- None.

## Verification
- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6213 --ci` reached Storybook ready at `http://localhost:6213/`; stopped after startup. Existing warnings only: unused TypeScript compilation entries and `DefinePlugin` `process.env.NODE_ENV` conflict.
- [ ] Visual check of each story: not performed in browser side-by-side.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/frame/frame.spec.ts` passed, 1 file / 8 tests.
- [x] Typecheck: `bun run --cwd packages/angular typecheck` passed, including production build and `forms isolation: ok`.
- [x] Whitespace: `git diff --check` passed; `git diff --no-index --check /dev/null docs/story-audit/frame.md` produced no whitespace warnings.

## Commit
- Hash: See this audit's commit in git history.
- Message: `fix(angular): align frame story with react parity`
