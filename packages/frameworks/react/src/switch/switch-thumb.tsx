import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useSwitchContext } from './switch-context'

export interface SwitchThumbProps extends HTMLArkProps<'span'> {}

export const SwitchThumb = forwardRef<HTMLSpanElement, SwitchThumbProps>((props, ref) => {
  const api = useSwitchContext()
  const mergedProps = mergeProps(api.thumbProps, props)

  return <ark.span {...mergedProps} ref={ref} />
})

SwitchThumb.displayName = 'SwitchThumb'
