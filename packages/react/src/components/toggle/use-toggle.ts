import { dataAttr } from '@zag-js/dom-query'
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
  pressed?: boolean
  /**
   * Event handler called when the pressed state of the toggle changes.
   */
  onPressedChange?: (pressed: boolean) => void
}

export interface UseToggleReturn {
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
  getRootProps(): React.ComponentProps<'button'>
  getIndicatorProps(): React.ComponentProps<'div'>
}

export function useToggle(props: UseToggleProps): UseToggleReturn {
  const { defaultPressed, pressed, onPressedChange, disabled } = props

  const [pressedState, setPressedState] = useControllableState({
    defaultValue: !!defaultPressed,
    value: pressed,
    onChange: onPressedChange,
  })

  return {
    pressed: pressedState,
    disabled: !!disabled,
    setPressed: setPressedState,

    getRootProps() {
      return {
        ...parts.root.attrs,
        type: 'button',
        disabled,
        'aria-pressed': pressedState,
        'data-state': pressedState ? 'on' : 'off',
        'data-pressed': dataAttr(pressedState),
        'data-disabled': dataAttr(disabled),
        onClick(event) {
          if (event.defaultPrevented) return
          if (disabled) return
          setPressedState(!pressedState)
        },
      }
    },

    getIndicatorProps() {
      return {
        ...(parts.indicator.attrs as React.HTMLAttributes<HTMLDivElement>),
        'data-disabled': dataAttr(disabled),
        'data-pressed': dataAttr(pressedState),
        'data-state': pressedState ? 'on' : 'off',
      }
    },
  }
}
