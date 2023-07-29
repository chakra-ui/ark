import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { splitPresenceProps } from '../presence'
import { useSelectContext } from './select-context'
import { SelectPresence, type SelectPresenceProps } from './select-presence'

export type SelectContentProps = ComponentPropsWithoutRef<typeof ark.ul> &
  Omit<SelectPresenceProps, 'children'>

export const SelectContent = forwardRef<HTMLUListElement, SelectContentProps>((props, ref) => {
  const [presenceProps, selectContentProps] = splitPresenceProps(props)
  return (
    <SelectPresence {...presenceProps}>
      <InnerSelectContent ref={ref} {...selectContentProps} />
    </SelectPresence>
  )
})

SelectContent.displayName = 'SelectContent'

const InnerSelectContent = forwardRef<HTMLUListElement, ComponentPropsWithoutRef<typeof ark.ul>>(
  (props, ref) => {
    const { contentProps } = useSelectContext()
    const mergedProps = mergeProps(contentProps, props)

    return <ark.ul {...mergedProps} ref={ref} />
  },
)

InnerSelectContent.displayName = 'InnerSelectContent'
