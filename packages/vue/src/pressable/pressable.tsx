import type { Context as PressableContext } from '@zag-js/pressable'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { createVueProps, type ComponentWithProps } from '../utils'
import { usePressable } from './use-pressable'

export type PressableProps = Assign<HTMLArkProps<'button'>, PressableContext>

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
})

export const Pressable: ComponentWithProps<Partial<PressableProps>> = defineComponent({
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
