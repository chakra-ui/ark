# Format Angular Story Parity Audit

## Scope

- Angular story: `packages/angular/src/format/format.stories.ts`
- Angular examples: `packages/angular/src/format/examples/*.ts`
- Angular styles: `packages/angular/src/format/format-example-styles.ts`
- React story: `packages/react/src/components/format/format.stories.tsx`
- React examples: `packages/react/src/components/format/examples/*.tsx`
- React styles: `.storybook/modules/format.module.css`

## Summary

- Status: Storybook surface already matches React. No Angular story or example code changes were required.
- Highest-risk gaps: None identified. Locale-provider examples differ structurally because Angular uses DI providers on
  standalone example components while React nests `LocaleProvider`, but the visible Storybook output and locale data
  match.

## Story Inventory

| Story name             | React | Angular | Notes                                                                                                |
| ---------------------- | ----- | ------- | ---------------------------------------------------------------------------------------------------- |
| `ByteBasic`            | Yes   | Yes     | Same order, value, label, and styling classes.                                                       |
| `ByteSizes`            | Yes   | Yes     | Same four byte sizes: `50`, `5000`, `5000000`, `5000000000`.                                         |
| `ByteWithLocale`       | Yes   | Yes     | Same `de-DE` and `zh-CN` locales. Angular uses nested standalone components with `provideArkLocale`. |
| `ByteWithUnit`         | Yes   | Yes     | Same value `1450.45` and `unit="bit"`.                                                               |
| `ByteWithUnitDisplay`  | Yes   | Yes     | Same unit displays: `narrow`, `short`, `long`.                                                       |
| `ByteWithUnitSystem`   | Yes   | Yes     | Same decimal and binary examples for value `1024`.                                                   |
| `NumberBasic`          | Yes   | Yes     | Same value `1450.45`.                                                                                |
| `NumberWithCompact`    | Yes   | Yes     | Same value `1500000`, compact notation, short compact display, and caption.                          |
| `NumberWithCurrency`   | Yes   | Yes     | Same value `1234.45`, currency style, and `USD`.                                                     |
| `NumberWithLocale`     | Yes   | Yes     | Same `de-DE` locale and value `1450.45`.                                                             |
| `NumberWithPercentage` | Yes   | Yes     | Same `0.145` value and two fraction digits.                                                          |
| `NumberWithUnit`       | Yes   | Yes     | Same `384.4` kilometer unit example.                                                                 |
| `RelativeTimeBasic`    | Yes   | Yes     | Same fixed date `2025-05-05`.                                                                        |
| `RelativeTimeShort`    | Yes   | Yes     | Same fixed date and short style.                                                                     |
| `TimeBasic`            | Yes   | Yes     | Same `"18:47:12"` value and `12h` format.                                                            |
| `TimeWithAmPmLabels`   | Yes   | Yes     | Same `"17:15:00"` value and custom labels.                                                           |
| `TimeWithDate`         | Yes   | Yes     | Same `new Date(2026, 1, 27, 18, 45, 34)` value.                                                      |
| `TimeWithLocale`       | Yes   | Yes     | Same `ar-EG` locale, `"13:05"` value, and `12h` format.                                              |
| `TimeWithSeconds`      | Yes   | Yes     | Same `"03:07:19"` value and seconds enabled.                                                         |

## Example Data Sources

| Example                | Data origin                   | Shape                                      | Dynamic/async | Divergence                                                                                                              |
| ---------------------- | ----------------------------- | ------------------------------------------ | ------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `ByteBasic`            | Inline literal                | Number value `120000`                      | Static        | None.                                                                                                                   |
| `ByteSizes`            | Local array                   | Four numeric byte values                   | Static        | Angular stores the same values as a readonly class property for template iteration.                                     |
| `ByteWithLocale`       | Local locale list / providers | Two locale examples with value `1450.45`   | Static        | Angular uses one provider-backed child component per locale instead of React's mapped `LocaleProvider`; output matches. |
| `ByteWithUnit`         | Inline literal                | Number value plus `unit="bit"`             | Static        | None.                                                                                                                   |
| `ByteWithUnitDisplay`  | Local array                   | Three `unitDisplay` strings                | Static        | Angular stores the same values as a readonly class property for template iteration.                                     |
| `ByteWithUnitSystem`   | Inline literals               | Decimal and binary rows for `1024`         | Static        | None.                                                                                                                   |
| `NumberBasic`          | Inline literal                | Number value `1450.45`                     | Static        | None.                                                                                                                   |
| `NumberWithCompact`    | Inline literal                | Number value plus compact options          | Static        | None.                                                                                                                   |
| `NumberWithCurrency`   | Inline literal                | Number value plus currency options         | Static        | None.                                                                                                                   |
| `NumberWithLocale`     | Locale provider               | `de-DE` provider with number value         | Static        | Angular uses `provideArkLocale`; React uses `LocaleProvider`.                                                           |
| `NumberWithPercentage` | Inline literal                | Number value plus percent/fraction options | Static        | None.                                                                                                                   |
| `NumberWithUnit`       | Inline literal                | Number value plus unit options             | Static        | None.                                                                                                                   |
| `RelativeTimeBasic`    | Fixed `Date`                  | `new Date('2025-05-05')`                   | Static        | Angular stores the same date as a readonly class property.                                                              |
| `RelativeTimeShort`    | Fixed `Date`                  | `new Date('2025-05-05')` with short style  | Static        | Angular stores the same date as a readonly class property.                                                              |
| `TimeBasic`            | Inline literal                | Time string and `12h` format               | Static        | None.                                                                                                                   |
| `TimeWithAmPmLabels`   | Inline literal                | Time string plus AM/PM labels              | Static        | None.                                                                                                                   |
| `TimeWithDate`         | Fixed `Date`                  | `new Date(2026, 1, 27, 18, 45, 34)`        | Static        | Angular stores the same date as a readonly class property.                                                              |
| `TimeWithLocale`       | Locale provider               | `ar-EG` provider with time string          | Static        | Angular uses `provideArkLocale`; React uses `LocaleProvider`.                                                           |
| `TimeWithSeconds`      | Inline literal                | Time string, `12h` format, seconds enabled | Static        | None.                                                                                                                   |

## Sections / Structure

- Meta differences: Both stories use `title: 'Utilities / Format'`. Neither story defines `parameters`, `decorators`,
  `argTypes`, `args`, or `tags` at the meta level.
- Decorator differences: React re-exports function examples directly. Angular story exports use
  `moduleMetadata({ imports: [...] })` and a simple render template per standalone example component, matching local
  Angular story conventions.
- Per-story decorators / args / controls: No React story defines args, controls, or per-story parameters. Angular does
  not define story args or controls either.

## Styling

| Element        | React selector / class | Angular selector / class              | Gap  | Fix        |
| -------------- | ---------------------- | ------------------------------------- | ---- | ---------- |
| Root layout    | `.Root`                | `.Root` in `format-example-styles.ts` | None | No change. |
| Label text     | `.Label`               | `.Label`                              | None | No change. |
| Standard value | `.Value`               | `.Value`                              | None | No change. |
| Large value    | `.ValueLarge`          | `.ValueLarge`                         | None | No change. |
| Vertical list  | `.List`                | `.List`                               | None | No change. |
| List item      | `.ListItem`            | `.ListItem`                           | None | No change. |
| Inline layout  | `.Inline`              | `.Inline`                             | None | No change. |
| Inline label   | `.InlineLabel`         | `.InlineLabel`                        | None | No change. |
| Inline value   | `.InlineValue`         | `.InlineValue`                        | None | No change. |

## Gap Matrix

| Area                      | Gap                                     | React reference                         | Angular location                                                  | Fix                                                  |
| ------------------------- | --------------------------------------- | --------------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------- |
| Story inventory           | None                                    | `format.stories.tsx` exports 19 stories | `format.stories.ts` exports the same 19 stories in the same order | No change.                                           |
| Example data              | None                                    | React `examples/*.tsx`                  | Angular `examples/*.ts`                                           | No change.                                           |
| Styling                   | None                                    | `.storybook/modules/format.module.css`  | `format-example-styles.ts`                                        | No change.                                           |
| Locale provider structure | Framework-specific implementation shape | React `LocaleProvider` wrappers         | Angular `provideArkLocale` providers                              | No change; visible output and locale behavior match. |

## Implementation Plan

1. Confirm Angular story inventory, order, meta, decorators, and render strategy against React.
2. Compare each React and Angular example for values, option names, locale behavior, fixed dates, and generated/static
   data.
3. Compare React CSS module selectors against Angular shared example styles.
4. Record audit and verification results without changing story code because parity already holds.

## Deferred (component-level work)

- None.

## Verification

- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6212 --ci` reached Storybook ready at
      `http://localhost:6212/`; stopped after startup with Ctrl-C. Existing warnings only: unused TypeScript compilation
      entries and `DefinePlugin` `process.env.NODE_ENV` conflict.
- [ ] Visual check of each story: Not performed; audit was source-level plus Storybook compile/startup verification.
- [x] Story-related specs: `bun run --cwd packages/angular test:ci src/format/format.spec.ts` passed, 1 file / 12 tests.
- [x] Typecheck: `bun run --cwd packages/angular typecheck` passed, including production build and
      `forms isolation: ok`.
- [x] Whitespace: `bun prettier --check docs/story-audit/format.md` passed; `git diff --check` passed; ignored audit doc
      no-index whitespace check emitted no warnings.

## Commit

- Hash: See this audit's commit in git history.
- Message: `docs(angular): audit format story parity`
