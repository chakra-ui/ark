'use client'
import type { Assign } from '@ark-ui/react'
import { type HTMLArkProps, ark } from '@ark-ui/react/factory'
import { type TableVariantProps, table } from 'styled-system/recipes'
import type { JsxStyleProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(table)

export interface RootProps
  extends Assign<JsxStyleProps, HTMLArkProps<'table'>>,
    TableVariantProps {}
export const Root = withProvider<HTMLTableElement, RootProps>(ark.table, 'root')

export const Body = withContext<
  HTMLTableSectionElement,
  Assign<JsxStyleProps, HTMLArkProps<'tbody'>>
>(ark.tbody, 'body')

export const Caption = withContext<
  HTMLTableCaptionElement,
  Assign<JsxStyleProps, HTMLArkProps<'caption'>>
>(ark.caption, 'caption')

export const Cell = withContext<HTMLTableCellElement, Assign<JsxStyleProps, HTMLArkProps<'td'>>>(
  ark.td,
  'cell',
)

export const Foot = withContext<
  HTMLTableSectionElement,
  Assign<JsxStyleProps, HTMLArkProps<'tfoot'>>
>(ark.tfoot, 'footer')

export const Head = withContext<
  HTMLTableSectionElement,
  Assign<JsxStyleProps, HTMLArkProps<'thead'>>
>(ark.thead, 'head')

export const Header = withContext<HTMLTableCellElement, Assign<JsxStyleProps, HTMLArkProps<'th'>>>(
  ark.th,
  'header',
)

export const Row = withContext<HTMLTableRowElement, Assign<JsxStyleProps, HTMLArkProps<'tr'>>>(
  ark.tr,
  'row',
)
