import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { selectAnatomy } from './select.anatomy.ts'

const parts = selectAnatomy.build()

export interface SelectStatusBaseProps extends PolymorphicProps<'div'> {}
export interface SelectStatusProps extends HTMLProps<'div'>, SelectStatusBaseProps {}

export const SelectStatus = (props: SelectStatusProps) => (
  <ark.div {...parts.status.attrs('')} role="status" aria-live="polite" aria-atomic="true" {...props} />
)
