import { model } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { type ArkCvaControllerOptions, createArkCvaController } from './control-value-accessor'

const createController = <T>(overrides: Partial<ArkCvaControllerOptions<T>> = {}) => {
  let disabled = false
  const value = overrides.value ?? TestBed.runInInjectionContext(() => model<T | undefined>(undefined))
  const setDisabled =
    overrides.setDisabled ??
    ((next: boolean) => {
      disabled = next
    })
  const hasExternalModelBinding = overrides.hasExternalModelBinding ?? (() => false)
  const componentName = overrides.componentName ?? 'ArkTest'
  const controller = createArkCvaController<T>({ value, setDisabled, componentName, hasExternalModelBinding })
  return { controller, value, getDisabled: () => disabled }
}

describe('createArkCvaController', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
    TestBed.configureTestingModule({})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('writeValue updates the model', () => {
    const { controller, value } = createController<string>()
    controller.writeValue('hello')
    expect(value()).toBe('hello')
  })

  it('writeValue normalizes null to undefined', () => {
    const { controller, value } = createController<string>()
    controller.writeValue('seed')
    controller.writeValue(null)
    expect(value()).toBeUndefined()
  })

  it('notifyValueChange calls onChange exactly once per call', () => {
    const { controller } = createController<string>()
    const onChange = vi.fn()
    controller.registerOnChange(onChange)
    controller.notifyValueChange('a')
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith('a')
  })

  it('setDisabledState delegates to the disabled setter', () => {
    const { controller, getDisabled } = createController<string>()
    controller.setDisabledState(true)
    expect(getDisabled()).toBe(true)
    controller.setDisabledState(false)
    expect(getDisabled()).toBe(false)
  })

  it('markTouched calls the registered onTouched callback', () => {
    const { controller } = createController<string>()
    const onTouched = vi.fn()
    controller.registerOnTouched(onTouched)
    controller.markTouched()
    expect(onTouched).toHaveBeenCalledTimes(1)
  })

  it('emits the mixed-binding warning only once per controller', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const { controller } = createController<string>({
      hasExternalModelBinding: () => true,
      componentName: 'ArkMixed',
    })
    controller.writeValue('x')
    controller.registerOnChange(() => {})
    controller.writeValue('y')
    expect(warn).toHaveBeenCalledTimes(1)
    expect(warn.mock.calls[0]?.[0]).toContain('ArkMixed')
  })

  it('does not warn when no external model binding is present', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const { controller } = createController<string>({ hasExternalModelBinding: () => false })
    controller.writeValue('x')
    controller.registerOnChange(() => {})
    expect(warn).not.toHaveBeenCalled()
  })
})
