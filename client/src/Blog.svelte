<script>
  import { onMount } from 'svelte'
  import { instance } from './utils'
  import Header from './Header.svelte'
  let posts
  export let client
  let w

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
  div.card {
    padding: 1em;
    cursor: pointer;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  div.row {
    height: 100%;
    width: 100%;
    margin-right: 0;
    margin-left: 0;
    justify-content: center;
  }
  .col-10 div.row {
    height: 25vh;
    margin-bottom: 1rem;
    margin-right: initial;
    margin-left: initial;
  }
  .card .row {
    align-items: center;
  }
  img {
    width: 80%;
    height: 80%;
  }
  @media screen and (max-width: 576px) {
    h1 {
      font-size: 1.6rem;
    }
    h2 {
      font-size: 1.2rem;
    }
    p {
      font-size: 0.8rem;
    }
  }
</style>

<div bind:clientWidth={w} class="container">
  <div class="row">
    <div class="col-10">
      <Header />
      <h1>Canon</h1>
      <img
        id="hero"
        alt="spacey hero image"
        src="https://adam-tropp-blog-posts.s3.amazonaws.com/Details+about+Winter+Solstice+Blue+Cosmic+Sun+Moon+Stars+Fabric+Celestial+Metallic+Gold+BTHY.jpeg" />
      {#if posts && posts.length}
        {#each posts as post}
          <div class="row">
            <div
              id={post.slug}
              class="card"
              on:click={event => client.navigate('/blog/' + event.target.id)}>
              <div class="row">
                {#if w >= 700}
                  <div class="col-4">
                    <img alt="hero image" id={post.slug} src={post.imageUrl} />
                  </div>
                  <div class="col-8">
                    <h2
                      className="blogpost-title"
                      id={post.slug}
                      on:click={event => client.navigate('/blog/' + event.target.id)}>
                      {post.title}
                    </h2>
                    <p id={post.slug}>{post.meta}...</p>
                  </div>
                {:else}
                  <div class="col-12">
                    <h2
                      className="blogpost-title"
                      id={post.slug}
                      on:click={event => client.navigate('/blog/' + event.target.id)}>
                      {post.title}
                    </h2>
                    <p id={post.slug}>{post.meta}...</p>
                  </div>
                {/if}
              </div>
            </div>
          </div>
        {/each}
      {/if}
    </div>
  </div>
</div>
