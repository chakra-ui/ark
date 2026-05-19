# Format Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/format/format-byte.ts`, `packages/angular/src/format/format-number.ts`, `packages/angular/src/format/format-relative-time.ts`, `packages/angular/src/format/format-time.ts`, `packages/angular/src/format/format.stories.ts`, `packages/angular/src/format/examples/*`, `packages/angular/src/format/format.spec.ts`, `packages/angular/src/format/public-api.ts`.
- React files: `packages/react/src/components/format/format-byte.tsx`, `packages/react/src/components/format/format-number.tsx`, `packages/react/src/components/format/format-relative-time.tsx`, `packages/react/src/components/format/format-time.tsx`, `packages/react/src/components/format/format.stories.tsx`, `packages/react/src/components/format/examples/*`.
- Storybook/style files: `.storybook/modules/format.module.css`, `packages/angular/src/format/examples/*`.

## Summary
- Status: Angular formatting behavior and story inventory are close to React, with Storybook presentation gaps to fix.
- Highest-risk gaps: Angular examples do not apply the React `format.module.css` visual classes, so typography, spacing, and tabular number styling drift in Storybook. Locale examples use Angular-only `locale` inputs rather than demonstrating the same provider-based locale path as React.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Storybook styling | Angular examples render plain wrappers without the `Root`, `Label`, `Value`, `ValueLarge`, `List`, `ListItem`, `Inline`, `InlineLabel`, and `InlineValue` styles used by React. | `.storybook/modules/format.module.css`, `packages/react/src/components/format/examples/*` | `packages/angular/src/format/examples/*` | Add Angular example styles matching the React module and apply the same classes in every example. |
| Story parity | Locale stories in React use `LocaleProvider`; Angular stories use direct `locale` inputs for byte/number/time examples. | `byte-with-locale.tsx`, `number-with-locale.tsx`, `time-with-locale.tsx` | `packages/angular/src/format/examples/*with-locale.ts` | Use `provideArkLocale` in the Angular locale examples so Storybook exercises the provider path. |
| Public API | Angular keeps an extra optional `locale` input on format components, while React relies on locale context. | `packages/react/src/components/format/format-*.tsx` | `packages/angular/src/format/format-*.ts` | No change: keep the existing Angular convenience override because provider locale remains supported and covered by tests. |
| Functionality | Relative time accepts `Date` in React; Angular additionally accepts legacy numeric value plus `unit`. | `format-relative-time.tsx` | `format-relative-time.ts`, `format.spec.ts` | No change: existing Angular extension is covered and does not block React-compatible Date usage. |
| Accessibility | Format renders text only and has no interactive roles or keyboard paths. | `packages/react/src/components/format/*` | `packages/angular/src/format/*` | No change. |
| Tests | Component tests cover provider locale, direct locale override, options merging, non-finite numbers, all current story outputs, and legacy numeric relative time. | No React format tests found in component folder. | `packages/angular/src/format/format.spec.ts` | Keep focused tests; run component spec and typecheck after story/style changes. |

## Implementation Plan
1. Add a `formatExampleStyles` helper matching `.storybook/modules/format.module.css`.
2. Apply matching classes to every Angular format example.
3. Update locale examples to use `provideArkLocale` for provider parity.
4. Run format specs, Angular typecheck, and `git diff --check`.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed; includes `tsc -p tsconfig.json --noEmit`, `tsc -p tsconfig.spec.json --noEmit`, production package build, and `forms isolation: ok`.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/format/format.spec.ts` passed with 1 file and 12 tests.
- [x] Storybook render: `bun run --cwd packages/angular storybook --ci --smoke-test --port 9010` passed after switching the format locale examples to a relative locale-provider import. The smoke-test still prints existing unused-compilation warnings and a `DefinePlugin` `process.env.NODE_ENV` warning.
- [x] Manual/visual checks: Compared React format examples and `.storybook/modules/format.module.css` against the Angular templates. Angular examples now use the same demo class structure and provider-based locale path where React uses `LocaleProvider`.
- [x] Diff hygiene: `git diff --check` passed.

## Commit
- Hash: `6efeba5d4`
- Message: `fix(angular): align format examples with react parity`
