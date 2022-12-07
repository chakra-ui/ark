import { ark, HTMLArkProps } from '../factory'
import { useNumberInputContext } from './number-input-context'

export type NumberInputControlsProps = HTMLArkProps<'div'>

export const NumberInputControls = (props: NumberInputControlsProps) => {
  const numberInput = useNumberInputContext()

  return <ark.div {...numberInput().groupProps} {...props} />
}
