import { Code } from '@/components/shared/Code'
import { Link } from '@/components/shared/Link'
import type { DocumentTypes } from '@/contentlayer'
import { panda } from '@/panda/jsx'
import { markdown } from '@/panda/recipes'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { match, P } from 'ts-pattern'

type MarkdownProps = {
  doc: DocumentTypes
}

export const Markdown = (props: MarkdownProps) => {
  const { doc } = props
  const MDXComponent = useMDXComponent(doc.body.code)
  return (
    <panda.article className={markdown()}>
      <MDXComponent
        components={{
          a: (props: any) => (
            <Link {...props} variant="mdx" target="_blank" rel="noopener noreferrer" />
          ),
          code: (props: any) => <Code {...props} />,
          Story: ({ name }: any) =>
            match(doc)
              .with(
                { type: 'ComponentDocument', stories: P.when((v: any) => v[name] != null) },
                ({ stories }) => <div dangerouslySetInnerHTML={{ __html: stories[name] }} />,
              )
              .otherwise(() => null),
        }}
      />
    </panda.article>
  )
}
