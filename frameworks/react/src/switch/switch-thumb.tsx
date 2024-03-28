import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSwitchContext } from './use-switch-context'

export interface SwitchThumbProps extends HTMLArkProps<'span'> {}

export const SwitchThumb = forwardRef<HTMLSpanElement, SwitchThumbProps>((props, ref) => {
  const context = useSwitchContext()
  const mergedProps = mergeProps(context.thumbProps, props)

  return <ark.span {...mergedProps} ref={ref} />
})

SwitchThumb.displayName = 'SwitchThumb'
