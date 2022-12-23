import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@ark-ui/react'
import { ChevronDown } from 'react-feather'
import { accordion } from '../../../panda/recipes'

export const DemoAccordion = () => {
  const items = ['React', 'Solid', 'Vue']
  return (
    <Accordion defaultValue="panel-1" className={accordion()}>
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

const AccordionIcon = (props: { isOpen: boolean }) => {
  const iconStyles = {
    transform: props.isOpen ? 'rotate(-180deg)' : undefined,
    transition: 'transform 0.2s',
    transformOrigin: 'center',
    height: '1rem',
    width: '1rem',
  }
  return <ChevronDown style={iconStyles} />
}
