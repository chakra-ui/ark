import { accordion } from '@/panda/recipes'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ark-ui/react'
import { FiChevronDown } from 'react-icons/fi'

export const DemoAccordion = () => {
  const items = ['React', 'Solid', 'Vue']
  return (
    <Accordion defaultValue="React" className={accordion()}>
      {items.map((item, id) => (
        <AccordionItem key={id} value={item}>
          {({ isOpen }) => (
            <>
              <AccordionTrigger asChild>
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

const AccordionIcon = (props: { isOpen: boolean }) => {
  const iconStyles = {
    transform: props.isOpen ? 'rotate(-180deg)' : undefined,
    transition: 'transform 0.2s',
    transformOrigin: 'center',
  }
  return <FiChevronDown style={iconStyles} />
}
