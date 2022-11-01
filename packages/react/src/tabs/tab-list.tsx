import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useTabsContext } from './tabs-context'

export type TabListProps = HTMLAtlasProps<'div'>

export const TabList = forwardRef<'div', TabListProps>((props, ref) => {
  const { triggerGroupProps } = useTabsContext()

  return <atlas.div {...triggerGroupProps} {...props} ref={ref} />
})
