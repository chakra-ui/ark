import * as Ark from '@ark-ui/react/editable'
import { styled } from 'styled-system/jsx'
import { editable, type EditableVariantProps } from 'styled-system/recipes'
import { createStyleContext } from '~/lib/create-style-context'

const { withProvider, withContext } = createStyleContext(editable)

export * from '@ark-ui/react/editable'
export type EditableProps = Ark.EditableProps & EditableVariantProps

const EditableRoot = withProvider(styled(Ark.Editable.Root), 'root')
export const EditableArea = withContext(styled(Ark.Editable.Area), 'area')
export const EditableCancelTrigger = withContext(
  styled(Ark.Editable.CancelTrigger),
  'cancelTrigger',
)
export const EditableControl = withContext(styled(Ark.Editable.Control), 'control')
export const EditableEditTrigger = withContext(styled(Ark.Editable.EditTrigger), 'editTrigger')
export const EditableInput = withContext(styled(Ark.Editable.Input), 'input')
export const EditableLabel = withContext(styled(Ark.Editable.Label), 'label')
export const EditablePreview = withContext(styled(Ark.Editable.Preview), 'preview')
export const EditableSubmitTrigger = withContext(
  styled(Ark.Editable.SubmitTrigger),
  'submitTrigger',
)

export const Editable = Object.assign(EditableRoot, {
  Root: EditableRoot,
  Area: EditableArea,
  CancelTrigger: EditableCancelTrigger,
  Control: EditableControl,
  EditTrigger: EditableEditTrigger,
  Input: EditableInput,
  Label: EditableLabel,
  Preview: EditablePreview,
  SubmitTrigger: EditableSubmitTrigger,
})
