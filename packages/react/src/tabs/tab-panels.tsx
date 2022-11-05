import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useTabsContext } from './tabs-context'

export type TabPanelsProps = HTMLAtlasProps<'div'>

export const TabPanels = forwardRef<'div', TabPanelsProps>((props, ref) => {
  const { contentGroupProps } = useTabsContext()
  const mergedProps = mergeProps(contentGroupProps, props)

  return <atlas.div {...mergedProps} ref={ref} />
})
