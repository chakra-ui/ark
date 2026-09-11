import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { comboboxAnatomy } from './combobox.anatomy.ts'

const parts = comboboxAnatomy.build()

export interface ComboboxStatusBaseProps extends PolymorphicProps<'div'> {}
export interface ComboboxStatusProps extends HTMLProps<'div'>, ComboboxStatusBaseProps {}

export const ComboboxStatus = (props: ComboboxStatusProps) => (
  <ark.div {...parts.status.attrs('')} role="status" aria-live="polite" aria-atomic="true" {...props} />
)
