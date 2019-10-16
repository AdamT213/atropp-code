<script>
  import { onMount } from 'svelte'
  import { client } from './App.svelte'
  import { instance } from './utils'
  let posts

  onMount(() => {
    const getPosts = async () => {
      try {
        posts = (await instance.get('/posts')).data
      } catch (e) {
        console.error(e)
      }
    }
    getPosts()
  })
</script>

<style>
  .card {
    padding: 1em;
  }
  div.row {
    margin-bottom: 1rem;
  }
  h1 {
    text-align: center;
  }
</style>

<div class="container">
  <h1 id="center">Contents</h1>
  {#if posts && posts.length}
    {#each posts as post}
      <!-- <img src={} -->
      <div class="row">
        <div class="card">
          <!-- <img id="post1" src={post.imageUrl} /> -->
          <h2
            className="blogpost-title"
            id={post.slug}
            on:click={e => client.navigate(`/blog/${e.target.id}`)}>
            {post.title}
          </h2>
          <p id="posttext">
            So! You’re looking for ways to reduce your carbon footprint. Good
            for you! The first step to living a clean energy lifestyle is by
            actively looking for effective ways to do so. Luckily for you, our
            company offers an easy (and affordable) way you can start!
          </p>
        </div>
      </div>
    {/each}
  {/if}
</div>
