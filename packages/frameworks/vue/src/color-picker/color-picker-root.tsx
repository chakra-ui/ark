import { computed, defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { PresenceProvider, usePresence, type UsePresenceProps } from '../presence'
import { emits as presenceEmits, props as presenceProps } from '../presence/presence.props'
import type { Assign } from '../types'
import { ColorPickerProvider } from './color-picker-context'
import { emits, props } from './color-picker.props'
import { useColorPicker, type UseColorPickerProps } from './use-color-picker'

export interface ColorPickerRootProps
  extends Assign<HTMLArkProps<'div'>, UseColorPickerProps>,
    UsePresenceProps {}

export const ColorPickerRoot = defineComponent<ColorPickerRootProps>(
  (props, { slots, emit, attrs }) => {
    const api = useColorPicker(props, emit)

    const isOpen = computed(() => api.value.isOpen)

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
          {slots.default?.(api.value)}
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
    emits: {
      ...emits,
      ...presenceEmits,
    },
  },
)
