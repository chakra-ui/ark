import { Index } from 'solid-js'
import { DatePicker } from '../..'

export const Standalone = () => {
  return (
    <DatePicker.Root open closeOnSelect={false}>
      <DatePicker.Context>
        {(context) => (
          <>
            <DatePicker.View view="day">
              <DatePicker.ViewControl>
                <DatePicker.PrevTrigger>Prev</DatePicker.PrevTrigger>
                <DatePicker.ViewTrigger>
                  <DatePicker.RangeText />
                </DatePicker.ViewTrigger>
                <DatePicker.NextTrigger>Next</DatePicker.NextTrigger>
              </DatePicker.ViewControl>

              <DatePicker.Table>
                <DatePicker.TableHead>
                  <DatePicker.TableRow>
                    <Index each={context().weekDays}>
                      {(weekDay) => (
                        <DatePicker.TableHeader>{weekDay().short}</DatePicker.TableHeader>
                      )}
                    </Index>
                  </DatePicker.TableRow>
                </DatePicker.TableHead>

                <DatePicker.TableBody>
                  <Index each={context().weeks}>
                    {(week) => (
                      <DatePicker.TableRow>
                        <Index each={week()}>
                          {(day) => (
                            <DatePicker.TableCell value={day()}>
                              <DatePicker.TableCellTrigger>{day().day}</DatePicker.TableCellTrigger>
                            </DatePicker.TableCell>
                          )}
                        </Index>
                      </DatePicker.TableRow>
                    )}
                  </Index>
                </DatePicker.TableBody>
              </DatePicker.Table>
            </DatePicker.View>
          </>
        )}
      </DatePicker.Context>
    </DatePicker.Root>
  )
}
