import { DatePicker } from '../..'

export const Standalone = () => {
  return (
    <DatePicker.Root open={true} closeOnSelect={false}>
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
                    {context().weekDays.map((weekDay) => (
                      <DatePicker.TableHeader>{weekDay.short}</DatePicker.TableHeader>
                    ))}
                  </DatePicker.TableRow>
                </DatePicker.TableHead>
                <DatePicker.TableBody>
                  {context().weeks.map((week) => (
                    <DatePicker.TableRow>
                      {week.map((day) => (
                        <DatePicker.TableCell value={day}>
                          <DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
                        </DatePicker.TableCell>
                      ))}
                    </DatePicker.TableRow>
                  ))}
                </DatePicker.TableBody>
              </DatePicker.Table>
            </DatePicker.View>
          </>
        )}
      </DatePicker.Context>
    </DatePicker.Root>
  )
}
