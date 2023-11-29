/* eslint-disable vue/no-reserved-component-names */

import { type Context as DialogContext } from '@zag-js/dialog'
import { defineComponent } from 'vue'
import type { Optional } from '../types'
import { type ComponentWithProps } from '../utils'
import { DialogProvider } from './dialog-context'
import { props } from './dialog.props'
import { useDialog } from './use-dialog'

export type UseDialogProps = DialogContext

export const Dialog: ComponentWithProps<Partial<UseDialogProps>> = defineComponent({
  name: 'Dialog',
  props,
  emits: ['close', 'outside-click', 'esc', 'update:open'],
  setup(props, { slots, emit }) {
    const api = useDialog(emit, props as UseDialogProps)

    DialogProvider(api)

    return () => slots.default?.(api.value)
  },
})

export type DialogProps = Optional<UseDialogProps, 'id'>
