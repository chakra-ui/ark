import type { OptionItemProps, OptionItemState } from '@zag-js/menu'
import { mergeProps } from '@zag-js/solid'
import { createMemo, type Accessor, type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import type { Assign } from '../types'
import { useMenuContext } from './menu-context'

export interface MenuOptionItemProps
  extends Assign<
      HTMLArkProps<'div'>,
      {
        children?: JSX.Element | ((state: Accessor<OptionItemState>) => JSX.Element)
      }
    >,
    OptionItemProps {}

export const MenuOptionItem = (props: MenuOptionItemProps) => {
  const menu = useMenuContext()

  const [optionProps, localProps] = createSplitProps<OptionItemProps>()(props, [
    'id',
    'disabled',
    'valueText',
    'closeOnSelect',
    'name',
    'type',
    'value',
    'onCheckedChange',
  ])

  const mergedProps = mergeProps(() => menu().getOptionItemProps(optionProps), localProps)
  const itemState = createMemo(() => menu().getOptionItemState(optionProps))

  const getChildren = () => runIfFn(localProps.children, itemState)

  return <ark.div {...mergedProps}>{getChildren()}</ark.div>
}
