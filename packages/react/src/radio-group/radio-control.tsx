import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useRadioContext } from './radio-context'
import { useRadioGroupContext } from './radio-group-context'

export type RadioControlProps = ComponentPropsWithoutRef<typeof ark.div>

export const RadioControl = forwardRef<HTMLDivElement, RadioControlProps>((props, ref) => {
  const { getRadioControlProps, getRadioHiddenInputProps } = useRadioGroupContext()
  const context = useRadioContext()
  const mergedProps = mergeProps(getRadioControlProps(context), props)

  return (
    <>
      <ark.div {...mergedProps} ref={ref} />
      <input {...getRadioHiddenInputProps(context)} />
    </>
  )
})

RadioControl.displayName = 'RadioControl'
