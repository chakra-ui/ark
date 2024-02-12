import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Button, DatePicker, IconButton, Input } from '~/components/ui'

export const Demo = (props: DatePicker.RootProps) => {
  return (
    <DatePicker.Root {...props} positioning={{ sameWidth: true }} startOfWeek={1}>
      <DatePicker.Label>Date Picker</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input asChild>
          <Input />
        </DatePicker.Input>
        <DatePicker.Trigger asChild>
          <IconButton variant="outline" aria-label="Open date picker">
            <CalendarIcon />
          </IconButton>
        </DatePicker.Trigger>
      </DatePicker.Control>
      <DatePicker.Positioner>
        <DatePicker.Content>
          <DatePicker.View view="day">
            {(api) => (
              <>
                <DatePicker.ViewControl>
                  <DatePicker.PrevTrigger asChild>
                    <IconButton variant="ghost" size="sm">
                      <ChevronLeftIcon />
                    </IconButton>
                  </DatePicker.PrevTrigger>
                  <DatePicker.ViewTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <DatePicker.RangeText />
                    </Button>
                  </DatePicker.ViewTrigger>
                  <DatePicker.NextTrigger asChild>
                    <IconButton variant="ghost" size="sm">
                      <ChevronRightIcon />
                    </IconButton>
                  </DatePicker.NextTrigger>
                </DatePicker.ViewControl>
                <DatePicker.Table>
                  <DatePicker.TableHead>
                    <DatePicker.TableRow>
                      {api.weekDays.map((weekDay, id) => (
                        <DatePicker.TableHeader key={id}>{weekDay.narrow}</DatePicker.TableHeader>
                      ))}
                    </DatePicker.TableRow>
                  </DatePicker.TableHead>
                  <DatePicker.TableBody>
                    {api.weeks.map((week, id) => (
                      <DatePicker.TableRow key={id}>
                        {week.map((day, id) => (
                          <DatePicker.TableCell key={id} value={day}>
                            <DatePicker.TableCellTrigger asChild>
                              <IconButton variant="ghost">{day.day}</IconButton>
                            </DatePicker.TableCellTrigger>
                          </DatePicker.TableCell>
                        ))}
                      </DatePicker.TableRow>
                    ))}
                  </DatePicker.TableBody>
                </DatePicker.Table>
              </>
            )}
          </DatePicker.View>
          <DatePicker.View view="month">
            {(api) => (
              <>
                <DatePicker.ViewControl>
                  <DatePicker.PrevTrigger asChild>
                    <IconButton variant="ghost" size="sm">
                      <ChevronLeftIcon />
                    </IconButton>
                  </DatePicker.PrevTrigger>
                  <DatePicker.ViewTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <DatePicker.RangeText />
                    </Button>
                  </DatePicker.ViewTrigger>
                  <DatePicker.NextTrigger asChild>
                    <IconButton variant="ghost" size="sm">
                      <ChevronRightIcon />
                    </IconButton>
                  </DatePicker.NextTrigger>
                </DatePicker.ViewControl>
                <DatePicker.Table>
                  <DatePicker.TableBody>
                    {api.getMonthsGrid({ columns: 4, format: 'short' }).map((months, id) => (
                      <DatePicker.TableRow key={id}>
                        {months.map((month, id) => (
                          <DatePicker.TableCell key={id} value={month.value}>
                            <DatePicker.TableCellTrigger asChild>
                              <Button variant="ghost">{month.label}</Button>
                            </DatePicker.TableCellTrigger>
                          </DatePicker.TableCell>
                        ))}
                      </DatePicker.TableRow>
                    ))}
                  </DatePicker.TableBody>
                </DatePicker.Table>
              </>
            )}
          </DatePicker.View>
          <DatePicker.View view="year">
            {(api) => (
              <>
                <DatePicker.ViewControl>
                  <DatePicker.PrevTrigger asChild>
                    <IconButton variant="ghost" size="sm">
                      <ChevronLeftIcon />
                    </IconButton>
                  </DatePicker.PrevTrigger>
                  <DatePicker.ViewTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <DatePicker.RangeText />
                    </Button>
                  </DatePicker.ViewTrigger>
                  <DatePicker.NextTrigger asChild>
                    <IconButton variant="ghost" size="sm">
                      <ChevronRightIcon />
                    </IconButton>
                  </DatePicker.NextTrigger>
                </DatePicker.ViewControl>
                <DatePicker.Table>
                  <DatePicker.TableBody>
                    {api.getYearsGrid({ columns: 4 }).map((years, id) => (
                      <DatePicker.TableRow key={id}>
                        {years.map((year, id) => (
                          <DatePicker.TableCell key={id} value={year.value}>
                            <DatePicker.TableCellTrigger asChild>
                              <Button variant="ghost">{year.label}</Button>
                            </DatePicker.TableCellTrigger>
                          </DatePicker.TableCell>
                        ))}
                      </DatePicker.TableRow>
                    ))}
                  </DatePicker.TableBody>
                </DatePicker.Table>
              </>
            )}
          </DatePicker.View>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </DatePicker.Root>
  )
}
