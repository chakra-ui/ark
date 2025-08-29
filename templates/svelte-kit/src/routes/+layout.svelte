<script>
  let { children } = $props()
</script>

<nav>
  <a href="/">Home</a>
  <a href="/select">Select</a>
  <a href="/popover/unmount">Popover</a>
</nav>

<div style="padding: 1rem;">
  {@render children()}
</div>
