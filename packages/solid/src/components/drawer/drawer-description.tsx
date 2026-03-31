import { type HTMLProps, type PolymorphicProps, ark } from '../factory'

export interface DrawerDescriptionBaseProps extends PolymorphicProps<'div'> {}
export interface DrawerDescriptionProps extends HTMLProps<'div'>, DrawerDescriptionBaseProps {}

export const DrawerDescription = (props: DrawerDescriptionProps) => {
  return <ark.div {...props} />
}
