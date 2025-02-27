import * as fileUpload from '@zag-js/file-upload'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/vue'
import { type ComputedRef, computed, useId } from 'vue'
import { DEFAULT_LOCALE, useEnvironmentContext, useLocaleContext } from '../../providers'
import type { EmitFn, Optional } from '../../types'
import { cleanProps } from '../../utils'
import { useFieldContext } from '../field'
import type { RootEmits } from './file-upload'

export interface UseFileUploadProps extends Optional<Omit<fileUpload.Props, 'dir' | 'getRootNode'>, 'id'> {}

export interface UseFileUploadReturn extends ComputedRef<fileUpload.Api<PropTypes>> {}

export const useFileUpload = (props: UseFileUploadProps = {}, emit?: EmitFn<RootEmits>): UseFileUploadReturn => {
  const id = useId()
  const env = useEnvironmentContext()
  const locale = useLocaleContext(DEFAULT_LOCALE)
  const field = useFieldContext()

  const context = computed<fileUpload.Props>(() => ({
    id,
    ids: {
      label: field?.value.ids.label,
      hiddenInput: field?.value.ids.control,
    },
    disabled: field?.value.disabled,
    required: field?.value.required,
    invalid: field?.value.invalid,
    dir: locale.value.dir,
    getRootNode: env?.value.getRootNode,
    ...cleanProps(props),
    onFileChange: (details) => {
      emit?.('fileChange', details)
      props.onFileChange?.(details)
    },
    onFileAccept: (details) => {
      emit?.('fileAccept', details)
      props.onFileAccept?.(details)
    },
    onFileReject: (details) => {
      emit?.('fileReject', details)
      props.onFileReject?.(details)
    },
  }))

  const service = useMachine(fileUpload.machine, context)

  return computed(() => fileUpload.connect(service, normalizeProps))
}
