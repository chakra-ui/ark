import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useSwitchContext } from './switch-context'

export type SwitchThumbProps = HtmlArkProps<'span'>

export const SwitchThumb = forwardRef<HTMLSpanElement, SwitchThumbProps>((props, ref) => {
  const { thumbProps } = useSwitchContext()
  const mergedProps = mergeProps(thumbProps, props)

  return <ark.span {...mergedProps} ref={ref} />
})

SwitchThumb.displayName = 'SwitchThumb'
