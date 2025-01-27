import {
  dataAttr,
  dispatchInputCheckedEvent,
  getEventTarget,
  setElementChecked,
  trackFormControl,
  trackPress,
  visuallyHiddenStyle,
} from '@zag-js/dom-query'
import { isFocusVisible, trackFocusVisible } from '@zag-js/focus-visible'
import { type PropTypes, mergeProps, normalizeProps as normalize } from '@zag-js/react'
import { useMemo, useState } from 'react'
import { callAll } from '../../utils/call-all'
import { useControllableState } from '../../utils/use-controllable-state'
import { useEvent } from '../../utils/use-event'
import { useSafeLayoutEffect } from '../../utils/use-safe-layout-effect'
import { useElementScope, useStateValue } from '../../utils/use-state-value'
import { useUpdateEffect } from '../../utils/use-update-effect'
import { useFieldContext } from '../field/use-field-context'
import { checkboxAnatomy } from './checkbox.anatomy'
import { useCheckboxGroupContext } from './use-checkbox-group-context'

const parts = checkboxAnatomy.build()

export function useCheckbox(ownProps: UseCheckboxProps = {}): UseCheckboxReturn {
  const checkboxGroup = useCheckboxGroupContext()
  const field = useFieldContext()
  const props = useMemo(() => {
    return mergeProps(
      ownProps,
      checkboxGroup?.getItemProps({ value: ownProps.value }) ?? {},
      field
        ? {
            required: field.required,
            readOnly: field.readOnly,
            disabled: field.disabled,
            invalid: field.invalid,
          }
        : {},
    )
  }, [ownProps, checkboxGroup, field])

  // Context
  const ctx = useStateValue<CheckboxContext>({
    fieldsetDisabled: false,
    hovered: false,
    active: false,
    focused: false,
    focusVisible: false,
  })

  // State
  const [initialChecked] = useState(props.defaultChecked || props.checked || false)
  const [checked, setChecked] = useControllableState<CheckedState>({
    defaultValue: initialChecked,
    value: props.checked,
    onChange(checked) {
      props.onCheckedChange?.({ checked })
    },
  })

  // Dom utils
  const scope = useElementScope(props.id)
  const getRootId = () => props.ids?.root ?? `checkbox:${scope.id}`
  const getLabelId = () => field?.ids?.label ?? props.ids?.label ?? `checkbox:${scope.id}:label`
  const getControlId = () => props.ids?.control ?? `checkbox:${scope.id}:control`
  const getRootEl = () => scope.getById<HTMLElement>(getRootId())
  const getHiddenInputId = () =>
    field?.ids?.control ?? props.ids?.hiddenInput ?? `checkbox:${scope.id}:input`
  const getHiddenInputEl = () => scope.getById<HTMLInputElement>(getHiddenInputId())

  // Computed state
  const _indeterminate = checked === 'indeterminate'
  const _checked = _indeterminate ? false : !!checked
  const _disabled = !!props.disabled || ctx.value.fieldsetDisabled

  // Actions
  const syncInputElement = useEvent(() => {
    const inputEl = getHiddenInputEl()
    if (!inputEl) return
    setElementChecked(inputEl, _checked)
    inputEl.indeterminate = _indeterminate
  })
  const removeFocusIfNeeded = useEvent(() => {
    if (_disabled && ctx.get('focused')) {
      ctx.set({ focused: false, focusVisible: false })
    }
  })
  const dispatchChangeEvent = useEvent(() => {
    const inputEl = getHiddenInputEl()
    dispatchInputCheckedEvent(inputEl, { checked: _checked })
  })
  const toggleChecked = useEvent(() => {
    const checked = _indeterminate ? true : !_checked
    setChecked(checked)
  })
  const setContext = useEvent((context: Partial<CheckboxContext>) => {
    ctx.set(context)
  })

  // Activities
  const trackPressEvent = useEvent(() => {
    if (_disabled) return
    return trackPress({
      pointerNode: getRootEl(),
      keyboardNode: getHiddenInputEl(),
      isValidKey: (event) => event.key === ' ',
      onPress: () => ctx.set({ active: false }),
      onPressStart: () => ctx.set({ active: true }),
      onPressEnd: () => ctx.set({ active: false }),
    })
  })

  const trackFocusVisibleFn = useEvent(() => {
    if (_disabled) return
    return trackFocusVisible({ root: scope.getRootNode() })
  })

  const trackFormControlState = useEvent(() => {
    return trackFormControl(getHiddenInputEl(), {
      onFieldsetDisabledChange(disabled) {
        ctx.set({ fieldsetDisabled: disabled })
      },
      onFormReset() {
        send({ type: 'CHECKED.SET', checked: !!initialChecked })
      },
    })
  })

  // Initial activities
  useSafeLayoutEffect(callAll(trackPressEvent, trackFocusVisibleFn, trackFormControlState), [])

  // Sender
  const send = useEvent((event: CheckboxEvent) => {
    const transitions: CheckboxTransitionMap = {
      on: {
        'CHECKED.TOGGLE': (event) => {
          if (!event.isTrusted) {
            toggleChecked()
            dispatchChangeEvent()
          } else {
            toggleChecked()
          }
        },
        'CHECKED.SET': (event) => {
          if (!event.isTrusted) {
            setChecked(event.checked)
            dispatchChangeEvent()
          } else {
            setChecked(event.checked)
          }
        },
        'CONTEXT.SET': (event) => {
          setContext(event.context)
        },
      },
    }

    const transition = transitions.on?.[event.type]
    //@ts-expect-error
    transition?.(event)
  })

  // Remove focus if disabled
  useUpdateEffect(removeFocusIfNeeded, [_disabled])
  useUpdateEffect(syncInputElement, [_checked])

  const dataAttrs = {
    'data-active': dataAttr(ctx.get('active')),
    'data-focus': dataAttr(ctx.get('focused')),
    'data-focus-visible': dataAttr(ctx.get('focusVisible')),
    'data-readonly': dataAttr(props.readOnly),
    'data-hover': dataAttr(ctx.get('hovered')),
    'data-disabled': dataAttr(_disabled),
    'data-state': _indeterminate ? 'indeterminate' : _checked ? 'checked' : 'unchecked',
    'data-invalid': dataAttr(props.invalid),
  }

  return {
    checked: _checked,
    disabled: _disabled,
    indeterminate: _indeterminate,
    focused: ctx.get('focused'),
    checkedState: checked,

    setChecked(checked: CheckedState) {
      send({ type: 'CHECKED.SET', checked, isTrusted: true })
    },
    toggleChecked() {
      send({ type: 'CHECKED.TOGGLE', isTrusted: true })
    },

    getRootProps: () =>
      normalize.label({
        ...parts.root.attrs,
        ...dataAttrs,
        dir: scope.dir,
        id: getRootId(),
        htmlFor: getHiddenInputId(),
        onPointerMove() {
          if (_disabled) return
          send({ type: 'CONTEXT.SET', context: { hovered: true } })
        },
        onPointerLeave() {
          if (_disabled) return
          send({ type: 'CONTEXT.SET', context: { hovered: false } })
        },
        onClick(event: React.MouseEvent) {
          const target = getEventTarget<Element>(event)
          if (target === getHiddenInputEl()) {
            event.stopPropagation()
          }
        },
      }),

    getLabelProps: () =>
      normalize.element({
        ...parts.label.attrs,
        ...dataAttrs,
        dir: scope.dir,
        id: getLabelId(),
      }),

    getControlProps: () =>
      normalize.element({
        ...parts.control.attrs,
        ...dataAttrs,
        dir: scope.dir,
        id: getControlId(),
        'aria-hidden': true,
      }),

    getIndicatorProps: () =>
      normalize.element({
        ...parts.indicator.attrs,
        ...dataAttrs,
        dir: scope.dir,
        hidden: !_indeterminate && !_checked,
      }),

    getHiddenInputProps: () =>
      normalize.input({
        id: getHiddenInputId(),
        type: 'checkbox',
        required: props.required,
        defaultChecked: _checked,
        disabled: _disabled,
        'aria-labelledby': getLabelId(),
        'aria-invalid': props.invalid,
        name: props.name,
        form: props.form,
        value: props.value || 'on',
        style: visuallyHiddenStyle,
        onFocus() {
          const focusVisible = isFocusVisible()
          send({ type: 'CONTEXT.SET', context: { focused: true, focusVisible } })
        },
        onBlur() {
          send({ type: 'CONTEXT.SET', context: { focused: false, focusVisible: false } })
        },
        onClick(event) {
          if (props.readOnly) {
            event.preventDefault()
            return
          }

          const checked = event.currentTarget.checked
          send({ type: 'CHECKED.SET', checked, isTrusted: true })
        },
      }),
  }
}

export interface UseCheckboxReturn {
  /**
   * Whether the checkbox is checked
   */
  checked: boolean
  /**
   * Whether the checkbox is disabled
   */
  disabled: boolean | undefined
  /**
   * Whether the checkbox is indeterminate
   */
  indeterminate: boolean
  /**
   * Whether the checkbox is focused
   */
  focused: boolean | undefined
  /**
   *  The checked state of the checkbox
   */
  checkedState: CheckedState
  /**
   * Function to set the checked state of the checkbox
   */
  setChecked(checked: CheckedState): void
  /**
   * Function to toggle the checked state of the checkbox
   */
  toggleChecked(): void
  getRootProps(): PropTypes['label']
  getLabelProps(): PropTypes['element']
  getControlProps(): PropTypes['element']
  getHiddenInputProps(): PropTypes['input']
  getIndicatorProps(): PropTypes['element']
}

export type CheckedState = boolean | 'indeterminate'

export interface CheckedChangeDetails {
  checked: CheckedState
}

export type ElementIds = Partial<{
  root: string
  hiddenInput: string
  control: string
  label: string
}>

export interface UseCheckboxProps {
  /**
   * The id of the checkbox
   */
  id?: string
  /**
   * The checked state of the checkbox
   */
  checked?: CheckedState
  /**
   * The initial checked state when uncontrolled
   */
  defaultChecked?: CheckedState
  /**
   * Whether the checkbox is disabled
   */
  disabled?: boolean
  /**
   * Whether the checkbox is invalid
   */
  invalid?: boolean
  /**
   * Whether the checkbox is required
   */
  required?: boolean
  /**
   * Whether the checkbox is read-only
   */
  readOnly?: boolean
  /**
   * The callback invoked when the checked state changes.
   */
  onCheckedChange?(details: CheckedChangeDetails): void
  /**
   * The name of the input field. Useful for form submission.
   */
  name?: string
  /**
   * The id of the form that the checkbox belongs to.
   */
  form?: string
  /**
   * The value of checkbox input. Useful for form submission.
   * @default "on"
   */
  value?: string
  /**
   * Custom ids for elements
   */
  ids?: ElementIds
}

type CheckboxEvent =
  | { type: 'CHECKED.TOGGLE'; isTrusted?: boolean }
  | { type: 'CHECKED.SET'; checked: CheckedState; isTrusted?: boolean }
  | { type: 'CONTEXT.SET'; context: Partial<CheckboxContext> }

type CheckboxContext = {
  fieldsetDisabled: boolean
  hovered: boolean
  active: boolean
  focused: boolean
  focusVisible: boolean
}

type EventHandler<E extends CheckboxEvent['type']> = (
  event: Extract<CheckboxEvent, { type: E }>,
) => void

type EventHandlerMap = {
  on?: { [E in CheckboxEvent['type']]?: EventHandler<E> }
}

type CheckboxState = 'ready'

type CheckboxTransitionMap = EventHandlerMap & {
  states?: {
    [K in CheckboxState]?: EventHandlerMap
  }
}
