import { Component, signal } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  ARK_PASSWORD_INPUT_CONTEXT,
  ArkPasswordInputControl,
  ArkPasswordInputIndicator,
  ArkPasswordInputInput,
  ArkPasswordInputLabel,
  ArkPasswordInputRoot,
  ArkPasswordInputRootProvider,
  ArkPasswordInputVisibilityTrigger,
  injectArkPasswordInputContext,
  passwordInputAnatomy,
  usePasswordInput,
  type PasswordInputApi,
  type PasswordInputMachine,
  type PasswordInputMachineProps,
  type PasswordInputService,
  type UsePasswordInputOptions,
  type UsePasswordInputProps,
  type UsePasswordInputReturn,
} from '@ark-ui/angular/password-input'
import { ArkFieldRoot } from '@ark-ui/angular/field'

type PasswordInputPublicTypeSmoke = [
  PasswordInputApi,
  PasswordInputMachine,
  PasswordInputMachineProps,
  PasswordInputService,
  UsePasswordInputOptions,
  UsePasswordInputProps,
  UsePasswordInputReturn,
]

const typeInto = (el: HTMLInputElement, value: string) => {
  el.value = value
  el.dispatchEvent(new InputEvent('input', { bubbles: true, data: value, inputType: 'insertText' }))
}

const clickTrigger = (el: HTMLElement) => {
  el.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, button: 0, pointerType: 'mouse' }))
  el.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, button: 0, pointerType: 'mouse' }))
}

describe('@ark-ui/angular/password-input', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_PASSWORD_INPUT_CONTEXT).toBe('object')
    expect(typeof injectArkPasswordInputContext).toBe('function')
    expect(typeof usePasswordInput).toBe('function')
    expect(typeof passwordInputAnatomy).toBe('object')
    expect(ArkPasswordInputRoot).toBeDefined()
    expect(ArkPasswordInputRootProvider).toBeDefined()
    expect(ArkPasswordInputLabel).toBeDefined()
    expect(ArkPasswordInputControl).toBeDefined()
    expect(ArkPasswordInputInput).toBeDefined()
    expect(ArkPasswordInputVisibilityTrigger).toBeDefined()
    expect(ArkPasswordInputIndicator).toBeDefined()
    expect(undefined as PasswordInputPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('an orphan part directive without an ancestor root throws missing-provider', () => {
    @Component({
      standalone: true,
      imports: [ArkPasswordInputInput],
      template: '<input arkPasswordInputInput />',
    })
    class Orphan {}

    TestBed.configureTestingModule({ imports: [Orphan] })
    expect(() => TestBed.createComponent(Orphan)).toThrow(/ARK_PASSWORD_INPUT_CONTEXT|No provider|NG0201/i)
  })

  it('visibility trigger toggles input type between password and text', () => {
    @Component({
      standalone: true,
      imports: [
        ArkPasswordInputRoot,
        ArkPasswordInputControl,
        ArkPasswordInputInput,
        ArkPasswordInputVisibilityTrigger,
      ],
      template: `
        <div arkPasswordInputRoot>
          <div arkPasswordInputControl>
            <input arkPasswordInputInput />
            <button arkPasswordInputVisibilityTrigger>toggle</button>
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkPasswordInputRoot)).injector.get(ArkPasswordInputRoot)
    const inputEl = fixture.debugElement.query(By.directive(ArkPasswordInputInput)).nativeElement as HTMLInputElement
    const triggerEl = fixture.debugElement.query(By.directive(ArkPasswordInputVisibilityTrigger))
      .nativeElement as HTMLButtonElement

    expect(root.api().visible).toBe(false)
    expect(inputEl.getAttribute('type')).toBe('password')

    clickTrigger(triggerEl)
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().visible).toBe(true)
    expect(inputEl.getAttribute('type')).toBe('text')

    fixture.destroy()
  })

  it('writing into the input updates the directive value', () => {
    @Component({
      standalone: true,
      imports: [ArkPasswordInputRoot, ArkPasswordInputControl, ArkPasswordInputInput],
      template: `
        <div arkPasswordInputRoot>
          <div arkPasswordInputControl>
            <input arkPasswordInputInput />
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkPasswordInputRoot)).injector.get(ArkPasswordInputRoot)
    const inputEl = fixture.debugElement.query(By.directive(ArkPasswordInputInput)).nativeElement as HTMLInputElement
    typeInto(inputEl, 'hunter2')
    TestBed.tick()
    fixture.detectChanges()

    expect(root.value()).toBe('hunter2')

    fixture.destroy()
  })

  it('reactive FormControl writeValue propagates to the directive value', () => {
    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkPasswordInputRoot, ArkPasswordInputControl, ArkPasswordInputInput],
      template: `
        <div arkPasswordInputRoot [formControl]="control">
          <div arkPasswordInputControl>
            <input arkPasswordInputInput />
          </div>
        </div>
      `,
    })
    class Host {
      readonly control = new FormControl<string | null>('initial')
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkPasswordInputRoot)).injector.get(ArkPasswordInputRoot)
    expect(root.value()).toBe('initial')

    fixture.componentInstance.control.setValue('updated')
    TestBed.tick()
    fixture.detectChanges()
    expect(root.value()).toBe('updated')

    fixture.destroy()
  })

  it('template-driven [(ngModel)] writes reach the directive value', async () => {
    @Component({
      standalone: true,
      imports: [FormsModule, ArkPasswordInputRoot, ArkPasswordInputControl, ArkPasswordInputInput],
      template: `
        <div arkPasswordInputRoot [(ngModel)]="model" name="password">
          <div arkPasswordInputControl>
            <input arkPasswordInputInput />
          </div>
        </div>
      `,
    })
    class Host {
      model = 'secret'
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()
    await fixture.whenStable()
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkPasswordInputRoot)).injector.get(ArkPasswordInputRoot)
    expect(root.value()).toBe('secret')

    fixture.destroy()
  })

  it('emits a single valueChange per user-visible value change', () => {
    @Component({
      standalone: true,
      imports: [ArkPasswordInputRoot, ArkPasswordInputControl, ArkPasswordInputInput],
      template: `
        <div arkPasswordInputRoot (valueChange)="emissions.push($event)">
          <div arkPasswordInputControl>
            <input arkPasswordInputInput />
          </div>
        </div>
      `,
    })
    class Host {
      readonly emissions: Array<string | undefined> = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const before = fixture.componentInstance.emissions.length
    const inputEl = fixture.debugElement.query(By.directive(ArkPasswordInputInput)).nativeElement as HTMLInputElement
    typeInto(inputEl, 'a')
    TestBed.tick()
    fixture.detectChanges()

    expect(fixture.componentInstance.emissions.length - before).toBe(1)

    fixture.destroy()
  })

  it('touched callback fires on input blur', () => {
    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkPasswordInputRoot, ArkPasswordInputControl, ArkPasswordInputInput],
      template: `
        <div arkPasswordInputRoot [formControl]="control">
          <div arkPasswordInputControl>
            <input arkPasswordInputInput />
          </div>
        </div>
      `,
    })
    class Host {
      readonly control = new FormControl<string | null>('init')
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    expect(fixture.componentInstance.control.touched).toBe(false)

    const inputEl = fixture.debugElement.query(By.directive(ArkPasswordInputInput)).nativeElement as HTMLInputElement
    inputEl.dispatchEvent(new FocusEvent('blur', { bubbles: false }))
    TestBed.tick()
    fixture.detectChanges()

    expect(fixture.componentInstance.control.touched).toBe(true)

    fixture.destroy()
  })

  it('setDisabledState(true) disables the input through the same path as [disabled]', () => {
    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkPasswordInputRoot, ArkPasswordInputControl, ArkPasswordInputInput],
      template: `
        <div arkPasswordInputRoot [formControl]="control">
          <div arkPasswordInputControl>
            <input arkPasswordInputInput />
          </div>
        </div>
      `,
    })
    class Host {
      readonly control = new FormControl<string | null>({ value: 'a', disabled: false })
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkPasswordInputRoot)).injector.get(ArkPasswordInputRoot)
    expect((root.api().getInputProps() as { disabled?: boolean }).disabled).toBeFalsy()

    fixture.componentInstance.control.disable()
    TestBed.tick()
    fixture.detectChanges()

    expect((root.api().getInputProps() as { disabled?: boolean }).disabled).toBe(true)

    fixture.destroy()
  })

  it('readOnly propagation flows through the api input props', () => {
    @Component({
      standalone: true,
      imports: [ArkPasswordInputRoot, ArkPasswordInputControl, ArkPasswordInputInput],
      template: `
        <div arkPasswordInputRoot readOnly>
          <div arkPasswordInputControl>
            <input arkPasswordInputInput />
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkPasswordInputRoot)).injector.get(ArkPasswordInputRoot)
    expect((root.api().getInputProps() as { readOnly?: boolean }).readOnly).toBe(true)

    fixture.destroy()
  })

  it('merges Field label/control IDs, disabled, invalid, readOnly state into the api', () => {
    @Component({
      standalone: true,
      imports: [
        ArkFieldRoot,
        ArkPasswordInputRoot,
        ArkPasswordInputLabel,
        ArkPasswordInputControl,
        ArkPasswordInputInput,
      ],
      template: `
        <div arkFieldRoot id="fld" [disabled]="true" [invalid]="true" [readOnly]="true">
          <div arkPasswordInputRoot>
            <label arkPasswordInputLabel>Password</label>
            <div arkPasswordInputControl>
              <input arkPasswordInputInput />
            </div>
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkPasswordInputRoot)).injector.get(ArkPasswordInputRoot)
    const inputProps = root.api().getInputProps() as { disabled?: boolean; readOnly?: boolean; id?: string }
    const labelProps = root.api().getLabelProps() as { htmlFor?: string; id?: string }

    expect(inputProps.disabled).toBe(true)
    expect(inputProps.readOnly).toBe(true)
    expect(root.api().invalid).toBe(true)
    expect(typeof inputProps.id).toBe('string')
    expect(labelProps.htmlFor ?? labelProps.id).toBeDefined()

    fixture.destroy()
  })

  it('mixed form binding + [(value)] emits a dev warning once and the form binding wins', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkPasswordInputRoot, ArkPasswordInputControl, ArkPasswordInputInput],
      template: `
        <div arkPasswordInputRoot [formControl]="control" [(value)]="value">
          <div arkPasswordInputControl>
            <input arkPasswordInputInput />
          </div>
        </div>
      `,
    })
    class Host {
      readonly control = new FormControl<string | null>('one')
      readonly value = signal<string | undefined>('external')
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()
    TestBed.tick()
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkPasswordInputRoot)).injector.get(ArkPasswordInputRoot)
    fixture.componentInstance.control.setValue('seven')
    TestBed.tick()
    fixture.detectChanges()
    expect(root.value()).toBe('seven')

    const warnCalls = warn.mock.calls.filter((args) => String(args[0]).includes('ArkPasswordInputRoot'))
    expect(warnCalls.length).toBe(1)

    fixture.destroy()
  })
})
