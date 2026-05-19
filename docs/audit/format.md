# Format Angular Parity Audit

## Scope
- Angular files: `packages/angular/src/format/format-byte.ts`, `packages/angular/src/format/format-number.ts`, `packages/angular/src/format/format-relative-time.ts`, `packages/angular/src/format/format-time.ts`, `packages/angular/src/format/format.ts`, `packages/angular/src/format/public-api.ts`, `packages/angular/src/format/format.stories.ts`, `packages/angular/src/format/format-example-styles.ts`, `packages/angular/src/format/examples/*`, `packages/angular/src/format/format.spec.ts`.
- React files: `packages/react/src/components/format/format-byte.tsx`, `packages/react/src/components/format/format-number.tsx`, `packages/react/src/components/format/format-relative-time.tsx`, `packages/react/src/components/format/format-time.tsx`, `packages/react/src/components/format/format.ts`, `packages/react/src/components/format/index.ts`, `packages/react/src/components/format/format.stories.tsx`, `packages/react/src/components/format/examples/*`.
- Storybook/style files: `.storybook/modules/format.module.css`, `packages/angular/src/format/format-example-styles.ts`.

## Summary
- Status: Re-audit confirms parity. Story inventory, example structure, demo CSS class application, and provider-based locale path all match React. Implementation deviations are intentional Angular conveniences and explicitly retained.
- Highest-risk gaps: None blocking. Two Angular-only API extensions remain by design (per `docs/technical-requirements.md` allowance for Angular-idiomatic surfaces): an optional `locale` input on every format component and a legacy `value: number + unit` form on `ark-format-relative-time`.

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Storybook styling | Examples must reuse the React module CSS classes (`Root`, `Label`, `Value`, `ValueLarge`, `List`, `ListItem`, `Inline`, `InlineLabel`, `InlineValue`). | `.storybook/modules/format.module.css`, `packages/react/src/components/format/examples/*` | `packages/angular/src/format/examples/*`, `format-example-styles.ts` | Closed in prior pass (commit `d3fb379f3`): every Angular example imports `formatExampleStyles` and applies matching class names. Verified again. |
| Story parity | Locale examples must demonstrate the provider path (`LocaleProvider` in React). | `byte-with-locale.tsx`, `number-with-locale.tsx`, `time-with-locale.tsx` | `examples/byte-with-locale.ts`, `examples/number-with-locale.ts`, `examples/time-with-locale.ts` | Closed: `byte-with-locale` composes two child components, each scoped with `provideArkLocale`. `number-with-locale` and `time-with-locale` apply `provideArkLocale` at the example component. |
| Story parity | Same story inventory: 19 stories across Byte, Number, RelativeTime, Time. | `format.stories.tsx` | `format.stories.ts` | Match: both export `ByteBasic`, `ByteSizes`, `ByteWithLocale`, `ByteWithUnit`, `ByteWithUnitDisplay`, `ByteWithUnitSystem`, `NumberBasic`, `NumberWithCompact`, `NumberWithCurrency`, `NumberWithLocale`, `NumberWithPercentage`, `NumberWithUnit`, `RelativeTimeBasic`, `RelativeTimeShort`, `TimeBasic`, `TimeWithAmPmLabels`, `TimeWithDate`, `TimeWithLocale`, `TimeWithSeconds`. |
| Public API | Angular adds optional `locale` input on every format component (`FormatByteProps`, `FormatNumberProps`, `FormatRelativeTimeProps`, `FormatTimeProps`); React relies on locale context only. | `packages/react/src/components/format/format-*.tsx` | `packages/angular/src/format/format-*.ts` | No change: documented as an Angular convenience override. Provider locale still applies when input is omitted; tests cover both paths and override precedence. |
| Public API | Angular `ArkFormatRelativeTimeComponent` accepts `value: Date \| number` with a separate `unit` input; React limits `value` to `Date`. | `format-relative-time.tsx` | `format-relative-time.ts`, `format.spec.ts` | No change: Date path is the documented parity surface. The legacy numeric form is retained for compatibility and covered by spec. |
| Public API | Module namespace alias: React exports `Format.Byte`/`Format.Number`/`Format.RelativeTime`/`Format.Time` via `format.ts`. Angular `format.ts` re-exports the component classes from individual files. | `packages/react/src/components/format/format.ts` | `packages/angular/src/format/format.ts`, `public-api.ts` | No change: Angular uses directive-centric public API per `docs/technical-requirements.md`. Consumers import `ArkFormatByteComponent` etc.; namespace aliasing is not idiomatic Angular. |
| Functionality | `formatBytes`, `formatNumber`, `formatTime`, `formatRelativeTime` from `@zag-js/i18n-utils` drive both implementations. | React `useMemo` branches | Angular `computed` branches | Match. Both pass identical option shapes; tests assert deterministic output for every story. |
| Accessibility | Format renders text only — no roles, ARIA, focus, or keyboard paths. | `packages/react/src/components/format/*` | `packages/angular/src/format/*` | No change. Host elements use `display: contents` so wrapping spans control inline/block presentation. |
| Tests | Component tests cover provider locale, direct locale override, override precedence, options merging, non-finite numbers, all current story outputs, and legacy numeric relative time. React has no component-level format tests. | None | `packages/angular/src/format/format.spec.ts` | Keep current spec (12 tests, 1 file). |

## Implementation Plan
1. Re-audit only. No code changes required.
2. Run `bun run --cwd packages/angular test:ci src/format/format.spec.ts`.
3. Run `bun run --cwd packages/angular typecheck`.
4. Run `git diff --check`.
5. Update audit verification checklist and commit.

## Verification
- [x] Typecheck/build: `bun run --cwd packages/angular typecheck` passed end-to-end; full ng-packagr build emitted `dist/` and `forms isolation: ok`.
- [x] Component tests: `bun run --cwd packages/angular test:ci src/format/format.spec.ts` passed — 1 file, 12 tests.
- [x] Storybook render: not re-executed in this re-audit pass; prior pass (commit `d3fb379f3`) confirmed `bun run --cwd packages/angular storybook --ci --smoke-test --port 9010` succeeded with only pre-existing unrelated warnings. Story inventory unchanged since.
- [x] Manual/visual checks: Re-compared every Angular example to its React counterpart and to `.storybook/modules/format.module.css`. Class names, wrapper structure, label/value text, locale wiring, and option props match.
- [x] Diff hygiene: `git diff --check` passed (no whitespace errors introduced; only `docs/audit/format.md` modified in this pass).

## Commit
- Hash: `d3fb379f3` (initial parity work). Re-audit commit appended below.
- Message: `fix(angular): align format examples with react parity` (initial); `fix(angular): align format with react parity` (re-audit, audit doc only).
