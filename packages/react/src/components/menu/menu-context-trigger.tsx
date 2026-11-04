'use client'

import { mergeProps } from '@zag-js/react'
import type { TriggerProps } from '@zag-js/menu'
import { forwardRef } from 'react'
import type { Assign } from '../../types.ts'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useMenuContext } from './use-menu-context.ts'

export interface MenuContextTriggerBaseProps extends TriggerProps, PolymorphicProps {}
export interface MenuContextTriggerProps extends Assign<HTMLProps<'button'>, MenuContextTriggerBaseProps> {}

const splitContextTriggerProps = createSplitProps<TriggerProps>()

export const MenuContextTrigger = forwardRef<HTMLButtonElement, MenuContextTriggerProps>((props, ref) => {
  const [contextTriggerProps, localProps] = splitContextTriggerProps(props, ['value'])
  const menu = useMenuContext()
  const mergedProps = mergeProps(menu.getContextTriggerProps(contextTriggerProps), localProps)

  return <ark.button {...mergedProps} ref={ref} />
})

MenuContextTrigger.displayName = 'MenuContextTrigger'
