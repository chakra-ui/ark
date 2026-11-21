'use client'
import type { Assign } from '@ark-ui/react'
import { type CascadeSelectNode, CascadeSelect, cascadeSelectAnatomy } from '@ark-ui/react/cascade-select'
import { sva } from 'styled-system/css'
import type { ComponentProps, HTMLStyledProps } from 'styled-system/types'
import { createStyleContext } from '~/lib/create-style-context'

export const cascadeSelect = sva({
  slots: cascadeSelectAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5',
      width: 'full',
    },
    label: {
      fontWeight: 'medium',
      userSelect: 'none',
      textStyle: 'sm',
    },
    control: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.5',
    },
    trigger: {
      alignItems: 'center',
      borderRadius: 'l2',
      borderWidth: '1px',
      borderColor: 'gray.outline.border',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      minWidth: '0',
      outline: '0',
      px: '3',
      h: '10',
      textStyle: 'md',
      gap: '2',
      width: 'full',
      textAlign: 'start',
      transition: 'common',
      userSelect: 'none',
      focusVisibleRing: 'inside',
      _placeholderShown: { color: 'fg.subtle' },
      _disabled: {
        color: 'fg.disabled',
        cursor: 'not-allowed',
        _hover: {
          color: 'fg.disabled',
          background: 'none',
        },
      },
      _icon: { boxSize: '4' },
    },
    indicator: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'fg.subtle',
    },
    valueText: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    clearTrigger: {
      color: 'fg.subtle',
      cursor: 'pointer',
      _icon: { width: '4', height: '4' },
      _hover: { color: 'fg.default' },
      _hidden: { display: 'none' },
    },
    content: {
      background: 'bg.default',
      borderRadius: 'l2',
      borderWidth: '1px',
      display: 'flex',
      flexDirection: 'row',
      outline: '0',
      overflow: 'hidden',
      shadow: 'md',
      zIndex: 'dropdown',
      _open: { animation: 'fadeIn 0.1s ease-out' },
      _closed: { animation: 'fadeOut 0.1s ease-in' },
    },
    list: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1',
      minW: '36',
      maxH: '72',
      overflowY: 'auto',
      py: '1',
      textStyle: 'md',
      '& + &': {
        borderLeftWidth: '1px',
      },
    },
    item: {
      alignItems: 'center',
      borderRadius: 'l1',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      userSelect: 'none',
      px: '2',
      minH: '10',
      gap: '2',
      _highlighted: { bg: 'bg.subtle' },
      _hover: { bg: 'bg.subtle' },
      _checked: { color: 'colorPalette.default' },
      _disabled: {
        color: 'fg.disabled',
        cursor: 'not-allowed',
        _hover: {
          color: 'fg.disabled',
          background: 'none',
        },
      },
      _icon: { boxSize: '4' },
    },
    itemText: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    itemIndicator: {
      color: 'colorPalette.plain.fg',
    },
  },
})

const { withProvider, withContext } = createStyleContext(cascadeSelect)

export type RootProviderProps = ComponentProps<typeof RootProvider>
export const RootProvider = withProvider<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, CascadeSelect.RootProviderBaseProps<CascadeSelectNode>>
>(CascadeSelect.RootProvider, 'root')

export type RootProps = ComponentProps<typeof Root>
export const Root = withProvider<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, CascadeSelect.RootBaseProps<CascadeSelectNode>>
>(CascadeSelect.Root, 'root')

export const Label = withContext<HTMLLabelElement, Assign<HTMLStyledProps<'label'>, CascadeSelect.LabelBaseProps>>(
  CascadeSelect.Label,
  'label',
)

export const Control = withContext<HTMLDivElement, Assign<HTMLStyledProps<'div'>, CascadeSelect.ControlBaseProps>>(
  CascadeSelect.Control,
  'control',
)

export const Trigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, CascadeSelect.TriggerBaseProps>
>(CascadeSelect.Trigger, 'trigger')

export const Indicator = withContext<HTMLDivElement, Assign<HTMLStyledProps<'div'>, CascadeSelect.IndicatorBaseProps>>(
  CascadeSelect.Indicator,
  'indicator',
)

export const ValueText = withContext<
  HTMLSpanElement,
  Assign<HTMLStyledProps<'span'>, CascadeSelect.ValueTextBaseProps>
>(CascadeSelect.ValueText, 'valueText')

export const ClearTrigger = withContext<
  HTMLButtonElement,
  Assign<HTMLStyledProps<'button'>, CascadeSelect.ClearTriggerBaseProps>
>(CascadeSelect.ClearTrigger, 'clearTrigger')

export const Positioner = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, CascadeSelect.PositionerBaseProps>
>(CascadeSelect.Positioner, 'positioner')

export const Content = withContext<HTMLDivElement, Assign<HTMLStyledProps<'div'>, CascadeSelect.ContentBaseProps>>(
  CascadeSelect.Content,
  'content',
)

export const List = withContext<HTMLDivElement, Assign<HTMLStyledProps<'div'>, CascadeSelect.ListBaseProps>>(
  CascadeSelect.List,
  'list',
)

export const Item = withContext<HTMLDivElement, Assign<HTMLStyledProps<'div'>, CascadeSelect.ItemBaseProps>>(
  CascadeSelect.Item,
  'item',
)

export const ItemText = withContext<HTMLSpanElement, Assign<HTMLStyledProps<'span'>, CascadeSelect.ItemTextBaseProps>>(
  CascadeSelect.ItemText,
  'itemText',
)

export const ItemIndicator = withContext<
  HTMLDivElement,
  Assign<HTMLStyledProps<'div'>, CascadeSelect.ItemIndicatorBaseProps>
>(CascadeSelect.ItemIndicator, 'itemIndicator')

export const HiddenInput = CascadeSelect.HiddenInput
export const Context = CascadeSelect.Context
