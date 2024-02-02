<script context="module">
  import { AvatarRoot } from '..'

  export const meta = {
    title: 'Avatar',
  }
</script>

<script>
  import { Story, Template } from '@storybook/addon-svelte-csf'

  let count = 0
  function handleClick() {
    count += 1
  }
</script>

<!-- <Template let:args>
  👇 'on:click' allows to forward event to addon-actions 
  <Avatar.Root {...args} on:click on:click={handleClick}>
    You clicked: {count}
  </Avatar.Root>
</Template> -->

<!-- <Story name="Rounded" args={{ rounded: true }} /> -->

<!-- <Story name="Square" source args={{ rounded: false }} /> -->

<!-- Dynamic snippet should be disabled for this story -->
<Story name="Basic">
  <AvatarRoot>Test avatar</AvatarRoot>
</Story>
