import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useSelectContext } from './use-select-context'

export interface SelectContentProps extends HTMLArkProps<'div'> {}

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>((props, ref) => {
  const context = useSelectContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(context.contentProps, presenceApi.getPresenceProps(ref), props)

  if (presenceApi.isUnmounted) {
    return null
  }

  return <ark.div {...mergedProps} />
})

SelectContent.displayName = 'SelectContent'
