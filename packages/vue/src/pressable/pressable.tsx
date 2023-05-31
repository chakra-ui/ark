import type { Context as PressableContext } from '@zag-js/pressable'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign, type Optional } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import { usePressable } from './use-pressable'

export type UsePressableProps = Assign<HTMLArkProps<'button'>, PressableContext>

const VueProps = createVueProps<UsePressableProps>({
  id: {
    type: String as PropType<UsePressableProps['id']>,
  },
  disabled: {
    type: Boolean as PropType<UsePressableProps['disabled']>,
  },
  cancelOnPointerExit: {
    type: Boolean as PropType<UsePressableProps['cancelOnPointerExit']>,
  },
  preventFocusOnPress: {
    type: Boolean as PropType<UsePressableProps['preventFocusOnPress']>,
  },
  allowTextSelectionOnPress: {
    type: Boolean as PropType<UsePressableProps['allowTextSelectionOnPress']>,
  },
  dir: {
    type: String as PropType<UsePressableProps['dir']>,
  },
  longPressDelay: {
    type: Number as PropType<UsePressableProps['longPressDelay']>,
  },
})

export const Pressable: ComponentWithProps<Partial<UsePressableProps>> = defineComponent({
  name: 'Pressable',
  props: VueProps,
  emits: ['press', 'long-press', 'press-end', 'press-up', 'press-start'],
  setup(props, { slots, attrs, emit }) {
    const api = usePressable(emit, props)
    return () => (
      <ark.button {...api.value.pressableProps} {...attrs}>
        {() => slots?.default?.(api.value)}
      </ark.button>
    )
  },
})

export type PressableProps = Optional<UsePressableProps, 'id'>
