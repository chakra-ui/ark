import { type ContentProps } from '@zag-js/tabs'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type ComponentWithProps } from '../utils'
import { useTabsContext } from './tabs-context'

export type TabContentProps = HTMLArkProps<'div'> & ContentProps

export const TabContent: ComponentWithProps<TabContentProps> = defineComponent({
  name: 'TabContent',
  props: {
    value: {
      type: String as PropType<TabContentProps['value']>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useTabsContext()

    return () => (
      <ark.div {...api.value.getContentProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
