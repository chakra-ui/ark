import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useSwitchContext } from './switch-context'

export type SwitchLabelProps = HtmlArkProps<'span'>

export const SwitchLabel = forwardRef<HTMLSpanElement, SwitchLabelProps>((props, ref) => {
  const { labelProps } = useSwitchContext()
  const mergedProps = mergeProps(labelProps, props)

  return <ark.span {...mergedProps} ref={ref} />
})

SwitchLabel.displayName = 'SwitchLabel'
