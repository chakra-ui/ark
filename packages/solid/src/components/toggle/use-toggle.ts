import { dataAttr } from '@zag-js/dom-query'
import { type Accessor, type JSX, createMemo } from 'solid-js'
import { useControllableState } from '../../utils/use-controllable-state'
import { parts } from './toggle.anatomy'

export interface UseToggleProps {
  /**
   * Whether the toggle is disabled.
   */
  disabled?: boolean
  /**
   * The default pressed state of the toggle.
   */
  defaultPressed?: boolean
  /**
   * The pressed state of the toggle.
   */
  pressed?: Accessor<boolean>
  /**
   * Event handler called when the pressed state of the toggle changes.
   */
  onPressedChange?: (pressed: boolean) => void
}

export type UseToggleReturn = Accessor<{
  /**
   * Whether the toggle is pressed.
   */
  pressed: boolean
  /**
   * Whether the toggle is disabled.
   */
  disabled: boolean
  /**
   * Sets the pressed state of the toggle.
   */
  setPressed(pressed: boolean): void
  getRootProps(): JSX.IntrinsicElements['button']
  getIndicatorProps(): JSX.IntrinsicElements['div']
}>

export function useToggle(props: UseToggleProps): UseToggleReturn {
  const { defaultPressed, pressed, onPressedChange, disabled } = props

  const [pressedState, setPressedState] = useControllableState({
    defaultValue: !!defaultPressed,
    value: pressed,
    onChange: onPressedChange,
  })

  return createMemo(() => ({
    pressed: pressedState(),
    disabled: !!disabled,
    setPressed: setPressedState,

    getRootProps() {
      return {
        ...(parts.root.attrs as JSX.IntrinsicElements['button']),
        type: 'button',
        disabled,
        'aria-pressed': pressedState(),
        'data-state': pressedState() ? 'on' : 'off',
        'data-pressed': dataAttr(pressedState()),
        'data-disabled': dataAttr(disabled),
        onClick(event) {
          if (event.defaultPrevented) return
          if (disabled) return
          setPressedState(!pressedState())
        },
      }
    },

    getIndicatorProps() {
      return {
        ...(parts.indicator.attrs as JSX.IntrinsicElements['div']),
        'data-disabled': dataAttr(disabled),
        'data-pressed': dataAttr(pressedState()),
        'data-state': pressedState() ? 'on' : 'off',
      }
    },
  }))
}
