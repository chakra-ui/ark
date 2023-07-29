import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useSegmentContext } from './segment-context'
import { useSegmentGroupContext } from './segment-group-context'
import { parts } from './segment-group.anatomy'

export type SegmentInputProps = ComponentPropsWithoutRef<typeof ark.input>

export const SegmentInput = forwardRef<HTMLInputElement, SegmentInputProps>((props, ref) => {
  const { getRadioInputProps } = useSegmentGroupContext()
  const context = useSegmentContext()
  const mergedProps = mergeProps(getRadioInputProps(context), props)

  return <ark.input {...mergedProps} {...parts.radioInput.attrs} ref={ref} />
})

SegmentInput.displayName = 'SegmentInput'
