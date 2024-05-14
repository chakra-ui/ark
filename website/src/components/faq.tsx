import { ChevronDownIcon } from 'lucide-react'
import { Accordion, Icon, Link } from '~/components/ui'

export const Faq = () => {
  const questions = [
    {
      question: 'How does Ark UI support multiple JavaScript frameworks?',
      answer: (
        <div>
          Ark UI leverages{' '}
          <Link href="https://zagjs.com/" target="_blank">
            Zag.js
          </Link>{' '}
          to provide support for multiple JavaScript frameworks. Zag.js is a lightweight library
          that builds upon the latest concepts in Statecharts, enabling seamless integration across
          different frameworks.
        </div>
      ),
    },
    {
      question: 'Which JavaScript frameworks are supported?',
      answer: (
        <div>
          Built on{' '}
          <Link href="https://zagjs.com/" target="_blank">
            Zag.js
          </Link>
          , Ark UI currently supports the following JavaScript frameworks: React, Solid, and Vue. We
          plan to extend support to Svelte later this year.
        </div>
      ),
    },
    {
      question: 'Why support various JavaScript frameworks?',
      answer: (
        <div>
          Supporting multiple JavaScript frameworks enables flexible design systems that are
          compatible across various platforms. This approach provides developers with the freedom to
          select the tools that best suit their expertise and project requirements.
        </div>
      ),
    },
  ]

  return (
    <Accordion.Root defaultValue={[questions[0].question]} multiple className="not-prose">
      {questions.map((item, id) => (
        <Accordion.Item key={id} value={item.question}>
          <Accordion.ItemTrigger>
            {item.question}
            <Accordion.ItemIndicator>
              <ChevronDownIcon />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>{item.answer}</Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
