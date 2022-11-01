import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useTabsContext } from './tabs-context'

export type TabPanelsProps = HTMLAtlasProps<'div'>

export const TabPanels = forwardRef<'div', TabPanelsProps>((props, ref) => {
  const { contentGroupProps } = useTabsContext()

  return <atlas.div {...props} {...contentGroupProps} ref={ref} />
})
