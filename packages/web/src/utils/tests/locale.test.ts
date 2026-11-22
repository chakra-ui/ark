import { createCollator, createDateFormatter, createFilter, getLocale } from '@ark-ui/web/locale'

import { mount as Basic } from '../../providers/locale/examples/basic.js'
import { mount } from '../../test-utils.js'

afterEach(() => {
  document.documentElement.removeAttribute('lang')
  document.documentElement.removeAttribute('dir')
})

test('getLocale reads the closest lang and dir', () => {
  document.body.innerHTML = /* html */ `
    <section lang="de-DE" dir="rtl"><p lang="ar-BH"><span id="target"></span></p></section>`

  expect(getLocale(document.getElementById('target'))).toEqual({ locale: 'ar-BH', dir: 'rtl' })
})

test('getLocale derives the direction from the locale when no dir is set', () => {
  document.body.innerHTML = /* html */ `<p lang="he-IL"><span id="target"></span></p>`

  expect(getLocale(document.getElementById('target'))).toEqual({ locale: 'he-IL', dir: 'rtl' })
})

test('getLocale without an element reads the document and falls back to the default locale', () => {
  expect(getLocale()).toEqual({ locale: navigator.language, dir: 'ltr' })

  document.documentElement.lang = 'fr-FR'
  expect(getLocale()).toEqual({ locale: 'fr-FR', dir: 'ltr' })
})

test('createDateFormatter formats with the given locale and options', () => {
  const formatter = createDateFormatter({ locale: 'de-DE', dateStyle: 'long', timeZone: 'UTC' })

  expect(formatter.format(new Date(Date.UTC(2025, 0, 15)))).toBe('15. Januar 2025')
  expect(formatter.resolvedOptions().locale).toBe('de-DE')
})

test('the create helpers default to the document locale', () => {
  document.documentElement.lang = 'de-DE'

  expect(createDateFormatter().resolvedOptions().locale).toBe('de-DE')
  expect(createCollator().resolvedOptions().locale).toMatch(/^de/)
})

test('createCollator and createFilter take an element locale', () => {
  document.body.innerHTML = /* html */ `<p lang="sv-SE"><span id="target"></span></p>`
  const { locale } = getLocale(document.getElementById('target'))

  expect(['z', 'ä'].sort(createCollator({ locale }).compare)).toEqual(['z', 'ä'])
  expect(createFilter({ locale, sensitivity: 'base' }).contains('Äpple', 'ap')).toBe(false)
  expect(createFilter({ locale: 'en-US', sensitivity: 'base' }).contains('Äpple', 'ap')).toBe(true)
})

test('the locale example shows the locale and direction of its container', () => {
  mount(Basic)

  expect(JSON.parse(document.querySelector('pre')!.textContent!)).toEqual({ locale: 'ar-BH', dir: 'rtl' })
})
