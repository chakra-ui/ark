import { Component, Directive, Injector, inject, signal } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { describe, expect, it } from 'vitest'
import {
  ARK_SEGMENT_GROUP_CONTEXT,
  ARK_SEGMENT_GROUP_ITEM_CONTEXT,
  ARK_SEGMENT_GROUP_ITEM_PROPS_CONTEXT,
  ArkSegmentGroupContext,
  ArkSegmentGroupIndicator,
  ArkSegmentGroupItem,
  ArkSegmentGroupItemContext,
  ArkSegmentGroupItemControl,
  ArkSegmentGroupItemHiddenInput,
  ArkSegmentGroupItemText,
  ArkSegmentGroupLabel,
  ArkSegmentGroupRoot,
  ArkSegmentGroupRootProvider,
  injectArkSegmentGroupContext,
  injectArkSegmentGroupItemContext,
  injectArkSegmentGroupItemPropsContext,
  segmentGroupAnatomy,
  useSegmentGroup,
  type SegmentGroupApi,
  type SegmentGroupContextTemplate,
  type SegmentGroupItemContextTemplate,
  type SegmentGroupMachine,
  type SegmentGroupMachineProps,
  type SegmentGroupService,
  type UseSegmentGroupOptions,
  type UseSegmentGroupProps,
  type UseSegmentGroupReturn,
} from './public-api'
import { SegmentGroupBasicExample } from './examples/basic'
import { SegmentGroupConditionalExample } from './examples/conditional'
import { SegmentGroupControlledExample } from './examples/controlled'
import { SegmentGroupDisabledExample } from './examples/disabled'
import { SegmentGroupRootProviderExample } from './examples/root-provider'

type SegmentGroupPublicTypeSmoke = [
  SegmentGroupApi,
  SegmentGroupMachine,
  SegmentGroupMachineProps,
  SegmentGroupService,
  SegmentGroupContextTemplate,
  SegmentGroupItemContextTemplate,
  UseSegmentGroupOptions,
  UseSegmentGroupProps,
  UseSegmentGroupReturn,
]

const flush = async () => {
  for (let i = 0; i < 5; i++) await Promise.resolve()
}

@Directive({ selector: '[segmentGroupProbe]', standalone: true, exportAs: 'segmentGroupProbe' })
class SegmentGroupProbe {
  private readonly _injector = inject(Injector)
  get captured(): UseSegmentGroupReturn {
    return this._injector.get(ARK_SEGMENT_GROUP_CONTEXT)
  }
}

describe('@ark-ui/angular/segment-group', () => {
  it('exposes the documented public surface', () => {
    expect(typeof ARK_SEGMENT_GROUP_CONTEXT).toBe('object')
    expect(typeof ARK_SEGMENT_GROUP_ITEM_CONTEXT).toBe('object')
    expect(typeof ARK_SEGMENT_GROUP_ITEM_PROPS_CONTEXT).toBe('object')
    expect(typeof injectArkSegmentGroupContext).toBe('function')
    expect(typeof injectArkSegmentGroupItemContext).toBe('function')
    expect(typeof injectArkSegmentGroupItemPropsContext).toBe('function')
    expect(typeof useSegmentGroup).toBe('function')
    expect(typeof segmentGroupAnatomy).toBe('object')
    expect(ArkSegmentGroupRoot).toBeDefined()
    expect(ArkSegmentGroupRootProvider).toBeDefined()
    expect(ArkSegmentGroupContext).toBeDefined()
    expect(ArkSegmentGroupLabel).toBeDefined()
    expect(ArkSegmentGroupIndicator).toBeDefined()
    expect(ArkSegmentGroupItem).toBeDefined()
    expect(ArkSegmentGroupItemContext).toBeDefined()
    expect(ArkSegmentGroupItemText).toBeDefined()
    expect(ArkSegmentGroupItemControl).toBeDefined()
    expect(ArkSegmentGroupItemHiddenInput).toBeDefined()
    expect(undefined as SegmentGroupPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('descendant probe under [arkSegmentGroupRoot] receives the Root directive instance via context DI', () => {
    @Component({
      standalone: true,
      imports: [ArkSegmentGroupRoot, SegmentGroupProbe],
      template: `
        <div arkSegmentGroupRoot>
          <span segmentGroupProbe></span>
        </div>
      `,
    })
    class Host {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkSegmentGroupRoot))
    const probeDebug = fixture.debugElement.query(By.directive(SegmentGroupProbe))
    const rootInstance = rootDebug.injector.get(ArkSegmentGroupRoot)
    const probeInstance = probeDebug.injector.get(SegmentGroupProbe)

    expect(probeInstance.captured).toBe(rootInstance)

    fixture.destroy()
  })

  it('an orphan item part without an ancestor [arkSegmentGroupItem] throws a missing-provider error', () => {
    @Component({
      standalone: true,
      imports: [ArkSegmentGroupRoot, ArkSegmentGroupItemText],
      template: `
        <div arkSegmentGroupRoot>
          <span arkSegmentGroupItemText>orphan</span>
        </div>
      `,
    })
    class OrphanHost {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [OrphanHost] })

    expect(() => TestBed.createComponent(OrphanHost)).toThrow(/ARK_SEGMENT_GROUP_ITEM_PROPS_CONTEXT|No provider/i)
  })

  it('clicking an item updates the api value, data-state, and emits (valueChange) once', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkSegmentGroupRoot,
        ArkSegmentGroupIndicator,
        ArkSegmentGroupItem,
        ArkSegmentGroupItemText,
        ArkSegmentGroupItemControl,
        ArkSegmentGroupItemHiddenInput,
      ],
      template: `
        <div arkSegmentGroupRoot defaultValue="React" (valueChange)="emissions.push($event)">
          <div arkSegmentGroupIndicator></div>
          @for (framework of frameworks; track framework) {
            <label arkSegmentGroupItem [value]="framework">
              <span arkSegmentGroupItemText>{{ framework }}</span>
              <div arkSegmentGroupItemControl></div>
              <input arkSegmentGroupItemHiddenInput />
            </label>
          }
        </div>
      `,
    })
    class Host {
      readonly frameworks = ['React', 'Solid', 'Svelte', 'Vue']
      readonly emissions: Array<string | null | undefined> = []
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkSegmentGroupRoot))
    const root = rootDebug.injector.get(ArkSegmentGroupRoot)
    const items = fixture.debugElement.queryAll(By.directive(ArkSegmentGroupItem))

    expect(root.api().value).toBe('React')
    expect((items[0].nativeElement as HTMLElement).getAttribute('data-state')).toBe('checked')
    ;(items[1].nativeElement as HTMLElement).click()
    await flush()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toBe('Solid')
    expect((items[1].nativeElement as HTMLElement).getAttribute('data-state')).toBe('checked')
    expect(fixture.componentInstance.emissions).toEqual(['Solid'])

    fixture.destroy()
  })

  it('controlled [(value)] round-trips a host signal and does not re-emit when the same value is written twice', () => {
    @Component({
      standalone: true,
      imports: [ArkSegmentGroupRoot, ArkSegmentGroupItem, ArkSegmentGroupItemText],
      template: `
        <div arkSegmentGroupRoot [(value)]="value" (valueChange)="emissions.push($event)">
          @for (framework of frameworks; track framework) {
            <label arkSegmentGroupItem [value]="framework">
              <span arkSegmentGroupItemText>{{ framework }}</span>
            </label>
          }
        </div>
      `,
    })
    class Host {
      readonly frameworks = ['React', 'Solid', 'Svelte', 'Vue']
      readonly value = signal<string | null | undefined>(null)
      readonly emissions: Array<string | null | undefined> = []
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkSegmentGroupRoot))
    const root = rootDebug.injector.get(ArkSegmentGroupRoot)

    fixture.componentInstance.value.set('Vue')
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toBe('Vue')
    const emissionsAfterFirstWrite = fixture.componentInstance.emissions.length

    fixture.componentInstance.value.set('Vue')
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toBe('Vue')
    expect(fixture.componentInstance.emissions.length).toBe(emissionsAfterFirstWrite)

    fixture.destroy()
  })

  it('supports static and property-bound defaultValue seeding', () => {
    @Component({
      standalone: true,
      imports: [ArkSegmentGroupRoot, ArkSegmentGroupItem],
      template: `
        <div id="static" arkSegmentGroupRoot defaultValue="React">
          <label arkSegmentGroupItem value="React"></label>
          <label arkSegmentGroupItem value="Solid"></label>
        </div>
        <div id="bound" arkSegmentGroupRoot [defaultValue]="defaultValue">
          <label arkSegmentGroupItem value="React"></label>
          <label arkSegmentGroupItem value="Solid"></label>
        </div>
      `,
    })
    class Host {
      readonly defaultValue = 'Solid'
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const roots = fixture.debugElement.queryAll(By.directive(ArkSegmentGroupRoot))

    expect(roots[0].injector.get(ArkSegmentGroupRoot).api().value).toBe('React')
    expect(roots[1].injector.get(ArkSegmentGroupRoot).api().value).toBe('Solid')

    fixture.destroy()
  })

  it('does not change value when a disabled item is clicked', async () => {
    @Component({
      standalone: true,
      imports: [ArkSegmentGroupRoot, ArkSegmentGroupItem, ArkSegmentGroupItemText],
      template: `
        <div arkSegmentGroupRoot defaultValue="React">
          <label arkSegmentGroupItem value="React"><span arkSegmentGroupItemText>React</span></label>
          <label arkSegmentGroupItem value="Svelte" disabled><span arkSegmentGroupItemText>Svelte</span></label>
        </div>
      `,
    })
    class Host {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkSegmentGroupRoot))
    const root = rootDebug.injector.get(ArkSegmentGroupRoot)
    const disabledItem = fixture.debugElement.queryAll(By.directive(ArkSegmentGroupItem))[1]
      .nativeElement as HTMLElement

    expect(disabledItem.hasAttribute('data-disabled')).toBe(true)
    disabledItem.click()
    await flush()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toBe('React')

    fixture.destroy()
  })

  it('forwards name and form to item hidden inputs', () => {
    @Component({
      standalone: true,
      imports: [ArkSegmentGroupRoot, ArkSegmentGroupItem, ArkSegmentGroupItemHiddenInput],
      template: `
        <div arkSegmentGroupRoot name="framework" form="settings">
          <label arkSegmentGroupItem value="React"><input arkSegmentGroupItemHiddenInput /></label>
        </div>
      `,
    })
    class Host {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const input = fixture.debugElement.query(By.directive(ArkSegmentGroupItemHiddenInput))
      .nativeElement as HTMLInputElement

    expect(input.type).toBe('radio')
    expect(input.name).toBe('framework')
    expect(input.getAttribute('form')).toBe('settings')
    expect(input.value).toBe('React')

    fixture.destroy()
  })

  it('writes form-control values through the same value model and disables through CVA state', () => {
    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkSegmentGroupRoot, ArkSegmentGroupItem, ArkSegmentGroupItemText],
      template: `
        <div arkSegmentGroupRoot [formControl]="control">
          @for (framework of frameworks; track framework) {
            <label arkSegmentGroupItem [value]="framework">
              <span arkSegmentGroupItemText>{{ framework }}</span>
            </label>
          }
        </div>
      `,
    })
    class Host {
      readonly frameworks = ['React', 'Solid', 'Svelte', 'Vue']
      readonly control = new FormControl<string | null>('React')
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkSegmentGroupRoot))
    const root = rootDebug.injector.get(ArkSegmentGroupRoot)
    const rootEl = rootDebug.nativeElement as HTMLElement

    expect(root.api().value).toBe('React')

    fixture.componentInstance.control.setValue('Svelte')
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toBe('Svelte')

    fixture.componentInstance.control.disable()
    TestBed.tick()
    fixture.detectChanges()

    expect(rootEl.hasAttribute('data-disabled')).toBe(true)

    fixture.destroy()
  })

  it('smoke-renders every React-parity example', () => {
    const examples = [
      SegmentGroupBasicExample,
      SegmentGroupControlledExample,
      SegmentGroupDisabledExample,
      SegmentGroupRootProviderExample,
      SegmentGroupConditionalExample,
    ]

    for (const Example of examples) {
      TestBed.resetTestingModule()
      TestBed.configureTestingModule({ imports: [Example] })
      const fixture = TestBed.createComponent(Example)
      fixture.detectChanges()
      const root = fixture.nativeElement.querySelector('[data-scope="radio-group"]')
      expect(root || fixture.nativeElement.querySelector('button')).toBeTruthy()
      fixture.destroy()
    }
  })
})
