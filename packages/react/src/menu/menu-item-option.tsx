import { forwardRef } from '@polymorphic-factory/react'
import type { connect } from '@zag-js/menu'
import type { ReactNode } from 'react'
import { ark, HTMLArkProps } from '../factory'
import { runIfFn } from '../run-if-fn'
import { Assign, splitProps } from '../split-props'
import { useMenuContext } from './menu-context'

export type MenuItemOptionState = { isActive: boolean }

export type MenuItemOptionParams = Parameters<ReturnType<typeof connect>['getOptionItemProps']>[0]

export type MenuItemOptionProps = Assign<
  HTMLArkProps<'div'>,
  MenuItemOptionParams & {
    children?: ReactNode | ((state: MenuItemOptionState) => ReactNode)
  }
>

export const MenuItemOption = forwardRef<'div', MenuItemOptionProps>((props, ref) => {
  const { api } = useMenuContext()
  const [optionProps, { children, ...htmlProps }] = splitProps(props, [
    'id',
    'disabled',
    'valueText',
    'closeOnSelect',
    'name',
    'type',
    'value',
    'onCheckedChange',
  ])

  const renderPropResult = runIfFn(children, { isActive: api.isOptionChecked(optionProps) })

  return (
    <ark.div {...api.getOptionItemProps(optionProps)} {...htmlProps} ref={ref}>
      {renderPropResult}
    </ark.div>
  )
})
