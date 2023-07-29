import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useTabsContext } from './tabs-context'

export type TabListProps = ComponentPropsWithoutRef<typeof ark.div>

export const TabList = forwardRef<HTMLDivElement, TabListProps>((props, ref) => {
  const { tablistProps } = useTabsContext()
  const mergedProps = mergeProps(tablistProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

TabList.displayName = 'TabList'
