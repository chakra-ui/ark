import * as fileUpload from '@zag-js/file-upload'
import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { MaybeAccessor, Optional } from '../../types'
import { runIfFn } from '../../utils/run-if-fn'
import { useFieldContext } from '../field'

export interface UseFileUploadProps extends Optional<Omit<fileUpload.Props, 'dir' | 'getRootNode'>, 'id'> {}
export interface UseFileUploadReturn extends Accessor<fileUpload.Api<PropTypes>> {}

export const useFileUpload = (props?: MaybeAccessor<UseFileUploadProps>): UseFileUploadReturn => {
  const id = createUniqueId()
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const field = useFieldContext()

  const machineProps = createMemo<fileUpload.Props>(() => ({
    id,
    ids: {
      label: field?.().ids.label,
      hiddenInput: field?.().ids.control,
    },
    dir: locale().dir,
    disabled: field?.().disabled,
    locale: locale().locale,
    required: field?.().required,
    invalid: field?.().invalid,
    getRootNode: environment().getRootNode,
    ...runIfFn(props),
  }))

  const service = useMachine(fileUpload.machine, machineProps)
  return createMemo(() => fileUpload.connect(service, normalizeProps))
}
