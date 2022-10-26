import { HTMLProps } from 'react'

export type AccordionIconProps = HTMLProps<HTMLDivElement>

export const AccordionIcon = (props: AccordionIconProps) => {
  return <div {...props} />
}
