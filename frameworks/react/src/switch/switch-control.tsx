import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSwitchContext } from './use-switch-context'

export interface SwitchControlProps extends HTMLArkProps<'span'> {}

export const SwitchControl = forwardRef<HTMLSpanElement, SwitchControlProps>((props, ref) => {
  const context = useSwitchContext()
  const mergedProps = mergeProps(context.controlProps, props)

  return (
    <>
      <ark.span {...mergedProps} ref={ref} />
      <input {...context.hiddenInputProps} />
    </>
  )
})

SwitchControl.displayName = 'SwitchControl'
