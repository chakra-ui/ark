'use client'
import { DateInput as ArkDateInput } from '@ark-ui/react/date-input'
import { styled } from 'styled-system/jsx'

export const Root = styled(ArkDateInput.Root, {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5',
    width: '100%',
    maxWidth: 'sm',
  },
})
export type RootProps = ArkDateInput.RootProps

export const RootProvider = ArkDateInput.RootProvider
export type RootProviderProps = ArkDateInput.RootProviderProps

export const Label = styled(ArkDateInput.Label, {
  base: {
    color: 'fg.default',
    fontWeight: 'medium',
    textStyle: 'sm',
    userSelect: 'none',
    _disabled: { opacity: '0.5' },
  },
})
export type LabelProps = ArkDateInput.LabelProps

export const Control = styled(ArkDateInput.Control, {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '2',
    width: '100%',
  },
})
export type ControlProps = ArkDateInput.ControlProps

export const SegmentGroup = styled(ArkDateInput.SegmentGroup, {
  base: {
    display: 'flex',
    alignItems: 'center',
    flex: '1',
    minWidth: '0',
    height: '10',
    px: '3',
    textStyle: 'sm',
    fontFamily: 'inherit',
    background: 'transparent',
    borderWidth: '1px',
    borderRadius: 'l2',
    outline: 'none',
    cursor: 'text',
    _focusWithin: {
      borderColor: 'colorPalette.default',
      boxShadow: '0 0 0 1px var(--colors-color-palette-default)',
    },
    _invalid: { borderColor: 'fg.error' },
    _disabled: { opacity: '0.5', cursor: 'not-allowed' },
  },
})
export type SegmentGroupProps = ArkDateInput.SegmentGroupProps

export const Segment = styled(ArkDateInput.Segment, {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    px: '1',
    minWidth: '2ch',
    textAlign: 'center',
    borderRadius: 'sm',
    caretColor: 'transparent',
    outline: 'none',
    fontVariantNumeric: 'tabular-nums',
    background: 'transparent',
    color: 'fg.default',
    _placeholderShown: { color: 'fg.muted' },
    '&[data-focused]': {
      background: 'colorPalette.default',
      color: 'colorPalette.fg',
    },
    '&[data-type="literal"]': {
      px: '0',
      userSelect: 'none',
      minWidth: 'unset',
      color: 'fg.muted',
    },
    _disabled: { cursor: 'not-allowed' },
  },
})
export type SegmentProps = ArkDateInput.SegmentProps

export const HiddenInput = ArkDateInput.HiddenInput
export type HiddenInputProps = ArkDateInput.HiddenInputProps

export const Context = ArkDateInput.Context
export type ContextProps = ArkDateInput.ContextProps
