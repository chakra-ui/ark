'use client'
import { accordion } from '@/panda/recipes'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  type AccordionProps,
} from '@ark-ui/react'
import { FiChevronDown } from 'react-icons/fi'

export const DemoAccordion = (props: AccordionProps) => {
  const items = ['React', 'Solid', 'Vue']
  return (
    <Accordion defaultValue="React" className={accordion()} {...props}>
      {items.map((item, id) => (
        <AccordionItem key={id} value={item}>
          {({ isOpen }) => (
            <>
              <AccordionTrigger>
                <button>
                  <span>What is {item}?</span>
                  <AccordionIcon isOpen={isOpen} />
                </button>
              </AccordionTrigger>
              <AccordionContent>
                Pudding donut gummies chupa chups oat cake marzipan biscuit tart. Dessert macaroon
                ice cream bonbon jelly. Jelly topping tiramisu halvah lollipop.
              </AccordionContent>
            </>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export const controls = {
  multiple: { type: 'boolean' },
} as const

const AccordionIcon = (props: { isOpen: boolean }) => {
  const iconStyles = {
    transform: props.isOpen ? 'rotate(-180deg)' : undefined,
    transition: 'transform 0.2s',
    transformOrigin: 'center',
  }
  return <FiChevronDown style={iconStyles} />
}
