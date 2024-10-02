import { ColorPicker, parseColor } from '@ark-ui/react/color-picker'
import { ColorPickerSlider } from './_template'

const style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
}

export const SliderOnly = () => {
  return (
    <ColorPicker.Root open defaultValue={parseColor('#7f007f')}>
      <ColorPicker.Content>
        <ColorPicker.ValueText />
        <ColorPicker.View format="rgba" style={style}>
          <ColorPickerSlider channel="red" />
          <ColorPickerSlider channel="green" />
          <ColorPickerSlider channel="blue" />
        </ColorPicker.View>
      </ColorPicker.Content>
    </ColorPicker.Root>
  )
}
