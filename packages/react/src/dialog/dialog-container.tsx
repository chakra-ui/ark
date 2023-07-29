import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogContainerProps = ComponentPropsWithoutRef<typeof ark.div>

export const DialogContainer = forwardRef<HTMLDivElement, DialogContainerProps>((props, ref) => {
  const { containerProps } = useDialogContext()
  const mergedProps = mergeProps(containerProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

DialogContainer.displayName = 'DialogContainer'
