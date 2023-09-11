import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useTabsContext } from './tabs-context'

export type TabIndicatorProps = HtmlArkProps<'div'>

export const TabIndicator = forwardRef<HTMLDivElement, TabIndicatorProps>((props, ref) => {
  const { indicatorProps } = useTabsContext()
  const mergedProps = mergeProps(indicatorProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

TabIndicator.displayName = 'TabIndicator'
