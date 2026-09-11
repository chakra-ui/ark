import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { listboxAnatomy } from './listbox.anatomy.ts'

const parts = listboxAnatomy.build()

export interface ListboxStatusBaseProps extends PolymorphicProps<'div'> {}
export interface ListboxStatusProps extends HTMLProps<'div'>, ListboxStatusBaseProps {}

export const ListboxStatus = (props: ListboxStatusProps) => (
  <ark.div {...parts.status.attrs('')} role="status" aria-live="polite" aria-atomic="true" {...props} />
)
