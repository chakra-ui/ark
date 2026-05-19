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
    <ark-format-number [value]="1234.56" [options]="options" currency="EUR"></ark-format-number>
  `,
})
class NumberOptionsHostComponent {
  options: Intl.NumberFormatOptions = { style: 'currency', currency: 'USD' }
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
  imports: [ArkFormatByteComponent],
  template: `
    <ark-format-byte [value]="1024"></ark-format-byte>
  `,
})
class DefaultByteHostComponent {}

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
  imports: [ArkFormatRelativeTimeComponent],
  template: `
    <ark-format-relative-time [value]="-2" unit="day" numeric="auto"></ark-format-relative-time>
  `,
})
class LegacyRelativeTimeHostComponent {}

@Component({
  standalone: true,
  imports: [ArkFormatRelativeTimeComponent],
  template: `
    <ark-format-relative-time [value]="-2" unit="day" [options]="options" numeric="auto"></ark-format-relative-time>
  `,
})
class RelativeTimeOptionsHostComponent {
  options: Intl.RelativeTimeFormatOptions = { numeric: 'always' }
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
  imports: [ArkFormatByteComponent, ArkFormatNumberComponent, ArkFormatRelativeTimeComponent, ArkFormatTimeComponent],
  template: `
    <span data-testid="byte-basic"><ark-format-byte [value]="120000" /></span>
    <span data-testid="byte-locale"><ark-format-byte [value]="1450.45" locale="de-DE" /></span>
    <span data-testid="byte-unit"><ark-format-byte [value]="1450.45" unit="bit" /></span>
    <span data-testid="byte-unit-display">
      <ark-format-byte [value]="50345.53" unitDisplay="long" />
    </span>
    <span data-testid="byte-unit-system"><ark-format-byte [value]="1024" unitSystem="binary" /></span>
    <span data-testid="number-basic"><ark-format-number [value]="1450.45" /></span>
    <span data-testid="number-compact">
      <ark-format-number [value]="1500000" notation="compact" compactDisplay="short" />
    </span>
    <span data-testid="number-currency">
      <ark-format-number [value]="1234.45" [style]="'currency'" currency="USD" />
    </span>
    <span data-testid="number-locale"><ark-format-number [value]="1450.45" locale="de-DE" /></span>
    <span data-testid="number-percentage">
      <ark-format-number [value]="0.145" [style]="'percent'" [maximumFractionDigits]="2" [minimumFractionDigits]="2" />
    </span>
    <span data-testid="number-unit">
      <ark-format-number [value]="384.4" [style]="'unit'" unit="kilometer" />
    </span>
    <span data-testid="relative-basic"><ark-format-relative-time [value]="relativeValue" /></span>
    <span data-testid="relative-short">
      <ark-format-relative-time [value]="relativeValue" [style]="'short'" />
    </span>
    <span data-testid="time-basic"><ark-format-time value="18:47:12" format="12h" /></span>
    <span data-testid="time-am-pm">
      <ark-format-time value="17:15:00" format="12h" amLabel="morning" pmLabel="evening" />
    </span>
    <span data-testid="time-date"><ark-format-time [value]="timeValue" /></span>
    <span data-testid="time-locale"><ark-format-time value="13:05" format="12h" locale="ar-EG" /></span>
    <span data-testid="time-seconds">
      <ark-format-time value="03:07:19" format="12h" [withSeconds]="true" />
    </span>
  `,
})
class FormatExamplesHostComponent {
  readonly relativeValue = new Date('2025-05-05')
  readonly timeValue = new Date(2026, 1, 27, 18, 45, 34)
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

  it('lets explicit number inputs override the options object', () => {
    TestBed.configureTestingModule({ imports: [NumberOptionsHostComponent] })
    const fixture = TestBed.createComponent(NumberOptionsHostComponent)
    fixture.detectChanges()

    const expected = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR' }).format(1234.56)
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

  it('omits undefined byte options so formatter defaults still apply', () => {
    TestBed.configureTestingModule({ imports: [DefaultByteHostComponent] })
    const fixture = TestBed.createComponent(DefaultByteHostComponent)
    fixture.detectChanges()

    expect(fixture.nativeElement.textContent.trim()).toBe(
      formatBytes(1024, 'en-US', { unit: 'byte', unitDisplay: 'short' }),
    )

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

  it('renders relative time from the legacy number and unit inputs', () => {
    TestBed.configureTestingModule({ imports: [LegacyRelativeTimeHostComponent] })
    const fixture = TestBed.createComponent(LegacyRelativeTimeHostComponent)
    fixture.detectChanges()

    const expected = new Intl.RelativeTimeFormat('en-US', { numeric: 'auto' }).format(-2, 'day')
    expect(fixture.nativeElement.textContent.trim()).toBe(expected)

    fixture.destroy()
  })

  it('lets explicit relative-time inputs override the options object', () => {
    TestBed.configureTestingModule({ imports: [RelativeTimeOptionsHostComponent] })
    const fixture = TestBed.createComponent(RelativeTimeOptionsHostComponent)
    fixture.detectChanges()

    const expected = new Intl.RelativeTimeFormat('en-US', { numeric: 'auto' }).format(-2, 'day')
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

  it('renders deterministic text for every format option covered by the examples', () => {
    TestBed.configureTestingModule({ imports: [FormatExamplesHostComponent] })
    const fixture = TestBed.createComponent(FormatExamplesHostComponent)
    fixture.detectChanges()

    expect(text(fixture.nativeElement, 'byte-basic')).toBe(
      formatBytes(120000, 'en-US', { unit: 'byte', unitDisplay: 'short' }),
    )
    expect(text(fixture.nativeElement, 'byte-locale')).toBe(
      formatBytes(1450.45, 'de-DE', { unit: 'byte', unitDisplay: 'short' }),
    )
    expect(text(fixture.nativeElement, 'byte-unit')).toBe(
      formatBytes(1450.45, 'en-US', { unit: 'bit', unitDisplay: 'short' }),
    )
    expect(text(fixture.nativeElement, 'byte-unit-display')).toBe(
      formatBytes(50345.53, 'en-US', { unit: 'byte', unitDisplay: 'long' }),
    )
    expect(text(fixture.nativeElement, 'byte-unit-system')).toBe(
      formatBytes(1024, 'en-US', { unit: 'byte', unitDisplay: 'short', unitSystem: 'binary' }),
    )
    expect(text(fixture.nativeElement, 'number-basic')).toBe(new Intl.NumberFormat('en-US').format(1450.45))
    expect(text(fixture.nativeElement, 'number-compact')).toBe(
      new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(1500000),
    )
    expect(text(fixture.nativeElement, 'number-currency')).toBe(
      new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(1234.45),
    )
    expect(text(fixture.nativeElement, 'number-locale')).toBe(new Intl.NumberFormat('de-DE').format(1450.45))
    expect(text(fixture.nativeElement, 'number-percentage')).toBe(
      new Intl.NumberFormat('en-US', {
        style: 'percent',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }).format(0.145),
    )
    expect(text(fixture.nativeElement, 'number-unit')).toBe(
      new Intl.NumberFormat('en-US', { style: 'unit', unit: 'kilometer' }).format(384.4),
    )
    expect(text(fixture.nativeElement, 'relative-basic')).toBe(
      formatRelativeTime(fixture.componentInstance.relativeValue, 'en-US'),
    )
    expect(text(fixture.nativeElement, 'relative-short')).toBe(
      formatRelativeTime(fixture.componentInstance.relativeValue, 'en-US', { style: 'short' }),
    )
    expect(text(fixture.nativeElement, 'time-basic')).toBe(formatTime('18:47:12', 'en-US', { format: '12h' }))
    expect(text(fixture.nativeElement, 'time-am-pm')).toBe(
      formatTime('17:15:00', 'en-US', { format: '12h', amLabel: 'morning', pmLabel: 'evening' }),
    )
    expect(text(fixture.nativeElement, 'time-date')).toBe(formatTime(fixture.componentInstance.timeValue, 'en-US', {}))
    expect(text(fixture.nativeElement, 'time-locale')).toBe(formatTime('13:05', 'ar-EG', { format: '12h' }))
    expect(text(fixture.nativeElement, 'time-seconds')).toBe(
      formatTime('03:07:19', 'en-US', { format: '12h', withSeconds: true }),
    )

    fixture.destroy()
  })
})

function text(root: HTMLElement, testId: string): string {
  return root.querySelector(`[data-testid="${testId}"]`)?.textContent?.trim() ?? ''
}
