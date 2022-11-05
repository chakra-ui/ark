import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useTabsContext } from './tabs-context'

export type TabListProps = HTMLAtlasProps<'div'>

export const TabList = forwardRef<'div', TabListProps>((props, ref) => {
  const { triggerGroupProps } = useTabsContext()
  const mergedProps = mergeProps(triggerGroupProps, props)

  return <atlas.div {...mergedProps} ref={ref} />
})
