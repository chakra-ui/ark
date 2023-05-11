import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useSwitchContext } from './switch-context'

export type SwitchControlProps = HTMLArkProps<'span'>

export const SwitchControl = forwardRef<'span'>((props, ref) => {
  const { controlProps } = useSwitchContext()
  const mergedProps = mergeProps(controlProps, props)

  return <ark.span {...mergedProps} ref={ref} />
})
