import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { formatBytes, formatRelativeTime, formatTime } from '@zag-js/i18n-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import { provideArkLocale } from '../providers/locale/locale'
import { ArkFormatByteComponent } from './format-byte'
import { ArkFormatNumberComponent } from './format-number'
import { ArkFormatRelativeTimeComponent } from './format-relative-time'
import { ArkFormatTimeComponent } from './format-time'

@Component({
  standalone: true,
  imports: [ArkFormatNumberComponent],
  template: `
    <ark-format-number [value]="1234.56" [locale]="locale" [options]="options"></ark-format-number>
  `,
})
class NumberHostComponent {
  locale: string | undefined = undefined
  options: Intl.NumberFormatOptions | undefined = undefined
}

@Component({
  standalone: true,
  imports: [ArkFormatNumberComponent],
  template: `
    <ark-format-number [value]="1234.56"></ark-format-number>
  `,
})
class NumberProviderHostComponent {}

@Component({
  standalone: true,
  imports: [ArkFormatByteComponent],
  template: `
    <ark-format-byte [value]="1024" unitSystem="decimal"></ark-format-byte>
  `,
})
class ByteHostComponent {}

@Component({
  standalone: true,
  imports: [ArkFormatRelativeTimeComponent],
  template: `
    <ark-format-relative-time [value]="value"></ark-format-relative-time>
  `,
})
class RelativeTimeHostComponent {
  value = new Date(Date.now() - 24 * 60 * 60 * 1000)
}

@Component({
  standalone: true,
  imports: [ArkFormatTimeComponent],
  template: `
    <ark-format-time [value]="value" format="24h" [withSeconds]="true"></ark-format-time>
  `,
})
class TimeHostComponent {
  value = new Date('2024-01-01T13:05:06Z')
}

@Component({
  standalone: true,
  imports: [ArkFormatNumberComponent],
  template: `
    <ark-format-number [value]="value"></ark-format-number>
  `,
})
class InvalidNumberHostComponent {
  value = Number.NaN
}

describe('ArkFormatComponents', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('renders Intl.NumberFormat output for an explicit locale override', () => {
    TestBed.configureTestingModule({ imports: [NumberHostComponent] })
    const fixture = TestBed.createComponent(NumberHostComponent)
    fixture.componentInstance.locale = 'fr-FR'
    fixture.detectChanges()

    const expected = new Intl.NumberFormat('fr-FR').format(1234.56)
    expect(fixture.nativeElement.textContent.trim()).toBe(expected)

    fixture.destroy()
  })

  it('renders Intl.NumberFormat output using the provider locale when no explicit locale is supplied', () => {
    TestBed.configureTestingModule({
      imports: [NumberProviderHostComponent],
      providers: [provideArkLocale({ locale: 'de-DE' })],
    })
    const fixture = TestBed.createComponent(NumberProviderHostComponent)
    fixture.detectChanges()

    const expected = new Intl.NumberFormat('de-DE').format(1234.56)
    expect(fixture.nativeElement.textContent.trim()).toBe(expected)

    fixture.destroy()
  })

  it('explicit-locale override wins over provider locale', () => {
    TestBed.configureTestingModule({
      imports: [NumberHostComponent],
      providers: [provideArkLocale({ locale: 'de-DE' })],
    })
    const fixture = TestBed.createComponent(NumberHostComponent)
    fixture.componentInstance.locale = 'en-US'
    fixture.detectChanges()

    const expected = new Intl.NumberFormat('en-US').format(1234.56)
    expect(fixture.nativeElement.textContent.trim()).toBe(expected)

    fixture.destroy()
  })

  it('renders human-readable byte sizes in the default locale', () => {
    TestBed.configureTestingModule({ imports: [ByteHostComponent] })
    const fixture = TestBed.createComponent(ByteHostComponent)
    fixture.detectChanges()

    expect(fixture.nativeElement.textContent.trim()).toBe(formatBytes(1024, 'en-US', { unitSystem: 'decimal' }))

    fixture.destroy()
  })

  it('renders relative time from a Date value', () => {
    TestBed.configureTestingModule({ imports: [RelativeTimeHostComponent] })
    const fixture = TestBed.createComponent(RelativeTimeHostComponent)
    fixture.detectChanges()

    const expected = formatRelativeTime(fixture.componentInstance.value, 'en-US')
    expect(fixture.nativeElement.textContent.trim()).toBe(expected)

    fixture.destroy()
  })

  it('renders the Intl.NumberFormat output for a non-finite number (NaN) without crashing', () => {
    TestBed.configureTestingModule({ imports: [InvalidNumberHostComponent] })
    const fixture = TestBed.createComponent(InvalidNumberHostComponent)
    fixture.detectChanges()

    const expected = new Intl.NumberFormat('en-US').format(Number.NaN)
    expect(fixture.nativeElement.textContent.trim()).toBe(expected)

    fixture.destroy()
  })

  it('renders time values with the requested options', () => {
    TestBed.configureTestingModule({ imports: [TimeHostComponent] })
    const fixture = TestBed.createComponent(TimeHostComponent)
    fixture.detectChanges()

    expect(fixture.nativeElement.textContent.trim()).toBe(
      formatTime(fixture.componentInstance.value, 'en-US', { format: '24h', withSeconds: true }),
    )

    fixture.destroy()
  })
})
