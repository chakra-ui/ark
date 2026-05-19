import {
  ApplicationRef,
  Component,
  Directive,
  Injector,
  PLATFORM_ID,
  inject,
  runInInjectionContext,
  signal,
} from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  ARK_COLOR_PICKER_CONTEXT,
  ARK_COLOR_PICKER_CONTEXT_CARRIER,
  ArkColorPickerArea,
  ArkColorPickerAreaBackground,
  ArkColorPickerAreaThumb,
  ArkColorPickerChannelInput,
  ArkColorPickerChannelSlider,
  ArkColorPickerChannelSliderLabel,
  ArkColorPickerChannelSliderThumb,
  ArkColorPickerChannelSliderTrack,
  ArkColorPickerChannelSliderValueText,
  ArkColorPickerContent,
  ArkColorPickerContext,
  ArkColorPickerControl,
  ArkColorPickerEyeDropperTrigger,
  ArkColorPickerFormatSelect,
  ArkColorPickerFormatTrigger,
  ArkColorPickerHiddenInput,
  ArkColorPickerLabel,
  ArkColorPickerPositioner,
  ArkColorPickerRoot,
  ArkColorPickerRootProvider,
  ArkColorPickerSwatch,
  ArkColorPickerSwatchGroup,
  ArkColorPickerSwatchIndicator,
  ArkColorPickerSwatchTrigger,
  ArkColorPickerTransparencyGrid,
  ArkColorPickerTrigger,
  ArkColorPickerValueSwatch,
  ArkColorPickerValueText,
  ArkColorPickerView,
  colorPickerAnatomy,
  injectArkColorPickerContext,
  injectArkColorPickerContextCarrier,
  parseColor,
  useColorPicker,
  type ColorPickerAreaProps,
  type ColorPickerChannelInputProps,
  type ColorPickerChannelProps,
  type ColorPickerChannelSliderProps,
  type ColorPickerElementIds,
  type ColorPickerFormat,
  type ColorPickerFormatChangeDetails,
  type ColorPickerOpenChangeDetails,
  type ColorPickerPositioningOptions,
  type ColorPickerSwatchProps,
  type ColorPickerSwatchTriggerProps,
  type ColorPickerTransparencyGridProps,
  type ColorPickerValue,
  type ColorPickerValueChangeDetails,
  type UseColorPickerProps,
  type UseColorPickerReturn,
} from '@ark-ui/angular/color-picker'
import { ArkPortalComponent } from '@ark-ui/angular/portal'

type ColorPickerPublicTypeSmoke = [
  ColorPickerAreaProps,
  ColorPickerChannelInputProps,
  ColorPickerChannelProps,
  ColorPickerChannelSliderProps,
  ColorPickerElementIds,
  ColorPickerFormat,
  ColorPickerFormatChangeDetails,
  ColorPickerOpenChangeDetails,
  ColorPickerPositioningOptions,
  ColorPickerSwatchProps,
  ColorPickerSwatchTriggerProps,
  ColorPickerTransparencyGridProps,
  ColorPickerValue,
  ColorPickerValueChangeDetails,
  UseColorPickerProps,
  UseColorPickerReturn,
]

const flush = async (fixture: ReturnType<typeof TestBed.createComponent>) => {
  await TestBed.inject(ApplicationRef).whenStable()
  TestBed.tick()
  fixture.detectChanges()
  await Promise.resolve()
  fixture.detectChanges()
}

const hex = (value: ColorPickerValue | undefined): string | undefined => value?.toString('hex').toLowerCase()

@Directive({ selector: '[colorPickerProbe]', standalone: true, exportAs: 'colorPickerProbe' })
class ColorPickerProbe {
  private readonly injector = inject(Injector)
  get capturedRoot(): UseColorPickerReturn {
    return this.injector.get(ARK_COLOR_PICKER_CONTEXT)
  }
}

describe('@ark-ui/angular/color-picker', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_COLOR_PICKER_CONTEXT).toBe('object')
    expect(typeof ARK_COLOR_PICKER_CONTEXT_CARRIER).toBe('object')
    expect(typeof injectArkColorPickerContext).toBe('function')
    expect(typeof injectArkColorPickerContextCarrier).toBe('function')
    expect(typeof useColorPicker).toBe('function')
    expect(typeof parseColor).toBe('function')
    expect(typeof colorPickerAnatomy).toBe('object')
    expect(ArkColorPickerRoot).toBeDefined()
    expect(ArkColorPickerRootProvider).toBeDefined()
    expect(ArkColorPickerArea).toBeDefined()
    expect(ArkColorPickerAreaBackground).toBeDefined()
    expect(ArkColorPickerAreaThumb).toBeDefined()
    expect(ArkColorPickerChannelInput).toBeDefined()
    expect(ArkColorPickerChannelSlider).toBeDefined()
    expect(ArkColorPickerChannelSliderLabel).toBeDefined()
    expect(ArkColorPickerChannelSliderThumb).toBeDefined()
    expect(ArkColorPickerChannelSliderTrack).toBeDefined()
    expect(ArkColorPickerChannelSliderValueText).toBeDefined()
    expect(ArkColorPickerContent).toBeDefined()
    expect(ArkColorPickerControl).toBeDefined()
    expect(ArkColorPickerContext).toBeDefined()
    expect(ArkColorPickerEyeDropperTrigger).toBeDefined()
    expect(ArkColorPickerFormatSelect).toBeDefined()
    expect(ArkColorPickerFormatTrigger).toBeDefined()
    expect(ArkColorPickerHiddenInput).toBeDefined()
    expect(ArkColorPickerLabel).toBeDefined()
    expect(ArkColorPickerPositioner).toBeDefined()
    expect(ArkColorPickerSwatch).toBeDefined()
    expect(ArkColorPickerSwatchGroup).toBeDefined()
    expect(ArkColorPickerSwatchIndicator).toBeDefined()
    expect(ArkColorPickerSwatchTrigger).toBeDefined()
    expect(ArkColorPickerTransparencyGrid).toBeDefined()
    expect(ArkColorPickerTrigger).toBeDefined()
    expect(ArkColorPickerValueSwatch).toBeDefined()
    expect(ArkColorPickerValueText).toBeDefined()
    expect(ArkColorPickerView).toBeDefined()
    expect(undefined as ColorPickerPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('useColorPicker({ context: () => ({}) }) produces a non-empty fallback id', () => {
    @Component({ standalone: true, template: '' })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    const result = runInInjectionContext(fixture.componentRef.injector, () => useColorPicker({ context: () => ({}) }))
    const id = (result.api().getRootProps() as { id: unknown }).id as string

    expect(id).toMatch(/color-picker::/)
    fixture.destroy()
  })

  it('updates value, format, and rendered value text', async () => {
    @Component({
      standalone: true,
      imports: [ArkColorPickerRoot, ArkColorPickerValueText, ArkColorPickerFormatTrigger],
      template: `
        <div
          arkColorPicker
          [defaultValue]="initial"
          (valueChange)="values.push($event)"
          (formatChange)="formats.push($event)"
        >
          <span arkColorPickerValueText format="hex"></span>
          <button arkColorPickerFormatTrigger></button>
        </div>
      `,
    })
    class Host {
      readonly initial = parseColor('#ff0000')
      readonly values: Array<ColorPickerValue | undefined> = []
      readonly formats: Array<ColorPickerFormat | undefined> = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkColorPickerRoot)).injector.get(ArkColorPickerRoot)
    root.api().setValue('#00ff00')
    await flush(fixture)
    ;(fixture.nativeElement.querySelector('button') as HTMLButtonElement).click()
    await flush(fixture)

    expect(hex(root.api().value)).toBe('#00ff00')
    expect(fixture.nativeElement.querySelector('span').textContent.trim().toLowerCase()).toBe('#00ff00')
    expect(fixture.componentInstance.values.map(hex)).toEqual(['#00ff00'])
    expect(fixture.componentInstance.formats).toEqual(['hsba'])
    fixture.destroy()
  })

  it('updates through channel input and channel slider parts', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkColorPickerRoot,
        ArkColorPickerChannelInput,
        ArkColorPickerChannelSlider,
        ArkColorPickerChannelSliderTrack,
        ArkColorPickerChannelSliderThumb,
        ArkColorPickerChannelSliderValueText,
        ArkColorPickerView,
      ],
      template: `
        <div arkColorPicker [defaultValue]="initial">
          <input arkColorPickerChannelInput channel="hex" />
          <div arkColorPickerView format="rgba">
            <div arkColorPickerChannelSlider channel="red">
              <div arkColorPickerChannelSliderTrack>
                <div arkColorPickerChannelSliderThumb></div>
              </div>
              <span arkColorPickerChannelSliderValueText></span>
            </div>
          </div>
        </div>
      `,
    })
    class Host {
      readonly initial = parseColor('#000000')
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkColorPickerRoot)).injector.get(ArkColorPickerRoot)
    const input = fixture.debugElement.query(By.directive(ArkColorPickerChannelInput)).nativeElement as HTMLInputElement
    input.dispatchEvent(new FocusEvent('focus'))
    input.value = '#00ff00'
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }))
    await flush(fixture)
    expect(hex(root.api().value)).toBe('#00ff00')

    root.api().setChannelValue('red', 10)
    await flush(fixture)
    const thumb = fixture.debugElement.query(By.directive(ArkColorPickerChannelSliderThumb))
      .nativeElement as HTMLElement
    expect(thumb.getAttribute('role')).toBe('slider')
    expect(thumb.getAttribute('aria-valuenow')).toBe('10')
    expect(
      fixture.debugElement.query(By.directive(ArkColorPickerChannelSliderValueText)).nativeElement.textContent,
    ).toContain(root.api().getChannelValue('red'))
    fixture.destroy()
  })

  it('selects swatches and updates hidden input value', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkColorPickerRoot,
        ArkColorPickerHiddenInput,
        ArkColorPickerSwatchGroup,
        ArkColorPickerSwatch,
        ArkColorPickerSwatchIndicator,
        ArkColorPickerSwatchTrigger,
        ArkColorPickerValueSwatch,
      ],
      template: `
        <div arkColorPicker name="accent" [defaultValue]="initial">
          <input arkColorPickerHiddenInput />
          <div arkColorPickerSwatchGroup>
            <button arkColorPickerSwatchTrigger value="#0000ff">Blue</button>
            <div arkColorPickerSwatch value="#0000ff">
              <span arkColorPickerSwatchIndicator></span>
            </div>
            <div arkColorPickerValueSwatch></div>
          </div>
        </div>
      `,
    })
    class Host {
      readonly initial = parseColor('#ff0000')
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkColorPickerRoot)).injector.get(ArkColorPickerRoot)
    const trigger = fixture.debugElement.query(By.directive(ArkColorPickerSwatchTrigger))
      .nativeElement as HTMLButtonElement
    trigger.click()
    await flush(fixture)

    const hidden = fixture.debugElement.query(By.directive(ArkColorPickerHiddenInput)).nativeElement as HTMLInputElement
    expect(hex(root.api().value)).toBe('#0000ff')
    expect(hidden.name).toBe('accent')
    expect(hidden.defaultValue).toBe('rgba(0, 0, 255, 1)')
    expect(fixture.debugElement.query(By.directive(ArkColorPickerSwatchIndicator)).nativeElement.hidden).toBe(false)
    fixture.destroy()
  })

  it('opens and closes unless inline', async () => {
    @Component({
      standalone: true,
      imports: [ArkColorPickerRoot, ArkColorPickerTrigger, ArkColorPickerPositioner, ArkColorPickerContent],
      template: `
        <div arkColorPicker (openChange)="openChanges.push($event)">
          <button arkColorPickerTrigger></button>
          <div arkColorPickerPositioner><div arkColorPickerContent></div></div>
        </div>
        <div arkColorPicker inline>
          <button arkColorPickerTrigger class="inline-trigger"></button>
          <div arkColorPickerContent class="inline-content"></div>
        </div>
      `,
    })
    class Host {
      readonly openChanges: Array<boolean | undefined> = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const roots = fixture.debugElement
      .queryAll(By.directive(ArkColorPickerRoot))
      .map((debug) => debug.injector.get(ArkColorPickerRoot))
    const trigger = fixture.debugElement.query(By.directive(ArkColorPickerTrigger)).nativeElement as HTMLButtonElement
    trigger.click()
    await flush(fixture)

    expect(roots[0].api().open).toBe(true)
    expect(fixture.componentInstance.openChanges).toEqual([true])
    expect(roots[1].api().inline).toBe(true)
    expect((fixture.nativeElement.querySelector('.inline-content') as HTMLElement).hidden).toBe(false)
    fixture.destroy()
  })

  it('reactive FormControl writes update the same value channel and user changes notify once', async () => {
    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkColorPickerRoot],
      template: '<div arkColorPicker [formControl]="control" (valueChange)="emissions.push($event)"></div>',
    })
    class Host {
      readonly control = new FormControl<ColorPickerValue | null>(parseColor('#ff0000'))
      readonly emissions: Array<ColorPickerValue | undefined> = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkColorPickerRoot)).injector.get(ArkColorPickerRoot)
    expect(hex(root.api().value)).toBe('#ff0000')

    fixture.componentInstance.control.setValue(parseColor('#00ff00'))
    await flush(fixture)
    expect(hex(root.value())).toBe('#00ff00')

    const before = fixture.componentInstance.emissions.length
    root.api().setValue('#0000ff')
    await flush(fixture)
    expect(hex(fixture.componentInstance.control.value ?? undefined)).toBe('#0000ff')
    expect(fixture.componentInstance.emissions.slice(before).map(hex)).toEqual(['#0000ff'])
    expect(fixture.componentInstance.control.touched).toBe(true)
    fixture.destroy()
  })

  it('mixed form binding + [(value)] emits a dev warning once and the form binding wins', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkColorPickerRoot],
      template: '<div arkColorPicker [formControl]="control" [(value)]="value"></div>',
    })
    class Host {
      readonly control = new FormControl<ColorPickerValue | null>(parseColor('#ff0000'))
      readonly value = signal<ColorPickerValue | undefined>(parseColor('#00ff00'))
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkColorPickerRoot)).injector.get(ArkColorPickerRoot)
    fixture.componentInstance.control.setValue(parseColor('#0000ff'))
    await flush(fixture)

    expect(hex(root.api().value)).toBe('#0000ff')
    const warnCalls = warn.mock.calls.filter((args) => String(args[0]).includes('ArkColorPickerRoot'))
    expect(warnCalls.length).toBe(1)
    warn.mockRestore()
    fixture.destroy()
  })

  it('preserves root context through the context carrier for portalled content', async () => {
    @Component({
      standalone: true,
      imports: [ArkColorPickerRoot, ArkColorPickerTrigger, ArkColorPickerContent, ArkPortalComponent, ColorPickerProbe],
      template: `
        <div arkColorPicker #root="arkColorPicker">
          <button arkColorPickerTrigger></button>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkColorPickerContent colorPickerProbe></div>
          </ark-portal>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkColorPickerRoot)).injector.get(ArkColorPickerRoot)
    const probe = fixture.debugElement.query(By.directive(ColorPickerProbe)).injector.get(ColorPickerProbe)
    expect(probe.capturedRoot).toBe(root)
    fixture.destroy()
  })

  it('constructs on the server platform without browser globals', () => {
    @Component({
      standalone: true,
      imports: [ArkColorPickerRoot, ArkColorPickerTrigger, ArkColorPickerPositioner, ArkColorPickerContent],
      template: `
        <div arkColorPicker>
          <button arkColorPickerTrigger></button>
          <div arkColorPickerPositioner><div arkColorPickerContent></div></div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({
      imports: [Host],
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    })

    const fixture = TestBed.createComponent(Host)
    expect(() => fixture.detectChanges()).not.toThrow()
    fixture.destroy()
  })
})
