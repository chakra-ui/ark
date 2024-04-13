import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '~/factory'
import { usePresenceContext } from '../presence'
import { useComboboxContext } from './use-combobox-context'

export interface ComboboxContentProps extends HTMLArkProps<'div'> {}

export const ComboboxContent = forwardRef<HTMLDivElement, ComboboxContentProps>((props, ref) => {
  const combobox = useComboboxContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(combobox.contentProps, presence.getPresenceProps(ref), props)

  if (presence.isUnmounted) {
    return null
  }

  return <ark.div {...mergedProps} />
})

ComboboxContent.displayName = 'ComboboxContent'
