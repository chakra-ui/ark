import { type PropTypes, normalizeProps as normalize } from '@zag-js/react'
import { clampValue } from '@zag-js/utils'
import { useMemo } from 'react'
import { useControllableState } from '../../utils/use-controllable-state'
import { useEvent } from '../../utils/use-event'
import { useElementScope } from '../../utils/use-state-value'
import { progressAnatomy } from './progress.anatomy'

const parts = progressAnatomy.build()

export function useProgress(props: UseProgressProps = {}): UseProgressReturn {
  const { min = 0, max = 100, orientation = 'horizontal', translations: userTranslations } = props

  // Dom utils
  const scope = useElementScope(props.id)
  const getRootId = () => props.ids?.root ?? `progress-${scope.id}`
  const getTrackId = () => props.ids?.track ?? `progress-${scope.id}-track`
  const getLabelId = () => props.ids?.label ?? `progress-${scope.id}-label`
  const getCircleId = () => props.ids?.circle ?? `progress-${scope.id}-circle`

  // Context
  const initialValue = (() => {
    if (props.defaultValue !== undefined) return props.defaultValue
    return midValue(min, max)
  })()
  const [value, setValue] = useControllableState<number | null>({
    defaultValue: initialValue != null ? clampValue(initialValue, min, max) : null,
    value: props.value != null ? clampValue(props.value, min, max) : null,
    onChange(value) {
      props.onValueChange?.({ value })
    },
  })

  // Computed
  const indeterminate = value == null
  const percent = useMemo(() => {
    if (!isValidNumber(value)) return -1
    return Math.round(((value - min) / (max - min)) * 100)
  }, [value, min, max])
  const percentAsString = indeterminate ? '' : `${percent}%`
  const horizontal = orientation === 'horizontal'

  const translations = useMemo(
    () => ({
      value: ({ percent }: ValueTranslationDetails) =>
        percent === -1 ? 'loading...' : `${percent} percent`,
      ...userTranslations,
    }),
    [userTranslations],
  )

  // Sender
  const send = useEvent((event: ProgressEvent) => {
    switch (event.type) {
      case 'VALUE.SET':
        setValue(event.value)
        break
    }
  })

  const valueAsString = translations.value({
    value: value,
    max,
    min,
    percent,
  })

  const progressState = getProgressState(value, max)

  const progressbarProps = {
    role: 'progressbar',
    'aria-label': valueAsString,
    'data-max': max,
    'aria-valuemin': min,
    'aria-valuemax': max,
    'aria-valuenow': value ?? undefined,
    'data-orientation': orientation,
    'data-state': progressState,
  }

  const circleStyle = {
    '--radius': 'calc(var(--size) / 2 - var(--thickness) / 2)',
    cx: 'calc(var(--size) / 2)',
    cy: 'calc(var(--size) / 2)',
    r: 'var(--radius)',
    fill: 'transparent',
    strokeWidth: 'var(--thickness)',
  }

  return {
    value: value,
    valueAsString,
    min,
    max,
    percent,
    percentAsString,
    indeterminate,

    setValue(val: number | null) {
      send({ type: 'VALUE.SET', value: val })
    },
    setToMax() {
      send({ type: 'VALUE.SET', value: max })
    },
    setToMin() {
      send({ type: 'VALUE.SET', value: min })
    },

    getRootProps: () =>
      normalize.element({
        dir: scope.dir,
        ...parts.root.attrs,
        id: getRootId(),
        'data-max': max,
        'data-value': value ?? undefined,
        'data-state': progressState,
        'data-orientation': orientation,
        style: {
          '--percent': indeterminate ? undefined : percent,
        },
      }),

    getLabelProps: () =>
      normalize.element({
        dir: scope.dir,
        id: getLabelId(),
        ...parts.label.attrs,
        'data-orientation': orientation,
      }),

    getValueTextProps: () =>
      normalize.element({
        dir: scope.dir,
        'aria-live': 'polite',
        ...parts.valueText.attrs,
      }),

    getTrackProps: () =>
      normalize.element({
        dir: scope.dir,
        id: getTrackId(),
        ...parts.track.attrs,
        ...progressbarProps,
      }),

    getRangeProps: () =>
      normalize.element({
        dir: scope.dir,
        ...parts.range.attrs,
        'data-orientation': orientation,
        'data-state': progressState,
        style: {
          [horizontal ? 'width' : 'height']: indeterminate ? undefined : `${percent}%`,
        },
      }),

    getCircleProps: () =>
      normalize.svg({
        id: getCircleId(),
        ...parts.circle.attrs,
        ...progressbarProps,
        style: {
          width: 'var(--size)',
          height: 'var(--size)',
        },
      }),

    getCircleTrackProps: () =>
      normalize.circle({
        'data-orientation': orientation,
        ...parts.circleTrack.attrs,
        style: circleStyle,
      }),

    getCircleRangeProps: () =>
      normalize.circle({
        ...parts.circleRange.attrs,
        'data-state': progressState,
        opacity: value === 0 ? 0 : undefined,
        style: {
          ...circleStyle,
          '--percent': percent,
          '--circumference': 'calc(2 * 3.14159 * var(--radius))',
          '--offset': 'calc(var(--circumference) * (100 - var(--percent)) / 100)',
          strokeDashoffset: 'calc(var(--circumference) * ((100 - var(--percent)) / 100))',
          strokeDasharray: indeterminate ? undefined : 'var(--circumference)',
          transformOrigin: 'center',
          transform: 'rotate(-90deg)',
        },
      }),

    getViewProps: (props: { state: ProgressState }) =>
      normalize.element({
        dir: scope.dir,
        ...parts.view.attrs,
        'data-state': props.state,
        hidden: props.state !== progressState,
      }),
  }
}

function isValidNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value)
}

function midValue(min: number, max: number) {
  return min + (max - min) / 2
}

function getProgressState(val: number | null, max: number): ProgressState {
  return val == null ? 'indeterminate' : val === max ? 'complete' : 'loading'
}

type ElementIds = Partial<{
  root: string
  track: string
  label: string
  circle: string
}>

type ProgressState = 'indeterminate' | 'loading' | 'complete'

interface ValueTranslationDetails {
  value: number | null
  max: number
  min: number
  percent: number
}

interface ValueChangeDetails {
  value: number | null
}

interface IntlTranslations {
  value(details: ValueTranslationDetails): string
}

export interface UseProgressProps {
  /**
   * The id of the progress
   */
  id?: string
  /**
   * The current value of the progress bar
   */
  value?: number | null
  /**
   * The initial value when uncontrolled
   */
  defaultValue?: number | null
  /**
   * The minimum allowed value
   * @default 0
   */
  min?: number
  /**
   * The maximum allowed value
   * @default 100
   */
  max?: number
  /**
   * The orientation of the progress
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical'
  /**
   * The localized messages to use
   */
  translations?: Partial<IntlTranslations>
  /**
   * Callback when value changes
   */
  onValueChange?(details: ValueChangeDetails): void
  /**
   * Custom ids for elements
   */
  ids?: ElementIds
}

type ProgressEvent = { type: 'VALUE.SET'; value: number | null }

export interface ViewProps {
  state: ProgressState
}

export interface UseProgressReturn {
  /**
   * The current value of the progress bar.
   */
  value: number | null
  /**
   * The current value of the progress bar as a string.
   */
  valueAsString: string
  /**
   * Sets the current value of the progress bar.
   */
  setValue(value: number | null): void
  /**
   * Sets the current value of the progress bar to the max value.
   */
  setToMax(): void
  /**
   * Sets the current value of the progress bar to the min value.
   */
  setToMin(): void
  /**
   * The percentage of the progress bar's value.
   */
  percent: number
  /**
   * The percentage of the progress bar's value as a string.
   */
  percentAsString: string
  /**
   * The minimum allowed value of the progress bar.
   */
  min: number
  /**
   * The maximum allowed value of the progress bar.
   */
  max: number
  /**
   * Whether the progress bar is indeterminate.
   */
  indeterminate: boolean

  getRootProps(): PropTypes['element']
  getLabelProps(): PropTypes['element']
  getTrackProps(): PropTypes['element']
  getValueTextProps(): PropTypes['element']
  getRangeProps(): PropTypes['element']
  getViewProps(props: ViewProps): PropTypes['element']
  getCircleProps(): PropTypes['svg']
  getCircleTrackProps(): PropTypes['circle']
  getCircleRangeProps(): PropTypes['circle']
}
