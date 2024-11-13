import { ChevronDownIcon } from 'lucide-react'
import NextLink from 'next/link'
import { Stack } from 'styled-system/jsx'
import { Accordion } from '~/components/ui/accordion'
import { Heading } from '~/components/ui/heading'
import { Link } from '~/components/ui/link'
import { Text } from '~/components/ui/text'
import { MailToSupportLink } from './mail-to-support'

export const Faqs = () => {
  const questions = [
    {
      question: 'What do I get when I purchase Ark Plus?',
      answer: (
        <Text>
          After purchasing a license from our payment provider, you will receive a license key. You
          can then claim the license for yourself or share it with another person.
        </Text>
      ),
    },
    {
      question: 'How does the Team license work?',
      answer: (
        <Text>
          The Team license lets all your employees and contractors access and use the examples. We
          recommend activating your license with a shared email everyone on the team can access. For
          full details, <NextLink href="/license">check out our license page</NextLink>.
        </Text>
      ),
    },
    {
      question: 'Do you offer a free trial?',
      answer: (
        <Text>
          We don't offer a free trial. However, several examples are available for free to explore.
        </Text>
      ),
    },
    {
      question: 'Which version of Ark UI do I need?',
      answer: <Text>The examples here use the latest version of Ark UI.</Text>,
    },
    {
      question: 'What if I find an issue with an example?',
      answer: (
        <Text>
          Contact us via <MailToSupportLink subject="Bug Report" /> or create an issue on our{' '}
          <Link
            href="https://github.com/chakra-ui/ark/issues/new?assignees=&labels=&projects=&template=bug_report.yml"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub repository
          </Link>
          .
        </Text>
      ),
    },
    {
      question: 'What is your refund policy?',
      answer: (
        <Text>
          We do not offer refunds. As our products are digital goods, they cannot be returned once
          they have been accessed. This policy is in place to prevent abuse and is in line with
          industry standards for digital sales.
        </Text>
      ),
    },
  ]

  return (
    <Stack gap={{ base: '12', lg: '24' }} direction={{ base: 'column', lg: 'row' }} width="full">
      <Stack gap={{ base: '4', md: '5' }} maxW={{ lg: 'md' }}>
        <Stack gap="3">
          <Text color="accent.default" textStyle={{ base: 'sm', md: 'md' }} fontWeight="semibold">
            Support
          </Text>
          <Heading size={{ base: '3xl', md: '4xl' }}>FAQs</Heading>
        </Stack>
        <Text color="fg.muted" textStyle="lg">
          Everything you need to know about Ark Plus. For questions about licensing, please see our{' '}
          <Link asChild>
            <NextLink href="/license">licensing page</NextLink>
          </Link>
          .
        </Text>
      </Stack>

      <Stack gap="8" flex="1">
        <Accordion.Root defaultValue={[questions[0].question]} multiple>
          {questions.map((item, id) => (
            <Accordion.Item key={id} value={item.question}>
              <Accordion.ItemTrigger>
                {item.question}
                <Accordion.ItemIndicator>
                  <ChevronDownIcon />
                </Accordion.ItemIndicator>
              </Accordion.ItemTrigger>
              <Accordion.ItemContent textAlign="start">{item.answer}</Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Stack>
    </Stack>
  )
}
