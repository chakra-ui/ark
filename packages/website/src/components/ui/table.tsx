import { ark } from '@ark-ui/react'
import type { ComponentPropsWithoutRef } from 'react'
import { styled } from 'styled-system/jsx'
import { table, type TableVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(table)

export type TableProps = TableVariantProps & ComponentPropsWithoutRef<typeof ark.table>

const TableRoot = withProvider(styled(ark.table), 'root')
export const TableBody = withContext(styled(ark.tbody), 'body')
export const TableCaption = withContext(styled(ark.caption), 'caption')
export const TableCell = withContext(styled(ark.td), 'cell')
export const TableFooter = withContext(styled(ark.tfoot), 'footer')
export const TableHead = withContext(styled(ark.th), 'head')
export const TableHeader = withContext(styled(ark.thead), 'header')
export const TableRow = withContext(styled(ark.tr), 'row')

export const Table = Object.assign(TableRoot, {
  Root: TableRoot,
  Body: TableBody,
  Caption: TableCaption,
  Cell: TableCell,
  Footer: TableFooter,
  Head: TableHead,
  Header: TableHeader,
  Row: TableRow,
})
