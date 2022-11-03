import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useTabsContext } from './tabs-context'

export type TabIndicatorProps = HTMLAtlasProps<'div'>

export const TabIndicator = forwardRef<'div', TabIndicatorProps>((props, ref) => {
  const { indicatorProps } = useTabsContext()

  return <atlas.div {...indicatorProps} {...props} ref={ref} />
})
