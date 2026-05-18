import { Component, Directive, Injector, inject, signal } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { describe, expect, it } from 'vitest'
import {
  ARK_PROGRESS_CONTEXT,
  ArkProgressRoot,
  ArkProgressRootProvider,
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

    const _typeOnly:
      | {
          api: ProgressApi
          ids: ProgressElementIds
          machine: ProgressMachine
          machineProps: ProgressMachineProps
          state: ProgressState
          valueChange: ProgressValueChangeDetails
          valueTranslation: ProgressValueTranslationDetails
          view: ProgressViewProps
          options: UseProgressOptions
          props: UseProgressProps
          ret: UseProgressReturn
        }
      | undefined = undefined
    expect(_typeOnly).toBeUndefined()
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
    expect((probeInstance.captured as unknown as ArkProgressRootProvider).resolveValue()).toBe(
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

    let thrown: unknown
    expect(() => {
      try {
        const fixture = TestBed.createComponent(MissingValueHost)
        fixture.detectChanges()
        fixture.destroy()
      } catch (error) {
        thrown = error
        throw error
      }
    }).toThrow(/required input|NG0950/i)
    expect(String((thrown as { code?: unknown } | undefined)?.code ?? thrown)).toMatch(
      /NG0950|-950|value|required input/i,
    )
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

    root.api().setValue(80)
    TestBed.tick()
    fixture.detectChanges()

    expect(fixture.componentInstance.emissions).toEqual([80])
    expect(root.value()).toBe(80)

    fixture.destroy()
  })

  it('ArkProgressRoot does not declare a separate valueChange output beyond the model channel', () => {
    const directiveDef = (ArkProgressRoot as unknown as { ɵdir?: { outputs?: Record<string, string> } }).ɵdir
    expect(directiveDef).toBeDefined()
    const outputs = directiveDef?.outputs ?? {}
    const propertyNames = Object.keys(outputs)
    expect(propertyNames).toEqual(['valueChange'])
    expect(Object.values(outputs)).toEqual(['value'])
  })
})
