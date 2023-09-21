import { type OptionItemProps } from '@zag-js/menu'
import { mergeProps } from '@zag-js/react'
import { forwardRef, type ReactNode } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { type Assign } from '../types'
import { useMenuContext } from './menu-context'
import { type UseMenuReturn } from './use-menu'

export interface MenuOptionItemState {
  isActive: boolean
}

export interface MenuOptionItemProps
  extends Assign<
    HTMLArkProps<'div'>,
    OptionItemProps & {
      children?: ReactNode | ((state: MenuOptionItemState) => ReactNode)
    }
  > {}

export const MenuOptionItem = forwardRef<HTMLDivElement, MenuOptionItemProps>((props, ref) => {
  const api = useMenuContext() as UseMenuReturn['api']
  const [optionProps, { children, ...divProps }] = createSplitProps<OptionItemProps>()(props, [
    'id',
    'disabled',
    'valueText',
    'closeOnSelect',
    'name',
    'type',
    'value',
    'onCheckedChange',
  ])

  const view = runIfFn(children, { isActive: !!api?.isOptionChecked(optionProps) })
  const mergedProps = mergeProps(api?.getOptionItemProps(optionProps) ?? {}, divProps)

  return (
    <ark.div {...mergedProps} ref={ref}>
      {view}
    </ark.div>
  )
})

MenuOptionItem.displayName = 'MenuOptionItem'
