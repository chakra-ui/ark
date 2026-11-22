import { mount as ByteSizes } from '../examples/byte-sizes.js'
import { mount as ByteWithLocale } from '../examples/byte-with-locale.js'
import { mount as NumberWithCurrency } from '../examples/number-with-currency.js'
import { mount as NumberWithLocale } from '../examples/number-with-locale.js'
import { mount as NumberWithPercentage } from '../examples/number-with-percentage.js'
import { mount as TimeWithAmPmLabels } from '../examples/time-with-am-pm-labels.js'
import { mount as TimeWithDate } from '../examples/time-with-date.js'
import { mount } from '../../../test-utils.js'

import '@ark-ui/web/format'

const texts = (selector: string) => Array.from(document.querySelectorAll(selector), (el) => el.textContent)

test('a number renders with the options from its attributes', () => {
  mount(NumberWithCurrency)

  expect(texts('ark-format-number')).toEqual(['$1,234.45'])
})

test('fraction digit attributes are read as numbers', () => {
  mount(NumberWithPercentage)

  expect(texts('ark-format-number')).toEqual(['14.50%'])
})

test('the locale comes from the closest lang attribute', () => {
  mount(NumberWithLocale)

  expect(texts('ark-format-number')).toEqual(['1.450,45'])
})

test('byte sizes pick a unit for each value', () => {
  mount(ByteSizes)

  expect(texts('ark-format-byte')).toEqual(['50 byte', '5 kB', '5 MB', '5 GB'])
})

test('each byte value follows the language around it', () => {
  mount(ByteWithLocale)

  expect(texts('ark-format-byte')).toEqual(['1,45 kB', '1.45 kB'])
})

test('a time uses custom am and pm labels', () => {
  mount(TimeWithAmPmLabels)

  expect(document.querySelector('ark-format-time')).toHaveTextContent('5:15 evening')
})

test('a time accepts a full date', () => {
  mount(TimeWithDate)

  expect(texts('ark-format-time')).toEqual(['18:45'])
})

test('the value, options and locale can be changed after render', () => {
  document.body.innerHTML = /* html */ `<ark-format-number value="1450.45"></ark-format-number>`
  const number = document.querySelector('ark-format-number')!

  number.value = 2000

  expect(number).toHaveTextContent('2,000')

  number.options = { style: 'currency', currency: 'EUR' }

  expect(number).toHaveTextContent('€2,000.00')

  number.locale = 'de-DE'

  expect(number).toHaveTextContent('2.000,00 €')
})

test('a relative time reads its value as a date', () => {
  vi.useFakeTimers({ now: new Date('2026-01-10T00:00:00Z') })
  document.body.innerHTML = /* html */ `<ark-format-relative-time value="2026-01-05T00:00:00Z" numeric="auto"></ark-format-relative-time>`

  expect(document.querySelector('ark-format-relative-time')).toHaveTextContent('5 days ago')

  vi.useRealTimers()
})
