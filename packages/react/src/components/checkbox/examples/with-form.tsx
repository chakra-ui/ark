import { Checkbox } from '@ark-ui/react/checkbox'
import { CheckIcon } from 'lucide-react'
import styles from 'styles/checkbox.module.css'
import button from 'styles/button.module.css'

export const WithForm = () => (
  <form
    style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}
    onSubmit={(e) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      console.log('terms:', formData.get('terms'))
    }}
  >
    <Checkbox.Root className={styles.Root} name="terms" value="accepted">
      <Checkbox.Control className={styles.Control}>
        <Checkbox.Indicator className={styles.Indicator}>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.Label className={styles.Label}>I agree to the terms and conditions</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox.Root>
    <button className={button.Root} data-variant="solid" type="submit">
      Submit
    </button>
  </form>
)
