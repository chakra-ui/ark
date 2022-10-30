import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { useMenuContext } from './menu-context'
import { Assign, splitProps } from '../splitProps'
import * as React from 'react'
import type { ReactNode } from 'react'
import type { connect } from '@zag-js/menu'
import { runIfFn } from '../run-if-fn'

export type MenuItemOptionState = { isActive: boolean }

export type MenuItemOptionParams = Parameters<ReturnType<typeof connect>['getOptionItemProps']>[0]

export type MenuItemOptionProps = Assign<
  HTMLAtlasProps<'div'>,
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
    <atlas.div {...api.getOptionItemProps(optionProps)} {...htmlProps} ref={ref}>
      {renderPropResult}
    </atlas.div>
  )
})
