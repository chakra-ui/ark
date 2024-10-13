import { type PropTypes, normalizeProps, useMachine } from '@zag-js/react'
import * as zagSwitch from '@zag-js/switch'
import { useId } from 'react'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'
import { useEvent } from '../../utils/use-event'
import { useFieldContext } from '../field'

export interface UseSwitchProps
  extends Optional<Omit<zagSwitch.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The checked state of the switch when it is first rendered.
   * Use this when you do not need to control the state of the switch.
   */
  defaultChecked?: zagSwitch.Context['checked']
}

export interface UseSwitchReturn extends zagSwitch.Api<PropTypes> {}

export const useSwitch = (props: UseSwitchProps = {}): UseSwitchReturn => {
  const { getRootNode } = useEnvironmentContext()
  const { dir } = useLocaleContext()
  const field = useFieldContext()

  const initialContext: zagSwitch.Context = {
    id: useId(),
    ids: {
      label: field?.ids.label,
      hiddenInput: field?.ids.control,
    },
    dir,
    disabled: field?.disabled,
    readOnly: field?.readOnly,
    invalid: field?.invalid,
    required: field?.required,
    getRootNode,
    checked: props.defaultChecked,
    ...props,
  }

  const context: zagSwitch.Context = {
    ...initialContext,
    checked: props.checked,
    onCheckedChange: useEvent(props.onCheckedChange, { sync: true }),
  }

  const [state, send] = useMachine(zagSwitch.machine(initialContext), { context })

  return zagSwitch.connect(state, send, normalizeProps)
}
