import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { splitPresenceProps } from '../presence'
import { useComboboxContext } from './combobox-context'
import { ComboboxPresence, type ComboboxPresenceProps } from './combobox-presence'

export type ComboboxContentProps = ComponentPropsWithoutRef<typeof ark.div> &
  Omit<ComboboxPresenceProps, 'children'>

export const ComboboxContent = forwardRef<HTMLDivElement, ComboboxContentProps>((props, ref) => {
  const [presenceProps, comboboxContentProps] = splitPresenceProps(props)
  return (
    <ComboboxPresence {...presenceProps}>
      <InnerComboboxContent ref={ref} {...comboboxContentProps} />
    </ComboboxPresence>
  )
})
ComboboxContent.displayName = 'ComboboxContent'

const InnerComboboxContent = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof ark.div>>(
  (props, ref) => {
    const { contentProps } = useComboboxContext()
    const mergedProps = mergeProps(contentProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

InnerComboboxContent.displayName = 'InnerComboboxContent'
