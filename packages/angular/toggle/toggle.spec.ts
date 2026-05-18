import { Component, Directive, Injector, inject, signal } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { describe, expect, it } from 'vitest'
import {
  ARK_TOGGLE_CONTEXT,
  ArkToggleIndicator,
  ArkToggleRoot,
  injectArkToggleContext,
  toggleAnatomy,
  useToggle,
  type ToggleApi,
  type ToggleMachine,
  type ToggleMachineProps,
  type ToggleService,
  type UseToggleOptions,
  type UseToggleProps,
  type UseToggleReturn,
} from '@ark-ui/angular/toggle'

@Directive({ selector: '[toggleProbe]', standalone: true, exportAs: 'toggleProbe' })
class ToggleProbe {
  private readonly _injector = inject(Injector)
  get captured(): UseToggleReturn {
    return this._injector.get(ARK_TOGGLE_CONTEXT)
  }
}

describe('@ark-ui/angular/toggle', () => {
  it('exposes the documented public surface', () => {
    expect(typeof ARK_TOGGLE_CONTEXT).toBe('object')
    expect(typeof injectArkToggleContext).toBe('function')
    expect(typeof useToggle).toBe('function')
    expect(typeof toggleAnatomy).toBe('object')
    expect(ArkToggleRoot).toBeDefined()
    expect(ArkToggleIndicator).toBeDefined()

    const _typeOnly:
      | {
          api: ToggleApi
          machine: ToggleMachine
          machineProps: ToggleMachineProps
          service: ToggleService
          options: UseToggleOptions
          props: UseToggleProps
          ret: UseToggleReturn
        }
      | undefined = undefined
    expect(_typeOnly).toBeUndefined()
  })

  it('descendant probe under [arkToggle] receives the Root directive instance via ARK_TOGGLE_CONTEXT', () => {
    @Component({
      standalone: true,
      imports: [ArkToggleRoot, ToggleProbe],
      template: `
        <button arkToggle>
          <span toggleProbe></span>
        </button>
      `,
    })
    class Host {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkToggleRoot))
    const probeDebug = fixture.debugElement.query(By.directive(ToggleProbe))
    const rootInstance = rootDebug.injector.get(ArkToggleRoot)
    const probeInstance = probeDebug.injector.get(ToggleProbe)

    expect(probeInstance.captured).toBe(rootInstance)

    fixture.destroy()
  })

  it('an orphan [arkToggleIndicator] without an ancestor [arkToggle] throws NG0201 missing-provider error', () => {
    @Component({
      standalone: true,
      imports: [ArkToggleIndicator],
      template: '<span arkToggleIndicator></span>',
    })
    class OrphanHost {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [OrphanHost] })

    expect(() => {
      const fixture = TestBed.createComponent(OrphanHost)
      fixture.detectChanges()
      fixture.destroy()
    }).toThrow(/ARK_TOGGLE_CONTEXT|No provider|NG0201/i)
  })

  it('clicking the Toggle root flips api().pressed, updates data-state, and emits (pressedChange) exactly once', () => {
    @Component({
      standalone: true,
      imports: [ArkToggleRoot],
      template: '<button arkToggle (pressedChange)="emissions.push($event)"></button>',
    })
    class Host {
      readonly emissions: Array<boolean | undefined> = []
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkToggleRoot))
    const root = rootDebug.injector.get(ArkToggleRoot)
    const rootEl = rootDebug.nativeElement as HTMLButtonElement

    expect(root.api().pressed).toBe(false)
    expect(rootEl.getAttribute('data-state')).toBe('off')

    rootEl.click()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().pressed).toBe(true)
    expect(rootEl.getAttribute('data-state')).toBe('on')
    expect(fixture.componentInstance.emissions).toEqual([true])

    fixture.destroy()
  })

  it('controlled [(pressed)] round-trips a host signal and does not re-emit when the same value is written twice', () => {
    @Component({
      standalone: true,
      imports: [ArkToggleRoot],
      template: '<button arkToggle [(pressed)]="pressed" (pressedChange)="emissions.push($event)"></button>',
    })
    class Host {
      readonly pressed = signal<boolean | undefined>(false)
      readonly emissions: Array<boolean | undefined> = []
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkToggleRoot))
    const root = rootDebug.injector.get(ArkToggleRoot)

    fixture.componentInstance.pressed.set(true)
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().pressed).toBe(true)
    const emissionsAfterFirstWrite = fixture.componentInstance.emissions.length

    fixture.componentInstance.pressed.set(true)
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().pressed).toBe(true)
    expect(fixture.componentInstance.emissions.length).toBe(emissionsAfterFirstWrite)

    fixture.destroy()
  })

  it('[defaultPressed] property binding starts the toggle pressed', () => {
    @Component({
      standalone: true,
      imports: [ArkToggleRoot],
      template: '<button arkToggle [defaultPressed]="true"></button>',
    })
    class Host {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkToggleRoot))
    const root = rootDebug.injector.get(ArkToggleRoot)
    const rootEl = rootDebug.nativeElement as HTMLButtonElement

    expect(root.api().pressed).toBe(true)
    expect(rootEl.getAttribute('data-state')).toBe('on')

    fixture.destroy()
  })

  it('bare static defaultPressed attribute starts the toggle pressed via booleanAttribute', () => {
    @Component({
      standalone: true,
      imports: [ArkToggleRoot],
      template: '<button arkToggle defaultPressed></button>',
    })
    class Host {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkToggleRoot))
    const root = rootDebug.injector.get(ArkToggleRoot)
    const rootEl = rootDebug.nativeElement as HTMLButtonElement

    expect(root.api().pressed).toBe(true)
    expect(rootEl.getAttribute('data-state')).toBe('on')

    fixture.destroy()
  })

  it('clicking a [disabled] Toggle (property binding) does not change pressed', () => {
    @Component({
      standalone: true,
      imports: [ArkToggleRoot],
      template: '<button arkToggle [disabled]="true" (pressedChange)="emissions.push($event)"></button>',
    })
    class Host {
      readonly emissions: Array<boolean | undefined> = []
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkToggleRoot))
    const root = rootDebug.injector.get(ArkToggleRoot)
    const rootEl = rootDebug.nativeElement as HTMLButtonElement

    expect(root.api().disabled).toBe(true)

    rootEl.click()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().pressed).toBe(false)
    expect(fixture.componentInstance.emissions).toEqual([])

    fixture.destroy()
  })

  it('bare static disabled attribute marks the toggle disabled via booleanAttribute', () => {
    @Component({
      standalone: true,
      imports: [ArkToggleRoot],
      template: '<button arkToggle disabled></button>',
    })
    class Host {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkToggleRoot))
    const root = rootDebug.injector.get(ArkToggleRoot)

    expect(root.api().disabled).toBe(true)

    fixture.destroy()
  })

  it('[arkToggleIndicator] applies api().getIndicatorProps() and reflects pressed via data-state', () => {
    @Component({
      standalone: true,
      imports: [ArkToggleRoot, ArkToggleIndicator],
      template: `
        <button arkToggle>
          <span arkToggleIndicator></span>
        </button>
      `,
    })
    class Host {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const host: HTMLElement = fixture.nativeElement
    const indicatorEl = host.querySelector('[arkToggleIndicator]') as HTMLElement
    expect(indicatorEl.getAttribute('data-scope')).toBe('toggle')
    expect(indicatorEl.getAttribute('data-part')).toBe('indicator')
    expect(indicatorEl.getAttribute('data-state')).toBe('off')

    const rootEl = fixture.debugElement.query(By.directive(ArkToggleRoot)).nativeElement as HTMLButtonElement
    rootEl.click()
    TestBed.tick()
    fixture.detectChanges()

    expect(indicatorEl.getAttribute('data-state')).toBe('on')

    fixture.destroy()
  })

  it('ArkToggleRoot does not declare a separate pressedChange output beyond the model channel', () => {
    const directiveDef = (ArkToggleRoot as unknown as { ɵdir?: { outputs?: Record<string, string> } }).ɵdir
    expect(directiveDef).toBeDefined()
    const outputs = directiveDef?.outputs ?? {}
    const propertyNames = Object.keys(outputs)
    expect(propertyNames).toEqual(['pressedChange'])
    expect(Object.values(outputs)).toEqual(['pressed'])
  })
})
