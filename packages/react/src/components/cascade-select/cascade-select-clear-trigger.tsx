import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useCascadeSelectContext } from './use-cascade-select-context'

export interface CascadeSelectClearTriggerBaseProps extends PolymorphicProps {}
export interface CascadeSelectClearTriggerProps extends HTMLProps<'button'>, CascadeSelectClearTriggerBaseProps {}

export const CascadeSelectClearTrigger = forwardRef<HTMLButtonElement, CascadeSelectClearTriggerProps>((props, ref) => {
  const cascadeSelect = useCascadeSelectContext()
  const mergedProps = mergeProps(cascadeSelect.getClearTriggerProps(), props)

  return <ark.button {...mergedProps} ref={ref} />
})

CascadeSelectClearTrigger.displayName = 'CascadeSelectClearTrigger'
