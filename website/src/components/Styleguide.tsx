import { Markdown } from '@/components/Markdown'
import { findComponentStyleguideByName } from '@/lib/contentlayer'

export type StyleguideProps = {
  component: string
}
export const Styleguide = ({ component }: StyleguideProps) => {
  const document = findComponentStyleguideByName(component)

  if (!document) {
    return null
  }

  return <Markdown markdown={document.body.code} />
}
