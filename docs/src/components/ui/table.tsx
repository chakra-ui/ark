'use client'

import { ark } from '@ark-ui/react/factory'
import type { ComponentProps } from 'react'
import { styled } from 'styled-system/jsx'
import { table } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(table)

export const Root = withProvider(styled(ark.table), 'root')
export const Body = withContext(styled(ark.tbody), 'body')
export const Caption = withContext(styled(ark.caption), 'caption')
export const Cell = withContext(styled(ark.td), 'cell')
export const Footer = withContext(styled(ark.tfoot), 'footer')
export const Head = withContext(styled(ark.thead), 'head')
export const Header = withContext(styled(ark.th), 'header')
export const Row = withContext(styled(ark.tr), 'row')

export interface RootProps extends ComponentProps<typeof Root> {}
export interface BodyProps extends ComponentProps<typeof Body> {}
export interface CaptionProps extends ComponentProps<typeof Caption> {}
export interface CellProps extends ComponentProps<typeof Cell> {}
export interface FooterProps extends ComponentProps<typeof Footer> {}
export interface HeadProps extends ComponentProps<typeof Head> {}
export interface HeaderProps extends ComponentProps<typeof Header> {}
export interface RowProps extends ComponentProps<typeof Row> {}
