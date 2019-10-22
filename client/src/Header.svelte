<script>
  let w
  let toggled
</script>

<style>
  a {
    display: inline;
    color: #fff;
    text-decoration: underline;
  }
  a:hover {
    font-style: italic;
  }
  a#brand {
    font-size: 1.4rem;
  }
  button {
    float: right;
    background: inherit;
    color: #ffffff;
  }
</style>

<div bind:clientWidth={w}>
  <a id="brand" href="/">AtroppCode</a>
  {#if w >= 700 || toggled}
    <a href="/about">About</a>
    <a target="blank" href="https://github.com/adamt213">Github</a>
    <a target="blank" href="https://twitter.com/glsshsthrwngstn">Twitter</a>
    <a target="blank" href="https://www.linkedin.com/in/adamtropp13/">
      Linkedin
    </a>
    <a href="/resume.docx" target="blank">C.V.</a>
  {:else}
    <button on:click={() => (toggled = true)}>
      <i class="fas fa-bars" />
    </button>
  {/if}
</div>
