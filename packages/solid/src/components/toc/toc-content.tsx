import { type HTMLProps, type PolymorphicProps, ark } from '../factory'

export interface TocContentBaseProps extends PolymorphicProps {}
export interface TocContentProps extends HTMLProps<'article'>, TocContentBaseProps {}

export const TocContent = (props: TocContentProps) => {
  return <ark.article {...props} />
}
