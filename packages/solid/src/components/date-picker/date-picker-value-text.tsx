import type { DateValue } from '@zag-js/date-picker'
import { type JSX, For, Show } from 'solid-js'
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

export interface DatePickerValueTextBaseProps extends PolymorphicProps<'span'> {
  /**
   * Text to display when no date is selected.
   */
  placeholder?: string | undefined
  /**
   * A function to render each selected date value.
   * When provided, each date in the selection will be rendered using this function.
   */
  children?: ((props: DatePickerValueTextRenderProps) => JSX.Element) | undefined
  /**
   * The separator to use between multiple date values when using default rendering.
   * @default ", "
   */
  separator?: string | undefined
}

export interface DatePickerValueTextProps extends Assign<HTMLProps<'span'>, DatePickerValueTextBaseProps> {}

export const DatePickerValueText = (props: DatePickerValueTextProps) => {
  const api = useDatePickerContext()

  const hasValue = () => api().value.length > 0

  return (
    <Show
      when={typeof props.children === 'function'}
      fallback={
        <ark.span {...datePickerAnatomy.build().valueText.attrs} {...props}>
          {hasValue() ? api().valueAsString.join(props.separator ?? ', ') : props.placeholder}
        </ark.span>
      }
    >
      <Show when={hasValue()} fallback={props.placeholder}>
        <For each={api().value}>
          {(value, index) => (
            <>
              {(props.children as (props: DatePickerValueTextRenderProps) => JSX.Element)({
                value,
                index: index(),
                valueAsString: api().valueAsString[index()],
                remove: () => {
                  api().setValue(api().value.filter((_, i) => i !== index()))
                },
              })}
            </>
          )}
        </For>
      </Show>
    </Show>
  )
}
