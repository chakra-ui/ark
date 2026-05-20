import { Component, Directive, Injector, inject, signal } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { provideArkLocale } from '@ark-ui/angular/providers/locale'
import { describe, expect, it, vi } from 'vitest'
import {
  ARK_SLIDER_CONTEXT,
  ARK_SLIDER_THUMB_PROPS_CONTEXT,
  ArkSliderContext,
  ArkSliderControl,
  ArkSliderDraggingIndicator,
  ArkSliderHiddenInput,
  ArkSliderLabel,
  ArkSliderMarker,
  ArkSliderMarkerGroup,
  ArkSliderRange,
  ArkSliderRoot,
  ArkSliderRootProvider,
  ArkSliderThumb,
  ArkSliderTrack,
  ArkSliderValueText,
  injectArkSliderContext,
  injectArkSliderThumbPropsContext,
  sliderAnatomy,
  type SliderApi,
  type SliderContextTemplate,
  type SliderFocusChangeDetails,
  type SliderMachine,
  type SliderMachineProps,
  type SliderService,
  type SliderThumbPropsContext,
  type SliderValueChangeDetails,
  type UseSliderOptions,
  type UseSliderProps,
  type UseSliderReturn,
  useSlider,
} from './public-api'
import { SliderBasicExample } from './examples/basic'
import { SliderCenterOriginExample } from './examples/center-origin'
import { SliderContextExample } from './examples/context'
import { SliderDraggingIndicatorExample } from './examples/dragging-indicator'
import { SliderMinMaxExample } from './examples/min-max'
import { SliderOnEventExample } from './examples/on-event'
import { SliderRangeExample } from './examples/range'
import { SliderRootProviderExample } from './examples/root-provider'
import { SliderStepExample } from './examples/step'
import { SliderThumbAlignmentExample } from './examples/thumb-alignment'
import { SliderThumbCollisionExample } from './examples/thumb-collision'
import { SliderThumbOverlapExample } from './examples/thumb-overlap'
import { SliderVerticalExample } from './examples/vertical'
import { SliderWithMarksExample } from './examples/with-marks'

type SliderPublicTypeSmoke = [
  SliderApi,
  SliderMachine,
  SliderMachineProps,
  SliderService,
  SliderContextTemplate,
  SliderFocusChangeDetails,
  SliderThumbPropsContext,
  SliderValueChangeDetails,
  UseSliderOptions,
  UseSliderProps,
  UseSliderReturn,
]

@Directive({ selector: '[sliderProbe]', standalone: true, exportAs: 'sliderProbe' })
class SliderProbe {
  private readonly _injector = inject(Injector)
  get captured(): UseSliderReturn {
    return this._injector.get(ARK_SLIDER_CONTEXT)
  }
}

const keydown = (el: HTMLElement, key: string): void => {
  el.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }))
}

describe('@ark-ui/angular/slider', () => {
  it('exposes the documented public surface', () => {
    expect(typeof ARK_SLIDER_CONTEXT).toBe('object')
    expect(typeof ARK_SLIDER_THUMB_PROPS_CONTEXT).toBe('object')
    expect(typeof injectArkSliderContext).toBe('function')
    expect(typeof injectArkSliderThumbPropsContext).toBe('function')
    expect(typeof useSlider).toBe('function')
    expect(typeof sliderAnatomy).toBe('object')
    expect(ArkSliderRoot).toBeDefined()
    expect(ArkSliderRootProvider).toBeDefined()
    expect(ArkSliderLabel).toBeDefined()
    expect(ArkSliderValueText).toBeDefined()
    expect(ArkSliderControl).toBeDefined()
    expect(ArkSliderTrack).toBeDefined()
    expect(ArkSliderRange).toBeDefined()
    expect(ArkSliderThumb).toBeDefined()
    expect(ArkSliderHiddenInput).toBeDefined()
    expect(ArkSliderDraggingIndicator).toBeDefined()
    expect(ArkSliderMarkerGroup).toBeDefined()
    expect(ArkSliderMarker).toBeDefined()
    expect(ArkSliderContext).toBeDefined()
    expect(undefined as SliderPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('descendant probe under [arkSlider] receives the Root directive instance via ARK_SLIDER_CONTEXT', () => {
    @Component({
      standalone: true,
      imports: [ArkSliderRoot, SliderProbe],
      template: `
        <div arkSlider>
          <span sliderProbe></span>
        </div>
      `,
    })
    class Host {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkSliderRoot))
    const probeDebug = fixture.debugElement.query(By.directive(SliderProbe))
    const rootInstance = rootDebug.injector.get(ArkSliderRoot)
    const probeInstance = probeDebug.injector.get(SliderProbe)

    expect(probeInstance.captured).toBe(rootInstance)

    fixture.destroy()
  })

  it('descendant probe under [arkSliderRootProvider] receives the provided service via ARK_SLIDER_CONTEXT', () => {
    @Component({
      standalone: true,
      imports: [ArkSliderRootProvider, SliderProbe],
      template: `
        <div arkSliderRootProvider [value]="slider">
          <span sliderProbe></span>
        </div>
      `,
    })
    class Host {
      readonly slider = useSlider({ context: () => ({}) })
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const probe = fixture.debugElement.query(By.directive(SliderProbe)).injector.get(SliderProbe)

    expect(probe.captured.service).toBe(fixture.componentInstance.slider.service)

    fixture.destroy()
  })

  it('an orphan [arkSliderThumb] without an ancestor [arkSlider] throws missing-provider', () => {
    @Component({
      standalone: true,
      imports: [ArkSliderThumb],
      template: '<div arkSliderThumb index="0"></div>',
    })
    class OrphanHost {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [OrphanHost] })
    expect(() => TestBed.createComponent(OrphanHost)).toThrow(/ARK_SLIDER_CONTEXT|No provider|NG0201/i)
  })

  it('an [arkSliderHiddenInput] outside [arkSliderThumb] throws missing thumb-props provider', () => {
    @Component({
      standalone: true,
      imports: [ArkSliderRoot, ArkSliderHiddenInput],
      template: `
        <div arkSlider>
          <input arkSliderHiddenInput />
        </div>
      `,
    })
    class OrphanThumbPropsHost {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [OrphanThumbPropsHost] })
    expect(() => TestBed.createComponent(OrphanThumbPropsHost)).toThrow(
      /ARK_SLIDER_THUMB_PROPS_CONTEXT|No provider|NG0201/i,
    )
  })

  it('keyboard interaction updates value, DOM attributes, and emits valueChange once', () => {
    @Component({
      standalone: true,
      imports: [ArkSliderRoot, ArkSliderControl, ArkSliderTrack, ArkSliderRange, ArkSliderThumb, ArkSliderHiddenInput],
      template: `
        <div arkSlider [defaultValue]="[40]" (valueChange)="emissions.push($event)">
          <div arkSliderControl>
            <div arkSliderTrack>
              <div arkSliderRange></div>
            </div>
            <div arkSliderThumb index="0">
              <input arkSliderHiddenInput />
            </div>
          </div>
        </div>
      `,
    })
    class Host {
      readonly emissions: Array<number[] | undefined> = []
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkSliderRoot))
    const root = rootDebug.injector.get(ArkSliderRoot)
    const thumbEl = fixture.debugElement.query(By.directive(ArkSliderThumb)).nativeElement as HTMLElement

    expect(root.api().value).toEqual([40])
    expect(thumbEl.getAttribute('aria-valuenow')).toBe('40')

    thumbEl.focus()
    keydown(thumbEl, 'ArrowRight')
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toEqual([41])
    expect(thumbEl.getAttribute('aria-valuenow')).toBe('41')
    expect(fixture.componentInstance.emissions).toEqual([[41]])

    fixture.destroy()
  })

  it('supports React-parity two-thumb arrow key interaction within min/max bounds', () => {
    @Component({
      standalone: true,
      imports: [ArkSliderRoot, ArkSliderControl, ArkSliderTrack, ArkSliderRange, ArkSliderThumb, ArkSliderHiddenInput],
      template: `
        <div arkSlider [min]="-50" [max]="50" [(value)]="value">
          <div arkSliderControl>
            <div arkSliderTrack>
              <div arkSliderRange></div>
            </div>
            <div arkSliderThumb index="0">
              <input arkSliderHiddenInput />
            </div>
            <div arkSliderThumb index="1">
              <input arkSliderHiddenInput />
            </div>
          </div>
        </div>
      `,
    })
    class Host {
      readonly value = signal<number[] | undefined>([-20, 20])
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const thumbs = fixture.debugElement
      .queryAll(By.directive(ArkSliderThumb))
      .map((debug) => debug.nativeElement as HTMLElement)
    const [leftThumb, rightThumb] = thumbs

    leftThumb.focus()
    keydown(leftThumb, 'ArrowRight')
    TestBed.tick()
    fixture.detectChanges()
    expect(leftThumb.getAttribute('aria-valuenow')).toBe('-19')

    keydown(leftThumb, 'ArrowLeft')
    TestBed.tick()
    fixture.detectChanges()
    expect(leftThumb.getAttribute('aria-valuenow')).toBe('-20')

    rightThumb.focus()
    keydown(rightThumb, 'ArrowRight')
    TestBed.tick()
    fixture.detectChanges()
    expect(rightThumb.getAttribute('aria-valuenow')).toBe('21')

    keydown(rightThumb, 'ArrowLeft')
    TestBed.tick()
    fixture.detectChanges()
    expect(rightThumb.getAttribute('aria-valuenow')).toBe('20')
    expect(fixture.componentInstance.value()).toEqual([-20, 20])

    fixture.destroy()
  })

  it('prevents the lower thumb from overlapping the upper thumb', () => {
    @Component({
      standalone: true,
      imports: [ArkSliderRoot, ArkSliderControl, ArkSliderTrack, ArkSliderRange, ArkSliderThumb, ArkSliderHiddenInput],
      template: `
        <div arkSlider [min]="-50" [max]="50" [(value)]="value">
          <div arkSliderControl>
            <div arkSliderTrack>
              <div arkSliderRange></div>
            </div>
            <div arkSliderThumb index="0">
              <input arkSliderHiddenInput />
            </div>
            <div arkSliderThumb index="1">
              <input arkSliderHiddenInput />
            </div>
          </div>
        </div>
      `,
    })
    class Host {
      readonly value = signal<number[] | undefined>([-20, 20])
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const leftThumb = fixture.debugElement.queryAll(By.directive(ArkSliderThumb))[0].nativeElement as HTMLElement

    leftThumb.focus()
    keydown(leftThumb, 'End')
    TestBed.tick()
    fixture.detectChanges()
    expect(leftThumb.getAttribute('aria-valuenow')).toBe('20')

    keydown(leftThumb, 'ArrowRight')
    TestBed.tick()
    fixture.detectChanges()
    expect(leftThumb.getAttribute('aria-valuenow')).toBe('20')
    expect(fixture.componentInstance.value()).toEqual([20, 20])

    fixture.destroy()
  })

  it('reverses horizontal arrow keys in RTL locale', () => {
    @Component({
      standalone: true,
      imports: [ArkSliderRoot, ArkSliderControl, ArkSliderTrack, ArkSliderRange, ArkSliderThumb, ArkSliderHiddenInput],
      template: `
        <div arkSlider [min]="-50" [max]="50" [(value)]="value">
          <div arkSliderControl>
            <div arkSliderTrack>
              <div arkSliderRange></div>
            </div>
            <div arkSliderThumb index="0">
              <input arkSliderHiddenInput />
            </div>
            <div arkSliderThumb index="1">
              <input arkSliderHiddenInput />
            </div>
          </div>
        </div>
      `,
    })
    class Host {
      readonly value = signal<number[] | undefined>([-20, 20])
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host], providers: [provideArkLocale({ locale: 'ar-AE' })] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const thumbs = fixture.debugElement
      .queryAll(By.directive(ArkSliderThumb))
      .map((debug) => debug.nativeElement as HTMLElement)
    const [leftThumb, rightThumb] = thumbs

    leftThumb.focus()
    keydown(leftThumb, 'ArrowRight')
    TestBed.tick()
    fixture.detectChanges()
    expect(leftThumb.getAttribute('aria-valuenow')).toBe('-21')

    keydown(leftThumb, 'ArrowLeft')
    TestBed.tick()
    fixture.detectChanges()
    expect(leftThumb.getAttribute('aria-valuenow')).toBe('-20')

    rightThumb.focus()
    keydown(rightThumb, 'ArrowRight')
    TestBed.tick()
    fixture.detectChanges()
    expect(rightThumb.getAttribute('aria-valuenow')).toBe('19')

    keydown(rightThumb, 'ArrowLeft')
    TestBed.tick()
    fixture.detectChanges()
    expect(rightThumb.getAttribute('aria-valuenow')).toBe('20')

    fixture.destroy()
  })

  it('supports vertical two-thumb arrow key interaction', () => {
    @Component({
      standalone: true,
      imports: [ArkSliderRoot, ArkSliderControl, ArkSliderTrack, ArkSliderRange, ArkSliderThumb, ArkSliderHiddenInput],
      template: `
        <div arkSlider orientation="vertical" [min]="-50" [max]="50" [(value)]="value">
          <div arkSliderControl>
            <div arkSliderTrack>
              <div arkSliderRange></div>
            </div>
            <div arkSliderThumb index="0">
              <input arkSliderHiddenInput />
            </div>
            <div arkSliderThumb index="1">
              <input arkSliderHiddenInput />
            </div>
          </div>
        </div>
      `,
    })
    class Host {
      readonly value = signal<number[] | undefined>([-20, 20])
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const thumbs = fixture.debugElement
      .queryAll(By.directive(ArkSliderThumb))
      .map((debug) => debug.nativeElement as HTMLElement)
    const [leftThumb, rightThumb] = thumbs

    leftThumb.focus()
    keydown(leftThumb, 'ArrowUp')
    TestBed.tick()
    fixture.detectChanges()
    expect(leftThumb.getAttribute('aria-valuenow')).toBe('-19')

    keydown(leftThumb, 'ArrowDown')
    TestBed.tick()
    fixture.detectChanges()
    expect(leftThumb.getAttribute('aria-valuenow')).toBe('-20')

    rightThumb.focus()
    keydown(rightThumb, 'ArrowUp')
    TestBed.tick()
    fixture.detectChanges()
    expect(rightThumb.getAttribute('aria-valuenow')).toBe('21')

    keydown(rightThumb, 'ArrowDown')
    TestBed.tick()
    fixture.detectChanges()
    expect(rightThumb.getAttribute('aria-valuenow')).toBe('20')

    fixture.destroy()
  })

  it('controlled [(value)] round-trips a host signal and does not re-emit when the same value is written twice', () => {
    @Component({
      standalone: true,
      imports: [ArkSliderRoot, ArkSliderControl, ArkSliderTrack, ArkSliderRange, ArkSliderThumb, ArkSliderHiddenInput],
      template: `
        <div arkSlider [(value)]="value" (valueChange)="emissions.push($event)">
          <div arkSliderControl>
            <div arkSliderTrack>
              <div arkSliderRange></div>
            </div>
            <div arkSliderThumb index="0">
              <input arkSliderHiddenInput />
            </div>
          </div>
        </div>
      `,
    })
    class Host {
      readonly value = signal<number[] | undefined>([25])
      readonly emissions: Array<number[] | undefined> = []
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkSliderRoot)).injector.get(ArkSliderRoot)
    fixture.componentInstance.value.set([50])
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toEqual([50])
    const emissionsAfterFirstWrite = fixture.componentInstance.emissions.length

    fixture.componentInstance.value.set([50])
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toEqual([50])
    expect(fixture.componentInstance.emissions.length).toBe(emissionsAfterFirstWrite)

    fixture.destroy()
  })

  it('[defaultValue] property binding seeds uncontrolled slider state', () => {
    @Component({
      standalone: true,
      imports: [ArkSliderRoot, ArkSliderControl, ArkSliderTrack, ArkSliderRange, ArkSliderThumb, ArkSliderHiddenInput],
      template: `
        <div arkSlider [defaultValue]="[75]">
          <div arkSliderControl>
            <div arkSliderTrack>
              <div arkSliderRange></div>
            </div>
            <div arkSliderThumb index="0">
              <input arkSliderHiddenInput />
            </div>
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkSliderRoot)).injector.get(ArkSliderRoot)
    const thumbEl = fixture.debugElement.query(By.directive(ArkSliderThumb)).nativeElement as HTMLElement

    expect(root.api().value).toEqual([75])
    expect(thumbEl.getAttribute('aria-valuenow')).toBe('75')

    fixture.destroy()
  })

  it('disabled slider gates keyboard value changes and marks thumbs disabled', () => {
    @Component({
      standalone: true,
      imports: [ArkSliderRoot, ArkSliderControl, ArkSliderTrack, ArkSliderRange, ArkSliderThumb, ArkSliderHiddenInput],
      template: `
        <div arkSlider disabled [defaultValue]="[40]" (valueChange)="emissions.push($event)">
          <div arkSliderControl>
            <div arkSliderTrack>
              <div arkSliderRange></div>
            </div>
            <div arkSliderThumb index="0">
              <input arkSliderHiddenInput />
            </div>
          </div>
        </div>
      `,
    })
    class Host {
      readonly emissions: Array<number[] | undefined> = []
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkSliderRoot)).injector.get(ArkSliderRoot)
    const thumbEl = fixture.debugElement.query(By.directive(ArkSliderThumb)).nativeElement as HTMLElement

    keydown(thumbEl, 'ArrowRight')
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toEqual([40])
    expect(thumbEl.getAttribute('aria-disabled')).toBe('true')
    expect(fixture.componentInstance.emissions).toEqual([])

    fixture.destroy()
  })

  it('ControlValueAccessor writes form values and propagates user changes back to the form once', () => {
    @Component({
      standalone: true,
      imports: [
        ReactiveFormsModule,
        ArkSliderRoot,
        ArkSliderControl,
        ArkSliderTrack,
        ArkSliderRange,
        ArkSliderThumb,
        ArkSliderHiddenInput,
      ],
      template: `
        <div arkSlider [formControl]="control">
          <div arkSliderControl>
            <div arkSliderTrack>
              <div arkSliderRange></div>
            </div>
            <div arkSliderThumb index="0">
              <input arkSliderHiddenInput />
            </div>
          </div>
        </div>
      `,
    })
    class Host {
      readonly control = new FormControl<number[] | undefined>([10], { nonNullable: true })
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkSliderRoot)).injector.get(ArkSliderRoot)
    const thumbEl = fixture.debugElement.query(By.directive(ArkSliderThumb)).nativeElement as HTMLElement
    const valueChanges = vi.fn()
    const subscription = fixture.componentInstance.control.valueChanges.subscribe(valueChanges)

    fixture.componentInstance.control.setValue([20])
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().value).toEqual([20])

    thumbEl.focus()
    keydown(thumbEl, 'ArrowRight')
    TestBed.tick()
    fixture.detectChanges()

    expect(fixture.componentInstance.control.value).toEqual([21])
    expect(valueChanges).toHaveBeenCalledWith([21])

    subscription.unsubscribe()
    fixture.destroy()
  })

  it('smoke-renders every Angular slider example', () => {
    @Component({
      standalone: true,
      imports: [
        SliderBasicExample,
        SliderCenterOriginExample,
        SliderContextExample,
        SliderDraggingIndicatorExample,
        SliderMinMaxExample,
        SliderOnEventExample,
        SliderRangeExample,
        SliderRootProviderExample,
        SliderStepExample,
        SliderThumbAlignmentExample,
        SliderThumbCollisionExample,
        SliderThumbOverlapExample,
        SliderVerticalExample,
        SliderWithMarksExample,
      ],
      template: `
        <slider-basic-example />
        <slider-center-origin-example />
        <slider-context-example />
        <slider-dragging-indicator-example />
        <slider-min-max-example />
        <slider-on-event-example />
        <slider-range-example />
        <slider-root-provider-example />
        <slider-step-example />
        <slider-thumb-alignment-example />
        <slider-thumb-collision-example />
        <slider-thumb-overlap-example />
        <slider-vertical-example />
        <slider-with-marks-example />
      `,
    })
    class ExamplesHost {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [ExamplesHost] })
    const fixture = TestBed.createComponent(ExamplesHost)
    fixture.detectChanges()

    const roots = fixture.nativeElement.querySelectorAll('[data-scope="slider"][data-part="root"]')
    const thumbs = fixture.nativeElement.querySelectorAll('[data-scope="slider"][data-part="thumb"]')
    const markers = fixture.nativeElement.querySelectorAll('[data-scope="slider"][data-part="marker"]')

    expect(roots.length).toBe(14)
    expect(thumbs.length).toBeGreaterThan(14)
    expect(markers.length).toBe(5)

    fixture.destroy()
  })
})
