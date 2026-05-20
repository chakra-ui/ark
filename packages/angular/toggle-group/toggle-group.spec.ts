import { Component, Directive, Injector, inject, signal } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { describe, expect, it } from 'vitest'
import {
  ARK_TOGGLE_GROUP_CONTEXT,
  ArkToggleGroupContext,
  ArkToggleGroupItem,
  ArkToggleGroupRoot,
  ArkToggleGroupRootProvider,
  injectArkToggleGroupContext,
  toggleGroupAnatomy,
  type ToggleGroupApi,
  type ToggleGroupContextTemplate,
  type ToggleGroupElementIds,
  type ToggleGroupItemProps,
  type ToggleGroupItemState,
  type ToggleGroupMachine,
  type ToggleGroupMachineProps,
  type ToggleGroupOrientation,
  type ToggleGroupService,
  type ToggleGroupValueChangeDetails,
  type UseToggleGroupOptions,
  type UseToggleGroupProps,
  type UseToggleGroupReturn,
  useToggleGroup,
} from '@ark-ui/angular/toggle-group'
import { ToggleGroupBasicExample } from './examples/basic'
import { ToggleGroupControlledExample } from './examples/controlled'
import { ToggleGroupMultipleExample } from './examples/multiple'
import { ToggleGroupRootProviderExample } from './examples/root-provider'

type ToggleGroupPublicTypeSmoke = [
  ToggleGroupApi,
  ToggleGroupContextTemplate,
  ToggleGroupElementIds,
  ToggleGroupItemProps,
  ToggleGroupItemState,
  ToggleGroupMachine,
  ToggleGroupMachineProps,
  ToggleGroupOrientation,
  ToggleGroupService,
  ToggleGroupValueChangeDetails,
  UseToggleGroupOptions,
  UseToggleGroupProps,
  UseToggleGroupReturn,
]

@Directive({ selector: '[toggleGroupProbe]', standalone: true, exportAs: 'toggleGroupProbe' })
class ToggleGroupProbe {
  private readonly injector = inject(Injector)
  get captured(): UseToggleGroupReturn {
    return this.injector.get(ARK_TOGGLE_GROUP_CONTEXT)
  }
}

describe('@ark-ui/angular/toggle-group', () => {
  it('exposes the documented public surface', () => {
    expect(typeof ARK_TOGGLE_GROUP_CONTEXT).toBe('object')
    expect(typeof injectArkToggleGroupContext).toBe('function')
    expect(typeof useToggleGroup).toBe('function')
    expect(typeof toggleGroupAnatomy).toBe('object')
    expect(ArkToggleGroupRoot).toBeDefined()
    expect(ArkToggleGroupRootProvider).toBeDefined()
    expect(ArkToggleGroupContext).toBeDefined()
    expect(ArkToggleGroupItem).toBeDefined()
    expect(undefined as ToggleGroupPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('descendant probe under [arkToggleGroup] receives the Root directive instance', () => {
    @Component({
      standalone: true,
      imports: [ArkToggleGroupRoot, ToggleGroupProbe],
      template: '<div arkToggleGroup><span toggleGroupProbe></span></div>',
    })
    class Host {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkToggleGroupRoot)).injector.get(ArkToggleGroupRoot)
    const probe = fixture.debugElement.query(By.directive(ToggleGroupProbe)).injector.get(ToggleGroupProbe)
    expect(probe.captured).toBe(root)
    fixture.destroy()
  })

  it('an orphan item directive without an ancestor root throws missing-provider', () => {
    @Component({
      standalone: true,
      imports: [ArkToggleGroupItem],
      template: '<button arkToggleGroupItem value="left"></button>',
    })
    class OrphanHost {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [OrphanHost] })
    expect(() => TestBed.createComponent(OrphanHost)).toThrow(/ARK_TOGGLE_GROUP_CONTEXT|No provider|NG0201/i)
  })

  it('clicking an item updates value, data-state, and emits once', () => {
    @Component({
      standalone: true,
      imports: [ArkToggleGroupRoot, ArkToggleGroupItem],
      template: `
        <div arkToggleGroup (valueChange)="emissions.push($event)">
          <button arkToggleGroupItem value="left">Left</button>
          <button arkToggleGroupItem value="center">Center</button>
        </div>
      `,
    })
    class Host {
      readonly emissions: Array<string[] | undefined> = []
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkToggleGroupRoot)).injector.get(ArkToggleGroupRoot)
    const items = fixture.debugElement.queryAll(By.directive(ArkToggleGroupItem))
    const center = items[1].nativeElement as HTMLButtonElement

    center.click()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toEqual(['center'])
    expect(center.getAttribute('data-state')).toBe('on')
    expect(fixture.componentInstance.emissions).toEqual([['center']])
    fixture.destroy()
  })

  it('controlled [(value)] round-trips a host signal without duplicate no-op emissions', () => {
    @Component({
      standalone: true,
      imports: [ArkToggleGroupRoot, ArkToggleGroupItem],
      template: `
        <div arkToggleGroup [(value)]="value" (valueChange)="emissions.push($event)">
          <button arkToggleGroupItem value="left">Left</button>
          <button arkToggleGroupItem value="center">Center</button>
        </div>
      `,
    })
    class Host {
      readonly value = signal<string[] | undefined>(['left'])
      readonly emissions: Array<string[] | undefined> = []
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkToggleGroupRoot)).injector.get(ArkToggleGroupRoot)
    fixture.componentInstance.value.set(['center'])
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toEqual(['center'])
    const count = fixture.componentInstance.emissions.length
    fixture.componentInstance.value.set(['center'])
    TestBed.tick()
    fixture.detectChanges()
    expect(fixture.componentInstance.emissions.length).toBe(count)
    fixture.destroy()
  })

  it('[defaultValue] property binding starts selected', () => {
    @Component({
      standalone: true,
      imports: [ArkToggleGroupRoot, ArkToggleGroupItem],
      template:
        '<div arkToggleGroup [defaultValue]="[\'left\']"><button arkToggleGroupItem value="left">Left</button></div>',
    })
    class Host {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkToggleGroupRoot)).injector.get(ArkToggleGroupRoot)
    const item = fixture.debugElement.query(By.directive(ArkToggleGroupItem)).nativeElement as HTMLButtonElement
    expect(root.api().value).toEqual(['left'])
    expect(item.getAttribute('data-state')).toBe('on')
    fixture.destroy()
  })

  it('disabled items do not change the group value', () => {
    @Component({
      standalone: true,
      imports: [ArkToggleGroupRoot, ArkToggleGroupItem],
      template: `
        <div arkToggleGroup>
          <button arkToggleGroupItem value="left" disabled>Left</button>
        </div>
      `,
    })
    class Host {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkToggleGroupRoot)).injector.get(ArkToggleGroupRoot)
    const item = fixture.debugElement.query(By.directive(ArkToggleGroupItem)).nativeElement as HTMLButtonElement
    item.click()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toEqual([])
    fixture.destroy()
  })

  it('example components smoke render their expected parts', () => {
    for (const Example of [
      ToggleGroupBasicExample,
      ToggleGroupControlledExample,
      ToggleGroupMultipleExample,
      ToggleGroupRootProviderExample,
    ]) {
      TestBed.resetTestingModule()
      TestBed.configureTestingModule({ imports: [Example] })
      const fixture = TestBed.createComponent(Example)
      fixture.detectChanges()
      expect(fixture.nativeElement.querySelector('[data-scope="toggle-group"]')).toBeTruthy()
      fixture.destroy()
    }
  })
})
