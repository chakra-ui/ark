import { Component, Directive, Injector, inject, signal } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { describe, expect, it } from 'vitest'
import {
  ARK_SWITCH_CONTEXT,
  ArkSwitchContext,
  ArkSwitchControl,
  ArkSwitchHiddenInput,
  ArkSwitchLabel,
  ArkSwitchRoot,
  ArkSwitchRootProvider,
  ArkSwitchThumb,
  injectArkSwitchContext,
  switchAnatomy,
  type SwitchContextTemplate,
  useSwitch,
  type SwitchApi,
  type SwitchCheckedChangeDetails,
  type SwitchElementIds,
  type SwitchMachine,
  type SwitchMachineProps,
  type SwitchService,
  type UseSwitchOptions,
  type UseSwitchProps,
  type UseSwitchReturn,
} from '@ark-ui/angular/switch'
import { SwitchBasicExample } from './examples/basic'
import { SwitchContextExample } from './examples/context'
import { SwitchControlledExample } from './examples/controlled'
import { SwitchDisabledExample } from './examples/disabled'
import { SwitchInitialCheckedExample } from './examples/initial-checked'
import { SwitchRootProviderExample } from './examples/root-provider'
import { SwitchWithFieldExample } from './examples/with-field'

type SwitchPublicTypeSmoke = [
  SwitchApi,
  SwitchCheckedChangeDetails,
  SwitchElementIds,
  SwitchMachine,
  SwitchMachineProps,
  SwitchService,
  SwitchContextTemplate,
  UseSwitchOptions,
  UseSwitchProps,
  UseSwitchReturn,
]

@Directive({ selector: '[switchProbe]', standalone: true, exportAs: 'switchProbe' })
class SwitchProbe {
  private readonly injector = inject(Injector)
  get captured(): UseSwitchReturn {
    return this.injector.get(ARK_SWITCH_CONTEXT)
  }
}

describe('@ark-ui/angular/switch', () => {
  it('exposes the documented public surface', () => {
    expect(typeof ARK_SWITCH_CONTEXT).toBe('object')
    expect(typeof injectArkSwitchContext).toBe('function')
    expect(typeof useSwitch).toBe('function')
    expect(typeof switchAnatomy).toBe('object')
    expect(ArkSwitchRoot).toBeDefined()
    expect(ArkSwitchRootProvider).toBeDefined()
    expect(ArkSwitchContext).toBeDefined()
    expect(ArkSwitchControl).toBeDefined()
    expect(ArkSwitchHiddenInput).toBeDefined()
    expect(ArkSwitchLabel).toBeDefined()
    expect(ArkSwitchThumb).toBeDefined()
    expect(undefined as SwitchPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('descendant probe under [arkSwitch] receives the Root directive instance', () => {
    @Component({
      standalone: true,
      imports: [ArkSwitchRoot, SwitchProbe],
      template: '<label arkSwitch><span switchProbe></span></label>',
    })
    class Host {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkSwitchRoot)).injector.get(ArkSwitchRoot)
    const probe = fixture.debugElement.query(By.directive(SwitchProbe)).injector.get(SwitchProbe)
    expect(probe.captured).toBe(root)
    fixture.destroy()
  })

  it('an orphan part directive without an ancestor root throws missing-provider', () => {
    @Component({
      standalone: true,
      imports: [ArkSwitchControl],
      template: '<span arkSwitchControl></span>',
    })
    class OrphanHost {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [OrphanHost] })
    expect(() => TestBed.createComponent(OrphanHost)).toThrow(/ARK_SWITCH_CONTEXT|No provider|NG0201/i)
  })

  it('clicking the hidden input flips checked and emits once', () => {
    @Component({
      standalone: true,
      imports: [ArkSwitchRoot, ArkSwitchControl, ArkSwitchHiddenInput],
      template: `
        <label arkSwitch (checkedChange)="emissions.push($event)">
          <span arkSwitchControl></span>
          <input arkSwitchHiddenInput />
        </label>
      `,
    })
    class Host {
      readonly emissions: Array<boolean | undefined> = []
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkSwitchRoot)).injector.get(ArkSwitchRoot)
    const input = fixture.debugElement.query(By.directive(ArkSwitchHiddenInput)).nativeElement as HTMLInputElement

    expect(root.api().checked).toBe(false)
    input.click()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().checked).toBe(true)
    expect(fixture.componentInstance.emissions).toEqual([true])
    fixture.destroy()
  })

  it('controlled [(checked)] round-trips a host signal and suppresses no-op re-emits', () => {
    @Component({
      standalone: true,
      imports: [ArkSwitchRoot, ArkSwitchHiddenInput],
      template:
        '<label arkSwitch [(checked)]="checked" (checkedChange)="emissions.push($event)"><input arkSwitchHiddenInput /></label>',
    })
    class Host {
      readonly checked = signal<boolean | undefined>(false)
      readonly emissions: Array<boolean | undefined> = []
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkSwitchRoot)).injector.get(ArkSwitchRoot)
    fixture.componentInstance.checked.set(true)
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().checked).toBe(true)
    const count = fixture.componentInstance.emissions.length
    fixture.componentInstance.checked.set(true)
    TestBed.tick()
    fixture.detectChanges()
    expect(fixture.componentInstance.emissions.length).toBe(count)
    fixture.destroy()
  })

  it('bare static defaultChecked attribute starts the switch checked', () => {
    @Component({
      standalone: true,
      imports: [ArkSwitchRoot],
      template: '<label arkSwitch defaultChecked></label>',
    })
    class Host {}

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkSwitchRoot)).injector.get(ArkSwitchRoot)
    expect(root.api().checked).toBe(true)
    fixture.destroy()
  })

  it('reactive FormControl writeValue propagates to the Zag api', () => {
    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkSwitchRoot, ArkSwitchHiddenInput],
      template: '<label arkSwitch [formControl]="control"><input arkSwitchHiddenInput /></label>',
    })
    class Host {
      readonly control = new FormControl<boolean | null>(false)
    }

    TestBed.resetTestingModule()
    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkSwitchRoot)).injector.get(ArkSwitchRoot)
    fixture.componentInstance.control.setValue(true)
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().checked).toBe(true)
    fixture.destroy()
  })

  it('example components smoke render their expected parts', () => {
    for (const Example of [
      SwitchBasicExample,
      SwitchContextExample,
      SwitchControlledExample,
      SwitchDisabledExample,
      SwitchInitialCheckedExample,
      SwitchRootProviderExample,
      SwitchWithFieldExample,
    ]) {
      TestBed.resetTestingModule()
      TestBed.configureTestingModule({ imports: [Example] })
      const fixture = TestBed.createComponent(Example)
      fixture.detectChanges()
      expect(fixture.nativeElement.querySelector('[data-scope="switch"]')).toBeTruthy()
      fixture.destroy()
    }
  })
})
