import { computed, defineComponent, PropType } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import { ComponentWithProps, getValidChildren } from '../utils'
import { TabsProvider } from './tabs-context'
import { useTabs, UseTabsProps } from './use-tabs'

type UseTabsPropsContext = UseTabsProps['context']

export interface TabsProps extends HTMLArkProps<'div'> {
  defaultValue?: UseTabsProps['defaultValue']
  orientation?: UseTabsPropsContext['orientation']
  activationMode?: UseTabsPropsContext['activationMode']
  dir?: UseTabsPropsContext['dir']
  translation?: UseTabsPropsContext['translations']
  ids?: UseTabsPropsContext['ids']
  isLoop?: UseTabsPropsContext['loop']
  onChange?: UseTabsPropsContext['onChange']
  onFocus?: UseTabsPropsContext['onFocus']
  onDelete?: UseTabsPropsContext['onDelete']
}

export const Tabs: ComponentWithProps<TabsProps> = defineComponent({
  name: 'Tabs',
  emits: ['change', 'focus', 'delete'],
  props: {
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
    ids: {
      type: Object as PropType<TabsProps['ids']>,
    },
    isLoop: {
      type: Boolean as PropType<TabsProps['isLoop']>,
    },
  },
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
