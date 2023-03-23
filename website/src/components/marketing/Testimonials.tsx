import { Text } from '@/components/shared/Text'
import { css } from '@/panda/css'
import { Box, Container, Stack } from '@/panda/jsx'
import { VscQuote } from 'react-icons/vsc'
import { Avatar } from '../shared/Avatar'

export const Testimonials = () => {
  const testimonials = [
    {
      author: {
        name: 'Isabella Williams',
        title: 'Accessibility Engineer, Clearbit',
        avatar: 'https://tinyurl.com/37385wcf',
      },
      quote:
        "I've been using Ark for my personal project, and it's been a game-changer. The accessibility standards have given me peace of mind that my UI is usable by everyone. I'd definitely recommend Ark to any developer who wants to build reliable and accessible UIs.",
    },
    {
      author: {
        name: 'Tyler Kim',
        title: 'Frontend Developer, Mandix',
        avatar: 'https://tinyurl.com/23b2uvbu',
      },
      quote:
        "As someone who's new to UI development, I've found Ark to be incredibly helpful. The declarative syntax has made it easy for me to reason about how my components will behave, and the themeability has allowed me to create UIs that match my client's brand perfectly.",
    },
  ]
  return (
    <Container py={{ base: '16', md: '24' }}>
      <Box
        display="grid"
        gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
        gap={{ base: '16', md: '24' }}
      >
        {testimonials.map((testimonial, id) => (
          <Stack key={id} gap="8">
            <Stack gap="4">
              <VscQuote className={css({ fontSize: '2xl', color: 'accent.muted' })} />
              <Text textStyle={{ base: 'lg', md: 'xl' }} fontWeight="medium" color="fg.emphasized">
                {testimonial.quote}
              </Text>
            </Stack>
            <Stack gap="5" direction="row">
              <Avatar name={testimonial.author.name} src={testimonial.author.avatar} size="lg" />
              <Stack gap="0">
                <Text fontWeight="semibold" color="fg.emphasized">
                  {testimonial.author.name}
                </Text>
                <Text color="fg.muted">{testimonial.author.title}</Text>
              </Stack>
            </Stack>
          </Stack>
        ))}
      </Box>
    </Container>
  )
}
