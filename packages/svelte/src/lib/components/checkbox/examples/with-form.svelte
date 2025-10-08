<script lang="ts">
  import { Checkbox } from '@ark-ui/svelte/checkbox'
  import { CheckIcon } from 'lucide-svelte'
</script>

<form
  onsubmit={(e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    console.log('terms:', formData.get('terms'))
  }}
>
  <Checkbox.Root name="terms" value="accepted">
    <Checkbox.Label>I agree to the terms and conditions</Checkbox.Label>
    <Checkbox.Control>
      <Checkbox.Indicator>
        <CheckIcon />
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.HiddenInput />
  </Checkbox.Root>
  <button type="submit">Submit</button>
</form>
