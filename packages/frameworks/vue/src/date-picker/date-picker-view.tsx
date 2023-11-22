import { datePickerAnatomy } from '@ark-ui/anatomy'
import type { ViewProps } from '@zag-js/date-picker'
import { defineComponent, reactive, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'
import { DatePickerViewProvider } from './date-picker-view-context'

export interface DatePickerViewProps extends HTMLArkProps<'div'>, Required<ViewProps> {}

export const DatePickerView = defineComponent({
  name: 'DatePickerView',
  props: {
    view: {
      type: String as PropType<Required<ViewProps>['view']>,
    },
  },
  setup(props, { slots, attrs }) {
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
})
