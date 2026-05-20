import { Component, Directive, Injector, inject, signal, type Type } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { describe, expect, it, vi } from 'vitest'
import {
  ARK_RADIO_GROUP_CONTEXT,
  ARK_RADIO_GROUP_ITEM_CONTEXT,
  ArkRadioGroupContext,
  ArkRadioGroupIndicator,
  ArkRadioGroupItem,
  ArkRadioGroupItemContext,
  ArkRadioGroupItemControl,
  ArkRadioGroupItemHiddenInput,
  ArkRadioGroupItemText,
  ArkRadioGroupLabel,
  ArkRadioGroupRoot,
  ArkRadioGroupRootProvider,
  injectArkRadioGroupContext,
  injectArkRadioGroupItemContext,
  radioGroupAnatomy,
  useRadioGroup,
  type RadioGroupApi,
  type RadioGroupContextTemplate,
  type RadioGroupElementIds,
  type RadioGroupItemContextTemplate,
  type RadioGroupItemProps,
  type RadioGroupItemState,
  type RadioGroupMachine,
  type RadioGroupMachineProps,
  type RadioGroupOrientation,
  type RadioGroupSchema,
  type RadioGroupService,
  type RadioGroupValueChangeDetails,
  type UseRadioGroupOptions,
  type UseRadioGroupProps,
  type UseRadioGroupReturn,
} from './public-api'
import { RadioGroupBasicExample } from './examples/basic'
import { RadioGroupControlledExample } from './examples/controlled'
import { RadioGroupDisabledExample } from './examples/disabled'
import { RadioGroupInitialValueExample } from './examples/initial-value'
import { RadioGroupOrientationExample } from './examples/orientation'
import { RadioGroupRootProviderExample } from './examples/root-provider'
import { RadioGroupWithFieldsetExample } from './examples/with-fieldset'

type RadioGroupPublicTypeSmoke = [
  RadioGroupApi,
  RadioGroupContextTemplate,
  RadioGroupElementIds,
  RadioGroupItemContextTemplate,
  RadioGroupItemProps,
  RadioGroupItemState,
  RadioGroupMachine,
  RadioGroupMachineProps,
  RadioGroupOrientation,
  RadioGroupSchema,
  RadioGroupService,
  RadioGroupValueChangeDetails,
  UseRadioGroupOptions,
  UseRadioGroupProps,
  UseRadioGroupReturn,
]

const flushMicrotasks = async () => {
  for (let i = 0; i < 5; i++) await Promise.resolve()
}

@Directive({ selector: '[radioGroupProbe]', standalone: true, exportAs: 'radioGroupProbe' })
class RadioGroupProbe {
  private readonly _injector = inject(Injector)
  get captured(): UseRadioGroupReturn {
    return this._injector.get(ARK_RADIO_GROUP_CONTEXT)
  }
}

describe('@ark-ui/angular/radio-group', () => {
  it('exposes the documented public surface', () => {
    expect(typeof ARK_RADIO_GROUP_CONTEXT).toBe('object')
    expect(typeof ARK_RADIO_GROUP_ITEM_CONTEXT).toBe('object')
    expect(typeof injectArkRadioGroupContext).toBe('function')
    expect(typeof injectArkRadioGroupItemContext).toBe('function')
    expect(typeof useRadioGroup).toBe('function')
    expect(typeof radioGroupAnatomy).toBe('object')
    expect(ArkRadioGroupRoot).toBeDefined()
    expect(ArkRadioGroupRootProvider).toBeDefined()
    expect(ArkRadioGroupContext).toBeDefined()
    expect(ArkRadioGroupLabel).toBeDefined()
    expect(ArkRadioGroupIndicator).toBeDefined()
    expect(ArkRadioGroupItem).toBeDefined()
    expect(ArkRadioGroupItemContext).toBeDefined()
    expect(ArkRadioGroupItemControl).toBeDefined()
    expect(ArkRadioGroupItemHiddenInput).toBeDefined()
    expect(ArkRadioGroupItemText).toBeDefined()
    expect(undefined as RadioGroupPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('descendant probe under [arkRadioGroup] receives the Root directive via ARK_RADIO_GROUP_CONTEXT', () => {
    @Component({
      standalone: true,
      imports: [ArkRadioGroupRoot, RadioGroupProbe],
      template: `
        <div arkRadioGroup>
          <span radioGroupProbe></span>
        </div>
      `,
    })
    class Host {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkRadioGroupRoot))
    const probeDebug = fixture.debugElement.query(By.directive(RadioGroupProbe))
    expect(probeDebug.injector.get(RadioGroupProbe).captured).toBe(rootDebug.injector.get(ArkRadioGroupRoot))

    fixture.destroy()
  })

  it('an orphan [arkRadioGroupLabel] without an ancestor [arkRadioGroup] throws missing-provider', () => {
    @Component({
      standalone: true,
      imports: [ArkRadioGroupLabel],
      template: '<span arkRadioGroupLabel></span>',
    })
    class OrphanHost {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [OrphanHost] })
    expect(() => TestBed.createComponent(OrphanHost)).toThrow(/ARK_RADIO_GROUP_CONTEXT|No provider|NG0201/i)
  })

  it('an orphan item control without an item parent throws missing item-provider', () => {
    @Component({
      standalone: true,
      imports: [ArkRadioGroupRoot, ArkRadioGroupItemControl],
      template: `
        <div arkRadioGroup>
          <div arkRadioGroupItemControl></div>
        </div>
      `,
    })
    class OrphanHost {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [OrphanHost] })
    expect(() => TestBed.createComponent(OrphanHost)).toThrow(/ARK_RADIO_GROUP_ITEM_CONTEXT|No provider/i)
  })

  it('clicking an item updates api().value, data-state, and emits valueChange exactly once', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkRadioGroupRoot,
        ArkRadioGroupItem,
        ArkRadioGroupItemControl,
        ArkRadioGroupItemText,
        ArkRadioGroupItemHiddenInput,
      ],
      template: `
        <div arkRadioGroup (valueChange)="emissions.push($event)">
          @for (item of items; track item.value) {
            <label arkRadioGroupItem [value]="item.value">
              <span arkRadioGroupItemText>{{ item.label }}</span>
              <span arkRadioGroupItemControl></span>
              <input arkRadioGroupItemHiddenInput />
            </label>
          }
        </div>
      `,
    })
    class Host {
      readonly items = [
        { label: 'React', value: 'react' },
        { label: 'Solid', value: 'solid' },
      ]
      readonly emissions: Array<string | null | undefined> = []
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkRadioGroupRoot))
    const root = rootDebug.injector.get(ArkRadioGroupRoot)
    const items = fixture.debugElement.queryAll(By.directive(ArkRadioGroupItem))
    const controls = fixture.debugElement.queryAll(By.directive(ArkRadioGroupItemControl))

    ;(items[1].nativeElement as HTMLElement).click()
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toBe('solid')
    expect((controls[1].nativeElement as HTMLElement).getAttribute('data-state')).toBe('checked')
    expect(fixture.componentInstance.emissions).toEqual(['solid'])

    fixture.destroy()
  })

  it('controlled [(value)] round-trips a host signal and does not re-emit when the same value is written twice', () => {
    @Component({
      standalone: true,
      imports: [ArkRadioGroupRoot, ArkRadioGroupItem, ArkRadioGroupItemHiddenInput],
      template: `
        <div arkRadioGroup [(value)]="value" (valueChange)="emissions.push($event)">
          <label arkRadioGroupItem value="react"><input arkRadioGroupItemHiddenInput /></label>
          <label arkRadioGroupItem value="solid"><input arkRadioGroupItemHiddenInput /></label>
        </div>
      `,
    })
    class Host {
      readonly value = signal<string | null | undefined>('react')
      readonly emissions: Array<string | null | undefined> = []
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkRadioGroupRoot)).injector.get(ArkRadioGroupRoot)
    fixture.componentInstance.value.set('solid')
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toBe('solid')
    const emissionsAfterFirstWrite = fixture.componentInstance.emissions.length

    fixture.componentInstance.value.set('solid')
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toBe('solid')
    expect(fixture.componentInstance.emissions.length).toBe(emissionsAfterFirstWrite)

    fixture.destroy()
  })

  it('[defaultValue] property binding starts the radio group checked', () => {
    @Component({
      standalone: true,
      imports: [ArkRadioGroupRoot, ArkRadioGroupItem, ArkRadioGroupItemHiddenInput],
      template: `
        <div arkRadioGroup [defaultValue]="'solid'">
          <label arkRadioGroupItem value="react"><input arkRadioGroupItemHiddenInput /></label>
          <label arkRadioGroupItem value="solid"><input arkRadioGroupItemHiddenInput /></label>
        </div>
      `,
    })
    class Host {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkRadioGroupRoot)).injector.get(ArkRadioGroupRoot)
    expect(root.api().value).toBe('solid')

    fixture.destroy()
  })

  it('disabled group and disabled item do not change value', async () => {
    @Component({
      standalone: true,
      imports: [ArkRadioGroupRoot, ArkRadioGroupItem, ArkRadioGroupItemHiddenInput],
      template: `
        <div arkRadioGroup defaultValue="react" disabled>
          <label arkRadioGroupItem value="react"><input arkRadioGroupItemHiddenInput /></label>
          <label arkRadioGroupItem value="solid"><input arkRadioGroupItemHiddenInput /></label>
        </div>
        <div arkRadioGroup #itemsRoot="arkRadioGroup" defaultValue="react">
          <label arkRadioGroupItem value="react"><input arkRadioGroupItemHiddenInput /></label>
          <label arkRadioGroupItem value="solid" disabled><input arkRadioGroupItemHiddenInput /></label>
        </div>
      `,
    })
    class Host {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const roots = fixture.debugElement.queryAll(By.directive(ArkRadioGroupRoot))
    const groupRoot = roots[0].injector.get(ArkRadioGroupRoot)
    const itemRoot = roots[1].injector.get(ArkRadioGroupRoot)
    const items = fixture.debugElement.queryAll(By.directive(ArkRadioGroupItem))

    ;(items[1].nativeElement as HTMLElement).click()
    ;(items[3].nativeElement as HTMLElement).click()
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()

    expect(groupRoot.api().value).toBe('react')
    expect(itemRoot.api().value).toBe('react')

    fixture.destroy()
  })

  it('context directives expose live root api and item state signals', () => {
    @Component({
      standalone: true,
      imports: [
        ArkRadioGroupRoot,
        ArkRadioGroupContext,
        ArkRadioGroupItem,
        ArkRadioGroupItemContext,
        ArkRadioGroupItemHiddenInput,
      ],
      template: `
        <div arkRadioGroup defaultValue="react">
          <ng-template arkRadioGroupContext let-api>
            <span data-testid="root">{{ api().value }}</span>
          </ng-template>
          <label arkRadioGroupItem value="react">
            <input arkRadioGroupItemHiddenInput />
            <ng-template arkRadioGroupItemContext let-item>
              <span data-testid="item">{{ item().checked ? 'Checked' : 'Unchecked' }}</span>
            </ng-template>
          </label>
        </div>
      `,
    })
    class Host {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const host = fixture.nativeElement as HTMLElement
    expect(host.querySelector('[data-testid="root"]')?.textContent?.trim()).toBe('react')
    expect(host.querySelector('[data-testid="item"]')?.textContent?.trim()).toBe('Checked')

    fixture.destroy()
  })

  it('reactive [formControl] writeValue propagates to the Zag api', () => {
    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkRadioGroupRoot, ArkRadioGroupItem, ArkRadioGroupItemHiddenInput],
      template: `
        <div arkRadioGroup [formControl]="control">
          <label arkRadioGroupItem value="react"><input arkRadioGroupItemHiddenInput /></label>
          <label arkRadioGroupItem value="solid"><input arkRadioGroupItemHiddenInput /></label>
        </div>
      `,
    })
    class Host {
      readonly control = new FormControl<string | null>('react')
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkRadioGroupRoot)).injector.get(ArkRadioGroupRoot)
    expect(root.api().value).toBe('react')

    fixture.componentInstance.control.setValue('solid')
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().value).toBe('solid')

    fixture.destroy()
  })

  it('template-driven [(ngModel)] writes reach the Zag api', async () => {
    @Component({
      standalone: true,
      imports: [FormsModule, ArkRadioGroupRoot, ArkRadioGroupItem, ArkRadioGroupItemHiddenInput],
      template: `
        <div arkRadioGroup [(ngModel)]="model" name="framework">
          <label arkRadioGroupItem value="react"><input arkRadioGroupItemHiddenInput /></label>
          <label arkRadioGroupItem value="solid"><input arkRadioGroupItemHiddenInput /></label>
        </div>
      `,
    })
    class Host {
      model = 'solid'
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await fixture.whenStable()
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkRadioGroupRoot)).injector.get(ArkRadioGroupRoot)
    expect(root.api().value).toBe('solid')

    fixture.destroy()
  })

  it('CVA onChange and touched fire once per selected item click', async () => {
    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkRadioGroupRoot, ArkRadioGroupItem, ArkRadioGroupItemHiddenInput],
      template: `
        <div arkRadioGroup [formControl]="control">
          <label arkRadioGroupItem value="react"><input arkRadioGroupItemHiddenInput /></label>
          <label arkRadioGroupItem value="solid"><input arkRadioGroupItemHiddenInput /></label>
        </div>
      `,
    })
    class Host {
      readonly control = new FormControl<string | null>('react')
      readonly changes: Array<string | null> = []

      constructor() {
        this.control.valueChanges.subscribe((value) => this.changes.push(value))
      }
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const items = fixture.debugElement.queryAll(By.directive(ArkRadioGroupItem))
    ;(items[1].nativeElement as HTMLElement).click()
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()

    expect(fixture.componentInstance.changes).toEqual(['solid'])
    expect(fixture.componentInstance.control.touched).toBe(true)

    fixture.destroy()
  })

  it('setDisabledState(true) disables the group through the same path as [disabled]', () => {
    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkRadioGroupRoot, ArkRadioGroupItem, ArkRadioGroupItemHiddenInput],
      template: `
        <div arkRadioGroup [formControl]="control">
          <label arkRadioGroupItem value="react"><input arkRadioGroupItemHiddenInput /></label>
        </div>
      `,
    })
    class Host {
      readonly control = new FormControl<string | null>({ value: 'react', disabled: false })
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootEl = fixture.debugElement.query(By.directive(ArkRadioGroupRoot)).nativeElement as HTMLElement
    expect(rootEl.hasAttribute('data-disabled')).toBe(false)

    fixture.componentInstance.control.disable()
    TestBed.tick()
    fixture.detectChanges()

    expect(rootEl.hasAttribute('data-disabled')).toBe(true)

    fixture.destroy()
  })

  it('mixed form binding + [(value)] emits a dev warning once and the form binding wins', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkRadioGroupRoot, ArkRadioGroupItem, ArkRadioGroupItemHiddenInput],
      template: `
        <div arkRadioGroup [formControl]="control" [(value)]="value">
          <label arkRadioGroupItem value="react"><input arkRadioGroupItemHiddenInput /></label>
          <label arkRadioGroupItem value="solid"><input arkRadioGroupItemHiddenInput /></label>
        </div>
      `,
    })
    class Host {
      readonly control = new FormControl<string | null>('react')
      readonly value = signal<string | null | undefined>('solid')
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    TestBed.tick()
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkRadioGroupRoot)).injector.get(ArkRadioGroupRoot)
    fixture.componentInstance.control.setValue('solid')
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toBe('solid')
    const warnCalls = warn.mock.calls.filter((args) => String(args[0]).includes('ArkRadioGroupRoot'))
    expect(warnCalls.length).toBe(1)

    fixture.destroy()
    warn.mockRestore()
  })

  it('example components render radio group parts with Zag data attributes', () => {
    const examples: Array<Type<unknown>> = [
      RadioGroupBasicExample,
      RadioGroupControlledExample,
      RadioGroupDisabledExample,
      RadioGroupInitialValueExample,
      RadioGroupOrientationExample,
      RadioGroupRootProviderExample,
      RadioGroupWithFieldsetExample,
    ]

    for (const Example of examples) {
      TestBed.resetTestingModule()
      TestBed.configureTestingModule({ imports: [Example] })
      const fixture = TestBed.createComponent(Example)
      fixture.detectChanges()

      const rootDebug =
        fixture.debugElement.query(By.directive(ArkRadioGroupRoot)) ??
        fixture.debugElement.query(By.directive(ArkRadioGroupRootProvider))
      const itemDebug = fixture.debugElement.query(By.directive(ArkRadioGroupItem))
      const controlDebug = fixture.debugElement.query(By.directive(ArkRadioGroupItemControl))

      expect((rootDebug.nativeElement as HTMLElement).getAttribute('data-scope')).toBe('radio-group')
      expect((rootDebug.nativeElement as HTMLElement).getAttribute('data-part')).toBe('root')
      expect((itemDebug.nativeElement as HTMLElement).getAttribute('data-part')).toBe('item')
      expect((controlDebug.nativeElement as HTMLElement).getAttribute('data-part')).toBe('item-control')

      fixture.destroy()
    }
  })
})
