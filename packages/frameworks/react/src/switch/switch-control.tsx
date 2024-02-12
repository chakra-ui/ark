import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSwitchContext } from './switch-context'

export interface SwitchControlProps extends HTMLArkProps<'span'> {}

export const SwitchControl = forwardRef<HTMLSpanElement, SwitchControlProps>((props, ref) => {
  const api = useSwitchContext()
  const mergedProps = mergeProps(api.controlProps, props)

  return (
    <>
      <ark.span {...mergedProps} ref={ref} />
      <input {...api.hiddenInputProps} />
    </>
  )
})

SwitchControl.displayName = 'SwitchControl'
