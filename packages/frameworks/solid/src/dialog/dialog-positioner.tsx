import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogPositionerProps = HTMLArkProps<'div'>

export const DialogPositioner = (props: DialogPositionerProps) => {
  const dialog = useDialogContext()
  const mergedProps = mergeProps(() => dialog().positionerProps, props)

  return <ark.div {...mergedProps} />
}
