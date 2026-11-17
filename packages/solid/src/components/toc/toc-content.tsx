import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'

export interface TocContentBaseProps extends PolymorphicProps<'article'> {}
export interface TocContentProps extends HTMLProps<'article'>, TocContentBaseProps {}

export const TocContent = (props: TocContentProps) => {
  return <ark.article {...props} />
}
