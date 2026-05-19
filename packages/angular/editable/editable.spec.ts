import { Component, signal } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { FormControl, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  ARK_EDITABLE_CONTEXT,
  ArkEditableArea,
  ArkEditableCancelTrigger,
  ArkEditableControl,
  ArkEditableEditTrigger,
  ArkEditableInput,
  ArkEditableLabel,
  ArkEditablePreview,
  ArkEditableRoot,
  ArkEditableRootProvider,
  ArkEditableSubmitTrigger,
  editableAnatomy,
  injectArkEditableContext,
  useEditable,
  type EditableApi,
  type EditableEditChangeDetails,
  type EditableMachine,
  type EditableMachineProps,
  type EditableService,
  type EditableValueChangeDetails,
  type UseEditableOptions,
  type UseEditableProps,
  type UseEditableReturn,
} from '@ark-ui/angular/editable'
import { ArkFieldRoot } from '@ark-ui/angular/field'

type EditablePublicTypeSmoke = [
  EditableApi,
  EditableMachine,
  EditableMachineProps,
  EditableService,
  UseEditableOptions,
  UseEditableProps,
  UseEditableReturn,
]

describe('@ark-ui/angular/editable', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_EDITABLE_CONTEXT).toBe('object')
    expect(typeof injectArkEditableContext).toBe('function')
    expect(typeof useEditable).toBe('function')
    expect(typeof editableAnatomy).toBe('object')
    expect(ArkEditableRoot).toBeDefined()
    expect(ArkEditableRootProvider).toBeDefined()
    expect(ArkEditableArea).toBeDefined()
    expect(ArkEditableInput).toBeDefined()
    expect(ArkEditablePreview).toBeDefined()
    expect(ArkEditableLabel).toBeDefined()
    expect(ArkEditableControl).toBeDefined()
    expect(ArkEditableEditTrigger).toBeDefined()
    expect(ArkEditableSubmitTrigger).toBeDefined()
    expect(ArkEditableCancelTrigger).toBeDefined()
    expect(undefined as EditablePublicTypeSmoke | undefined).toBeUndefined()
  })

  it('an orphan part directive without an ancestor root throws missing-provider', () => {
    @Component({
      standalone: true,
      imports: [ArkEditableInput],
      template: '<input arkEditableInput />',
    })
    class Orphan {}

    TestBed.configureTestingModule({ imports: [Orphan] })
    expect(() => TestBed.createComponent(Orphan)).toThrow(/ARK_EDITABLE_CONTEXT|No provider|NG0201/i)
  })

  it('empty preview renders the initial value text after content init', () => {
    @Component({
      standalone: true,
      imports: [ArkEditableRoot, ArkEditablePreview],
      template: `
        <div arkEditableRoot value="initial">
          <span arkEditablePreview></span>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    TestBed.tick()
    fixture.detectChanges()

    const previewEl = fixture.debugElement.query(By.directive(ArkEditablePreview)).nativeElement as HTMLElement
    expect(previewEl.textContent).toBe('initial')

    fixture.destroy()
  })

  it('edit / submit / cancel flow updates api().editing and api().value', () => {
    @Component({
      standalone: true,
      imports: [
        ArkEditableRoot,
        ArkEditableArea,
        ArkEditableInput,
        ArkEditablePreview,
        ArkEditableControl,
        ArkEditableEditTrigger,
        ArkEditableSubmitTrigger,
        ArkEditableCancelTrigger,
      ],
      template: `
        <div arkEditableRoot defaultValue="Hello">
          <div arkEditableArea>
            <input arkEditableInput />
            <span arkEditablePreview></span>
          </div>
          <div arkEditableControl>
            <button arkEditableEditTrigger>Edit</button>
            <button arkEditableSubmitTrigger>Save</button>
            <button arkEditableCancelTrigger>Cancel</button>
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkEditableRoot)).injector.get(ArkEditableRoot)
    const inputEl = fixture.debugElement.query(By.directive(ArkEditableInput)).nativeElement as HTMLInputElement
    const editBtn = fixture.debugElement.query(By.directive(ArkEditableEditTrigger)).nativeElement as HTMLButtonElement
    const submitBtn = fixture.debugElement.query(By.directive(ArkEditableSubmitTrigger))
      .nativeElement as HTMLButtonElement
    const cancelBtn = fixture.debugElement.query(By.directive(ArkEditableCancelTrigger))
      .nativeElement as HTMLButtonElement

    expect(root.api().editing).toBe(false)
    expect(root.api().value).toBe('Hello')

    editBtn.click()
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().editing).toBe(true)

    inputEl.value = 'World'
    inputEl.dispatchEvent(new Event('input', { bubbles: true }))
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().value).toBe('World')

    submitBtn.click()
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().editing).toBe(false)
    expect(root.api().value).toBe('World')

    editBtn.click()
    TestBed.tick()
    fixture.detectChanges()
    inputEl.value = 'Reverted'
    inputEl.dispatchEvent(new Event('input', { bubbles: true }))
    TestBed.tick()
    fixture.detectChanges()
    cancelBtn.click()
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().editing).toBe(false)
    expect(root.api().value).toBe('World')

    fixture.destroy()
  })

  it('emits edit, commit, and revert detail outputs from Zag callbacks', () => {
    @Component({
      standalone: true,
      imports: [
        ArkEditableRoot,
        ArkEditableArea,
        ArkEditableInput,
        ArkEditablePreview,
        ArkEditableEditTrigger,
        ArkEditableSubmitTrigger,
        ArkEditableCancelTrigger,
      ],
      template: `
        <div
          arkEditableRoot
          defaultValue="Hello"
          (editChange)="editChanges.push($event)"
          (valueCommit)="commits.push($event)"
          (valueRevert)="reverts.push($event)"
        >
          <div arkEditableArea>
            <input arkEditableInput />
            <span arkEditablePreview></span>
          </div>
          <button arkEditableEditTrigger>Edit</button>
          <button arkEditableSubmitTrigger>Save</button>
          <button arkEditableCancelTrigger>Cancel</button>
        </div>
      `,
    })
    class Host {
      readonly editChanges: EditableEditChangeDetails[] = []
      readonly commits: EditableValueChangeDetails[] = []
      readonly reverts: EditableValueChangeDetails[] = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const inputEl = fixture.debugElement.query(By.directive(ArkEditableInput)).nativeElement as HTMLInputElement
    const editBtn = fixture.debugElement.query(By.directive(ArkEditableEditTrigger)).nativeElement as HTMLButtonElement
    const submitBtn = fixture.debugElement.query(By.directive(ArkEditableSubmitTrigger))
      .nativeElement as HTMLButtonElement
    const cancelBtn = fixture.debugElement.query(By.directive(ArkEditableCancelTrigger))
      .nativeElement as HTMLButtonElement

    editBtn.click()
    TestBed.tick()
    fixture.detectChanges()
    inputEl.value = 'World'
    inputEl.dispatchEvent(new Event('input', { bubbles: true }))
    TestBed.tick()
    fixture.detectChanges()
    submitBtn.click()
    TestBed.tick()
    fixture.detectChanges()

    editBtn.click()
    TestBed.tick()
    fixture.detectChanges()
    inputEl.value = 'Discarded'
    inputEl.dispatchEvent(new Event('input', { bubbles: true }))
    TestBed.tick()
    fixture.detectChanges()
    cancelBtn.click()
    TestBed.tick()
    fixture.detectChanges()

    expect(fixture.componentInstance.editChanges.map((details) => details.edit)).toEqual([true, false, true, false])
    expect(fixture.componentInstance.commits.at(-1)?.value).toBe('World')
    expect(fixture.componentInstance.reverts.at(-1)?.value).toBe('World')

    fixture.destroy()
  })

  it('controlled [(value)] roundtrips and api reflects parent writes', () => {
    @Component({
      standalone: true,
      imports: [ArkEditableRoot, ArkEditableArea, ArkEditableInput, ArkEditablePreview],
      template: `
        <div arkEditableRoot [(value)]="value" (valueChange)="emissions.push($event)">
          <div arkEditableArea>
            <input arkEditableInput />
            <span arkEditablePreview></span>
          </div>
        </div>
      `,
    })
    class Host {
      readonly value = signal<string | undefined>('initial')
      readonly emissions: Array<string | undefined> = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkEditableRoot)).injector.get(ArkEditableRoot)
    expect(root.api().value).toBe('initial')

    fixture.componentInstance.value.set('updated')
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().value).toBe('updated')

    const emissionsAfterFirst = fixture.componentInstance.emissions.length
    fixture.componentInstance.value.set('updated')
    TestBed.tick()
    fixture.detectChanges()
    expect(fixture.componentInstance.emissions.length).toBe(emissionsAfterFirst)

    fixture.destroy()
  })

  it('dblclick activation keeps a single click in preview mode and enters edit on double click', () => {
    @Component({
      standalone: true,
      imports: [ArkEditableRoot, ArkEditableArea, ArkEditableInput, ArkEditablePreview],
      template: `
        <div arkEditableRoot defaultValue="Double-click to edit" activationMode="dblclick">
          <div arkEditableArea>
            <input arkEditableInput />
            <span arkEditablePreview></span>
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkEditableRoot)).injector.get(ArkEditableRoot)
    const previewEl = fixture.debugElement.query(By.directive(ArkEditablePreview)).nativeElement as HTMLElement

    previewEl.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().editing).toBe(false)

    previewEl.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }))
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().editing).toBe(true)

    fixture.destroy()
  })

  it('supports textarea as the editable input host', () => {
    @Component({
      standalone: true,
      imports: [ArkEditableRoot, ArkEditableArea, ArkEditableInput, ArkEditablePreview, ArkEditableEditTrigger],
      template: `
        <div arkEditableRoot defaultValue="Seed">
          <div arkEditableArea>
            <textarea arkEditableInput></textarea>
            <span arkEditablePreview></span>
          </div>
          <button arkEditableEditTrigger>Edit</button>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkEditableRoot)).injector.get(ArkEditableRoot)
    fixture.debugElement
      .query(By.directive(ArkEditableEditTrigger))
      .nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    TestBed.tick()
    fixture.detectChanges()

    const textarea = fixture.debugElement.query(By.directive(ArkEditableInput)).nativeElement as HTMLTextAreaElement
    expect(textarea.tagName).toBe('TEXTAREA')

    textarea.value = 'Multi-line\nvalue'
    textarea.dispatchEvent(new Event('input', { bubbles: true }))
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().value).toBe('Multi-line\nvalue')

    fixture.destroy()
  })

  it('uncontrolled defaultValue seeds initial value and does not flip to controlled after writes', () => {
    @Component({
      standalone: true,
      imports: [ArkEditableRoot, ArkEditableArea, ArkEditableInput, ArkEditablePreview, ArkEditableEditTrigger],
      template: `
        <div arkEditableRoot [defaultValue]="defaultValue()">
          <div arkEditableArea>
            <input arkEditableInput />
            <span arkEditablePreview></span>
          </div>
          <button arkEditableEditTrigger>Edit</button>
        </div>
      `,
    })
    class Host {
      readonly defaultValue = signal<string | undefined>('seed')
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkEditableRoot)).injector.get(ArkEditableRoot)
    expect(root.api().value).toBe('seed')

    fixture.debugElement
      .query(By.directive(ArkEditableEditTrigger))
      .nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    TestBed.tick()
    fixture.detectChanges()
    const inputEl = fixture.debugElement.query(By.directive(ArkEditableInput)).nativeElement as HTMLInputElement
    inputEl.value = 'user-typed'
    inputEl.dispatchEvent(new Event('input', { bubbles: true }))
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().value).toBe('user-typed')

    fixture.componentInstance.defaultValue.set('changed-later')
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().value).toBe('user-typed')

    fixture.destroy()
  })

  it('reactive FormControl writes reach the Zag api and onChange fires once per commit', () => {
    @Component({
      standalone: true,
      imports: [
        ReactiveFormsModule,
        ArkEditableRoot,
        ArkEditableArea,
        ArkEditableInput,
        ArkEditablePreview,
        ArkEditableEditTrigger,
        ArkEditableSubmitTrigger,
      ],
      template: `
        <div arkEditableRoot [formControl]="control">
          <div arkEditableArea>
            <input arkEditableInput />
            <span arkEditablePreview></span>
          </div>
          <button arkEditableEditTrigger>Edit</button>
          <button arkEditableSubmitTrigger>Save</button>
        </div>
      `,
    })
    class Host {
      readonly control = new FormControl<string | null>('seed')
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkEditableRoot)).injector.get(ArkEditableRoot)
    expect(root.api().value).toBe('seed')

    fixture.componentInstance.control.setValue('from-form')
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().value).toBe('from-form')

    const valueChanges: Array<string | null> = []
    fixture.componentInstance.control.valueChanges.subscribe((v) => valueChanges.push(v))

    fixture.debugElement
      .query(By.directive(ArkEditableEditTrigger))
      .nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    TestBed.tick()
    fixture.detectChanges()
    const inputEl = fixture.debugElement.query(By.directive(ArkEditableInput)).nativeElement as HTMLInputElement
    inputEl.value = 'typed'
    inputEl.dispatchEvent(new Event('input', { bubbles: true }))
    TestBed.tick()
    fixture.detectChanges()

    const countBeforeSubmit = valueChanges.length

    fixture.debugElement
      .query(By.directive(ArkEditableSubmitTrigger))
      .nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    TestBed.tick()
    fixture.detectChanges()

    expect(fixture.componentInstance.control.value).toBe('typed')
    expect(valueChanges.length).toBeGreaterThanOrEqual(countBeforeSubmit)

    fixture.destroy()
  })

  it('template-driven [(ngModel)] writes reach the Zag api', async () => {
    @Component({
      standalone: true,
      imports: [FormsModule, ArkEditableRoot, ArkEditableArea, ArkEditableInput, ArkEditablePreview],
      template: `
        <div arkEditableRoot [(ngModel)]="model" name="ed">
          <div arkEditableArea>
            <input arkEditableInput />
            <span arkEditablePreview></span>
          </div>
        </div>
      `,
    })
    class Host {
      model = 'seed'
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await fixture.whenStable()
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkEditableRoot)).injector.get(ArkEditableRoot)
    expect(root.api().value).toBe('seed')

    fixture.destroy()
  })

  it('touched callback fires on commit (submit)', () => {
    @Component({
      standalone: true,
      imports: [
        ReactiveFormsModule,
        ArkEditableRoot,
        ArkEditableArea,
        ArkEditableInput,
        ArkEditablePreview,
        ArkEditableEditTrigger,
        ArkEditableSubmitTrigger,
      ],
      template: `
        <div arkEditableRoot [formControl]="control">
          <div arkEditableArea>
            <input arkEditableInput />
            <span arkEditablePreview></span>
          </div>
          <button arkEditableEditTrigger>Edit</button>
          <button arkEditableSubmitTrigger>Save</button>
        </div>
      `,
    })
    class Host {
      readonly control = new FormControl<string | null>('seed')
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    expect(fixture.componentInstance.control.touched).toBe(false)

    fixture.debugElement
      .query(By.directive(ArkEditableEditTrigger))
      .nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    TestBed.tick()
    fixture.detectChanges()
    fixture.debugElement
      .query(By.directive(ArkEditableSubmitTrigger))
      .nativeElement.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    TestBed.tick()
    fixture.detectChanges()

    expect(fixture.componentInstance.control.touched).toBe(true)

    fixture.destroy()
  })

  it('setDisabledState(true) disables the editable input through the same machine path as [disabled]', () => {
    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkEditableRoot, ArkEditableArea, ArkEditableInput, ArkEditablePreview],
      template: `
        <div arkEditableRoot [formControl]="control">
          <div arkEditableArea>
            <input arkEditableInput />
            <span arkEditablePreview></span>
          </div>
        </div>
      `,
    })
    class Host {
      readonly control = new FormControl<string | null>({ value: 'x', disabled: false })
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkEditableRoot)).injector.get(ArkEditableRoot)
    expect((root.api().getInputProps() as { disabled?: boolean }).disabled).toBeFalsy()

    fixture.componentInstance.control.disable()
    TestBed.tick()
    fixture.detectChanges()

    expect((root.api().getInputProps() as { disabled?: boolean }).disabled).toBe(true)

    fixture.destroy()
  })

  it('mixed form binding + [(value)] emits a dev warning once and the form binding wins', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkEditableRoot, ArkEditableArea, ArkEditableInput, ArkEditablePreview],
      template: `
        <div arkEditableRoot [formControl]="control" [(value)]="value">
          <div arkEditableArea>
            <input arkEditableInput />
            <span arkEditablePreview></span>
          </div>
        </div>
      `,
    })
    class Host {
      readonly control = new FormControl<string | null>('from-form')
      readonly value = signal<string | undefined>('from-model')
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    TestBed.tick()
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkEditableRoot)).injector.get(ArkEditableRoot)
    fixture.componentInstance.control.setValue('next-from-form')
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().value).toBe('next-from-form')

    const warnCalls = warn.mock.calls.filter((args) => String(args[0]).includes('ArkEditableRoot'))
    expect(warnCalls.length).toBe(1)

    fixture.destroy()
  })

  it('merges Field disabled into editable disabled (acceptance 27)', () => {
    @Component({
      standalone: true,
      imports: [ArkFieldRoot, ArkEditableRoot, ArkEditableArea, ArkEditableInput, ArkEditablePreview],
      template: `
        <div arkFieldRoot [disabled]="true">
          <div arkEditableRoot>
            <div arkEditableArea>
              <input arkEditableInput />
              <span arkEditablePreview></span>
            </div>
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkEditableRoot)).injector.get(ArkEditableRoot)
    expect((root.api().getInputProps() as { disabled?: boolean }).disabled).toBe(true)

    fixture.destroy()
  })

  it('merges Field required and readOnly into editable input props', () => {
    @Component({
      standalone: true,
      imports: [ArkFieldRoot, ArkEditableRoot, ArkEditableArea, ArkEditableInput, ArkEditablePreview],
      template: `
        <div arkFieldRoot [required]="true" [readOnly]="true">
          <div arkEditableRoot>
            <div arkEditableArea>
              <input arkEditableInput />
              <span arkEditablePreview></span>
            </div>
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkEditableRoot)).injector.get(ArkEditableRoot)
    const inputProps = root.api().getInputProps() as { required?: boolean; readOnly?: boolean }
    expect(inputProps.required).toBe(true)
    expect(inputProps.readOnly).toBe(true)

    fixture.destroy()
  })

  it('bare static defaultEditing attribute starts the editable in edit mode via booleanAttribute', () => {
    @Component({
      standalone: true,
      imports: [ArkEditableRoot, ArkEditableArea, ArkEditableInput, ArkEditablePreview],
      template: `
        <div arkEditableRoot defaultEditing>
          <div arkEditableArea>
            <input arkEditableInput />
            <span arkEditablePreview></span>
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkEditableRoot)).injector.get(ArkEditableRoot)
    expect(root.api().editing).toBe(true)

    fixture.destroy()
  })

  it('static [editing] attribute is not coerced via booleanAttribute (must use [editing] or [(editing)])', () => {
    @Component({
      standalone: true,
      imports: [ArkEditableRoot, ArkEditableArea, ArkEditableInput, ArkEditablePreview],
      template: `
        <div arkEditableRoot [editing]="true">
          <div arkEditableArea>
            <input arkEditableInput />
            <span arkEditablePreview></span>
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    const root = fixture.debugElement.query(By.directive(ArkEditableRoot)).injector.get(ArkEditableRoot)
    expect(root.api().editing).toBe(true)
    fixture.destroy()
  })

  it('NG_VALUE_ACCESSOR is registered so NgControl resolves the directive', () => {
    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkEditableRoot, ArkEditableArea, ArkEditableInput, ArkEditablePreview],
      template: `
        <div arkEditableRoot [formControl]="control">
          <div arkEditableArea>
            <input arkEditableInput />
            <span arkEditablePreview></span>
          </div>
        </div>
      `,
    })
    class Host {
      readonly control = new FormControl('x')
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkEditableRoot))
    const ngControl = rootDebug.injector.get(NgControl)
    expect(ngControl).toBeDefined()

    fixture.destroy()
  })
})
