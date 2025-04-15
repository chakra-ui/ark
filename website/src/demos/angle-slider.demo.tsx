'use client'

import { AngleSlider, angleSliderAnatomy, useAngleSliderContext } from '@ark-ui/react/angle-slider'
import { sva } from 'styled-system/css'
import { vstack } from 'styled-system/patterns'

const width = 200
const thickness = 20

const recipe = sva({
  slots: [...angleSliderAnatomy.keys(), 'thumbIndicator', 'ring', 'ringTrack', 'ringRange'],
  base: {
    root: {
      pos: 'relative',
      w: '200px',
      h: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    control: {
      pos: 'absolute',
      inset: '0',
    },
    thumb: {
      pos: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 'calc(50% - 1.5px)',
      pointerEvents: 'none',
      h: '100%',
      w: '3px',
      display: 'flex',
      alignItems: 'flex-start',
      outline: '0',
      _focusVisible: {
        '& span': {
          outline: '2px solid {colors.colorPalette.8}',
          outlineOffset: '1px',
        },
      },
    },
    thumbIndicator: {
      bg: 'colorPalette.text',
      w: '5',
      h: '5',
      borderRadius: 'full',
      flexShrink: 0,
      scale: 1.25,
    },
    valueText: {
      textStyle: '4xl',
      color: 'colorPalette.text',
    },
    label: {
      textStyle: 'sm',
    },
    ring: {
      width: 'var(--size)',
      height: 'var(--size)',
    },
    ringTrack: {
      stroke: 'bg.muted',
      '--radius': 'calc(var(--size) / 2 - var(--thickness) / 2)',
      cx: 'calc(var(--size) / 2)',
      cy: 'calc(var(--size) / 2)',
      r: 'var(--radius)',
      fill: 'transparent',
      strokeWidth: 'var(--thickness)',
    },
    ringRange: {
      stroke: 'colorPalette.6',
      '--radius': 'calc(var(--size) / 2 - var(--thickness) / 2)',
      cx: 'calc(var(--size) / 2)',
      cy: 'calc(var(--size) / 2)',
      r: 'var(--radius)',
      fill: 'transparent',
      strokeWidth: 'var(--thickness)',
      '--circumference': 'calc(2 * 3.14159 * var(--radius))',
      '--offset': 'calc(var(--circumference) * (100 - var(--percent)) / 100)',
      strokeDashoffset: 'calc(var(--circumference) * ((100 - var(--percent)) / 100))',
      strokeDasharray: 'var(--circumference)',
      strokeLinecap: 'round',
      transformOrigin: 'center',
      transform: 'rotate(-90deg)',
    },
  },
})

const classNames = recipe()

export const Demo = (props: AngleSlider.RootProps) => {
  return (
    <AngleSlider.Root {...props} defaultValue={45} className={classNames.root}>
      <AngleSlider.Control className={classNames.control}>
        <ProgressRing />
        <AngleSlider.Thumb className={classNames.thumb}>
          <span className={classNames.thumbIndicator} />
        </AngleSlider.Thumb>
      </AngleSlider.Control>
      <ValueText />
      <AngleSlider.HiddenInput />
    </AngleSlider.Root>
  )
}

function ValueText() {
  const api = useAngleSliderContext()
  return (
    <div className={vstack({ gap: '0' })}>
      <AngleSlider.ValueText className={classNames.valueText}>{api.value}°</AngleSlider.ValueText>
      <AngleSlider.Label className={classNames.label}>degrees</AngleSlider.Label>
    </div>
  )
}

function ProgressRing() {
  const api = useAngleSliderContext()
  const percent = (api.value / 360) * 100
  return (
    <svg
      width={width}
      height={width}
      viewBox={`0 0 ${width} ${width}`}
      style={{ '--size': `${width}px`, '--thickness': `${thickness}px`, '--percent': percent } as React.CSSProperties}
    >
      <title>Slider Ring</title>
      <circle className={classNames.ringTrack} />
      <circle className={classNames.ringRange} />
    </svg>
  )
}
