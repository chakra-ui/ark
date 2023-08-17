import { ChevronDown } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
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
              <AccordionTrigger>
                {item}
                <AccordionIcon isOpen={isOpen} />
              </AccordionTrigger>
              <AccordionContent>
                <div>
                  Pudding donut gummies chupa chups oat cake marzipan biscuit tart. Dessert macaroon
                  ice cream bonbon jelly. Jelly topping tiramisu halvah lollipop.
                </div>
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
  return <ChevronDown style={iconStyles} />
}
