'use client'

import { mergeProps } from '@zag-js/react'
import type { ContentProps } from '@zag-js/drawer'
import { forwardRef } from 'react'
import { useComposedRefs } from '../../utils/compose-refs.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { PresenceGate } from '../presence/presence-gate.tsx'
import { usePresenceContext } from '../presence/index.ts'
import { useDrawerContext } from './use-drawer-context.ts'

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
  const composedRefs = useComposedRefs(presence.ref, ref)

  return (
    <PresenceGate presence={presence}>
      <ark.div {...mergedProps} ref={composedRefs} />
    </PresenceGate>
  )
})

DrawerContent.displayName = 'DrawerContent'
