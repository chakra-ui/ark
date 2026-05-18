'use client'

import { mergeProps } from '@zag-js/react'
import type { ContentProps } from '@zag-js/drawer'
import { forwardRef } from 'react'
import { composeRefs } from '../../utils/compose-refs.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { usePresenceContext } from '../presence/index.ts'
import { useDrawerContext } from './use-drawer-context.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'

export interface DrawerContentBaseProps extends PolymorphicProps, ContentProps {}
export interface DrawerContentProps extends Omit<HTMLProps<'div'>, 'draggable'>, DrawerContentBaseProps {}

const splitContentProps = createSplitProps<ContentProps>()

export const DrawerContent = forwardRef<HTMLDivElement, DrawerContentProps>((props, ref) => {
  const [contentProps, localProps] = splitContentProps(props, ['draggable'])
  const drawer = useDrawerContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(
    drawer.getContentProps({ draggable: true, ...contentProps }),
    presence.getPresenceProps(),
    localProps,
  )

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} ref={composeRefs(presence.ref, ref)} />
})

DrawerContent.displayName = 'DrawerContent'
