import { Component, Directive, Injector, inject, signal, type Type } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  ARK_ANGLE_SLIDER_CONTEXT,
  ArkAngleSliderContext,
  ArkAngleSliderControl,
  ArkAngleSliderHiddenInput,
  ArkAngleSliderLabel,
  ArkAngleSliderMarker,
  ArkAngleSliderMarkerGroup,
  ArkAngleSliderRoot,
  ArkAngleSliderRootProvider,
  ArkAngleSliderThumb,
  ArkAngleSliderValueText,
  angleSliderAnatomy,
  injectArkAngleSliderContext,
  useAngleSlider,
  type AngleSliderApi,
  type AngleSliderContextTemplate,
  type AngleSliderElementIds,
  type AngleSliderMachine,
  type AngleSliderMachineProps,
  type AngleSliderMarkerProps,
  type AngleSliderService,
  type AngleSliderValueChangeDetails,
  type UseAngleSliderOptions,
  type UseAngleSliderProps,
  type UseAngleSliderReturn,
} from './public-api'
import { AngleSliderBasicExample } from './examples/basic'
import { AngleSliderContextExample } from './examples/context'
import { AngleSliderControlledExample } from './examples/controlled'
import { AngleSliderDisabledExample } from './examples/disabled'
import { AngleSliderRootProviderExample } from './examples/root-provider'
import { AngleSliderStepExample } from './examples/step'

type AngleSliderPublicTypeSmoke = [
  AngleSliderApi,
  AngleSliderContextTemplate,
  AngleSliderElementIds,
  AngleSliderMachine,
  AngleSliderMachineProps,
  AngleSliderMarkerProps,
  AngleSliderService,
  AngleSliderValueChangeDetails,
  UseAngleSliderOptions,
  UseAngleSliderProps,
  UseAngleSliderReturn,
]

@Directive({ selector: '[angleSliderProbe]', standalone: true, exportAs: 'angleSliderProbe' })
class AngleSliderProbe {
  private readonly _injector = inject(Injector)
  get captured(): UseAngleSliderReturn {
    return this._injector.get(ARK_ANGLE_SLIDER_CONTEXT)
  }
}

const keydown = (el: HTMLElement, key: string) => {
  el.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key }))
}

describe('@ark-ui/angular/angle-slider', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_ANGLE_SLIDER_CONTEXT).toBe('object')
    expect(typeof injectArkAngleSliderContext).toBe('function')
    expect(typeof useAngleSlider).toBe('function')
    expect(typeof angleSliderAnatomy).toBe('object')
    expect(ArkAngleSliderRoot).toBeDefined()
    expect(ArkAngleSliderRootProvider).toBeDefined()
    expect(ArkAngleSliderLabel).toBeDefined()
    expect(ArkAngleSliderControl).toBeDefined()
    expect(ArkAngleSliderThumb).toBeDefined()
    expect(ArkAngleSliderMarkerGroup).toBeDefined()
    expect(ArkAngleSliderMarker).toBeDefined()
    expect(ArkAngleSliderValueText).toBeDefined()
    expect(ArkAngleSliderHiddenInput).toBeDefined()
    expect(ArkAngleSliderContext).toBeDefined()
    expect(undefined as AngleSliderPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('descendant probe under [arkAngleSlider] receives the Root directive instance', () => {
    @Component({
      standalone: true,
      imports: [ArkAngleSliderRoot, AngleSliderProbe],
      template: `
        <div arkAngleSlider>
          <span angleSliderProbe></span>
        </div>
      `,
    })
    class Host {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkAngleSliderRoot))
    const probeDebug = fixture.debugElement.query(By.directive(AngleSliderProbe))

    expect(probeDebug.injector.get(AngleSliderProbe).captured).toBe(rootDebug.injector.get(ArkAngleSliderRoot))

    fixture.destroy()
  })

  it('descendant probe under [arkAngleSliderRootProvider] receives the provided service', () => {
    @Component({
      standalone: true,
      imports: [ArkAngleSliderRootProvider, AngleSliderProbe],
      template: `
        <div arkAngleSliderRootProvider [value]="angleSlider">
          <span angleSliderProbe></span>
        </div>
      `,
    })
    class Host {
      readonly angleSlider = useAngleSlider({ context: () => ({}) })
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const probe = fixture.debugElement.query(By.directive(AngleSliderProbe)).injector.get(AngleSliderProbe)
    expect(probe.captured.service).toBe(fixture.componentInstance.angleSlider.service)

    fixture.destroy()
  })

  it('orphan part directive without an ancestor root throws missing-provider', () => {
    @Component({
      standalone: true,
      imports: [ArkAngleSliderThumb],
      template: '<div arkAngleSliderThumb></div>',
    })
    class Orphan {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Orphan] })
    expect(() => TestBed.createComponent(Orphan)).toThrow(/ARK_ANGLE_SLIDER_CONTEXT|No provider|NG0201/i)
  })

  it('controlled [(value)] round-trips through the api and emits once', () => {
    @Component({
      standalone: true,
      imports: [ArkAngleSliderRoot, ArkAngleSliderControl, ArkAngleSliderThumb],
      template: `
        <div arkAngleSlider [(value)]="value" (valueChange)="emissions.push($event)">
          <div arkAngleSliderControl>
            <div arkAngleSliderThumb></div>
          </div>
        </div>
      `,
    })
    class Host {
      readonly value = signal<number | undefined>(45)
      readonly emissions: Array<number | undefined> = []
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkAngleSliderRoot)).injector.get(ArkAngleSliderRoot)

    expect(root.api().value).toBe(45)

    root.api().setValue(46)
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toBe(46)
    expect(fixture.componentInstance.value()).toBe(46)
    expect(fixture.componentInstance.emissions).toEqual([46])

    const emissionsAfterFirstWrite = fixture.componentInstance.emissions.length
    fixture.componentInstance.value.set(46)
    TestBed.tick()
    fixture.detectChanges()

    expect(fixture.componentInstance.emissions.length).toBe(emissionsAfterFirstWrite)

    fixture.destroy()
  })

  it('[defaultValue] property binding seeds the uncontrolled value', () => {
    @Component({
      standalone: true,
      imports: [ArkAngleSliderRoot],
      template: '<div arkAngleSlider [defaultValue]="90"></div>',
    })
    class Host {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkAngleSliderRoot)).injector.get(ArkAngleSliderRoot)
    const rootEl = fixture.debugElement.query(By.directive(ArkAngleSliderRoot)).nativeElement as HTMLElement

    expect(root.api().value).toBe(90)
    expect(rootEl.style.getPropertyValue('--value')).toBe('90')

    fixture.destroy()
  })

  it('static defaultValue attribute seeds the uncontrolled value', () => {
    @Component({
      standalone: true,
      imports: [ArkAngleSliderRoot],
      template: '<div arkAngleSlider defaultValue="135"></div>',
    })
    class Host {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkAngleSliderRoot)).injector.get(ArkAngleSliderRoot)
    expect(root.api().value).toBe(135)

    fixture.destroy()
  })

  it('disabled angle slider ignores thumb keyboard interaction', () => {
    @Component({
      standalone: true,
      imports: [ArkAngleSliderRoot, ArkAngleSliderControl, ArkAngleSliderThumb],
      template: `
        <div arkAngleSlider disabled [defaultValue]="45" (valueChange)="emissions.push($event)">
          <div arkAngleSliderControl>
            <div arkAngleSliderThumb></div>
          </div>
        </div>
      `,
    })
    class Host {
      readonly emissions: Array<number | undefined> = []
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkAngleSliderRoot)).injector.get(ArkAngleSliderRoot)
    const thumb = fixture.debugElement.query(By.directive(ArkAngleSliderThumb)).nativeElement as HTMLElement

    keydown(thumb, 'ArrowRight')
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toBe(45)
    expect(fixture.componentInstance.emissions).toEqual([])
    expect(thumb.getAttribute('data-disabled')).toBe('')

    fixture.destroy()
  })

  it('hidden input receives name and current value for form submission', () => {
    @Component({
      standalone: true,
      imports: [ArkAngleSliderRoot, ArkAngleSliderHiddenInput],
      template: `
        <div arkAngleSlider name="rotation" [defaultValue]="180">
          <input arkAngleSliderHiddenInput />
        </div>
      `,
    })
    class Host {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const input = fixture.debugElement.query(By.directive(ArkAngleSliderHiddenInput)).nativeElement as HTMLInputElement
    expect(input.type).toBe('hidden')
    expect(input.name).toBe('rotation')
    expect(input.value).toBe('180')

    fixture.destroy()
  })

  it('reactive forms write through the same value model and set disabled state', () => {
    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkAngleSliderRoot, ArkAngleSliderControl, ArkAngleSliderThumb],
      template: `
        <div arkAngleSlider [formControl]="control">
          <div arkAngleSliderControl>
            <div arkAngleSliderThumb></div>
          </div>
        </div>
      `,
    })
    class Host {
      readonly control = new FormControl<number | null>(90)
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkAngleSliderRoot)).injector.get(ArkAngleSliderRoot)
    expect(root.api().value).toBe(90)

    fixture.componentInstance.control.setValue(180)
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().value).toBe(180)

    fixture.componentInstance.control.disable()
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().getThumbProps()['data-disabled']).toBe('')

    fixture.destroy()
  })

  it('warns when a form binding and [(value)] are both present on the same root', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)

    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkAngleSliderRoot],
      template: '<div arkAngleSlider [formControl]="control" [(value)]="value"></div>',
    })
    class Host {
      readonly control = new FormControl<number | null>(45)
      readonly value = signal<number | undefined>(90)
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    expect(warn).toHaveBeenCalledWith(expect.stringContaining('ArkAngleSliderRoot'))

    fixture.destroy()
  })

  const exampleCases: Array<[string, Type<unknown>]> = [
    ['Basic', AngleSliderBasicExample],
    ['Controlled', AngleSliderControlledExample],
    ['Disabled', AngleSliderDisabledExample],
    ['Step', AngleSliderStepExample],
    ['Context', AngleSliderContextExample],
    ['RootProvider', AngleSliderRootProviderExample],
  ]

  it.each(exampleCases)('%s example renders angle slider parts', (_name, Example) => {
    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Example] })
    const fixture = TestBed.createComponent(Example)
    fixture.detectChanges()

    const root = fixture.nativeElement.querySelector('[data-scope="angle-slider"][data-part="root"]')
    const thumb = fixture.nativeElement.querySelector('[data-scope="angle-slider"][data-part="thumb"]')
    const markers = fixture.nativeElement.querySelectorAll('[data-scope="angle-slider"][data-part="marker"]')

    expect(root).not.toBeNull()
    expect(thumb).not.toBeNull()
    expect(markers.length).toBe(8)

    fixture.destroy()
  })
})
