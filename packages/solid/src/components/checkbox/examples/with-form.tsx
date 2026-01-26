import { Checkbox } from '@ark-ui/solid/checkbox'
import { CheckIcon } from 'lucide-solid'
import styles from 'styles/checkbox.module.css'
import button from 'styles/button.module.css'

export const WithForm = () => (
  <form
    style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem', 'align-items': 'flex-start' }}
    onSubmit={(e) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      console.log('terms:', formData.get('terms'))
    }}
  >
    <Checkbox.Root class={styles.Root} name="terms" value="accepted">
      <Checkbox.Control class={styles.Control}>
        <Checkbox.Indicator class={styles.Indicator}>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.Label class={styles.Label}>I agree to the terms and conditions</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
    <button class={button.Root} data-variant="solid" type="submit">
      Submit
    </button>
  </form>
)
