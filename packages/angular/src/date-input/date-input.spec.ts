import { ApplicationRef, Component, Injector, inject, runInInjectionContext, signal } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { parseDate } from '@internationalized/date'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  ARK_DATE_INPUT_CONTEXT,
  ArkDateInputContext,
  ArkDateInputControl,
  ArkDateInputHiddenInput,
  ArkDateInputLabel,
  ArkDateInputRoot,
  ArkDateInputRootProvider,
  ArkDateInputSegment,
  ArkDateInputSegmentContext,
  ArkDateInputSegmentGroup,
  dateInputAnatomy,
  injectArkDateInputContext,
  useDateInput,
  type DateInputApi,
  type DateInputDateSegment,
  type DateInputElementIds,
  type DateInputFocusChangeDetails,
  type DateInputMachine,
  type DateInputMachineProps,
  type DateInputPlaceholderChangeDetails,
  type DateInputSelectionMode,
  type DateInputService,
  type DateInputValueChangeDetails,
  type DateValue,
  type UseDateInputOptions,
  type UseDateInputProps,
  type UseDateInputReturn,
} from '@ark-ui/angular/date-input'

type DateInputPublicTypeSmoke = [
  DateInputApi,
  DateInputDateSegment,
  DateInputElementIds,
  DateInputFocusChangeDetails,
  DateInputMachine,
  DateInputMachineProps,
  DateInputPlaceholderChangeDetails,
  DateInputSelectionMode,
  DateInputService,
  DateInputValueChangeDetails,
  DateValue,
  UseDateInputOptions,
  UseDateInputProps,
  UseDateInputReturn,
]

const flush = async (fixture: ReturnType<typeof TestBed.createComponent>) => {
  await TestBed.inject(ApplicationRef).whenStable()
  TestBed.tick()
  fixture.detectChanges()
  await Promise.resolve()
  fixture.detectChanges()
}

describe('@ark-ui/angular/date-input', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_DATE_INPUT_CONTEXT).toBe('object')
    expect(typeof injectArkDateInputContext).toBe('function')
    expect(typeof useDateInput).toBe('function')
    expect(typeof dateInputAnatomy).toBe('object')
    expect(ArkDateInputRoot).toBeDefined()
    expect(ArkDateInputRootProvider).toBeDefined()
    expect(ArkDateInputLabel).toBeDefined()
    expect(ArkDateInputControl).toBeDefined()
    expect(ArkDateInputSegmentGroup).toBeDefined()
    expect(ArkDateInputSegment).toBeDefined()
    expect(ArkDateInputHiddenInput).toBeDefined()
    expect(ArkDateInputContext).toBeDefined()
    expect(ArkDateInputSegmentContext).toBeDefined()
    expect(undefined as DateInputPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('useDateInput({ context: () => ({}) }) produces a non-empty fallback id', () => {
    @Component({ standalone: true, template: '' })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    const result = runInInjectionContext(fixture.componentRef.injector, () => useDateInput({ context: () => ({}) }))
    const id = (result.api().getRootProps() as { id: unknown }).id as string

    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
    expect(id).toMatch(/date-input::/)

    fixture.destroy()
  })

  it('renders root, label, control, segment group, segments, and hidden input props', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkDateInputRoot,
        ArkDateInputLabel,
        ArkDateInputControl,
        ArkDateInputSegmentGroup,
        ArkDateInputSegment,
        ArkDateInputSegmentContext,
        ArkDateInputHiddenInput,
      ],
      template: `
        <div arkDateInput name="birthday" [defaultValue]="value">
          <label arkDateInputLabel>Date</label>
          <div arkDateInputControl>
            <div arkDateInputSegmentGroup>
              <ng-container *arkDateInputSegmentContext="let segment">
                <span arkDateInputSegment [segment]="segment"></span>
              </ng-container>
            </div>
          </div>
          <input arkDateInputHiddenInput />
        </div>
      `,
    })
    class Host {
      readonly value = [parseDate('2026-05-19')]
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkDateInputRoot)).injector.get(ArkDateInputRoot)
    const segments = fixture.debugElement.queryAll(By.directive(ArkDateInputSegment))
    const hidden = fixture.debugElement.query(By.directive(ArkDateInputHiddenInput)).nativeElement as HTMLInputElement

    expect(root.api().value.map(String)).toEqual(['2026-05-19'])
    expect(segments.length).toBeGreaterThan(0)
    expect(segments.map((segment) => (segment.nativeElement as HTMLElement).textContent).join('')).toContain('2026')
    expect(hidden.name).toBe('birthday')
    expect(hidden.value).toContain('2026')

    fixture.destroy()
  })

  it('controlled [(value)] roundtrips with the Zag api', async () => {
    @Component({
      standalone: true,
      imports: [ArkDateInputRoot],
      template: '<div arkDateInput [(value)]="value"></div>',
    })
    class Host {
      readonly value = signal<DateValue[] | undefined>([parseDate('2026-05-19')])
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkDateInputRoot)).injector.get(ArkDateInputRoot)
    expect(root.api().value.map(String)).toEqual(['2026-05-19'])

    fixture.componentInstance.value.set([parseDate('2026-05-20')])
    await flush(fixture)
    expect(root.api().value.map(String)).toEqual(['2026-05-20'])

    root.api().setValue([parseDate('2026-05-21')])
    await flush(fixture)
    expect(fixture.componentInstance.value()?.map(String)).toEqual(['2026-05-21'])

    fixture.destroy()
  })

  it('emits placeholder changes from the controlled placeholder value', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkDateInputRoot,
        ArkDateInputControl,
        ArkDateInputSegmentGroup,
        ArkDateInputSegment,
        ArkDateInputSegmentContext,
      ],
      template: `
        <div arkDateInput [placeholderValue]="placeholder()" (placeholderChange)="changes.push($event)">
          <div arkDateInputControl>
            <div arkDateInputSegmentGroup>
              <ng-container *arkDateInputSegmentContext="let segment">
                <span arkDateInputSegment [segment]="segment"></span>
              </ng-container>
            </div>
          </div>
        </div>
      `,
    })
    class Host {
      readonly placeholder = signal(parseDate('2026-05-19'))
      readonly changes: DateInputPlaceholderChangeDetails[] = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    fixture.componentInstance.placeholder.set(parseDate('2026-05-20'))
    await flush(fixture)

    expect(fixture.componentInstance.changes.map((change) => String(change.placeholderValue))).toContain('2026-05-20')

    fixture.destroy()
  })

  it('two-way binds placeholderValue when segment editing advances the placeholder', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkDateInputRoot,
        ArkDateInputControl,
        ArkDateInputSegmentGroup,
        ArkDateInputSegment,
        ArkDateInputSegmentContext,
      ],
      template: `
        <div arkDateInput [(placeholderValue)]="placeholderValue">
          <div arkDateInputControl>
            <div arkDateInputSegmentGroup>
              <ng-container *arkDateInputSegmentContext="let segment">
                <span arkDateInputSegment [segment]="segment"></span>
              </ng-container>
            </div>
          </div>
        </div>
      `,
    })
    class Host {
      readonly placeholderValue = signal<DateValue | undefined>(parseDate('2026-05-19'))
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkDateInputRoot)).injector.get(ArkDateInputRoot)
    const next = parseDate('2026-05-20')
    ;(root.service as unknown as { setContext: (context: Partial<DateInputMachineProps>) => void }).setContext({
      placeholderValue: next,
    })
    await flush(fixture)

    expect(String(fixture.componentInstance.placeholderValue())).toBe('2026-05-20')

    fixture.destroy()
  })

  it('reactive FormControl writes update the same value channel and user changes notify once', async () => {
    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkDateInputRoot],
      template: '<div arkDateInput [formControl]="control" (valueChange)="emissions.push($event)"></div>',
    })
    class Host {
      readonly control = new FormControl<DateValue[] | null>([parseDate('2026-05-19')])
      readonly emissions: Array<DateValue[] | undefined> = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkDateInputRoot)).injector.get(ArkDateInputRoot)
    expect(root.api().value.map(String)).toEqual(['2026-05-19'])

    fixture.componentInstance.control.setValue([parseDate('2026-05-20')])
    await flush(fixture)
    expect(root.value()?.map(String)).toEqual(['2026-05-20'])

    const before = fixture.componentInstance.emissions.length
    root.api().setValue([parseDate('2026-05-21')])
    await flush(fixture)

    expect(fixture.componentInstance.control.value?.map(String)).toEqual(['2026-05-21'])
    expect(fixture.componentInstance.emissions.length - before).toBe(1)

    fixture.destroy()
  })

  it('template-driven [(ngModel)] writes reach the Zag api', async () => {
    @Component({
      standalone: true,
      imports: [FormsModule, ArkDateInputRoot],
      template: '<div arkDateInput [(ngModel)]="model" name="date"></div>',
    })
    class Host {
      model: DateValue[] | null = [parseDate('2026-05-19')]
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkDateInputRoot)).injector.get(ArkDateInputRoot)
    expect(root.api().value.map(String)).toEqual(['2026-05-19'])

    fixture.destroy()
  })

  it('setDisabledState(true) disables segments and hidden input through the root context', async () => {
    @Component({
      standalone: true,
      imports: [
        ReactiveFormsModule,
        ArkDateInputRoot,
        ArkDateInputControl,
        ArkDateInputSegmentGroup,
        ArkDateInputSegment,
        ArkDateInputSegmentContext,
        ArkDateInputHiddenInput,
      ],
      template: `
        <div arkDateInput [formControl]="control">
          <div arkDateInputControl>
            <div arkDateInputSegmentGroup>
              <ng-container *arkDateInputSegmentContext="let segment">
                <span arkDateInputSegment [segment]="segment"></span>
              </ng-container>
            </div>
          </div>
          <input arkDateInputHiddenInput />
        </div>
      `,
    })
    class Host {
      readonly control = new FormControl<DateValue[] | null>({ value: [parseDate('2026-05-19')], disabled: true })
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkDateInputRoot)).injector.get(ArkDateInputRoot)
    const hidden = fixture.debugElement.query(By.directive(ArkDateInputHiddenInput)).nativeElement as HTMLInputElement
    const segment = fixture.debugElement.query(By.directive(ArkDateInputSegment)).nativeElement as HTMLElement

    expect(root.api().disabled).toBe(true)
    expect(hidden.disabled).toBe(true)
    expect(segment.getAttribute('data-disabled')).toBe('')

    fixture.destroy()
  })

  it('applies disabled, read-only, and invalid state attributes from root inputs', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkDateInputRoot,
        ArkDateInputControl,
        ArkDateInputSegmentGroup,
        ArkDateInputSegment,
        ArkDateInputSegmentContext,
      ],
      template: `
        <div arkDateInput disabled readOnly invalid>
          <div arkDateInputControl>
            <div arkDateInputSegmentGroup>
              <ng-container *arkDateInputSegmentContext="let segment">
                <span arkDateInputSegment [segment]="segment"></span>
              </ng-container>
            </div>
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const rootElement = fixture.debugElement.query(By.directive(ArkDateInputRoot)).nativeElement as HTMLElement
    const group = fixture.debugElement.query(By.directive(ArkDateInputSegmentGroup)).nativeElement as HTMLElement
    const segment = fixture.debugElement.query(By.directive(ArkDateInputSegment)).nativeElement as HTMLElement

    expect(rootElement.getAttribute('data-disabled')).toBe('')
    expect(rootElement.getAttribute('data-invalid')).toBe('')
    expect(group.getAttribute('data-disabled')).toBe('')
    expect(group.getAttribute('data-invalid')).toBe('')
    expect(group.getAttribute('data-readonly')).toBe('')
    expect(segment.getAttribute('data-disabled')).toBe('')
    expect(segment.getAttribute('data-readonly')).toBe('')

    fixture.destroy()
  })

  it('updates a focused segment on typing and reflects cleared values', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkDateInputRoot,
        ArkDateInputControl,
        ArkDateInputSegmentGroup,
        ArkDateInputSegment,
        ArkDateInputSegmentContext,
      ],
      template: `
        <div arkDateInput [defaultValue]="value">
          <div arkDateInputControl>
            <div arkDateInputSegmentGroup>
              <ng-container *arkDateInputSegmentContext="let segment">
                <span arkDateInputSegment [segment]="segment"></span>
              </ng-container>
            </div>
          </div>
        </div>
      `,
    })
    class Host {
      readonly value = [parseDate('2024-06-15')]
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const [monthSegment] = fixture.debugElement.queryAll(By.directive(ArkDateInputSegment))
    const month = monthSegment.nativeElement as HTMLElement
    month.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    month.focus()
    await flush(fixture)
    expect(document.activeElement).toBe(month)
    month.dispatchEvent(new InputEvent('beforeinput', { data: '7', inputType: 'insertText', bubbles: true }))
    await flush(fixture)

    expect(month.textContent).toBe('7')

    const root = fixture.debugElement.query(By.directive(ArkDateInputRoot)).injector.get(ArkDateInputRoot)
    root.api().clearValue()
    await flush(fixture)

    expect(month.hasAttribute('aria-valuenow')).toBe(false)

    fixture.destroy()
  })

  it('syncs indexed hidden input values for range selection', async () => {
    @Component({
      standalone: true,
      imports: [ArkDateInputRoot, ArkDateInputHiddenInput],
      template: `
        <div arkDateInput name="date" selectionMode="range" [defaultValue]="range">
          <input arkDateInputHiddenInput [index]="0" />
          <input arkDateInputHiddenInput [index]="1" />
        </div>
      `,
    })
    class Host {
      readonly range = [parseDate('2024-06-15'), parseDate('2024-06-20')]
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const hiddenInputs = fixture.debugElement
      .queryAll(By.directive(ArkDateInputHiddenInput))
      .map((debugElement) => debugElement.nativeElement as HTMLInputElement)

    expect(hiddenInputs).toHaveLength(2)
    expect(hiddenInputs[0].value).toBe('6/15/2024')
    expect(hiddenInputs[1].value).toBe('6/20/2024')

    fixture.destroy()
  })

  it('marks the form control touched after a user-visible value change', async () => {
    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkDateInputRoot],
      template: '<div arkDateInput [formControl]="control"></div>',
    })
    class Host {
      readonly control = new FormControl<DateValue[] | null>([parseDate('2026-05-19')])
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkDateInputRoot)).injector.get(ArkDateInputRoot)
    root.api().setValue([parseDate('2026-05-20')])
    await flush(fixture)

    expect(fixture.componentInstance.control.touched).toBe(true)

    fixture.destroy()
  })

  it('mixed form binding + [(value)] emits a dev warning once and the form binding wins', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkDateInputRoot],
      template: '<div arkDateInput [formControl]="control" [(value)]="value"></div>',
    })
    class Host {
      readonly control = new FormControl<DateValue[] | null>([parseDate('2026-05-19')])
      readonly value = signal<DateValue[] | undefined>([parseDate('2026-05-18')])
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkDateInputRoot)).injector.get(ArkDateInputRoot)
    fixture.componentInstance.control.setValue([parseDate('2026-05-20')])
    await flush(fixture)

    expect(root.api().value.map(String)).toEqual(['2026-05-20'])
    const warnCalls = warn.mock.calls.filter((args) => String(args[0]).includes('ArkDateInputRoot'))
    expect(warnCalls.length).toBe(1)

    fixture.destroy()
  })

  it('root-provider applies the supplied date input api', async () => {
    @Component({
      standalone: true,
      imports: [ArkDateInputRootProvider],
      template: '<div arkDateInputRootProvider [value]="dateInput"></div>',
    })
    class Host {
      private readonly injector = inject(Injector)
      readonly dateInput = runInInjectionContext(this.injector, () =>
        useDateInput({ context: () => ({ defaultValue: [parseDate('2026-05-19')] }) }),
      )
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const rootProvider = fixture.debugElement
      .query(By.directive(ArkDateInputRootProvider))
      .injector.get(ArkDateInputRootProvider)
    expect(rootProvider.api().value.map(String)).toEqual(['2026-05-19'])

    fixture.destroy()
  })
})
