import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { emits, props } from './pressable.props'
import { usePressable, type UsePressableProps } from './use-pressable'

export type PressableProps = Assign<HTMLArkProps<'button'>, UsePressableProps>

export const Pressable = defineComponent({
  name: 'Pressable',
  props,
  emits,
  setup(props, { slots, attrs, emit }) {
    const api = usePressable(props, emit)

    return () => (
      <ark.button {...api.value.pressableProps} {...attrs}>
        {slots?.default?.()}
      </ark.button>
    )
  },
})
