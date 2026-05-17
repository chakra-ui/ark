import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { provideArkLocale } from '../providers/locale/locale'
import { ArkFormatByteComponent } from './format-byte'
import { ArkFormatNumberComponent } from './format-number'
import { ArkFormatRelativeTimeComponent } from './format-relative-time'

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
    <ark-format-byte [value]="1024"></ark-format-byte>
  `,
})
class ByteHostComponent {}

@Component({
  standalone: true,
  imports: [ArkFormatRelativeTimeComponent],
  template: `
    <ark-format-relative-time [value]="-1" unit="day"></ark-format-relative-time>
  `,
})
class RelativeTimeHostComponent {}

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

describe('Format components (criterion 28)', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('renders Intl.NumberFormat output for an explicit locale override', () => {
    TestBed.configureTestingModule({ imports: [NumberHostComponent] })
    const fixture = TestBed.createComponent(NumberHostComponent)
    fixture.componentInstance.locale = 'fr-FR'
    fixture.detectChanges()

    const expected = new Intl.NumberFormat('fr-FR').format(1234.56)
    expect(fixture.nativeElement.textContent).toContain(expected)
    expect(expected).toContain(',')

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
    expect(fixture.nativeElement.textContent).toContain(expected)
    expect(expected).toContain(',')

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
    expect(fixture.nativeElement.textContent).toContain(expected)
    expect(expected).toContain('.')

    fixture.destroy()
  })

  it('renders Format.Byte using Intl unit formatting in the default locale', () => {
    TestBed.configureTestingModule({ imports: [ByteHostComponent] })
    const fixture = TestBed.createComponent(ByteHostComponent)
    fixture.detectChanges()

    const expected = new Intl.NumberFormat('en-US', {
      style: 'unit',
      unit: 'byte',
      unitDisplay: 'short',
    }).format(1024)
    expect(fixture.nativeElement.textContent).toContain(expected)
    expect(fixture.nativeElement.textContent.toLowerCase()).toMatch(/byte|b/)

    fixture.destroy()
  })

  it('renders Format.RelativeTime for value=-1, unit=day in en-US', () => {
    TestBed.configureTestingModule({ imports: [RelativeTimeHostComponent] })
    const fixture = TestBed.createComponent(RelativeTimeHostComponent)
    fixture.detectChanges()

    const expected = new Intl.RelativeTimeFormat('en-US').format(-1, 'day')
    expect(fixture.nativeElement.textContent).toContain(expected)
    expect(fixture.nativeElement.textContent).toMatch(/1 day ago/)

    fixture.destroy()
  })

  it('renders the Intl.NumberFormat output for a non-finite number (NaN) without crashing', () => {
    TestBed.configureTestingModule({ imports: [InvalidNumberHostComponent] })
    const fixture = TestBed.createComponent(InvalidNumberHostComponent)
    fixture.detectChanges()

    const expected = new Intl.NumberFormat('en-US').format(Number.NaN)
    expect(fixture.nativeElement.textContent).toContain(expected)

    fixture.destroy()
  })
})
