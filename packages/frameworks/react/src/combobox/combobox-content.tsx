import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useComboboxContext } from './use-combobox-context'

export interface ComboboxContentProps extends HTMLArkProps<'div'> {}

export const ComboboxContent = forwardRef<HTMLDivElement, ComboboxContentProps>((props, ref) => {
  const context = useComboboxContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(context.contentProps, presenceApi.getPresenceProps(ref), props)

  if (presenceApi.isUnmounted) {
    return null
  }

  return <ark.div {...mergedProps} />
})

ComboboxContent.displayName = 'ComboboxContent'
