import { ChangeDetectionStrategy, Component, Injector, inject, runInInjectionContext } from '@angular/core'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import {
  ArkDatePickerContent,
  ArkDatePickerContext,
  ArkDatePickerControl,
  ArkDatePickerNextTrigger,
  ArkDatePickerPositioner,
  ArkDatePickerPrevTrigger,
  ArkDatePickerRangeText,
  ArkDatePickerRootProvider,
  ArkDatePickerTable,
  ArkDatePickerTableBody,
  ArkDatePickerTableCell,
  ArkDatePickerTableCellTrigger,
  ArkDatePickerTableHead,
  ArkDatePickerTableHeader,
  ArkDatePickerTableRow,
  ArkDatePickerTrigger,
  ArkDatePickerView,
  ArkDatePickerViewControl,
  ArkDatePickerViewTrigger,
  useDatePicker,
} from '@ark-ui/angular/date-picker'
import {
  ArkDateInputControl,
  ArkDateInputHiddenInput,
  ArkDateInputLabel,
  ArkDateInputRootProvider,
  ArkDateInputSegment,
  ArkDateInputSegmentContext,
  ArkDateInputSegmentGroup,
  useDateInput,
} from '../public-api'
import { dateInputExampleStyles } from '../date-input-example-styles'
import { DateInputCalendarIcon, DateInputChevronLeftIcon, DateInputChevronRightIcon } from './icons'

@Component({
  selector: 'date-input-with-date-picker-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ArkDateInputRootProvider,
    ArkDateInputLabel,
    ArkDateInputControl,
    ArkDateInputSegmentGroup,
    ArkDateInputSegment,
    ArkDateInputSegmentContext,
    ArkDateInputHiddenInput,
    ArkDatePickerRootProvider,
    ArkDatePickerControl,
    ArkDatePickerTrigger,
    ArkDatePickerPositioner,
    ArkDatePickerContent,
    ArkDatePickerView,
    ArkDatePickerContext,
    ArkDatePickerViewControl,
    ArkDatePickerPrevTrigger,
    ArkDatePickerViewTrigger,
    ArkDatePickerRangeText,
    ArkDatePickerNextTrigger,
    ArkDatePickerTable,
    ArkDatePickerTableHead,
    ArkDatePickerTableRow,
    ArkDatePickerTableHeader,
    ArkDatePickerTableBody,
    ArkDatePickerTableCell,
    ArkDatePickerTableCellTrigger,
    ArkPortalComponent,
    DateInputCalendarIcon,
    DateInputChevronLeftIcon,
    DateInputChevronRightIcon,
  ],
  template: `
    <div arkDateInputRootProvider [value]="dateInput">
      <label arkDateInputLabel>Date</label>
      <div arkDateInputControl>
        <div arkDatePickerRootProvider #datePickerRoot="arkDatePickerRootProvider" [value]="datePicker">
          <div arkDatePickerControl>
            <div arkDateInputSegmentGroup>
              <ng-container *arkDateInputSegmentContext="let segment">
                <span arkDateInputSegment [segment]="segment"></span>
              </ng-container>
            </div>
            <button type="button" arkDatePickerTrigger>
              <date-input-calendar-icon />
            </button>
          </div>
          <ark-portal [originInjector]="datePickerRoot.getContextCarrier().elementInjector">
            <div arkDatePickerPositioner>
              <div arkDatePickerContent>
                <div arkDatePickerView view="day">
                  <ng-container *arkDatePickerContext="let datePicker">
                    <div arkDatePickerViewControl>
                      <button type="button" arkDatePickerPrevTrigger>
                        <date-input-chevron-left-icon />
                      </button>
                      <button type="button" arkDatePickerViewTrigger>
                        <span arkDatePickerRangeText></span>
                      </button>
                      <button type="button" arkDatePickerNextTrigger>
                        <date-input-chevron-right-icon />
                      </button>
                    </div>
                    <table arkDatePickerTable>
                      <thead arkDatePickerTableHead>
                        <tr arkDatePickerTableRow>
                          @for (weekDay of datePicker().weekDays; track $index) {
                            <th arkDatePickerTableHeader>{{ weekDay.short }}</th>
                          }
                        </tr>
                      </thead>
                      <tbody arkDatePickerTableBody>
                        @for (week of datePicker().weeks; track $index) {
                          <tr arkDatePickerTableRow>
                            @for (day of week; track $index) {
                              <td arkDatePickerTableCell [value]="day">
                                <button type="button" arkDatePickerTableCellTrigger>{{ day.day }}</button>
                              </td>
                            }
                          </tr>
                        }
                      </tbody>
                    </table>
                  </ng-container>
                </div>
                <div arkDatePickerView view="month">
                  <ng-container *arkDatePickerContext="let datePicker">
                    <div arkDatePickerViewControl>
                      <button type="button" arkDatePickerPrevTrigger>
                        <date-input-chevron-left-icon />
                      </button>
                      <button type="button" arkDatePickerViewTrigger>
                        <span arkDatePickerRangeText></span>
                      </button>
                      <button type="button" arkDatePickerNextTrigger>
                        <date-input-chevron-right-icon />
                      </button>
                    </div>
                    <table arkDatePickerTable [columns]="4">
                      <tbody arkDatePickerTableBody>
                        @for (months of datePicker().getMonthsGrid({ columns: 4, format: 'short' }); track $index) {
                          <tr arkDatePickerTableRow>
                            @for (month of months; track $index) {
                              <td arkDatePickerTableCell [value]="month.value">
                                <button type="button" arkDatePickerTableCellTrigger>{{ month.label }}</button>
                              </td>
                            }
                          </tr>
                        }
                      </tbody>
                    </table>
                  </ng-container>
                </div>
                <div arkDatePickerView view="year">
                  <ng-container *arkDatePickerContext="let datePicker">
                    <div arkDatePickerViewControl>
                      <button type="button" arkDatePickerPrevTrigger>
                        <date-input-chevron-left-icon />
                      </button>
                      <button type="button" arkDatePickerViewTrigger>
                        <span arkDatePickerRangeText></span>
                      </button>
                      <button type="button" arkDatePickerNextTrigger>
                        <date-input-chevron-right-icon />
                      </button>
                    </div>
                    <table arkDatePickerTable [columns]="4">
                      <tbody arkDatePickerTableBody>
                        @for (years of datePicker().getYearsGrid({ columns: 4 }); track $index) {
                          <tr arkDatePickerTableRow>
                            @for (year of years; track $index) {
                              <td arkDatePickerTableCell [value]="year.value">
                                <button type="button" arkDatePickerTableCellTrigger>{{ year.label }}</button>
                              </td>
                            }
                          </tr>
                        }
                      </tbody>
                    </table>
                  </ng-container>
                </div>
              </div>
            </div>
          </ark-portal>
        </div>
      </div>
      <input arkDateInputHiddenInput />
    </div>
  `,
  styles: [dateInputExampleStyles],
})
export class DateInputWithDatePickerExample {
  private readonly injector = inject(Injector)
  readonly datePicker = runInInjectionContext(this.injector, () => useDatePicker({ context: () => ({}) }))
  readonly dateInput = runInInjectionContext(this.injector, () =>
    useDateInput({
      context: () => ({
        value: this.datePicker.api().value,
        onValueChange: (details) => this.datePicker.api().setValue(details.value),
      }),
    }),
  )
}
