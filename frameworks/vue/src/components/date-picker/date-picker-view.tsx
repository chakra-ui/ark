import { datePickerAnatomy } from '@ark-ui/anatomy'
import type { ViewProps } from '@zag-js/date-picker'
import { type PropType, defineComponent, reactive } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import { useDatePickerContext } from './date-picker-context'
import { DatePickerViewProvider } from './date-picker-view-context'

export interface DatePickerViewProps extends HTMLArkProps<'div'>, Required<ViewProps> {}

export const DatePickerView = defineComponent<DatePickerViewProps>(
  (props, { slots, attrs }) => {
    const api = useDatePickerContext()
    const reactiveProps = reactive(props)
    DatePickerViewProvider(reactiveProps)

    return () => (
      <ark.div
        hidden={api.value.view !== reactiveProps.view}
        {...datePickerAnatomy.build().view.attrs}
        {...attrs}
      >
        {slots.default?.(api.value)}
      </ark.div>
    )
  },
  {
    name: 'DatePickerView',
    props: {
      view: {
        type: String as PropType<Required<ViewProps>['view']>,
        required: true,
      },
    },
  },
)
