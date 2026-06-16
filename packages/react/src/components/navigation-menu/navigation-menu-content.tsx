'use client'

import type { ContentProps } from '@zag-js/navigation-menu'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { useComposedRefs } from '../../utils/compose-refs.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { useRenderStrategyPropsContext } from '../../utils/render-strategy.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { Portal } from '../portal/index.ts'
import { PresenceProvider, usePresence } from '../presence/index.ts'
import { useNavigationMenuContext } from './use-navigation-menu-context.ts'
import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context.ts'

export interface NavigationMenuContentBaseProps extends Partial<ContentProps>, PolymorphicProps {}
export interface NavigationMenuContentProps extends Assign<HTMLProps<'div'>, NavigationMenuContentBaseProps> {}

const splitContentProps = createSplitProps<ContentProps>()

export const NavigationMenuContent = forwardRef<HTMLDivElement, NavigationMenuContentProps>((props, ref) => {
  const api = useNavigationMenuContext()
  const itemContext = useNavigationMenuItemPropsContext()

  const value = props.value ?? itemContext?.value
  const [contentProps, localProps] = splitContentProps({ ...props, value }, ['value'])

  const renderStrategyProps = useRenderStrategyPropsContext()
  const presence = usePresence({ ...renderStrategyProps, present: api.value === value })
  const mergedProps = mergeProps(api.getContentProps(contentProps), presence.getPresenceProps(), localProps)
  const composedRefs = useComposedRefs(presence.ref, ref)

  const content = (
    <PresenceProvider value={presence}>
      {presence.unmounted ? null : <ark.div {...mergedProps} ref={composedRefs} />}
    </PresenceProvider>
  )

  const viewportNode = api.getViewportNode()
  if (api.isViewportRendered && viewportNode) {
    return (
      <>
        <div {...api.getViewportProxyProps(contentProps)} />
        <div {...api.getTriggerProxyProps(contentProps)} />
        <Portal container={{ current: viewportNode }}>{content}</Portal>
      </>
    )
  }

  return content
})

NavigationMenuContent.displayName = 'NavigationMenuContent'
