import { computed, defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { TabsProvider } from './tabs-context'
import { useTabs, type UseTabsProps } from './use-tabs'

type UseTabsPropsContext = UseTabsProps['context']

export interface TabsProps extends Assign<HTMLArkProps<'div'>, UseTabsPropsContext> {
  defaultValue?: UseTabsProps['defaultValue']
}

const VueSelectProps = {
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
}

export const Tabs: ComponentWithProps<TabsProps> = defineComponent({
  name: 'Tabs',
  emits: ['change', 'focus', 'delete'],
  props: VueSelectProps,
  setup(props, { slots, attrs, emit }) {
    const tabsProps = computed<UseTabsProps>(() => ({
      context: props,
      defaultValue: props.defaultValue,
      emit,
    }))

    const api = useTabs(tabsProps.value)

    TabsProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.div>
    )
  },
})
