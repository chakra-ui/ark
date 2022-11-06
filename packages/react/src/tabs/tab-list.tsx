import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useTabsContext } from './tabs-context'

export type TabListProps = HTMLArkProps<'div'>

export const TabList = forwardRef<'div', TabListProps>((props, ref) => {
  const { triggerGroupProps } = useTabsContext()
  const mergedProps = mergeProps(triggerGroupProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
