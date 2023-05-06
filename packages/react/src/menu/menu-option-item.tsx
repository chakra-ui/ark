import { type connect } from '@zag-js/menu'
import { mergeProps } from '@zag-js/react'
import { type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { useMenuContext } from './menu-context'
import { type UseMenuReturn } from './use-menu'

export type MenuOptionItemState = { isActive: boolean }
export type MenuOptionItemParams = Parameters<ReturnType<typeof connect>['getOptionItemProps']>[0]
export type MenuOptionItemProps = Assign<
  HTMLArkProps<'div'>,
  MenuOptionItemParams & {
    children?: ReactNode | ((state: MenuOptionItemState) => ReactNode)
  }
>

export const MenuOptionItem = forwardRef<'div', MenuOptionItemProps>((props, ref) => {
  const api = useMenuContext() as UseMenuReturn['api']
  const [optionProps, { children, ...divProps }] = createSplitProps<MenuOptionItemParams>()(props, [
    'id',
    'disabled',
    'valueText',
    'closeOnSelect',
    'name',
    'type',
    'value',
    'onCheckedChange',
  ])

  const view = runIfFn(children, { isActive: api?.isOptionChecked(optionProps) ?? false })
  const mergedProps = mergeProps(api?.getOptionItemProps(optionProps) ?? {}, divProps)

  return (
    <ark.div {...mergedProps} ref={ref}>
      {view}
    </ark.div>
  )
})
