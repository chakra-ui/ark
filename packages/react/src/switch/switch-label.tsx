import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useSwitchContext } from './switch-context'

export type SwitchLabelProps = HTMLArkProps<'span'>

export const SwitchLabel = forwardRef<'span'>((props, ref) => {
  const { labelProps } = useSwitchContext()
  const mergedProps = mergeProps(labelProps, props)

  return <ark.span {...mergedProps} ref={ref} />
})
