import { DatePicker } from '@ark-ui/solid/date-picker'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-solid'
import { For } from 'solid-js'
import styles from 'styles/date-picker.module.css'

export const MaxSelectedDates = () => {
  return (
    <DatePicker.Root class={styles.Root} selectionMode="multiple" maxSelectedDates={3} inline>
      <DatePicker.View view="day" class={styles.View}>
        <DatePicker.Context>
          {(context) => (
            <>
              <DatePicker.ViewControl class={styles.ViewControl}>
                <DatePicker.PrevTrigger class={styles.PrevTrigger}>
                  <ChevronLeftIcon />
                </DatePicker.PrevTrigger>
                <DatePicker.RangeText />
                <DatePicker.NextTrigger class={styles.NextTrigger}>
                  <ChevronRightIcon />
                </DatePicker.NextTrigger>
              </DatePicker.ViewControl>
              <DatePicker.Table class={styles.Table}>
                <DatePicker.TableHead class={styles.TableHead}>
                  <DatePicker.TableRow class={styles.TableRow}>
                    <For each={context().weekDays} keyed={false}>
                      {(weekDay) => (
                        <DatePicker.TableHeader class={styles.TableHeader}>{weekDay().short}</DatePicker.TableHeader>
                      )}
                    </For>
                  </DatePicker.TableRow>
                </DatePicker.TableHead>
                <DatePicker.TableBody class={styles.TableBody}>
                  <For each={context().weeks} keyed={false}>
                    {(week) => (
                      <DatePicker.TableRow class={styles.TableRow}>
                        <For each={week()} keyed={false}>
                          {(day) => (
                            <DatePicker.TableCell class={styles.TableCell} value={day()}>
                              <DatePicker.TableCellTrigger class={styles.TableCellTrigger}>
                                {day().day}
                              </DatePicker.TableCellTrigger>
                            </DatePicker.TableCell>
                          )}
                        </For>
                      </DatePicker.TableRow>
                    )}
                  </For>
                </DatePicker.TableBody>
              </DatePicker.Table>
            </>
          )}
        </DatePicker.Context>
      </DatePicker.View>
    </DatePicker.Root>
  )
}
