import { forwardRef } from '@polymorphic-factory/react'
import type { connect } from '@zag-js/menu'
import { mergeProps } from '@zag-js/react'
import type { ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useMenuContext } from './menu-context'
import type { UseMenuReturn } from './use-menu'

export type MenuItemOptionState = { isActive: boolean }

export type MenuItemOptionParams = Parameters<ReturnType<typeof connect>['getOptionItemProps']>[0]

export type MenuItemOptionProps = Assign<
  HTMLArkProps<'div'>,
  MenuItemOptionParams & {
    children?: ReactNode | ((state: MenuItemOptionState) => ReactNode)
  }
>

// TODO rename to MenuOptionItem
export const MenuItemOption = forwardRef<'div', MenuItemOptionProps>((props, ref) => {
  const api = useMenuContext() as UseMenuReturn['api']
  const [optionProps, { children, ...divProps }] = createSplitProps<MenuItemOptionParams>()(props, [
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
