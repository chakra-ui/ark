import { ChevronDown } from 'lucide-react'
import {
  Accordion,
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  type AccordionProps,
} from '~/components/ui/accordion'

export const AccordionDemo = (props: AccordionProps) => {
  const items = ['React', 'Solid', 'Vue']
  return (
    <Accordion defaultValue={['React']} {...props}>
      {items.map((item, id) => (
        <AccordionItem key={id} value={item}>
          {({ isOpen }) => (
            <>
              <AccordionItemTrigger>
                {item}
                <AccordionIcon isOpen={isOpen} />
              </AccordionItemTrigger>
              <AccordionItemContent>
                <div>
                  Pudding donut gummies chupa chups oat cake marzipan biscuit tart. Dessert macaroon
                  ice cream bonbon jelly. Jelly topping tiramisu halvah lollipop.
                </div>
              </AccordionItemContent>
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
  return <ChevronDown style={iconStyles} />
}
