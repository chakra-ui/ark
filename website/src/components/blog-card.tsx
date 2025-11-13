import NextLink from 'next/link'
import { css } from 'styled-system/css'
import { Card } from '~/components/ui/card'
import { Text } from '~/components/ui/text'
import { blogSource } from '~/lib/source'

interface BlogCardGroupProps {
  match: string
  exclude?: string
}

export const BlogCardGroup = (props: BlogCardGroupProps) => {
  const items = blogSource.getPages().filter((blog) => {
    return new RegExp(props.match).test(blog.slugs[0]) && props.exclude !== blog.slugs[0]
  })

  return (
    <div
      className={css({
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '4',
      })}
    >
      {items.map((item) => {
        return (
          <NextLink className="not-prose" href={`/blog/${item.slugs[0]}`} key={item.slugs[0]}>
            <Card.Root h="100%">
              <Card.Header gap="2">
                <Card.Title textStyle="lg" _hover={{ textDecoration: 'underline' }}>
                  {item.data.title}
                </Card.Title>
                <Text minH="2lh">{item.data.description}</Text>
              </Card.Header>
            </Card.Root>
          </NextLink>
        )
      })}
    </div>
  )
}
