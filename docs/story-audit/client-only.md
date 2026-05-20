# ClientOnly Angular Story Parity Audit

## Scope
- Angular story: `packages/angular/src/client-only/client-only.stories.ts`
- Angular examples: `packages/angular/src/client-only/examples/basic.ts`, `packages/angular/src/client-only/examples/with-fallback.ts`
- Angular styles: none; the component host uses `display: contents`
- React story: `packages/react/src/components/client-only/client-only.stories.tsx`
- React examples: `packages/react/src/components/client-only/examples/basic.tsx`, `packages/react/src/components/client-only/examples/with-fallback.tsx`
- React styles: none

## Summary
- Status: In parity after audit; no Angular story-surface code changes required.
- Highest-risk gaps: none identified.

## Story Inventory
| Story name | React | Angular | Notes |
| --- | --- | --- | --- |
| `Basic` | Exported from `./examples/basic` | Story object importing `ClientOnlyBasicExample` through `moduleMetadata` | Same order, title, and rendered copy. Angular wrapper is framework-idiomatic. |
| `WithFallback` | Exported from `./examples/with-fallback` | Story object importing `ClientOnlyWithFallbackExample` through `moduleMetadata` | Same order, title, rendered client copy, and fallback text. Angular uses `ng-template` for the fallback input. |

## Example Data Sources
| Example | Data origin | Shape | Dynamic/async | Divergence |
| --- | --- | --- | --- | --- |
| `Basic` | Hard-coded story markup | One `ClientOnly` / `ark-client-only` wrapper with one `div` child | Client-only swap is handled by each framework implementation; no example-local timers or random values | No visible divergence. Angular uses content projection. |
| `WithFallback` | Hard-coded story markup | One wrapper, one `div` child, one fallback `div` with `Loading...` | Client-only swap is handled by each framework implementation; no example-local timers or random values | No visible divergence. Angular uses an `ng-template` because `fallback` accepts `TemplateRef`. |

## Sections / Structure
- Meta differences: both stories use `title: 'Utilities / ClientOnly'`; neither defines parameters, decorators, argTypes, args, or tags at the meta level.
- Decorator differences: React re-exports function stories directly. Angular uses per-story `moduleMetadata` decorators to import standalone example components.
- Per-story decorators / args / controls: neither stack defines story args, argTypes, controls, or story-specific layout parameters.

## Styling
| Element | React selector / class | Angular selector / class | Gap | Fix |
| --- | --- | --- | --- | --- |
| Story wrapper | none | none | none | No change. |
| Rendered child content | none | none | none | No change. |
| Fallback content | none | none | none | No change. |
| Component host | React fragment output from `ClientOnly` | `ark-client-only` host with `display: contents` | Framework implementation difference that preserves the visible Storybook surface | No change. |

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story inventory | none | `packages/react/src/components/client-only/client-only.stories.tsx` | `packages/angular/src/client-only/client-only.stories.ts` | No change. |
| Example copy | none | `packages/react/src/components/client-only/examples/*.tsx` | `packages/angular/src/client-only/examples/*.ts` | No change. |
| Styling | none | no CSS module | no example styles | No change. |

## Implementation Plan
1. Confirm React and Angular story exports and ordering match.
2. Confirm rendered example content and fallback copy match.
3. Record Angular-specific fallback template binding as intentional framework parity.
4. Leave story, examples, and component code unchanged because no Storybook-surface gap exists.

## Deferred (component-level work)
- None.

## Verification
- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6013 --ci` failed on unrelated `packages/angular/combobox/examples/highlight-matching-text.ts` importing `@ark-ui/angular/highlight` with no valid export target.
- [ ] Visual check of each story: not performed in browser side-by-side.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/client-only/client-only.spec.ts` passed, 1 file / 5 tests.
- [x] Typecheck: `bun run --cwd packages/angular typecheck` passed, including production build and `forms isolation: ok`.
- [x] Whitespace: `git diff --check` passed; `git diff --check -- packages/angular/src/client-only/client-only.stories.ts packages/angular/src/client-only/examples/basic.ts packages/angular/src/client-only/examples/with-fallback.ts` passed; `git diff --no-index --check /dev/null docs/story-audit/client-only.md` produced no whitespace warnings.

## Commit
- Hash: See this audit's commit in git history.
- Message: `docs(angular): audit client-only story parity`
