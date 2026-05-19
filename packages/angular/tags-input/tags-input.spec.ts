import { Component, signal } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  ARK_TAGS_INPUT_CONTEXT,
  ARK_TAGS_INPUT_ITEM_CONTEXT,
  ArkTagsInputClearTrigger,
  ArkTagsInputControl,
  ArkTagsInputHiddenInput,
  ArkTagsInputInput,
  ArkTagsInputItem,
  ArkTagsInputItemDeleteTrigger,
  ArkTagsInputItemInput,
  ArkTagsInputItemPreview,
  ArkTagsInputItemText,
  ArkTagsInputLabel,
  ArkTagsInputRoot,
  ArkTagsInputRootProvider,
  injectArkTagsInputContext,
  injectArkTagsInputItemContext,
  tagsInputAnatomy,
  useTagsInput,
  type TagsInputApi,
  type TagsInputMachine,
  type TagsInputMachineProps,
  type TagsInputService,
  type UseTagsInputOptions,
  type UseTagsInputProps,
  type UseTagsInputReturn,
} from '@ark-ui/angular/tags-input'
import { ArkFieldRoot } from '@ark-ui/angular/field'

type TagsInputPublicTypeSmoke = [
  TagsInputApi,
  TagsInputMachine,
  TagsInputMachineProps,
  TagsInputService,
  UseTagsInputOptions,
  UseTagsInputProps,
  UseTagsInputReturn,
]

const flushMicrotasks = async () => {
  for (let i = 0; i < 5; i++) await Promise.resolve()
}

const focusInput = async (el: HTMLInputElement) => {
  el.focus()
  el.dispatchEvent(new FocusEvent('focus', { bubbles: false }))
  await flushMicrotasks()
}

const typeText = async (el: HTMLInputElement, text: string) => {
  el.value = text
  el.dispatchEvent(new InputEvent('input', { bubbles: true, data: text, inputType: 'insertText' }))
  await flushMicrotasks()
}

const pressEnter = (el: HTMLInputElement) => {
  el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }))
}

describe('@ark-ui/angular/tags-input', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_TAGS_INPUT_CONTEXT).toBe('object')
    expect(typeof ARK_TAGS_INPUT_ITEM_CONTEXT).toBe('object')
    expect(typeof injectArkTagsInputContext).toBe('function')
    expect(typeof injectArkTagsInputItemContext).toBe('function')
    expect(typeof useTagsInput).toBe('function')
    expect(typeof tagsInputAnatomy).toBe('object')
    expect(ArkTagsInputRoot).toBeDefined()
    expect(ArkTagsInputRootProvider).toBeDefined()
    expect(ArkTagsInputLabel).toBeDefined()
    expect(ArkTagsInputControl).toBeDefined()
    expect(ArkTagsInputInput).toBeDefined()
    expect(ArkTagsInputHiddenInput).toBeDefined()
    expect(ArkTagsInputClearTrigger).toBeDefined()
    expect(ArkTagsInputItem).toBeDefined()
    expect(ArkTagsInputItemText).toBeDefined()
    expect(ArkTagsInputItemPreview).toBeDefined()
    expect(ArkTagsInputItemInput).toBeDefined()
    expect(ArkTagsInputItemDeleteTrigger).toBeDefined()
    expect(undefined as TagsInputPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('an orphan item-text directive without an item parent throws missing-provider', () => {
    @Component({
      standalone: true,
      imports: [ArkTagsInputRoot, ArkTagsInputControl, ArkTagsInputItemText],
      template: `
        <div arkTagsInputRoot>
          <div arkTagsInputControl>
            <span arkTagsInputItemText>orphan</span>
          </div>
        </div>
      `,
    })
    class Orphan {}

    TestBed.configureTestingModule({ imports: [Orphan] })
    expect(() => TestBed.createComponent(Orphan)).toThrow(/ARK_TAGS_INPUT_ITEM_CONTEXT|missing-provider/i)
  })

  it('typing then pressing Enter adds a tag', async () => {
    @Component({
      standalone: true,
      imports: [ArkTagsInputRoot, ArkTagsInputControl, ArkTagsInputInput],
      template: `
        <div arkTagsInputRoot>
          <div arkTagsInputControl>
            <input arkTagsInputInput />
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkTagsInputRoot)).injector.get(ArkTagsInputRoot)
    const input = fixture.debugElement.query(By.directive(ArkTagsInputInput)).nativeElement as HTMLInputElement

    await focusInput(input)
    TestBed.tick()
    fixture.detectChanges()
    await typeText(input, 'react')
    TestBed.tick()
    fixture.detectChanges()
    pressEnter(input)
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toEqual(['react'])

    fixture.destroy()
  })

  it('clicking the item-delete-trigger removes a tag', () => {
    @Component({
      standalone: true,
      imports: [
        ArkTagsInputRoot,
        ArkTagsInputControl,
        ArkTagsInputItem,
        ArkTagsInputItemPreview,
        ArkTagsInputItemText,
        ArkTagsInputItemDeleteTrigger,
      ],
      template: `
        <div arkTagsInputRoot #root="arkTagsInputRoot" [defaultValue]="['a', 'b']">
          <div arkTagsInputControl>
            @for (tag of root.api().value; track tag; let i = $index) {
              <span arkTagsInputItem [index]="i" [value]="tag">
                <div arkTagsInputItemPreview>
                  <span arkTagsInputItemText>{{ tag }}</span>
                  <button type="button" arkTagsInputItemDeleteTrigger>x</button>
                </div>
              </span>
            }
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkTagsInputRoot)).injector.get(ArkTagsInputRoot)
    expect(root.api().value).toEqual(['a', 'b'])

    const triggers = fixture.debugElement.queryAll(By.directive(ArkTagsInputItemDeleteTrigger))
    const firstTrigger = triggers[0].nativeElement as HTMLButtonElement
    firstTrigger.click()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toEqual(['b'])

    fixture.destroy()
  })

  it('controlled [(value)] roundtrips array updates with Zag api', async () => {
    @Component({
      standalone: true,
      imports: [ArkTagsInputRoot, ArkTagsInputControl, ArkTagsInputInput],
      template: `
        <div arkTagsInputRoot [(value)]="value">
          <div arkTagsInputControl>
            <input arkTagsInputInput />
          </div>
        </div>
      `,
    })
    class Host {
      readonly value = signal<string[] | undefined>(['x'])
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkTagsInputRoot)).injector.get(ArkTagsInputRoot)
    expect(root.api().value).toEqual(['x'])

    fixture.componentInstance.value.set(['y', 'z'])
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().value).toEqual(['y', 'z'])

    const input = fixture.debugElement.query(By.directive(ArkTagsInputInput)).nativeElement as HTMLInputElement
    await focusInput(input)
    TestBed.tick()
    fixture.detectChanges()
    await typeText(input, 'w')
    TestBed.tick()
    fixture.detectChanges()
    pressEnter(input)
    TestBed.tick()
    fixture.detectChanges()
    expect(fixture.componentInstance.value()).toEqual(['y', 'z', 'w'])

    fixture.destroy()
  })

  it('duplicates are rejected by default (Zag allowDuplicates default false)', async () => {
    @Component({
      standalone: true,
      imports: [ArkTagsInputRoot, ArkTagsInputControl, ArkTagsInputInput],
      template: `
        <div arkTagsInputRoot [defaultValue]="['react']">
          <div arkTagsInputControl>
            <input arkTagsInputInput />
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkTagsInputRoot)).injector.get(ArkTagsInputRoot)
    expect(root.api().value).toEqual(['react'])

    const input = fixture.debugElement.query(By.directive(ArkTagsInputInput)).nativeElement as HTMLInputElement
    await focusInput(input)
    TestBed.tick()
    fixture.detectChanges()
    await typeText(input, 'react')
    TestBed.tick()
    fixture.detectChanges()
    pressEnter(input)
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().value).toEqual(['react'])

    fixture.destroy()
  })

  it('hidden input reflects current tags as the value string', async () => {
    @Component({
      standalone: true,
      imports: [ArkTagsInputRoot, ArkTagsInputControl, ArkTagsInputHiddenInput],
      template: `
        <div arkTagsInputRoot [defaultValue]="['a', 'b']">
          <div arkTagsInputControl></div>
          <input arkTagsInputHiddenInput />
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()
    await fixture.whenStable()
    fixture.detectChanges()

    const hidden = fixture.debugElement.query(By.directive(ArkTagsInputHiddenInput)).nativeElement as HTMLInputElement
    const root = fixture.debugElement.query(By.directive(ArkTagsInputRoot)).injector.get(ArkTagsInputRoot)
    expect(hidden.value).toBe(root.api().valueAsString)

    fixture.destroy()
  })

  it('reactive [formControl] writeValue propagates to the Zag api', () => {
    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkTagsInputRoot, ArkTagsInputControl, ArkTagsInputInput],
      template: `
        <div arkTagsInputRoot [formControl]="control">
          <div arkTagsInputControl>
            <input arkTagsInputInput />
          </div>
        </div>
      `,
    })
    class Host {
      readonly control = new FormControl<string[] | null>(['a', 'b'])
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkTagsInputRoot)).injector.get(ArkTagsInputRoot)
    expect(root.api().value).toEqual(['a', 'b'])

    fixture.componentInstance.control.setValue(['c', 'd'])
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().value).toEqual(['c', 'd'])

    fixture.destroy()
  })

  it('marks reactive form controls touched when a tag is added', async () => {
    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkTagsInputRoot, ArkTagsInputControl, ArkTagsInputInput],
      template: `
        <div arkTagsInputRoot [formControl]="control">
          <div arkTagsInputControl>
            <input arkTagsInputInput />
          </div>
        </div>
      `,
    })
    class Host {
      readonly control = new FormControl<string[] | null>([])
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    expect(fixture.componentInstance.control.touched).toBe(false)
    const input = fixture.debugElement.query(By.directive(ArkTagsInputInput)).nativeElement as HTMLInputElement
    await focusInput(input)
    await typeText(input, 'one')
    pressEnter(input)
    TestBed.tick()
    fixture.detectChanges()

    expect(fixture.componentInstance.control.touched).toBe(true)

    fixture.destroy()
  })

  it('template-driven [(ngModel)] writes reach the Zag api', async () => {
    @Component({
      standalone: true,
      imports: [FormsModule, ArkTagsInputRoot, ArkTagsInputControl, ArkTagsInputInput],
      template: `
        <div arkTagsInputRoot [(ngModel)]="model" name="tags">
          <div arkTagsInputControl>
            <input arkTagsInputInput />
          </div>
        </div>
      `,
    })
    class Host {
      model: string[] = ['x', 'y']
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()
    await fixture.whenStable()
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkTagsInputRoot)).injector.get(ArkTagsInputRoot)
    expect(root.api().value).toEqual(['x', 'y'])

    fixture.destroy()
  })

  it('emits a single valueChange per user-visible value change', async () => {
    @Component({
      standalone: true,
      imports: [ArkTagsInputRoot, ArkTagsInputControl, ArkTagsInputInput],
      template: `
        <div arkTagsInputRoot (valueChange)="emissions.push($event)">
          <div arkTagsInputControl>
            <input arkTagsInputInput />
          </div>
        </div>
      `,
    })
    class Host {
      readonly emissions: Array<string[] | undefined> = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const before = fixture.componentInstance.emissions.length
    const input = fixture.debugElement.query(By.directive(ArkTagsInputInput)).nativeElement as HTMLInputElement
    await focusInput(input)
    TestBed.tick()
    fixture.detectChanges()
    await typeText(input, 'one')
    TestBed.tick()
    fixture.detectChanges()
    pressEnter(input)
    TestBed.tick()
    fixture.detectChanges()

    expect(fixture.componentInstance.emissions.length - before).toBe(1)

    fixture.destroy()
  })

  it('setDisabledState(true) disables the tags input through the same path as [disabled]', () => {
    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkTagsInputRoot, ArkTagsInputControl, ArkTagsInputInput],
      template: `
        <div arkTagsInputRoot [formControl]="control">
          <div arkTagsInputControl>
            <input arkTagsInputInput />
          </div>
        </div>
      `,
    })
    class Host {
      readonly control = new FormControl<string[] | null>({ value: ['a'], disabled: false })
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkTagsInputRoot)).injector.get(ArkTagsInputRoot)
    expect((root.api().getInputProps() as { disabled?: boolean }).disabled).toBeFalsy()

    fixture.componentInstance.control.disable()
    TestBed.tick()
    fixture.detectChanges()

    expect((root.api().getInputProps() as { disabled?: boolean }).disabled).toBe(true)

    fixture.destroy()
  })

  it('merges Field disabled/invalid/readOnly state and IDs into the tags input api', () => {
    @Component({
      standalone: true,
      imports: [
        ArkFieldRoot,
        ArkTagsInputRoot,
        ArkTagsInputLabel,
        ArkTagsInputControl,
        ArkTagsInputInput,
        ArkTagsInputHiddenInput,
      ],
      template: `
        <div arkFieldRoot id="fld" [disabled]="true" [invalid]="true" [readOnly]="true">
          <div arkTagsInputRoot>
            <label arkTagsInputLabel>Tags</label>
            <div arkTagsInputControl>
              <input arkTagsInputInput />
            </div>
            <input arkTagsInputHiddenInput />
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkTagsInputRoot)).injector.get(ArkTagsInputRoot)
    const inputProps = root.api().getInputProps() as { disabled?: boolean; readOnly?: boolean }
    const hiddenProps = root.api().getHiddenInputProps() as { disabled?: boolean }
    const labelProps = root.api().getLabelProps() as { htmlFor?: string; id?: string }

    expect(inputProps.disabled).toBe(true)
    expect(hiddenProps.disabled).toBe(true)
    expect(labelProps.htmlFor ?? labelProps.id).toBeDefined()

    fixture.destroy()
  })

  it('mixed form binding + [(value)] emits a dev warning once and the form binding wins', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkTagsInputRoot, ArkTagsInputControl, ArkTagsInputInput],
      template: `
        <div arkTagsInputRoot [formControl]="control" [(value)]="value">
          <div arkTagsInputControl>
            <input arkTagsInputInput />
          </div>
        </div>
      `,
    })
    class Host {
      readonly control = new FormControl<string[] | null>(['a'])
      readonly value = signal<string[] | undefined>(['z'])
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()
    TestBed.tick()
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkTagsInputRoot)).injector.get(ArkTagsInputRoot)
    fixture.componentInstance.control.setValue(['b'])
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().value).toEqual(['b'])

    const warnCalls = warn.mock.calls.filter((args) => String(args[0]).includes('ArkTagsInputRoot'))
    expect(warnCalls.length).toBe(1)

    fixture.destroy()
  })
})
