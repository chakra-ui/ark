import { computed, defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { PresenceProvider, type UsePresenceProps, usePresence } from '../presence'
import { emits as presenceEmits, props as presenceProps } from '../presence/presence.props'
import { emits, props } from './color-picker.props'
import { type UseColorPickerProps, useColorPicker } from './use-color-picker'
import { ColorPickerProvider } from './use-color-picker-context'

export interface ColorPickerRootProps
  extends Assign<HTMLArkProps<'div'>, UseColorPickerProps>,
    UsePresenceProps {}

export const ColorPickerRoot = defineComponent<ColorPickerRootProps>(
  (props, { slots, emit, attrs }) => {
    const api = useColorPicker(props, emit)

    const isOpen = computed(() => api.value.open)

    const presenceProps = computed(() => ({
      present: props.present || isOpen.value,
      lazyMount: props.lazyMount,
      unmountOnExit: props.unmountOnExit,
    }))
    const presenceApi = usePresence(presenceProps, emit)

    ColorPickerProvider(api)
    PresenceProvider(presenceApi)

    return () => (
      <>
        <ark.div {...api.value.rootProps} {...attrs}>
          {slots.default?.()}
        </ark.div>
        <input {...api.value.hiddenInputProps} />
      </>
    )
  },
  {
    name: 'ColorPickerRoot',
    props: {
      ...props,
      ...presenceProps,
    },
    emits: [...emits, ...presenceEmits],
  },
)
