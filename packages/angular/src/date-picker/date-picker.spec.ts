import {
  ApplicationRef,
  Component,
  Directive,
  Injector,
  PLATFORM_ID,
  inject,
  runInInjectionContext,
  signal,
} from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { parseDate } from '@internationalized/date'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  ARK_DATE_PICKER_CONTEXT,
  ARK_DATE_PICKER_CONTEXT_CARRIER,
  ArkDatePickerClearTrigger,
  ArkDatePickerContent,
  ArkDatePickerContext,
  ArkDatePickerControl,
  ArkDatePickerInput,
  ArkDatePickerLabel,
  ArkDatePickerMonthSelect,
  ArkDatePickerNextTrigger,
  ArkDatePickerPositioner,
  ArkDatePickerPresetTrigger,
  ArkDatePickerPrevTrigger,
  ArkDatePickerRangeText,
  ArkDatePickerRoot,
  ArkDatePickerRootProvider,
  ArkDatePickerTable,
  ArkDatePickerTableBody,
  ArkDatePickerTableCell,
  ArkDatePickerTableCellTrigger,
  ArkDatePickerTableHead,
  ArkDatePickerTableHeader,
  ArkDatePickerTableRow,
  ArkDatePickerTrigger,
  ArkDatePickerValueText,
  ArkDatePickerView,
  ArkDatePickerViewControl,
  ArkDatePickerViewTrigger,
  ArkDatePickerWeekNumberCell,
  ArkDatePickerWeekNumberHeaderCell,
  ArkDatePickerYearSelect,
  datePickerAnatomy,
  injectArkDatePickerContext,
  injectArkDatePickerContextCarrier,
  useDatePicker,
  type DatePickerApi,
  type DatePickerElementIds,
  type DatePickerFocusChangeDetails,
  type DatePickerMachine,
  type DatePickerMachineProps,
  type DatePickerOpenChangeDetails,
  type DatePickerSelectionMode,
  type DatePickerService,
  type DatePickerValueChangeDetails,
  type DatePickerView,
  type DatePickerViewChangeDetails,
  type DatePickerVisibleRangeChangeDetails,
  type DateValue,
  type UseDatePickerOptions,
  type UseDatePickerProps,
  type UseDatePickerReturn,
} from '@ark-ui/angular/date-picker'
import { ArkPortalComponent } from '@ark-ui/angular/portal'

type DatePickerPublicTypeSmoke = [
  DatePickerApi,
  DatePickerElementIds,
  DatePickerFocusChangeDetails,
  DatePickerMachine,
  DatePickerMachineProps,
  DatePickerOpenChangeDetails,
  DatePickerSelectionMode,
  DatePickerService,
  DatePickerValueChangeDetails,
  DatePickerView,
  DatePickerViewChangeDetails,
  DatePickerVisibleRangeChangeDetails,
  DateValue,
  UseDatePickerOptions,
  UseDatePickerProps,
  UseDatePickerReturn,
]

const flush = async (fixture: ReturnType<typeof TestBed.createComponent>) => {
  await TestBed.inject(ApplicationRef).whenStable()
  TestBed.tick()
  fixture.detectChanges()
  await Promise.resolve()
  fixture.detectChanges()
}

@Directive({ selector: '[datePickerProbe]', standalone: true, exportAs: 'datePickerProbe' })
class DatePickerProbe {
  private readonly injector = inject(Injector)
  get capturedRoot(): UseDatePickerReturn {
    return this.injector.get(ARK_DATE_PICKER_CONTEXT)
  }
}

describe('@ark-ui/angular/date-picker', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_DATE_PICKER_CONTEXT).toBe('object')
    expect(typeof ARK_DATE_PICKER_CONTEXT_CARRIER).toBe('object')
    expect(typeof injectArkDatePickerContext).toBe('function')
    expect(typeof injectArkDatePickerContextCarrier).toBe('function')
    expect(typeof useDatePicker).toBe('function')
    expect(typeof datePickerAnatomy).toBe('object')
    expect(ArkDatePickerRoot).toBeDefined()
    expect(ArkDatePickerRootProvider).toBeDefined()
    expect(ArkDatePickerLabel).toBeDefined()
    expect(ArkDatePickerControl).toBeDefined()
    expect(ArkDatePickerInput).toBeDefined()
    expect(ArkDatePickerTrigger).toBeDefined()
    expect(ArkDatePickerContent).toBeDefined()
    expect(ArkDatePickerPositioner).toBeDefined()
    expect(ArkDatePickerClearTrigger).toBeDefined()
    expect(ArkDatePickerPrevTrigger).toBeDefined()
    expect(ArkDatePickerNextTrigger).toBeDefined()
    expect(ArkDatePickerViewTrigger).toBeDefined()
    expect(ArkDatePickerViewControl).toBeDefined()
    expect(ArkDatePickerPresetTrigger).toBeDefined()
    expect(ArkDatePickerMonthSelect).toBeDefined()
    expect(ArkDatePickerYearSelect).toBeDefined()
    expect(ArkDatePickerRangeText).toBeDefined()
    expect(ArkDatePickerValueText).toBeDefined()
    expect(ArkDatePickerView).toBeDefined()
    expect(ArkDatePickerTable).toBeDefined()
    expect(ArkDatePickerTableHead).toBeDefined()
    expect(ArkDatePickerTableHeader).toBeDefined()
    expect(ArkDatePickerTableBody).toBeDefined()
    expect(ArkDatePickerTableRow).toBeDefined()
    expect(ArkDatePickerTableCell).toBeDefined()
    expect(ArkDatePickerTableCellTrigger).toBeDefined()
    expect(ArkDatePickerWeekNumberHeaderCell).toBeDefined()
    expect(ArkDatePickerWeekNumberCell).toBeDefined()
    expect(ArkDatePickerContext).toBeDefined()
    expect(undefined as DatePickerPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('useDatePicker({ context: () => ({}) }) produces a non-empty fallback id', () => {
    @Component({ standalone: true, template: '' })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    const result = runInInjectionContext(fixture.componentRef.injector, () => useDatePicker({ context: () => ({}) }))
    const id = (result.api().getRootProps() as { id: unknown }).id as string

    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
    expect(id).toMatch(/date-picker::/)

    fixture.destroy()
  })

  it('clicking the trigger opens the date picker and the clear trigger clears the value', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkDatePickerRoot,
        ArkDatePickerControl,
        ArkDatePickerInput,
        ArkDatePickerTrigger,
        ArkDatePickerPositioner,
        ArkDatePickerContent,
        ArkDatePickerClearTrigger,
      ],
      template: `
        <div arkDatePicker #root="arkDatePicker" [defaultValue]="value" (openChange)="openEmissions.push($event)">
          <div arkDatePickerControl>
            <input arkDatePickerInput />
            <button arkDatePickerTrigger></button>
            <button arkDatePickerClearTrigger></button>
          </div>
          <div arkDatePickerPositioner>
            <div arkDatePickerContent></div>
          </div>
        </div>
      `,
    })
    class Host {
      readonly value = [parseDate('2026-05-19')]
      readonly openEmissions: Array<boolean | undefined> = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkDatePickerRoot)).injector.get(ArkDatePickerRoot)
    const trigger = fixture.debugElement.query(By.directive(ArkDatePickerTrigger)).nativeElement as HTMLButtonElement
    const clear = fixture.debugElement.query(By.directive(ArkDatePickerClearTrigger)).nativeElement as HTMLButtonElement

    expect(root.api().open).toBe(false)
    trigger.click()
    await flush(fixture)
    expect(root.api().open).toBe(true)
    expect(fixture.componentInstance.openEmissions).toEqual([true])

    clear.click()
    await flush(fixture)
    expect(root.api().value).toEqual([])

    fixture.destroy()
  })

  it('selects a day through table cell trigger and renders value text', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkDatePickerRoot,
        ArkDatePickerView,
        ArkDatePickerTable,
        ArkDatePickerTableBody,
        ArkDatePickerTableRow,
        ArkDatePickerTableCell,
        ArkDatePickerTableCellTrigger,
        ArkDatePickerValueText,
      ],
      template: `
        <div arkDatePicker inline (valueChange)="values.push($event)">
          <span arkDatePickerValueText placeholder="Pick a date"></span>
          <div arkDatePickerView view="day">
            <table arkDatePickerTable>
              <tbody arkDatePickerTableBody>
                <tr arkDatePickerTableRow>
                  <td arkDatePickerTableCell [value]="day">
                    <div arkDatePickerTableCellTrigger></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `,
    })
    class Host {
      readonly day = parseDate('2026-05-19')
      readonly values: Array<DateValue[] | undefined> = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkDatePickerRoot)).injector.get(ArkDatePickerRoot)
    const valueText = fixture.debugElement.query(By.directive(ArkDatePickerValueText)).nativeElement as HTMLElement
    const trigger = fixture.debugElement.query(By.directive(ArkDatePickerTableCellTrigger)).nativeElement as HTMLElement

    expect(valueText.textContent).toBe('Pick a date')
    trigger.click()
    await flush(fixture)

    expect(root.api().value.map(String)).toEqual(['2026-05-19'])
    expect(fixture.componentInstance.values.at(-1)?.map(String)).toEqual(['2026-05-19'])
    expect(valueText.textContent).toContain('2026')

    fixture.destroy()
  })

  it('roundtrips controlled view and emits visible range changes', async () => {
    @Component({
      standalone: true,
      imports: [ArkDatePickerRoot, ArkDatePickerView, ArkDatePickerViewControl, ArkDatePickerViewTrigger],
      template: `
        <div arkDatePicker [(view)]="view" (visibleRangeChange)="visibleRanges.push($event)">
          <div arkDatePickerView view="day">
            <div arkDatePickerViewControl>
              <button arkDatePickerViewTrigger></button>
            </div>
          </div>
          <div arkDatePickerView view="month"></div>
        </div>
      `,
    })
    class Host {
      readonly view = signal<DatePickerView | undefined>('day')
      readonly visibleRanges: DatePickerVisibleRangeChangeDetails[] = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkDatePickerRoot)).injector.get(ArkDatePickerRoot)
    root.api().setView('month')
    await flush(fixture)
    expect(fixture.componentInstance.view()).toBe('month')
    expect(root.api().view).toBe('month')

    fixture.componentInstance.view.set('year')
    await flush(fixture)
    expect(root.api().view).toBe('year')

    root.api().goToNext()
    await flush(fixture)
    expect(fixture.componentInstance.visibleRanges.length).toBeGreaterThan(0)

    fixture.destroy()
  })

  it('month/year selects populate options and update the focused value', async () => {
    @Component({
      standalone: true,
      imports: [ArkDatePickerRoot, ArkDatePickerMonthSelect, ArkDatePickerYearSelect],
      template: `
        <div arkDatePicker [defaultFocusedValue]="day">
          <select arkDatePickerMonthSelect></select>
          <select arkDatePickerYearSelect></select>
        </div>
      `,
    })
    class Host {
      readonly day = parseDate('2026-05-19')
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkDatePickerRoot)).injector.get(ArkDatePickerRoot)
    const month = fixture.debugElement.query(By.directive(ArkDatePickerMonthSelect)).nativeElement as HTMLSelectElement
    const year = fixture.debugElement.query(By.directive(ArkDatePickerYearSelect)).nativeElement as HTMLSelectElement

    expect(month.options.length).toBe(12)
    expect(year.options.length).toBeGreaterThan(0)

    month.value = '6'
    month.dispatchEvent(new Event('change', { bubbles: true }))
    await flush(fixture)
    expect(root.api().focusedValue.month).toBe(6)

    year.value = '2027'
    year.dispatchEvent(new Event('change', { bubbles: true }))
    await flush(fixture)
    expect(root.api().focusedValue.year).toBe(2027)

    fixture.destroy()
  })

  it('preset triggers select the requested range', async () => {
    @Component({
      standalone: true,
      imports: [ArkDatePickerRoot, ArkDatePickerPresetTrigger],
      template: '<div arkDatePicker><button arkDatePickerPresetTrigger value="last7Days"></button></div>',
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkDatePickerRoot)).injector.get(ArkDatePickerRoot)
    const trigger = fixture.debugElement.query(By.directive(ArkDatePickerPresetTrigger))
      .nativeElement as HTMLButtonElement

    trigger.click()
    await flush(fixture)

    expect(root.api().value.length).toBe(2)

    fixture.destroy()
  })

  it('supports inline/defaultOpen and ignores bare static controlled open', async () => {
    @Component({
      standalone: true,
      imports: [ArkDatePickerRoot],
      template: `
        <div arkDatePicker inline #inlineRoot="arkDatePicker"></div>
        <div arkDatePicker defaultOpen #defaultRoot="arkDatePicker"></div>
        <div arkDatePicker open #bareOpenRoot="arkDatePicker"></div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const roots = fixture.debugElement
      .queryAll(By.directive(ArkDatePickerRoot))
      .map((debug) => debug.injector.get(ArkDatePickerRoot))

    expect(roots[0].api().inline).toBe(true)
    expect(roots[0].api().open).toBe(true)
    expect(roots[1].api().open).toBe(true)
    expect(roots[2].api().open).toBe(false)

    fixture.destroy()
  })

  it('reactive FormControl writes update the same value channel and user changes notify once', async () => {
    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkDatePickerRoot],
      template: '<div arkDatePicker [formControl]="control" (valueChange)="emissions.push($event)"></div>',
    })
    class Host {
      readonly control = new FormControl<DateValue[] | null>([parseDate('2026-05-19')])
      readonly emissions: Array<DateValue[] | undefined> = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkDatePickerRoot)).injector.get(ArkDatePickerRoot)
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

  it('mixed form binding + [(value)] emits a dev warning once and the form binding wins', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkDatePickerRoot],
      template: '<div arkDatePicker [formControl]="control" [(value)]="value"></div>',
    })
    class Host {
      readonly control = new FormControl<DateValue[] | null>([parseDate('2026-05-19')])
      readonly value = signal<DateValue[] | undefined>([parseDate('2026-05-18')])
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkDatePickerRoot)).injector.get(ArkDatePickerRoot)
    fixture.componentInstance.control.setValue([parseDate('2026-05-20')])
    await flush(fixture)

    expect(root.api().value.map(String)).toEqual(['2026-05-20'])
    const warnCalls = warn.mock.calls.filter((args) => String(args[0]).includes('ArkDatePickerRoot'))
    expect(warnCalls.length).toBe(1)

    fixture.destroy()
  })

  it('content rendered through ark-portal can inject the originating date picker root', async () => {
    @Component({
      standalone: true,
      imports: [ArkDatePickerRoot, ArkDatePickerTrigger, ArkPortalComponent, DatePickerProbe],
      template: `
        <div arkDatePicker #root="arkDatePicker">
          <button arkDatePickerTrigger></button>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <span datePickerProbe #probe="datePickerProbe"></span>
          </ark-portal>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkDatePickerRoot)).injector.get(ArkDatePickerRoot)
    const probe = fixture.debugElement.query(By.directive(DatePickerProbe)).injector.get(DatePickerProbe)

    expect(probe.capturedRoot).toBe(root)

    fixture.destroy()
  })

  it('constructs on the server platform without direct document/window access', () => {
    @Component({
      standalone: true,
      imports: [ArkDatePickerRoot],
      template: '<div arkDatePicker></div>',
    })
    class Host {}

    TestBed.configureTestingModule({
      imports: [Host],
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    })

    expect(() => {
      const fixture = TestBed.createComponent(Host)
      fixture.detectChanges()
      fixture.destroy()
    }).not.toThrow()
  })
})
