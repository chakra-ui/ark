'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useDialogContext } from './use-dialog-context.ts'

export interface DialogCloseTriggerBaseProps extends PolymorphicProps {}
export interface DialogCloseTriggerProps extends HTMLProps<'button'>, DialogCloseTriggerBaseProps {}

export const DialogCloseTrigger = forwardRef<HTMLButtonElement, DialogCloseTriggerProps>((props, ref) => {
  const dialog = useDialogContext()
  const mergedProps = mergeProps(dialog.getCloseTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
})

DialogCloseTrigger.displayName = 'DialogCloseTrigger'
