import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { Presence, splitPresenceProps, type PresenceProps } from '../presence'
import { useComboboxContext } from './combobox-context'

export type ComboboxContentProps = HtmlArkProps<'div'> & Omit<PresenceProps, 'children'>

export const ComboboxContent = forwardRef<HTMLDivElement, ComboboxContentProps>((props, ref) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const api = useComboboxContext()

  return (
    <Presence present={api.isOpen} {...presenceProps}>
      <ComboboxInnerContent ref={ref} {...localProps} />
    </Presence>
  )
})

ComboboxContent.displayName = 'ComboboxContent'

const ComboboxInnerContent = forwardRef<HTMLDivElement, ComboboxContentProps>(
  function ComboboxInnerContent(props, ref) {
    const api = useComboboxContext()
    const mergedProps = mergeProps(api.contentProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)
