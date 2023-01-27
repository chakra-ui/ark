import { computed, defineComponent, PropType } from 'vue'
import { ark, HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { ComponentWithProps, getValidChildren } from '../utils'
import { usePressable, UsePressableProps } from './use-pressable'

type UsePressablePropsContext = UsePressableProps['context']

export type PressableProps = Assign<HTMLArkProps<'button'>, UsePressablePropsContext>

export const Pressable: ComponentWithProps<PressableProps> = defineComponent({
  name: 'Pressable',
  props: {
    isDisabled: {
      type: Boolean as PropType<PressableProps['isDisabled']>,
    },
    isCanceledOnExit: {
      type: Boolean as PropType<PressableProps['isCanceledOnExit']>,
    },
    preventFocusOnPress: {
      type: Boolean as PropType<PressableProps['preventFocusOnPress']>,
    },
    allowTextSelectionOnPress: {
      type: Boolean as PropType<PressableProps['allowTextSelectionOnPress']>,
    },
    dir: {
      type: String as PropType<PressableProps['dir']>,
    },
  },
  emits: ['press', 'longPress', 'pressEnd', 'pressUp', 'pressStart'],
  setup(props, { slots, attrs, emit }) {
    const pressableProps = computed<UsePressableProps>(() => ({
      context: props,
      emit,
    }))

    const api = usePressable(pressableProps.value)
    return () => (
      <ark.button {...api.value.pressableProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.button>
    )
  },
})
