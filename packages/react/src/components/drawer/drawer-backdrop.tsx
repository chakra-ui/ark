'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useComposedRefs } from '../../utils/compose-refs.ts'
import { useRenderStrategyPropsContext } from '../../utils/render-strategy.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { PresenceGate } from '../presence/presence-gate.tsx'
import { usePresence } from '../presence/index.ts'
import { useDrawerContext } from './use-drawer-context.ts'

export interface DrawerBackdropBaseProps extends PolymorphicProps {}
export interface DrawerBackdropProps extends HTMLProps<'div'>, DrawerBackdropBaseProps {}

export const DrawerBackdrop = forwardRef<HTMLDivElement, DrawerBackdropProps>((props, ref) => {
  const drawer = useDrawerContext()
  const renderStrategyProps = useRenderStrategyPropsContext()
  const presence = usePresence({ ...renderStrategyProps, present: drawer.open })
  const mergedProps = mergeProps(drawer.getBackdropProps(), presence.getPresenceProps(), props)
  const composedRefs = useComposedRefs(presence.ref, ref)

  return (
    <PresenceGate presence={presence}>
      <ark.div {...mergedProps} ref={composedRefs} />
    </PresenceGate>
  )
})

DrawerBackdrop.displayName = 'DrawerBackdrop'
