<script>
  export let rounded = true;
</script>

<style>
  .rounded {
    border-radius: 35px;
  }

  button {
    border: 3px solid;
    padding: 10px 20px;
    background-color: white;
    outline: none;
  }
</style>

<button class="button" class:rounded on:click={onClick}>
  <slot />
</button>