import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { useTabsContext } from './tabs-context'

export type TabListProps = HTMLAtlasProps<'div'>

export const TabList = forwardRef<'div'>((props, ref) => {
  const { triggerGroupProps } = useTabsContext()

  return <atlas.div {...props} {...triggerGroupProps} ref={ref} />
})
