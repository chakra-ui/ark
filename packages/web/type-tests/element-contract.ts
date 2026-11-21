import type { SelectEventMap } from '../src/components/select/index.js'
import '../src/index.js'

declare function expectType<T>(value: T): void

const select = document.querySelector('ark-select')!
select.addEventListener('valuechange', (event) => {
  expectType<string[]>(event.detail.value)
  expectType<SelectEventMap['valuechange']>(event)
  // @ts-expect-error Select values are arrays, not booleans.
  expectType<boolean>(event.detail.value)
  // @ts-expect-error Select change details have no checked state.
  event.detail.checked
})
select.addEventListener('itemselect', (event) => {
  expectType<string>(event.detail.value)
})
select.addEventListener('click', (event) => expectType<number>(event.clientX))
const listener = (event: SelectEventMap['valuechange']) => expectType<string[]>(event.detail.value)
select.addEventListener('valuechange', listener)
select.removeEventListener('valuechange', listener)
// @ts-expect-error Notifications are events, not function properties.
select.onValueChange = () => {}

const checkbox = document.querySelector('ark-checkbox')!
checkbox.addEventListener('checkedchange', (event) => expectType<boolean | 'indeterminate'>(event.detail.checked))
const group = document.querySelector('ark-checkbox-group')!
group.addEventListener('valuechange', (event) => expectType<string[]>(event.detail.value))

const picker = document.querySelector('ark-date-picker')!
picker.isDateUnavailable = (date, locale) => date.day === 1 && locale === 'en-US'
picker.format = (date) => String(date.day)
picker.isDateUnavailable = undefined
// @ts-expect-error A date predicate must return a boolean.
picker.isDateUnavailable = () => 'unavailable'
// @ts-expect-error Formatters are synchronous string producers.
picker.format = async () => '2026-12-25'
picker.addEventListener('openchange', (event) => expectType<boolean>(event.detail.open))
document.querySelector('ark-dialog')!.addEventListener('escapekeydown', (event) => expectType<string>(event.detail.key))

const tree = document.querySelector('ark-tree-view')!
tree.onBeforeRename = ({ value }) => value.trim().length > 0
tree.loadChildren = async () => [{ value: 'child', label: 'Child', disabled: false }]
// @ts-expect-error Async loaders must return a promise.
tree.loadChildren = () => []
tree.addEventListener('loadchildrencomplete', (event) => expectType<object>(event.detail.collection))

const files = document.querySelector('ark-file-upload')!
files.validate = () => null
files.transformFiles = async (value) => value
// @ts-expect-error File validation returns errors or null, not a boolean.
files.validate = () => true

const pagination = document.querySelector('ark-pagination')!
pagination.getPageUrl = ({ page }) => `/page/${page}`
const slider = document.querySelector('ark-slider')!
slider.getAriaLabel = ({ index }) => `Value ${index + 1}`
