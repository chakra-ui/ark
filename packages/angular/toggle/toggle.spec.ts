import { describe, expect, it } from 'vitest'
import {
  ARK_TOGGLE_CONTEXT,
  injectArkToggleContext,
  toggleAnatomy,
  useToggle,
  type ToggleApi,
  type ToggleMachine,
  type ToggleMachineProps,
  type ToggleService,
  type UseToggleOptions,
  type UseToggleProps,
  type UseToggleReturn,
} from '@ark-ui/angular/toggle'

describe('@ark-ui/angular/toggle', () => {
  it('exposes the documented public surface', () => {
    expect(typeof ARK_TOGGLE_CONTEXT).toBe('object')
    expect(typeof injectArkToggleContext).toBe('function')
    expect(typeof useToggle).toBe('function')
    expect(typeof toggleAnatomy).toBe('object')

    const _typeOnly:
      | {
          api: ToggleApi
          machine: ToggleMachine
          machineProps: ToggleMachineProps
          service: ToggleService
          options: UseToggleOptions
          props: UseToggleProps
          ret: UseToggleReturn
        }
      | undefined = undefined
    expect(_typeOnly).toBeUndefined()
  })
})
