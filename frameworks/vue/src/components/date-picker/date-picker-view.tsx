import { datePickerAnatomy } from '@ark-ui/anatomy'
import type { ViewProps } from '@zag-js/date-picker'
import { type PropType, defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { DatePickerViewPropsProvider } from './use-date-picker-view-props-context'

export interface DatePickerViewProps extends HTMLArkProps<'div'>, Required<ViewProps> {}

export const DatePickerView = defineComponent<DatePickerViewProps>(
  (props, { slots, attrs }) => {
    const api = useDatePickerContext()
    DatePickerViewPropsProvider(props)

    return () => (
      <ark.div
        hidden={api.value.view !== props.view}
        {...datePickerAnatomy.build().view.attrs}
        {...attrs}
      >
        {slots.default?.()}
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
