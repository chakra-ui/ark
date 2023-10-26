import { ChevronDownIcon } from 'lucide-react'
import { Accordion, type AccordionProps } from '~/components/ui'

export const Demo = (props: AccordionProps) => {
  const items = ['React', 'Solid', 'Vue']
  return (
    <Accordion defaultValue={['React']} multiple {...props}>
      {items.map((item, id) => (
        <Accordion.Item key={id} value={item}>
          <Accordion.ItemTrigger>
            {item}
            <Accordion.ItemIndicator>
              <ChevronDownIcon />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <div>
              Pudding donut gummies chupa chups oat cake marzipan biscuit tart. Dessert macaroon ice
              cream bonbon jelly. Jelly topping tiramisu halvah lollipop.
            </div>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}
