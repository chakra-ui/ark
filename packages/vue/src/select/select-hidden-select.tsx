import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type ComponentWithProps } from '../utils'
import { useSelectContext } from './select-context'

export type SelectHiddenSelectProps = HTMLArkProps<'select'>

export const SelectHiddenSelect: ComponentWithProps<SelectHiddenSelectProps> = defineComponent({
  name: 'SelectHiddenSelect',
  setup(_, { attrs }) {
    const api = useSelectContext()
    return () => <ark.select {...api.value.hiddenSelectProps} {...attrs} />
  },
})
