import { TestBed } from '@angular/core/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { DEFAULT_LOCALE, getCollator, getDateFormatter, getFilter, injectArkLocale, provideArkLocale } from './locale'

describe('provideArkLocale / injectArkLocale', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('returns DEFAULT_LOCALE and ltr direction when no provider is configured', () => {
    TestBed.configureTestingModule({ providers: [] })
    const ctx = TestBed.runInInjectionContext(() => injectArkLocale())
    expect(ctx.locale).toBe(DEFAULT_LOCALE)
    expect(ctx.dir).toBe('ltr')
  })

  it('computes rtl direction for RTL locales', () => {
    TestBed.configureTestingModule({ providers: [provideArkLocale({ locale: 'ar-EG' })] })
    const ctx = TestBed.runInInjectionContext(() => injectArkLocale())
    expect(ctx.locale).toBe('ar-EG')
    expect(ctx.dir).toBe('rtl')
  })

  it('uses the provided locale and infers ltr for non-RTL locales', () => {
    TestBed.configureTestingModule({ providers: [provideArkLocale({ locale: 'fr-FR' })] })
    const ctx = TestBed.runInInjectionContext(() => injectArkLocale())
    expect(ctx.locale).toBe('fr-FR')
    expect(ctx.dir).toBe('ltr')
  })
})

describe('getCollator', () => {
  it('returns an Intl.Collator that orders strings deterministically', () => {
    const collator = getCollator('en-US')
    expect(collator.compare('a', 'b')).toBeLessThan(0)
  })
})

describe('getDateFormatter', () => {
  it('formats the year deterministically', () => {
    const formatter = getDateFormatter('en-US', { year: 'numeric', timeZone: 'UTC' })
    expect(formatter.format(new Date('2024-01-01T00:00:00Z'))).toContain('2024')
  })
})

describe('getFilter', () => {
  it('matches contains case-insensitively', () => {
    expect(getFilter('en-US').contains('Hello World', 'hello')).toBe(true)
  })

  it('matches startsWith deterministically', () => {
    const filter = getFilter('en-US')
    expect(filter.startsWith('Hello World', 'hello')).toBe(true)
    expect(filter.startsWith('Hello World', 'World')).toBe(false)
  })

  it('matches endsWith deterministically', () => {
    const filter = getFilter('en-US')
    expect(filter.endsWith('Hello World', 'world')).toBe(true)
    expect(filter.endsWith('Hello World', 'Hello')).toBe(false)
  })
})
