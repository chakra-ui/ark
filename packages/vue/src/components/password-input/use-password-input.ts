import * as passwordInput from '@zag-js/password-input'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import { useFieldContext } from '../field'
import type { RootEmits } from './password-input.types'

export interface UsePasswordInputProps extends Optional<Omit<passwordInput.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UsePasswordInputReturn extends ComputedRef<passwordInput.Api<PropTypes>> {}

export const usePasswordInput = (props: MaybeRef<UsePasswordInputProps> = {}, emit?: EmitFn<RootEmits>) => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const field = useFieldContext()

  const context = computed<passwordInput.Props>(() => {
    const localeProps = toValue<UsePasswordInputProps>(props)

    return {
      id,
      ids: {
        input: field?.value.ids.control,
      },
      disabled: field?.value.disabled,
      readOnly: field?.value.readOnly,
      required: field?.value.required,
      invalid: field?.value.invalid,
      dir: locale.value.dir,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(localeProps),
      onVisibilityChange: (details) => {
        emit?.('visibilityChange', details)
        emit?.('update:visible', details.visible)
        localeProps.onVisibilityChange?.(details)
      },
    }
  })

  const service = useMachine(passwordInput.machine, context)
  return computed(() => passwordInput.connect(service, normalizeProps))
}
