import type { DocumentTypes } from '@/contentlayer'
import { markdown } from '@/panda/recipes'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { panda } from 'panda/jsx'
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
          Story({ name }: any) {
            return match(doc)
              .with(
                { type: 'ComponentDocument', stories: P.when((v: any) => v[name] != null) },
                ({ stories }) => (
                  <div
                    data-rehype-pretty-code-fragment=""
                    dangerouslySetInnerHTML={{ __html: stories[name] }}
                  />
                ),
              )
              .otherwise(() => null)
          },
        }}
      />
    </panda.article>
  )
}
