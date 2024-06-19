import { ChevronDownIcon } from 'lucide-react'
import NextLink from 'next/link'
import { Stack } from 'styled-system/jsx'
import { Accordion, Heading, Link, Text } from '~/components/ui'
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
          The license grants all employees and contractors of the licensee permission to access and
          use the examples. When activating your team license, we recommend using a shared email
          address that all employees can access. For more information on team licensing specifics,{' '}
          <NextLink href="/license">read through our license</NextLink>.
        </Text>
      ),
    },
    {
      question: 'Do you offer a free trial?',
      answer: (
        <Text>
          We do not offer a free trial. However, some of our examples are available for free.
        </Text>
      ),
    },
    {
      question: 'Which version of Ark UI do I need?',
      answer: (
        <Text>The examples shown on this page are built with the latest version of Ark UI.</Text>
      ),
    },
    {
      question: 'Found an issue with an example?',
      answer: (
        <Text>
          Feel free to contact us at <MailToSupportLink subject="Bug Report" /> or create an issue
          on our{' '}
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
          Everything you need to know about Ark UI Plus. For questions about licensing, please see
          our{' '}
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
