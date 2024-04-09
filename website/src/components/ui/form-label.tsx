import { ark } from '@ark-ui/react/factory'
import type { ComponentProps } from 'react'
import { styled } from 'styled-system/jsx'
import { formLabel } from 'styled-system/recipes'

export const FormLabel = styled(ark.label, formLabel)
export interface FormLabelProps extends ComponentProps<typeof FormLabel> {}
