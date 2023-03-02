import { Text } from '@/components/shared/Text'
import { css } from '@/panda/css'
import { Container, Stack } from '@/panda/jsx'
import { VscQuote } from 'react-icons/vsc'
import { Avatar } from '../shared/Avatar'

export const Testimonials = () => {
  const testimonials = [
    {
      author: {
        name: 'Bruno Mendes',
        title: 'UI Engineer, Mandix',
        avatar: 'https://avatars.githubusercontent.com/u/11624407?v=4',
      },
      quote:
        "We've been able to focus on building solid user experiences on top of Ark Primitives. With UI components, there are just too many angles and rabbit holes to cover for product teams that wish to move quickly.",
    },
    {
      author: {
        name: 'Christian Jones',
        title: 'Engineering Manager',
        avatar: 'https://avatars.githubusercontent.com/u/11624407?v=4',
      },
      quote:
        "We've been able to focus on building solid user experiences on top of Ark Primitives. With UI components, there are just too many angles and rabbit holes to cover for product teams that wish to move quickly.",
    },
  ]
  return (
    <Container py={{ base: '16', md: '24' }}>
      <Stack direction={{ base: 'column', md: 'row' }} gap="16">
        {testimonials.map((testimonial, id) => (
          <Stack key={id} gap="8">
            <Stack gap="4">
              <VscQuote className={css({ fontSize: '2xl', color: 'orange.400' })} />
              <Text textStyle="lg" color="fg.mtued">
                {testimonial.quote}
              </Text>
            </Stack>
            <Stack direction="row" gap="4" alignItems="center">
              <Avatar name={testimonial.author.name} src={testimonial.author.avatar} />
              <Stack gap="0">
                <Text>{testimonial.author.name}</Text>
                <Text color="fg.muted">{testimonial.author.title}</Text>
              </Stack>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Container>
  )
}
