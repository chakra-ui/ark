import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useTabsContext } from './tabs-context'

export type TabIndicatorProps = HTMLArkProps<'div'>

export const TabIndicator = forwardRef<'div', TabIndicatorProps>((props, ref) => {
  const { indicatorProps } = useTabsContext()
  const mergedProps = mergeProps(indicatorProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
