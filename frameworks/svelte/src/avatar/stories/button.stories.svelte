<script context="module">
  import Button from '../button.svelte'

  export const meta = {
    title: 'Button',
    component: Button,
  }
</script>

<script>
  import { Story, Template } from '@storybook/addon-svelte-csf'

  let count = 0
  function handleClick() {
    count += 1
  }
</script>

<Template let:args>
  <!--👇 'on:click' allows to forward event to addon-actions  -->
  <Button {...args} on:click on:click={handleClick}>
    You clicked: {count}
  </Button>
</Template>

<Story name="Rounded" args={{ rounded: true }} />

<Story name="Square" source args={{ rounded: false }} />

<!-- Dynamic snippet should be disabled for this story -->
<Story name="Button No Args">
  <Button>Label</Button>
</Story>
