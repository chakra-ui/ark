import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useDialogContext } from './dialog-context'

export type DialogTriggerProps = HTMLArkProps<'button'>

export const DialogTrigger = (props: DialogTriggerProps) => {
  const dialog = useDialogContext()
  const triggerProps = mergeProps(() => dialog().triggerProps, props)
  return <ark.button {...triggerProps} />
}
