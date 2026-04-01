'use client'
import { DateInput } from '@ark-ui/react/date-input'
import { sva } from 'styled-system/css'

const recipe = sva({
  slots: ['root', 'label', 'control', 'segmentGroup', 'segment'],
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5',
      width: '100%',
      maxWidth: 'sm',
    },
    label: {
      color: 'fg.default',
      fontWeight: 'medium',
      textStyle: 'sm',
      userSelect: 'none',
      _disabled: { opacity: '0.5' },
    },
    control: {
      display: 'flex',
      alignItems: 'center',
      gap: '2',
      width: '100%',
    },
    segmentGroup: {
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
      _disabled: { opacity: '0.5' },
    },
    segment: {
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
      _placeholderShown: {
        color: 'fg.muted',
      },
      '&:focus': {
        background: 'colorPalette.default',
        color: 'colorPalette.fg',
      },
      '&[data-type="literal"]': {
        px: '0',
        userSelect: 'none',
        minWidth: 'unset',
        color: 'fg.muted',
      },
    },
  },
})

export const Demo = (props: DateInput.RootProps) => {
  const classNames = recipe()

  return (
    <DateInput.Root {...props} className={classNames.root}>
      <DateInput.Label className={classNames.label}>Date</DateInput.Label>
      <DateInput.Control className={classNames.control}>
        <DateInput.SegmentGroup className={classNames.segmentGroup}>
          <DateInput.Context>
            {(api) =>
              api
                .getSegments()
                .map((segment, index) => (
                  <DateInput.Segment
                    className={classNames.segment}
                    key={`${segment.type}-${index}`}
                    segment={segment}
                  />
                ))
            }
          </DateInput.Context>
        </DateInput.SegmentGroup>
      </DateInput.Control>
      <DateInput.HiddenInput />
    </DateInput.Root>
  )
}
