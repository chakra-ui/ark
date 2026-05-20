# PinInput Angular Story Parity Audit

## Scope
- Angular story: `packages/angular/pin-input/pin-input.stories.ts`
- Angular examples: `packages/angular/pin-input/examples/basic.ts`, `blur-on-complete.ts`, `custom-placeholder.ts`, `otp.ts`, `root-provider.ts`, `with-field.ts`, `mask.ts`
- Angular styles: `packages/angular/pin-input/pin-input-example-styles.ts`
- React story: `packages/react/src/components/pin-input/pin-input.stories.tsx`
- React examples: `packages/react/src/components/pin-input/examples/basic.tsx`, `blur-on-complete.tsx`, `custom-placeholder.tsx`, `otp-mode.tsx`, `root-provider.tsx`, `with-field.tsx`, `mask.tsx`
- React styles: `.storybook/modules/pin-input.module.css`, `.storybook/modules/field.module.css`, `.storybook/modules/utilities.css`

## Summary
- Status: Fixed story inventory/order and focused example styling/content gaps so the Angular Storybook surface matches React.
- Highest-risk gaps: `WithField` previously rendered an invalid field and different copy, while the shared Angular pin-input styles did not include the field root/helper/error selectors used by the composed story.

## Story Inventory
| Story name | React | Angular | Notes |
| --- | --- | --- | --- |
| `Basic` | Yes, first | Yes, first | No change. |
| `BlurOnComplete` | Yes, second | Yes, second | No change. |
| `CustomPlaceholder` | Yes, third | Yes, third | No change. |
| `OTPMode` | Yes, fourth | Yes, fourth | No change. Angular example file is named `otp.ts`; story export matches React. |
| `RootProvider` | Yes, fifth | Yes, fifth | Reordered from last to fifth. |
| `WithField` | Yes, sixth | Yes, sixth | Reordered and content aligned. |
| `Mask` | Yes, seventh | Yes, seventh | Reordered from before `WithField` to last. |
| `Controlled` | No | Removed from story exports | Angular-only story export removed to match React. Existing local example file remains unused by the story. |

## Example Data Sources
| Example | Data origin | Shape | Dynamic/async | Divergence |
| --- | --- | --- | --- | --- |
| `Basic` | Hard-coded three input slots in each framework | Three indexed pin slots: `0`, `1`, `2` | None | Angular writes explicit inputs instead of React mapping `[0, 1, 2]`; rendered shape matches. |
| `BlurOnComplete` | Hard-coded three input slots with `blurOnComplete` | Three indexed pin slots | Blur behavior comes from the primitive | No change. |
| `CustomPlaceholder` | Hard-coded placeholder prop | Three indexed pin slots with `placeholder="*"` | None | No change. |
| `OTPMode` | Hard-coded `otp` prop | Three indexed pin slots | Browser autocomplete behavior comes from the primitive | No change. |
| `RootProvider` | `usePinInput` primitive hook | Three indexed pin slots plus a focus button | `onValueComplete` alerts `valueAsString` | Angular calls `pinInput.api().focus()` while React calls `pinInput.focus()`; framework API shape differs, rendered behavior matches. |
| `WithField` | Hard-coded field wrapper and helper/error text | Field root containing pin input plus helper/error text | Error text is hidden unless invalid | Fixed Angular to remove invalid state and use React copy. |
| `Mask` | Hard-coded `mask` prop | Three indexed pin slots | Mask behavior comes from the primitive | No change. |

## Sections / Structure
- Meta differences: Both stories use `title: 'Components / PinInput'` with no parameters, decorators, argTypes, args, or tags.
- Decorator differences: React re-exports function examples directly. Angular uses per-story `moduleMetadata` imports and render templates for standalone examples, consistent with neighboring Angular stories.
- Per-story decorators / args / controls: No story args or controls in either stack. Angular story exports now match React order: `Basic`, `BlurOnComplete`, `CustomPlaceholder`, `OTPMode`, `RootProvider`, `WithField`, `Mask`.

## Styling
| Element | React selector / class | Angular selector / class | Gap | Fix |
| --- | --- | --- | --- | --- |
| Pin input root | `styles.Root` / `.Root` | `[arkPinInputRoot], [arkPinInputRootProvider]` | Already visually aligned. | No change. |
| Label | `styles.Label` / `.Label` | `[arkPinInputLabel]` | Already visually aligned. | No change. |
| Control | `styles.Control` / `.Control` | `[arkPinInputControl]` | Already visually aligned. | No change. |
| Input | `styles.Input` / `.Input` | `[arkPinInputInput]` | Already visually aligned, with Angular fallbacks for demo tokens. | No change. |
| Field root | `fieldStyles.Root` / `.Root` | `[arkFieldRoot]` | Missing Angular field wrapper styling. | Added field root styles matching React field module. |
| Helper text | `fieldStyles.HelperText` / `.HelperText` | `[arkFieldHelperText]` | Missing Angular helper text styling. | Added helper text typography/color. |
| Error text | `fieldStyles.ErrorText` / `.ErrorText` | `[arkFieldErrorText]` | Missing Angular error text styling. | Added error text typography/color. |
| RootProvider layout | Global `.stack` | Global `.stack` | Shared global utility applies to both. | No change. |

## Gap Matrix
| Area | Gap | React reference | Angular location | Fix |
| --- | --- | --- | --- | --- |
| Story inventory | Angular exposed an extra `Controlled` story. | `pin-input.stories.tsx` exports seven stories and no `Controlled`. | `packages/angular/pin-input/pin-input.stories.ts` | Removed the `Controlled` story export/import from Storybook. |
| Story order | `RootProvider`, `WithField`, and `Mask` order differed. | React order is `RootProvider`, `WithField`, `Mask`. | `packages/angular/pin-input/pin-input.stories.ts` | Reordered exports to match React. |
| WithField state | Angular rendered invalid state by default. | React `Field.Root` has no `invalid` prop. | `packages/angular/pin-input/examples/with-field.ts` | Removed `[invalid]="true"`. |
| WithField copy | Angular label/helper/error copy differed in label and capitalization. | React uses `Label`, `Additional Info`, `Error Info`. | `packages/angular/pin-input/examples/with-field.ts` | Updated copy to match React. |
| WithField styling | Angular did not style field root/helper/error selectors in pin-input examples. | `.storybook/modules/field.module.css` | `packages/angular/pin-input/pin-input-example-styles.ts` | Added field root/helper/error styles. |

## Implementation Plan
1. Remove Angular-only `Controlled` from the public story exports while leaving unrelated local files untouched.
2. Reorder Angular story exports to React order.
3. Align `WithField` example state and copy with React.
4. Add missing field selectors to the Angular pin-input example styles.
5. Run focused tests, typecheck, Storybook startup, and `git diff --check`.

## Deferred (component-level work)
- None.

## Verification
- [x] Story-related specs: `bun run --cwd packages/angular test:ci pin-input/pin-input.spec.ts` passed.
- [x] Angular package typecheck: `bun run --cwd packages/angular typecheck` passed, including production build and forms isolation.
- [x] Storybook startup: `bun run --cwd packages/angular storybook -- --port 6011 --ci` served Storybook successfully; `curl -I --max-time 2 http://localhost:6011/` returned `HTTP/1.1 200 OK`. The Storybook process was stopped after verification.
- [ ] Visual check of each story: Not completed with browser side-by-side inspection in this subagent run.
- [x] Whitespace: `git diff --check -- packages/angular/pin-input/pin-input.stories.ts packages/angular/pin-input/examples/with-field.ts packages/angular/pin-input/pin-input-example-styles.ts` passed; `git diff --no-index --check /dev/null docs/story-audit/pin-input.md` produced no whitespace-error output.

## Commit
- Hash: See this audit's commit in git history.
- Message: `fix(angular): align pin-input story with react parity`
