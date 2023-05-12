import type { Context } from '@zag-js/tabs'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign, type Optional } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import { TabsProvider } from './tabs-context'
import { useTabs } from './use-tabs'

export type TabsContext = Context & {
  defaultValue?: Context['value']
}
export type UseTabsProps = Assign<HTMLArkProps<'div'>, TabsContext>

const VueTabsProps = createVueProps<UseTabsProps>({
  id: {
    type: String as PropType<UseTabsProps['id']>,
  },
  defaultValue: {
    type: String as PropType<UseTabsProps['defaultValue']>,
  },
  orientation: {
    type: String as PropType<UseTabsProps['orientation']>,
  },
  activationMode: {
    type: String as PropType<UseTabsProps['activationMode']>,
  },
  dir: {
    type: String as PropType<UseTabsProps['dir']>,
  },
  loop: {
    type: Boolean as PropType<UseTabsProps['loop']>,
  },
  translation: {
    type: Object as PropType<UseTabsProps['translations']>,
  },
  ids: {
    type: Object as PropType<UseTabsProps['ids']>,
  },
  getRootNode: {
    type: Function as PropType<UseTabsProps['getRootNode']>,
  },
})

export const Tabs: ComponentWithProps<Partial<UseTabsProps>> = defineComponent({
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

export type TabsProps = Optional<TabsContext, 'id'>
