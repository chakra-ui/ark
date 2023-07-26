import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { splitPresenceProps } from '../presence'
import { useSelectContext } from './select-context'
import { SelectPresence, type SelectPresenceProps } from './select-presence'

export type SelectContentProps = HTMLArkProps<'ul'> & Omit<SelectPresenceProps, 'children'>

export const SelectContent = forwardRef<'ul', SelectContentProps>((props, ref) => {
  const [presenceProps, selectContentProps] = splitPresenceProps(props)
  return (
    <SelectPresence {...presenceProps}>
      <InnerSelectContent ref={ref} {...selectContentProps} />
    </SelectPresence>
  )
})

const InnerSelectContent = forwardRef<'ul', HTMLArkProps<'ul'>>((props, ref) => {
  const { contentProps } = useSelectContext()
  const mergedProps = mergeProps(contentProps, props)

  return <ark.ul {...mergedProps} ref={ref} />
})
