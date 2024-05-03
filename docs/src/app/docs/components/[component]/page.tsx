import { Example } from '~/components/example'
import { Pre } from '~/components/pre'
import { MDXContent } from '~/mdx-content'
import { components } from '.velite'

export default function Page() {
  const component = components[0]
  return (
    <article>
      <h1>{component.title}</h1>
      <MDXContent code={component.code} components={{ Example, pre: Pre }} />
    </article>
  )
}
