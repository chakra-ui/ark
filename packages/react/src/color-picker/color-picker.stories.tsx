import {
  ColorPicker,
  ColorPickerChannelInput,
  ColorPickerEyeDropperTrigger,
  ColorPickerSwatch,
  ColorPickerSwatchBackground,
} from './'
import './color-picker.css'

export const Basic = () => {
  return (
    <ColorPicker>
      {(api) => {
        const [hue, saturation, lightness] = api.channels
        return (
          <>
            <output>
              <div>Color: {api.value}</div>
            </output>

            <ColorPickerSwatch value={api.value} readOnly>
              <ColorPickerSwatchBackground value={api.value} />
            </ColorPickerSwatch>

            {/*
              TODO Prefer this syntax, ask @segunadebayo
              <ColorPickerChannelInput channel="hue"/>
              <ColorPickerChannelInput channel="saturation"/>
              <ColorPickerChannelInput channel="lightness"/>
           */}
            <ColorPickerChannelInput channel={hue} />
            <ColorPickerChannelInput channel={saturation} />
            <ColorPickerChannelInput channel={lightness} />
            <ColorPickerChannelInput channel="alpha" />
            <ColorPickerChannelInput channel="hex" />

            {/*
              TODO Prefer this syntax, ask @segunadebayo
              <ColorPickerSwatch value="#123123">
           */}
            <ColorPickerSwatch value="#123123">
              <ColorPickerSwatchBackground value="#123123" />
            </ColorPickerSwatch>

            <ColorPickerEyeDropperTrigger>
              <button>Pick color</button>
            </ColorPickerEyeDropperTrigger>
          </>
        )
      }}
    </ColorPicker>
  )
}
