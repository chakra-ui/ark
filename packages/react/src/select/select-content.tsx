import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { Presence, splitPresenceProps, type PresenceProps } from '../presence'
import { useSelectContext } from './select-context'

export type SelectContentProps = ComponentPropsWithoutRef<typeof ark.div> &
  Omit<PresenceProps, 'children'>

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>((props, ref) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const api = useSelectContext()

  return (
    <Presence present={api.isOpen} {...presenceProps}>
      <SelectInnerContent ref={ref} {...localProps} />
    </Presence>
  )
})

SelectContent.displayName = 'SelectContent'

const SelectInnerContent = forwardRef<HTMLDivElement, SelectContentProps>(
  function SelectInnerContent(props, ref) {
    const api = useSelectContext()
    const mergedProps = mergeProps(api.contentProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)
