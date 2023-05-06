import type { Context } from '@zag-js/tabs'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import { TabsProvider } from './tabs-context'
import { useTabs } from './use-tabs'

export type TabsContext = Context & {
  defaultValue?: Context['value']
}
export type TabsProps = Assign<HTMLArkProps<'div'>, TabsContext>

const VueTabsProps = createVueProps<TabsProps>({
  id: {
    type: String as PropType<TabsProps['id']>,
  },
  defaultValue: {
    type: String as PropType<TabsProps['defaultValue']>,
  },
  orientation: {
    type: String as PropType<TabsProps['orientation']>,
  },
  activationMode: {
    type: String as PropType<TabsProps['activationMode']>,
  },
  dir: {
    type: String as PropType<TabsProps['dir']>,
  },
  loop: {
    type: Boolean as PropType<TabsProps['loop']>,
  },
  translation: {
    type: Object as PropType<TabsProps['translations']>,
  },
  ids: {
    type: Object as PropType<TabsProps['ids']>,
  },
  getRootNode: {
    type: Function as PropType<TabsProps['getRootNode']>,
  },
})

export const Tabs: ComponentWithProps<Partial<TabsProps>> = defineComponent({
  name: 'Tabs',
  emits: ['change', 'focus', 'delete'],
  props: VueTabsProps,
  setup(props, { slots, attrs, emit }) {
    const api = useTabs(emit, props)

    TabsProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.({
          selectedValue: api.value.value,
          focusedValue: api.value.focusedValue,
        })}
      </ark.div>
    )
  },
})
