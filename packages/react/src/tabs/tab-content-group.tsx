import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { useTabsContext } from './tabs-context'

export type TabContentGroupProps = HTMLAtlasProps<'div'>

export const TabContentGroup = forwardRef<'div', TabContentGroupProps>((props, ref) => {
  const { contentGroupProps } = useTabsContext()

  return <atlas.div {...props} {...contentGroupProps} ref={ref} />
})
