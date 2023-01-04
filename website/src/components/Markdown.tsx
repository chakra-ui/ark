import { markdown } from '@/panda/recipes'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { panda } from 'panda/jsx'
import { Showcase } from './Showcase'

type MarkdownProps = {
  markdown: string
}

export const Markdown = (props: MarkdownProps) => {
  const MDXComponent = useMDXComponent(props.markdown)

  return (
    <panda.article className={markdown()}>
      <MDXComponent components={{ Showcase }} />
    </panda.article>
  )
}
