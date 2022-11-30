import type { Assign } from '@polymorphic-factory/solid'
import type { connect } from '@zag-js/menu'
import type { JSX } from 'solid-js'
import { children } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { useMenuContext } from './menu-context'

export type MenuItemOptionState = { isActive: boolean }

export type MenuItemOptionParams = Parameters<ReturnType<typeof connect>['getOptionItemProps']>[0]

export type MenuItemOptionProps = Assign<
  HTMLArkProps<'div'>,
  MenuItemOptionParams & {
    children?: JSX.Element | ((state: MenuItemOptionState) => JSX.Element)
  }
>

export const MenuItemOption = (props: MenuItemOptionProps) => {
  const menu = useMenuContext()
  const [optionProps, divProps] = createSplitProps<MenuItemOptionParams>()(props, [
    'id',
    'disabled',
    'valueText',
    'closeOnSelect',
    'name',
    'type',
    'value',
    'onCheckedChange',
  ])

  const view = () =>
    children(() =>
      runIfFn(divProps.children, { isActive: menu?.().isOptionChecked(optionProps) ?? false }),
    )

  return (
    <ark.div {...menu?.().getOptionItemProps(optionProps)} {...divProps}>
      {view}
    </ark.div>
  )
}
