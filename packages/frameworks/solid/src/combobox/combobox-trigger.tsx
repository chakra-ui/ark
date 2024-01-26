import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useComboboxContext } from './combobox-context'

export interface ComboboxTriggerProps extends HTMLArkProps<'button'> {}

export const ComboboxTrigger: ArkComponent<'button'> = (props: ComboboxTriggerProps) => {
  const combobox = useComboboxContext()
  const mergedProps = mergeProps(() => combobox().triggerProps, props)

  return <ark.button {...mergedProps} />
}
