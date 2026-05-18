import { describe, expect, it } from 'vitest'
import {
  ARK_PROGRESS_CONTEXT,
  injectArkProgressContext,
  progressAnatomy,
  useProgress,
  type ProgressApi,
  type ProgressElementIds,
  type ProgressMachine,
  type ProgressMachineProps,
  type ProgressState,
  type ProgressValueChangeDetails,
  type ProgressValueTranslationDetails,
  type ProgressViewProps,
  type UseProgressOptions,
  type UseProgressProps,
  type UseProgressReturn,
} from '@ark-ui/angular/progress'

describe('@ark-ui/angular/progress', () => {
  it('exposes the documented public surface', () => {
    expect(typeof ARK_PROGRESS_CONTEXT).toBe('object')
    expect(typeof injectArkProgressContext).toBe('function')
    expect(typeof useProgress).toBe('function')
    expect(typeof progressAnatomy).toBe('object')

    const _typeOnly:
      | {
          api: ProgressApi
          ids: ProgressElementIds
          machine: ProgressMachine
          machineProps: ProgressMachineProps
          state: ProgressState
          valueChange: ProgressValueChangeDetails
          valueTranslation: ProgressValueTranslationDetails
          view: ProgressViewProps
          options: UseProgressOptions
          props: UseProgressProps
          ret: UseProgressReturn
        }
      | undefined = undefined
    expect(_typeOnly).toBeUndefined()
  })
})
