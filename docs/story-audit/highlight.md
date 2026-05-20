# Highlight Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/src/highlight/highlight.stories.ts`
- Angular examples: `packages/angular/src/highlight/examples/`
- Angular styles: `packages/angular/src/highlight/highlight-example-styles.ts`
- React story: `packages/react/src/components/highlight/highlight.stories.tsx`
- React examples: `packages/react/src/components/highlight/examples/`
- React styles: `.storybook/modules/highlight.module.css`; dynamic-query also uses `.storybook/modules/field.module.css`

## Summary

- Status: Angular matches React story inventory, order, data, highlight options, and visible styling after replacing
  semantic-only `section` wrappers with React-matching `div` wrappers in grouped examples.
- Highest-risk gaps: none; the dynamic-query input styling is intentionally copied into Angular highlight example styles
  because Angular examples do not import shared Storybook CSS modules directly.

## Story Inventory

| Story name      | React | Angular | Notes                                                                             |
| --------------- | ----- | ------- | --------------------------------------------------------------------------------- |
| `Basic`         | Yes   | Yes     | Same query, text, paragraph wrapper, and mark styling.                            |
| `DynamicQuery`  | Yes   | Yes     | Same initial query, input placeholder, text, and dynamic input behavior.          |
| `ExactMatch`    | Yes   | Yes     | Same two comparison sections, query, text, `matchAll`, and `exactMatch` behavior. |
| `IgnoreCase`    | Yes   | Yes     | Same query, text, and `ignoreCase` option.                                        |
| `MatchAll`      | Yes   | Yes     | Same two comparison sections and `matchAll` true/false contrast.                  |
| `Multiple`      | Yes   | Yes     | Same string-array query and text.                                                 |
| `RepeatingText` | Yes   | Yes     | Same query, text, and `matchAll` option.                                          |

## Example Data Sources

| Example         | Data origin                                                        | Shape                                                   | Dynamic/async                                                    | Divergence                                 |
| --------------- | ------------------------------------------------------------------ | ------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------ |
| `Basic`         | Inline string literals in both examples.                           | `query: string`; `text: string`.                        | None.                                                            | None.                                      |
| `DynamicQuery`  | Inline text string; local component state.                         | `query: string`; `text: string`.                        | React uses `useState`; Angular uses `signal`. No async behavior. | Framework-idiomatic state only; no change. |
| `ExactMatch`    | Inline shared text constant in Angular; inline prop text in React. | `query: string`; `text: string`; boolean options.       | None.                                                            | Data value and options match.              |
| `IgnoreCase`    | Inline string literals in both examples.                           | `query: string`; `text: string`; `ignoreCase: boolean`. | None.                                                            | None.                                      |
| `MatchAll`      | Inline shared text constant in Angular; inline prop text in React. | `query: string`; `text: string`; `matchAll: boolean`.   | None.                                                            | Data value and options match.              |
| `Multiple`      | Inline string-array query and text in both examples.               | `query: string[]`; `text: string`.                      | None.                                                            | None.                                      |
| `RepeatingText` | Inline string literals in both examples.                           | `query: string`; `text: string`; `matchAll: boolean`.   | None.                                                            | None.                                      |

## Sections / Structure

- Meta differences: none. Both stories set `title: 'Utilities / Highlight'` and no parameters, decorators, argTypes,
  args, or tags.
- Decorator differences: React re-exports example components directly; Angular uses per-story `moduleMetadata` imports
  and a template render for each standalone example, matching local Angular Storybook conventions.
- Per-story decorators / args / controls: no story args or controls on either side. Angular imports exactly one example
  component per story.

## Styling

| Element             | React selector / class    | Angular selector / class           | Gap                                                                                                               | Fix                                                    |
| ------------------- | ------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Text wrapper        | `styles.Text`             | `.Text`                            | None.                                                                                                             | No change.                                             |
| Highlight mark      | `styles.Mark`             | `.Mark` passed through `markClass` | None.                                                                                                             | No change.                                             |
| Root stack          | `styles.Root`             | `.Root`                            | None.                                                                                                             | No change.                                             |
| Group label         | `styles.Label`            | `.Label`                           | None.                                                                                                             | No change.                                             |
| Group wrapper       | `styles.Section` on `div` | `.Section` on `section` before fix | Markup tag differed while visible layout matched.                                                                 | Use `div class="Section"` in Angular grouped examples. |
| Dynamic query input | `field.Input`             | `.Input`                           | No visible gap; Angular duplicates the field input styling locally because it cannot import the React CSS module. | No change.                                             |

## Gap Matrix

| Area                   | Gap                                                                                         | React reference                                                                                                                      | Angular location                                                                                                 | Fix                                             |
| ---------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| Grouped example markup | Angular used semantic `section` wrappers for `ExactMatch` and `MatchAll`; React uses `div`. | `packages/react/src/components/highlight/examples/exact-match.tsx`; `packages/react/src/components/highlight/examples/match-all.tsx` | `packages/angular/src/highlight/examples/exact-match.ts`; `packages/angular/src/highlight/examples/match-all.ts` | Replace `section` wrappers with `div` wrappers. |

## Implementation Plan

1. Keep the Angular story inventory and ordering unchanged because it already matches React.
2. Update grouped Angular examples to use the same wrapper element shape as React.
3. Run the highlight spec, Angular typecheck, Storybook startup, and `git diff --check`.

## Deferred (component-level work)

- None.

## Verification

- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6230 --ci` first failed on Angular/Babel
      cache `ENOENT` for `packages/angular/.angular/cache/21.2.11/babel-webpack`; after recreating that cache directory,
      `bun run --cwd packages/angular storybook -- --port 6231 --ci` reached Storybook ready at
      `http://localhost:6231/`.
- [ ] Visual check of each story: Browser side-by-side visual review was not performed. Startup smoke checks passed with
      `curl -I --max-time 2 http://localhost:6231/` and
      `curl -I --max-time 2 'http://localhost:6231/iframe.html?id=utilities-highlight--basic&viewMode=story'`, both
      returning `HTTP/1.1 200 OK`.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/highlight/highlight.spec.ts` passed, 1 file / 19
      tests.
- [x] Typecheck: `bun run --cwd packages/angular typecheck` passed, including production build and
      `forms isolation: ok`.
- [x] Formatting:
      `bun prettier --check packages/angular/src/highlight/examples/exact-match.ts packages/angular/src/highlight/examples/match-all.ts docs/story-audit/highlight.md`
      passed after formatting the new audit doc.
- [x] Whitespace:
      `git diff --check -- packages/angular/src/highlight/examples/exact-match.ts packages/angular/src/highlight/examples/match-all.ts`
      passed; `git diff --no-index --check /dev/null docs/story-audit/highlight.md` produced no whitespace warnings.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align highlight story with react parity`
