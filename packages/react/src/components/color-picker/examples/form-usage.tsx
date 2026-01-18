import { ColorPicker, parseColor } from '@ark-ui/react/color-picker'
import { PipetteIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import button from 'styles/button.module.css'
import styles from 'styles/color-picker.module.css'

interface FieldValues {
  color: string
}

export const FormUsage = () => {
  const { register, handleSubmit } = useForm<FieldValues>()

  const onSubmit = (data: FieldValues) => {
    alert(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ColorPicker.Root className={styles.Root} inline defaultValue={parseColor('#eb5e41')}>
        <ColorPicker.HiddenInput {...register('color')} />

        <ColorPicker.Area className={styles.Area}>
          <ColorPicker.AreaBackground className={styles.AreaBackground} />
          <ColorPicker.AreaThumb className={styles.AreaThumb} />
        </ColorPicker.Area>
        <div className={styles.SliderGroup}>
          <ColorPicker.EyeDropperTrigger className={styles.EyeDropperTrigger}>
            <PipetteIcon />
          </ColorPicker.EyeDropperTrigger>
          <div className={styles.ChannelSliders}>
            <ColorPicker.ChannelSlider className={styles.ChannelSlider} channel="hue">
              <ColorPicker.ChannelSliderTrack className={styles.ChannelSliderTrack} />
              <ColorPicker.ChannelSliderThumb className={styles.ChannelSliderThumb} />
            </ColorPicker.ChannelSlider>
            <ColorPicker.ChannelSlider className={styles.ChannelSlider} channel="alpha">
              <ColorPicker.TransparencyGrid className={styles.TransparencyGrid} />
              <ColorPicker.ChannelSliderTrack className={styles.ChannelSliderTrack} />
              <ColorPicker.ChannelSliderThumb className={styles.ChannelSliderThumb} />
            </ColorPicker.ChannelSlider>
          </div>
        </div>

        <ColorPicker.View className={styles.View} format="rgba">
          <div className={styles.ChannelInputGroup}>
            <ColorPicker.ChannelInput className={styles.ChannelInput} channel="hex" />
            <ColorPicker.ChannelInput className={styles.ChannelInput} channel="alpha" />
          </div>
        </ColorPicker.View>

        <ColorPicker.View className={styles.View} format="hsla">
          <div className={styles.ChannelInputGroup}>
            <ColorPicker.ChannelInput className={styles.ChannelInput} channel="hue" />
            <ColorPicker.ChannelInput className={styles.ChannelInput} channel="saturation" />
            <ColorPicker.ChannelInput className={styles.ChannelInput} channel="lightness" />
          </div>
        </ColorPicker.View>

        <button className={button.Root} type="submit" data-variant="solid">
          Submit
        </button>
      </ColorPicker.Root>
    </form>
  )
}
