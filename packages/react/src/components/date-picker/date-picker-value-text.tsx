import type { DateValue } from '@zag-js/date-picker'
import { Fragment, forwardRef } from 'react'
import type { Assign } from '../../types'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { datePickerAnatomy } from './date-picker.anatomy'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerValueTextRenderProps {
  value: DateValue
  index: number
  valueAsString: string
  remove: () => void
}

export interface DatePickerValueTextBaseProps extends PolymorphicProps {
  /**
   * Text to display when no date is selected.
   */
  placeholder?: string | undefined
  /**
   * A function to render each selected date value.
   * When provided, each date in the selection will be rendered using this function.
   */
  children?: ((props: DatePickerValueTextRenderProps) => React.ReactNode) | undefined
  /**
   * The separator to use between multiple date values when using default rendering.
   * @default ", "
   */
  separator?: string | undefined
}

export interface DatePickerValueTextProps extends Assign<HTMLProps<'span'>, DatePickerValueTextBaseProps> {}

export const DatePickerValueText = forwardRef<HTMLSpanElement, DatePickerValueTextProps>((props, ref) => {
  const { children, placeholder, separator = ', ', ...localProps } = props
  const datePicker = useDatePickerContext()

  const hasValue = datePicker.value.length > 0

  if (typeof children === 'function') {
    return (
      <Fragment>
        {hasValue
          ? datePicker.value.map((value, index) => (
              <Fragment key={index}>
                {children({
                  value,
                  index,
                  valueAsString: datePicker.valueAsString[index],
                  remove: () => {
                    datePicker.setValue(datePicker.value.filter((_, i) => i !== index))
                  },
                })}
              </Fragment>
            ))
          : placeholder}
      </Fragment>
    )
  }

  return (
    <ark.span {...datePickerAnatomy.build().valueText.attrs} {...localProps} ref={ref}>
      {hasValue ? datePicker.valueAsString.join(separator) : placeholder}
    </ark.span>
  )
})

DatePickerValueText.displayName = 'DatePickerValueText'
