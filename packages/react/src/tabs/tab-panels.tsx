import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useTabsContext } from './tabs-context'

export type TabPanelsProps = HTMLArkProps<'div'>

export const TabPanels = forwardRef<'div', TabPanelsProps>((props, ref) => {
  const { contentGroupProps } = useTabsContext()
  const mergedProps = mergeProps(contentGroupProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
