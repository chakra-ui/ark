import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { splitPresenceProps } from '../presence'
import { useComboboxContext } from './combobox-context'
import { ComboboxPresence, type ComboboxPresenceProps } from './combobox-presence'

export type ComboboxContentProps = HTMLArkProps<'ul'> & Omit<ComboboxPresenceProps, 'children'>

export const ComboboxContent = forwardRef<'ul', ComboboxContentProps>((props, ref) => {
  const [presenceProps, comboboxContentProps] = splitPresenceProps(props)
  return (
    <ComboboxPresence {...presenceProps}>
      <InnerComboboxContent ref={ref} {...comboboxContentProps} />
    </ComboboxPresence>
  )
})

const InnerComboboxContent = forwardRef<'ul', HTMLArkProps<'ul'>>((props, ref) => {
  const { contentProps } = useComboboxContext()
  const mergedProps = mergeProps(contentProps, props)

  return <ark.ul {...mergedProps} ref={ref} />
})
