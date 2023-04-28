import { type connect } from '@zag-js/tabs'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { useTabsContext } from './tabs-context'

type GetContentProps = Parameters<ReturnType<typeof connect>['getContentProps']>[0]

export type TabContentProps = HTMLArkProps<'div'> & GetContentProps

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
      <ark.div {...api.value.getContentProps({ value: props.value })} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
