# Download Trigger Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/src/download-trigger/download-trigger.stories.ts`
- Angular examples: `packages/angular/src/download-trigger/examples/basic.ts`,
  `packages/angular/src/download-trigger/examples/svg.ts`,
  `packages/angular/src/download-trigger/examples/with-promise.ts`
- Angular styles: `packages/angular/src/download-trigger/download-trigger-example-styles.ts`
- React story: `packages/react/src/components/download-trigger/download-trigger.stories.tsx`
- React examples: `packages/react/src/components/download-trigger/examples/basic.tsx`,
  `packages/react/src/components/download-trigger/examples/svg.tsx`,
  `packages/react/src/components/download-trigger/examples/with-promise.tsx`
- React styles: `.storybook/modules/download-trigger.module.css`, `.storybook/modules/button.module.css`

## Summary

- Status: Angular already matches React story inventory, order, example copy, data payloads, and async provider
  behavior. One focused style parity fix is needed for the shared button surface.
- Highest-risk gaps: none at the component level.

## Story Inventory

| Story name    | React                                                | Angular                                                        | Notes                                                                                                         |
| ------------- | ---------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `Basic`       | Present, first export from `./examples/basic`        | Present, first story using `DownloadTriggerBasicExample`       | Matches content, file name, MIME type, and visible label.                                                     |
| `Svg`         | Present, second export from `./examples/svg`         | Present, second story using `DownloadTriggerSvgExample`        | Matches SVG string payload, file name, MIME type, and visible label.                                          |
| `WithPromise` | Present, third export from `./examples/with-promise` | Present, third story using `DownloadTriggerWithPromiseExample` | Matches lazy `fetch('https://picsum.photos/200/300')` Blob provider, file name, MIME type, and visible label. |

## Example Data Sources

| Example       | Data origin                                         | Shape                                                                    | Dynamic/async                                                                 | Divergence                                                                                                    |
| ------------- | --------------------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `Basic`       | Local `content` constant in each example.           | String: `Hello, World! This is a sample text file.`                      | Static.                                                                       | No change.                                                                                                    |
| `Svg`         | Local `svgContent` template string in each example. | SVG markup string containing one red circle.                             | Static.                                                                       | No change.                                                                                                    |
| `WithPromise` | Local `fetchImage` function in each example.        | Function returning `Promise<Blob>` from `https://picsum.photos/200/300`. | Async fetch occurs when the trigger is activated; URL returns a random image. | Angular types the return as `Promise<DownloadableData>`, which is framework-idiomatic and preserves behavior. |

## Sections / Structure

- Meta differences: Both stories set only `title: 'Utilities / Download Trigger'`. Neither declares `parameters`,
  `decorators`, `argTypes`, `args`, or `tags` at the meta level.
- Decorator differences: React re-exports function stories directly. Angular wraps each standalone example through
  `moduleMetadata({ imports: [...] })`, matching local Angular Storybook conventions.
- Per-story decorators / args / controls: Neither stack defines story args or controls. Angular render templates map
  one-to-one to the React exported examples.

## Styling

| Element        | React selector / class | Angular selector / class | Gap                                                                                                                                    | Fix                                                                              |
| -------------- | ---------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Root wrapper   | `styles.Root`          | `.root`                  | None.                                                                                                                                  | No change.                                                                       |
| Preview panel  | `styles.Preview`       | `.preview`               | None.                                                                                                                                  | No change.                                                                       |
| Preview icon   | `.Preview > svg`       | `.preview > svg`         | None.                                                                                                                                  | No change.                                                                       |
| Preview text   | `styles.PreviewText`   | `.preview-text`          | None.                                                                                                                                  | No change.                                                                       |
| Trigger button | `button.Root`          | `.button`                | Angular button styles are missing the React icon-only `:has()` padding rule and `data-variant` branches from the shared button module. | Add the missing shared button selectors to `download-trigger-example-styles.ts`. |

## Gap Matrix

| Area          | Gap                                                                                                              | React reference                        | Angular location                                                           | Fix                                                                                                                                         |
| ------------- | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Button styles | Shared button module includes icon-only and variant selectors not mirrored by the Angular local `.button` class. | `.storybook/modules/button.module.css` | `packages/angular/src/download-trigger/download-trigger-example-styles.ts` | Add `.button:has(> svg:only-child)`, `.button[data-variant='surface']`, `.button[data-variant='solid']`, and related hover/focus selectors. |

## Implementation Plan

1. Keep the Angular story exports unchanged because they already match React inventory and order.
2. Keep example data, labels, and fetch behavior unchanged because they already match React.
3. Patch the Angular example style helper to mirror React's shared button selector surface.
4. Run the download-trigger spec, Angular typecheck, Storybook startup, and `git diff --check`; record results here.

## Deferred (component-level work)

- None.

## Verification

- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6210 --ci` first failed with unrelated
      Angular/Babel cache `ENOENT` errors while compiling clipboard and accordion modules. After recreating
      `packages/angular/.angular/cache/21.2.11/babel-webpack`,
      `bun run --cwd packages/angular storybook -- --port 6211 --ci` reached `Storybook ready!` at
      `http://localhost:6211/`; stopped after startup. Existing warnings only: unused TypeScript compilation entries and
      `DefinePlugin` `process.env.NODE_ENV` conflict.
- [ ] Visual check of each story: not performed; browser side-by-side tooling was not available in this run.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/download-trigger/download-trigger.spec.ts`
      passed, 1 file / 9 tests.
- [x] Angular typecheck: `bun run --cwd packages/angular typecheck` passed, including production build and
      `forms isolation: ok`.
- [x] Formatting:
      `bun prettier --write packages/angular/src/download-trigger/download-trigger-example-styles.ts     docs/story-audit/download-trigger.md`
      formatted the audit file; style file was unchanged.
- [x] Whitespace check: `git diff --check` passed. Scoped
      `git diff --check -- packages/angular/src/download-trigger/download-trigger-example-styles.ts` passed. Ignored
      audit doc check `git diff --no-index --check /dev/null docs/story-audit/download-trigger.md` emitted no whitespace
      warnings.

## Commit

- Hash: See this audit's commit in git history.
- Message: `fix(angular): align download-trigger story with react parity`
