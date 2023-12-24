import { type ContentProps } from '@zag-js/tabs'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useTabsContext } from './tabs-context'

export interface TabContentProps extends Assign<HTMLArkProps<'div'>, ContentProps> {}

export const TabContent = defineComponent<TabContentProps>(
  (props, { slots, attrs }) => {
    const api = useTabsContext()

    return () => (
      <ark.div {...api.value.getContentProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'TabContent',
    props: {
      value: {
        type: String as PropType<TabContentProps['value']>,
        required: true,
      },
    },
  },
)
