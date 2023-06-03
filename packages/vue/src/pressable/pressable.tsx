import { defineComponent, type PropType, type UnwrapRef } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import { usePressable, type UsePressableProps, type UsePressableReturn } from './use-pressable'

export type PressableProps = Assign<HTMLArkProps<'button'>, UsePressableProps>

const VueProps = createVueProps<PressableProps>({
  id: {
    type: String as PropType<PressableProps['id']>,
  },
  disabled: {
    type: Boolean as PropType<PressableProps['disabled']>,
  },
  cancelOnPointerExit: {
    type: Boolean as PropType<PressableProps['cancelOnPointerExit']>,
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
  getRootNode: {
    type: Function as PropType<PressableProps['getRootNode']>,
  },
  longPressDelay: {
    type: Number as PropType<UsePressableProps['longPressDelay']>,
  },
})

export const Pressable: ComponentWithProps<PressableProps> = defineComponent({
  name: 'Pressable',
  props: VueProps,
  emits: ['press', 'long-press', 'press-end', 'press-up', 'press-start'],
  setup(props, { slots, attrs, emit }) {
    const api = usePressable(emit, props)
    return () => (
      <ark.button {...api.value.pressableProps} {...attrs}>
        {slots?.default?.(api.value)}
      </ark.button>
    )
  },
})

export type PressableContext = UnwrapRef<UsePressableReturn>
