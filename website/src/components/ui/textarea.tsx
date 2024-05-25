import { type HTMLArkProps, ark } from '@ark-ui/react/factory'
import { styled } from 'styled-system/jsx'
import { type TextareaVariantProps, textarea } from 'styled-system/recipes'
import type { Assign, JsxStyleProps } from 'styled-system/types'

export interface TextareaProps
  extends Assign<JsxStyleProps, HTMLArkProps<'textarea'>>,
    TextareaVariantProps {}
export const Textarea = styled(ark.textarea, textarea)
