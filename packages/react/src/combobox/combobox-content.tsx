import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { splitPresenceProps } from '../presence'
import { useComboboxContext } from './combobox-context'
import { ComboboxPresence, type ComboboxPresenceProps } from './combobox-presence'

export type ComboboxContentProps = ComponentPropsWithoutRef<typeof ark.ul> &
  Omit<ComboboxPresenceProps, 'children'>

export const ComboboxContent = forwardRef<HTMLUListElement, ComboboxContentProps>((props, ref) => {
  const [presenceProps, comboboxContentProps] = splitPresenceProps(props)
  return (
    <ComboboxPresence {...presenceProps}>
      <InnerComboboxContent ref={ref} {...comboboxContentProps} />
    </ComboboxPresence>
  )
})
ComboboxContent.displayName = 'ComboboxContent'

const InnerComboboxContent = forwardRef<HTMLUListElement, ComponentPropsWithoutRef<typeof ark.ul>>(
  (props, ref) => {
    const { contentProps } = useComboboxContext()
    const mergedProps = mergeProps(contentProps, props)

    return <ark.ul {...mergedProps} ref={ref} />
  },
)

InnerComboboxContent.displayName = 'InnerComboboxContent'
