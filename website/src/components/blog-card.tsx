import NextLink from 'next/link'
import { css } from 'styled-system/css'
import { Card } from '~/components/ui/card'
import { Text } from '~/components/ui/text'
import { blogs } from '.velite'

interface BlogCardGroupProps {
  match: string
  exclude?: string
}

export const BlogCardGroup = (props: BlogCardGroupProps) => {
  const items = blogs.filter((blog) => {
    return new RegExp(props.match).test(blog.slug) && props.exclude !== blog.slug
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
          <NextLink className="not-prose" href={`/blog/${item.slug}`} key={item.slug}>
            <Card.Root h="100%">
              <Card.Header gap="2">
                <Card.Title textStyle="lg" _hover={{ textDecoration: 'underline' }}>
                  {item.title}
                </Card.Title>
                <Text minH="2lh">{item.description}</Text>
              </Card.Header>
            </Card.Root>
          </NextLink>
        )
      })}
    </div>
  )
}
