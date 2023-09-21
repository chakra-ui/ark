import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, splitPresenceProps, type PresenceProps } from '../presence'
import type { Assign } from '../types'
import { useSelectContext } from './select-context'

export interface SelectContentProps
  extends Assign<HTMLArkProps<'div'>, Omit<PresenceProps, 'children'>> {}

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
