import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useSwitchContext } from './switch-context'

export type SwitchThumbProps = ComponentPropsWithoutRef<typeof ark.span>

export const SwitchThumb = forwardRef<HTMLSpanElement, SwitchThumbProps>((props, ref) => {
  const { thumbProps } = useSwitchContext()
  const mergedProps = mergeProps(thumbProps, props)

  return <ark.span {...mergedProps} ref={ref} />
})

SwitchThumb.displayName = 'SwitchThumb'
