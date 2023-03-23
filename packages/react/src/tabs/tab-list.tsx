import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { useTabsContext } from './tabs-context'

export type TabListProps = HTMLArkProps<'div'>

export const TabList = forwardRef<'div', TabListProps>((props, ref) => {
  const { tablistProps } = useTabsContext()
  const mergedProps = mergeProps(tablistProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
