import { Component, Directive, Injector, inject, signal } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { describe, expect, it } from 'vitest'
import {
  ARK_PROGRESS_CONTEXT,
  ArkProgressCircle,
  ArkProgressCircleRange,
  ArkProgressCircleTrack,
  ArkProgressLabel,
  ArkProgressRange,
  ArkProgressRoot,
  ArkProgressRootProvider,
  ArkProgressTrack,
  ArkProgressValueText,
  ArkProgressView,
  injectArkProgressContext,
  progressAnatomy,
  useProgress,
  type ProgressApi,
  type ProgressElementIds,
  type ProgressMachine,
  type ProgressMachineProps,
  type ProgressState,
  type ProgressValueChangeDetails,
  type ProgressValueTranslationDetails,
  type ProgressViewProps,
  type UseProgressOptions,
  type UseProgressProps,
  type UseProgressReturn,
} from '@ark-ui/angular/progress'
import { ProgressLinearBasicExample } from './examples/linear/basic'
import { ProgressLinearIndeterminateExample } from './examples/linear/indeterminate'
import { ProgressLinearRootProviderExample } from './examples/linear/root-provider'
import { ProgressCircularBasicExample } from './examples/circular/basic'
import { ProgressCircularRootProviderExample } from './examples/circular/root-provider'

type ProgressPublicTypeSmoke = [
  ProgressApi,
  ProgressElementIds,
  ProgressMachine,
  ProgressMachineProps,
  ProgressState,
  ProgressValueChangeDetails,
  ProgressValueTranslationDetails,
  ProgressViewProps,
  UseProgressOptions,
  UseProgressProps,
  UseProgressReturn,
]

@Directive({ selector: '[progressProbe]', standalone: true, exportAs: 'progressProbe' })
class ProgressProbe {
  private readonly _injector = inject(Injector)
  get captured(): UseProgressReturn {
    return this._injector.get(ARK_PROGRESS_CONTEXT)
  }
}

describe('@ark-ui/angular/progress', () => {
  it('exposes the documented public surface', () => {
    expect(typeof ARK_PROGRESS_CONTEXT).toBe('object')
    expect(typeof injectArkProgressContext).toBe('function')
    expect(typeof useProgress).toBe('function')
    expect(typeof progressAnatomy).toBe('object')
    expect(ArkProgressRoot).toBeDefined()
    expect(ArkProgressRootProvider).toBeDefined()
    expect(undefined as ProgressPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('descendant probe under [arkProgress] receives the Root directive instance via ARK_PROGRESS_CONTEXT', () => {
    @Component({
      standalone: true,
      imports: [ArkProgressRoot, ProgressProbe],
      template: `
        <div arkProgress>
          <span progressProbe></span>
        </div>
      `,
    })
    class Host {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkProgressRoot))
    const probeDebug = fixture.debugElement.query(By.directive(ProgressProbe))
    const rootInstance = rootDebug.injector.get(ArkProgressRoot)
    const probeInstance = probeDebug.injector.get(ProgressProbe)

    expect(probeInstance.captured).toBe(rootInstance)

    fixture.destroy()
  })

  it('descendant probe under [arkProgressRootProvider] receives the provided progress service', () => {
    @Component({
      standalone: true,
      imports: [ArkProgressRootProvider, ProgressProbe],
      template: `
        <div arkProgressRootProvider [value]="progress">
          <span progressProbe></span>
        </div>
      `,
    })
    class Host {
      readonly progress = useProgress({ context: () => ({}) })
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const probeDebug = fixture.debugElement.query(By.directive(ProgressProbe))
    const probeInstance = probeDebug.injector.get(ProgressProbe)

    expect(probeInstance.captured.service).toBe(fixture.componentInstance.progress.service)
    expect((probeInstance.captured as unknown as ArkProgressRootProvider).value()).toBe(
      fixture.componentInstance.progress,
    )

    fixture.destroy()
  })

  it('[arkProgressRootProvider] without [value] throws Angular required-input error (NG0950)', () => {
    @Component({
      standalone: true,
      imports: [ArkProgressRootProvider],
      template: '<div arkProgressRootProvider></div>',
    })
    class MissingValueHost {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [MissingValueHost] })

    let fixture: { detectChanges(): void; destroy(): void } | undefined
    expect(() => {
      fixture = TestBed.createComponent(MissingValueHost)
      fixture.detectChanges()
    }).toThrow(/required input|NG0950/i)
    fixture?.destroy()
  })

  it('updating [value] changes api().value', () => {
    @Component({
      standalone: true,
      imports: [ArkProgressRoot],
      template: '<div arkProgress [value]="current()"></div>',
    })
    class ValueHost {
      readonly current = signal<number | null | undefined>(25)
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [ValueHost] })
    const fixture = TestBed.createComponent(ValueHost)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkProgressRoot))
    const root = rootDebug.injector.get(ArkProgressRoot)
    expect(root.api().value).toBe(25)

    fixture.componentInstance.current.set(75)
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toBe(75)

    fixture.destroy()
  })

  it('Zag onValueChange writes through the model exactly once', () => {
    @Component({
      standalone: true,
      imports: [ArkProgressRoot],
      template: '<div arkProgress [defaultValue]="20" (valueChange)="emissions.push($event)"></div>',
    })
    class Host {
      readonly emissions: Array<number | null | undefined> = []
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkProgressRoot))
    const root = rootDebug.injector.get(ArkProgressRoot)

    const emissionsBeforeSet = fixture.componentInstance.emissions.length

    root.api().setValue(80)
    TestBed.tick()
    fixture.detectChanges()

    expect(fixture.componentInstance.emissions.at(-1)).toBe(80)
    expect(fixture.componentInstance.emissions).toHaveLength(emissionsBeforeSet + 1)
    expect(root.value()).toBe(80)
    expect('valueChange' in root).toBe(false)

    fixture.destroy()
  })

  it('linear part directives apply data-scope="progress" and the expected data-part under [arkProgress]', () => {
    @Component({
      standalone: true,
      imports: [
        ArkProgressRoot,
        ArkProgressLabel,
        ArkProgressTrack,
        ArkProgressRange,
        ArkProgressValueText,
        ArkProgressView,
      ],
      template: `
        <div arkProgress [defaultValue]="40">
          <span arkProgressLabel>Label</span>
          <div arkProgressTrack>
            <div arkProgressRange></div>
          </div>
          <span arkProgressValueText>Value</span>
          <span arkProgressView state="loading">Loading</span>
        </div>
      `,
    })
    class Host {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const host: HTMLElement = fixture.nativeElement

    const labelEl = host.querySelector('[arkProgressLabel]') as HTMLElement
    expect(labelEl.getAttribute('data-scope')).toBe('progress')
    expect(labelEl.getAttribute('data-part')).toBe('label')

    const trackEl = host.querySelector('[arkProgressTrack]') as HTMLElement
    expect(trackEl.getAttribute('data-scope')).toBe('progress')
    expect(trackEl.getAttribute('data-part')).toBe('track')

    const rangeEl = host.querySelector('[arkProgressRange]') as HTMLElement
    expect(rangeEl.getAttribute('data-scope')).toBe('progress')
    expect(rangeEl.getAttribute('data-part')).toBe('range')

    const valueTextEl = host.querySelector('[arkProgressValueText]') as HTMLElement
    expect(valueTextEl.getAttribute('data-scope')).toBe('progress')
    expect(valueTextEl.getAttribute('data-part')).toBe('value-text')

    const viewEl = host.querySelector('[arkProgressView]') as HTMLElement
    expect(viewEl.getAttribute('data-scope')).toBe('progress')
    expect(viewEl.getAttribute('data-part')).toBe('view')

    fixture.destroy()
  })

  it('circular part directives apply data-scope="progress" and the expected data-part under [arkProgress]', () => {
    @Component({
      standalone: true,
      imports: [ArkProgressRoot, ArkProgressCircle, ArkProgressCircleTrack, ArkProgressCircleRange],
      template: `
        <div arkProgress [defaultValue]="40">
          <svg arkProgressCircle>
            <circle arkProgressCircleTrack></circle>
            <circle arkProgressCircleRange></circle>
          </svg>
        </div>
      `,
    })
    class Host {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const host: HTMLElement = fixture.nativeElement

    const circleEl = host.querySelector('svg[arkProgressCircle]') as SVGSVGElement
    expect(circleEl.getAttribute('data-scope')).toBe('progress')
    expect(circleEl.getAttribute('data-part')).toBe('circle')

    const circleTrackEl = host.querySelector('circle[arkProgressCircleTrack]') as SVGCircleElement
    expect(circleTrackEl.getAttribute('data-scope')).toBe('progress')
    expect(circleTrackEl.getAttribute('data-part')).toBe('circle-track')

    const circleRangeEl = host.querySelector('circle[arkProgressCircleRange]') as SVGCircleElement
    expect(circleRangeEl.getAttribute('data-scope')).toBe('progress')
    expect(circleRangeEl.getAttribute('data-part')).toBe('circle-range')

    fixture.destroy()
  })

  it('an orphan [arkProgressLabel] without an ancestor [arkProgress] throws NG0201 missing-provider error', () => {
    @Component({
      standalone: true,
      imports: [ArkProgressLabel],
      template: '<span arkProgressLabel></span>',
    })
    class OrphanHost {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [OrphanHost] })

    expect(() => TestBed.createComponent(OrphanHost)).toThrow(/ARK_PROGRESS_CONTEXT|No provider|NG0201/i)
  })

  it('[arkProgressView] without required [state] throws Angular required-input error (NG0950)', () => {
    @Component({
      standalone: true,
      imports: [ArkProgressRoot, ArkProgressView],
      template: `
        <div arkProgress>
          <span arkProgressView></span>
        </div>
      `,
    })
    class MissingStateHost {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [MissingStateHost] })

    let fixture: { detectChanges(): void; destroy(): void } | undefined
    expect(() => {
      fixture = TestBed.createComponent(MissingStateHost)
      fixture.detectChanges()
    }).toThrow(/required input|NG0950/i)
    fixture?.destroy()
  })

  it('linear basic example mounts with data-scope="progress" and data-part="root"', () => {
    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [ProgressLinearBasicExample] })
    const fixture = TestBed.createComponent(ProgressLinearBasicExample)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkProgressRoot))
    const rootEl = rootDebug.nativeElement as HTMLElement
    expect(rootEl.getAttribute('data-scope')).toBe('progress')
    expect(rootEl.getAttribute('data-part')).toBe('root')

    const host: HTMLElement = fixture.nativeElement
    const labelEl = host.querySelector('[arkProgressLabel]') as HTMLElement
    expect(labelEl.getAttribute('data-part')).toBe('label')
    const trackEl = host.querySelector('[arkProgressTrack]') as HTMLElement
    expect(trackEl.getAttribute('data-part')).toBe('track')
    const rangeEl = host.querySelector('[arkProgressRange]') as HTMLElement
    expect(rangeEl.getAttribute('data-part')).toBe('range')

    fixture.destroy()
  })

  it('linear indeterminate example sets api().indeterminate === true and data-state="indeterminate"', () => {
    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [ProgressLinearIndeterminateExample] })
    const fixture = TestBed.createComponent(ProgressLinearIndeterminateExample)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkProgressRoot))
    const root = rootDebug.injector.get(ArkProgressRoot)
    expect(root.api().indeterminate).toBe(true)

    const rootEl = rootDebug.nativeElement as HTMLElement
    expect(rootEl.getAttribute('data-state')).toBe('indeterminate')

    fixture.destroy()
  })

  it('circular basic example mounts with data-scope="progress" and the circle parts present', () => {
    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [ProgressCircularBasicExample] })
    const fixture = TestBed.createComponent(ProgressCircularBasicExample)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkProgressRoot))
    const rootEl = rootDebug.nativeElement as HTMLElement
    expect(rootEl.getAttribute('data-scope')).toBe('progress')
    expect(rootEl.getAttribute('data-part')).toBe('root')

    const host: HTMLElement = fixture.nativeElement
    const circleEl = host.querySelector('svg[arkProgressCircle]') as SVGSVGElement
    expect(circleEl.getAttribute('data-scope')).toBe('progress')
    expect(circleEl.getAttribute('data-part')).toBe('circle')

    fixture.destroy()
  })

  it('linear root-provider example wires useProgress() through ArkProgressRootProvider', () => {
    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [ProgressLinearRootProviderExample] })
    const fixture = TestBed.createComponent(ProgressLinearRootProviderExample)
    fixture.detectChanges()

    const providerDebug = fixture.debugElement.query(By.directive(ArkProgressRootProvider))
    const provider = providerDebug.injector.get(ArkProgressRootProvider)
    expect(provider.service).toBe(fixture.componentInstance.progress.service)

    fixture.componentInstance.setToMax()
    TestBed.tick()
    fixture.detectChanges()

    expect(fixture.componentInstance.progress.api().value).toBe(fixture.componentInstance.progress.api().max)

    fixture.destroy()
  })

  it('circular root-provider example wires useProgress() through ArkProgressRootProvider', () => {
    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [ProgressCircularRootProviderExample] })
    const fixture = TestBed.createComponent(ProgressCircularRootProviderExample)
    fixture.detectChanges()

    const providerDebug = fixture.debugElement.query(By.directive(ArkProgressRootProvider))
    const provider = providerDebug.injector.get(ArkProgressRootProvider)
    expect(provider.service).toBe(fixture.componentInstance.progress.service)

    fixture.destroy()
  })

  it('[defaultValue] seeds api().value on first change detection without emitting (valueChange)', () => {
    @Component({
      standalone: true,
      imports: [ArkProgressRoot],
      template: '<div arkProgress [defaultValue]="42" (valueChange)="emissions.push($event)"></div>',
    })
    class Host {
      readonly emissions: Array<number | null | undefined> = []
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkProgressRoot))
    const root = rootDebug.injector.get(ArkProgressRoot)

    expect(root.api().value).toBe(42)
    expect(fixture.componentInstance.emissions).toEqual([])

    fixture.destroy()
  })
})
