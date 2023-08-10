import { useMDXComponent } from 'next-contentlayer/hooks'
import { styled } from 'styled-system/jsx'
import { match, P } from 'ts-pattern'
import type { DocumentTypes } from '~/contentlayer'
import { Heading, Typography } from './ui/typography'

type MarkdownProps = {
  doc: DocumentTypes
}

export const Markdown = (props: MarkdownProps) => {
  const { doc } = props
  const MDXComponent = useMDXComponent(doc.body.code)
  return (
    <styled.article>
      <MDXComponent
        components={{
          h1: (props: any) => (
            <Heading
              mt={{ base: '8', md: '10' }}
              mb={{ base: '4', md: '5' }}
              textStyle={{ base: '2xl', md: '3xl' }}
              {...props}
            />
          ),
          h2: (props: any) => (
            <Heading
              mt={{ base: '8', md: '8' }}
              mb={{ base: '3', md: '4' }}
              textStyle={{ base: 'xl', md: '2xl' }}
              {...props}
            />
          ),
          p: (props: any) => <Typography color="fg.muted" lineHeight="relaxed" my="4" {...props} />,
          //   a: (props: any) => (
          //     <Link
          //       {...props}
          //       variant="mdx"
          //       target={props.href.startsWith('http') ? '_blank' : '_self'}
          //       rel="noopener noreferrer"
          //     />
          //   ),
          //   code: (props: any) => <Code {...props} />,
          Story: ({ name }: any) =>
            match(doc)
              .with(
                { type: 'ComponentDocument', stories: P.when((v: any) => v[name] != null) },
                ({ stories }) => (
                  <div
                    data-rehype-pretty-code-fragment
                    dangerouslySetInnerHTML={{ __html: stories[name] }}
                  />
                ),
              )
              .otherwise(() => {
                throw new Error(
                  `Storybook story named "${name}" for the ${doc.framework} ${doc.name} component was not found. Ensure that you have added the story to the storybook of the component.`,
                )
              }),
        }}
      />
    </styled.article>
  )
}
