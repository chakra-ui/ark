import * as fileUpload from '@zag-js/file-upload'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, type MaybeRef, computed, toValue, useId } from 'vue'
import { DEFAULT_ENVIRONMENT, DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import { useFieldContext } from '../field'
import type { RootEmits } from './file-upload'

export interface UseFileUploadProps extends Optional<Omit<fileUpload.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseFileUploadReturn extends ComputedRef<fileUpload.Api<PropTypes>> {}

export const useFileUpload = (
  props: MaybeRef<UseFileUploadProps> = {},
  emit?: EmitFn<RootEmits>,
): UseFileUploadReturn => {
  const id = useId()
  const env = useEnvironmentContext(DEFAULT_ENVIRONMENT)
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const field = useFieldContext()

  const context = computed<fileUpload.Props>(() => {
    const localeProps = toValue<UseFileUploadProps>(props)

    return {
      id,
      ids: {
        label: field?.value.ids.label,
        hiddenInput: field?.value.ids.control,
      },
      dir: locale.value.dir,
      disabled: field?.value.disabled,
      invalid: field?.value.invalid,
      locale: locale.value.locale,
      required: field?.value.required,
      getRootNode: env?.value.getRootNode,
      ...cleanProps(localeProps),
      onFileChange: (details) => {
        emit?.('fileChange', details)
        localeProps.onFileChange?.(details)
      },
      onFileAccept: (details) => {
        emit?.('fileAccept', details)
        localeProps.onFileAccept?.(details)
      },
      onFileReject: (details) => {
        emit?.('fileReject', details)
        localeProps.onFileReject?.(details)
      },
    }
  })

  const service = useMachine(fileUpload.machine, context)

  return computed(() => fileUpload.connect(service, normalizeProps))
}
