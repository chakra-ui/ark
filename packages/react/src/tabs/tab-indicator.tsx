import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useTabsContext } from './tabs-context'

export type TabIndicatorProps = HTMLAtlasProps<'div'>

export const TabIndicator = forwardRef<'div', TabIndicatorProps>((props, ref) => {
  const { indicatorProps } = useTabsContext()
  const mergedProps = mergeProps(indicatorProps, props)

  return <atlas.div {...mergedProps} ref={ref} />
})
