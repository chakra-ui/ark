import { type Assign } from '@polymorphic-factory/solid'
import { type connect } from '@zag-js/menu'
import { mergeProps } from '@zag-js/solid'
import { type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { useMenuContext } from './menu-context'

export type MenuOptionItemState = { isActive: boolean }

export type MenuOptionItemParams = Parameters<ReturnType<typeof connect>['getOptionItemProps']>[0]

export type MenuOptionItemProps = Assign<
  HTMLArkProps<'div'>,
  MenuOptionItemParams & {
    children?: JSX.Element | ((state: MenuOptionItemState) => JSX.Element)
  }
>

export const MenuOptionItem = (props: MenuOptionItemProps) => {
  const menu = useMenuContext()

  const [optionProps, localProps] = createSplitProps<MenuOptionItemParams>()(props, [
    'id',
    'disabled',
    'valueText',
    'closeOnSelect',
    'name',
    'type',
    'value',
    'onCheckedChange',
  ])

  const itemProps = mergeProps(() => menu?.().getOptionItemProps(optionProps), localProps)

  const getChildren = () =>
    runIfFn(localProps.children, { isActive: menu?.().isOptionChecked(optionProps) ?? false })

  return <ark.div {...itemProps}>{getChildren()}</ark.div>
}
