import { For } from 'solid-js'
import { Carousel } from '../'

const items = [
  { id: '1', width: '120px', label: 'Small' },
  { id: '2', width: '200px', label: 'Medium Size' },
  { id: '3', width: '80px', label: 'XS' },
  { id: '4', width: '250px', label: 'Large Content Here' },
  { id: '5', width: '150px', label: 'Regular' },
]

export const VariableSize = () => {
  return (
    <Carousel.Root slideCount={items.length} autoSize spacing="8px">
      <Carousel.Control>
        <Carousel.PrevTrigger>Previous</Carousel.PrevTrigger>
        <Carousel.NextTrigger>Next</Carousel.NextTrigger>
      </Carousel.Control>
      <Carousel.ItemGroup>
        <For each={items}>
          {(item, index) => (
            <Carousel.Item index={index()} snapAlign="center">
              <div
                style={{
                  width: item.width,
                  height: '100px',
                  display: 'flex',
                  'align-items': 'center',
                  'justify-content': 'center',
                  'background-color': '#f0f0f0',
                  'border-radius': '8px',
                  'font-size': '14px',
                  'font-weight': '500',
                }}
              >
                {item.label}
              </div>
            </Carousel.Item>
          )}
        </For>
      </Carousel.ItemGroup>
      <Carousel.IndicatorGroup>
        <For each={items}>{(_, index) => <Carousel.Indicator index={index()} />}</For>
      </Carousel.IndicatorGroup>
    </Carousel.Root>
  )
}
