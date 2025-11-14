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
        {items.map((item, index) => (
          <Carousel.Item key={item.id} index={index} snapAlign="center">
            <div
              style={{
                width: item.width,
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f0f0f0',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              {item.label}
            </div>
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.IndicatorGroup>
        {items.map((_, index) => (
          <Carousel.Indicator key={index} index={index} />
        ))}
      </Carousel.IndicatorGroup>
    </Carousel.Root>
  )
}
