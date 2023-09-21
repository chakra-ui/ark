import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export interface DialogTriggerProps extends HTMLArkProps<'button'> {}

export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>((props, ref) => {
  const api = useDialogContext()
  const mergedProps = mergeProps(api.triggerProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})

DialogTrigger.displayName = 'DialogTrigger'
