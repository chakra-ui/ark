import { ChevronDownIcon } from 'lucide-react'
import { Accordion } from '~/components/ui/accordion'
import { Link } from '~/components/ui/link'

export const Faq = () => {
  const questions = [
    {
      question: 'What is Ark UI?',
      answer: (
        <div>
          Ark UI is a powerful headless component library that provides more than 40+ components and tools to help you
          build accessible, complex, and feature-rich UI design systems.
        </div>
      ),
    },
    {
      question: "Isn't support for multiple frameworks bad for performance?",
      answer: (
        <div>
          No - in fact, the opposite is true. In our latest release, Ark UI{' '}
          <Link href="/docs/overview/changelog#500---2025-03-06">outperformed</Link> other headless component libraries
          that were built exclusively for a single framework.
        </div>
      ),
    },
    {
      question: "Isn't supporting multiple frameworks time-consuming?",
      answer: (
        <div>
          Not really. At its core, most components are designed as finite state machines that interact solely with the
          DOM. Framework-specific adapters handle events and state management, ensuring that multi-framework support
          remains lightweight and highly efficient.
        </div>
      ),
    },
    {
      question: 'Which JavaScript frameworks are supported?',
      answer: <div>Ark UI currently supports React, Solid, Vue, and Svelte.</div>,
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
