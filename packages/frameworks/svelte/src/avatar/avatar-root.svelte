<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  const handleAvatarClick = () => {
    dispatch('click')
    console.log('Avatar clicked')
  }
</script>

<main>
  <div class="avatar-root" on:click={handleAvatarClick}>
    Test component
    <slot />
  </div>
</main>
