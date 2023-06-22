import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useSwitchContext } from './switch-context'

export type SwitchThumbProps = HTMLArkProps<'span'>

export const SwitchThumb = forwardRef<'span'>((props, ref) => {
  const { thumbProps } = useSwitchContext()
  const mergedProps = mergeProps(thumbProps, props)

  return <ark.span {...mergedProps} ref={ref} />
})
