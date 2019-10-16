<script>
  import { onMount } from 'svelte'
  import axios from 'axios'
  import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
  import { instance } from './utils'

  export let slug

  let post, content, title, meta

  onMount(() => {
    const getPost = async () => {
      try {
        const getPostDetails = async () => {
          post = (await instance.get(`/postDetails?slug=${slug}`)).data
          title = post.title
          meta = post.meta
        }
        await getPostDetails()
        if (post && !post.postBody) {
          const getContent = async () => {
            const res = (await axios.get(post.postBodyURL)).data
            const converter = new QuillDeltaToHtmlConverter(res.ops, {
              multiLineParagraph: false,
            })
            content = await converter.convert()
          }
          getContent()
        }
      } catch (e) {
        console.error(e)
      }
    }
    getPost()
  })
</script>

<style>
  div#content {
    width: 100%;
  }
</style>

<svelte:head>
  <title>{title}</title>
  <meta name="og:description" content={meta} />
  <meta property="og:title" content={title} />
  <!-- <meta property="og:image" content={post.imageUrl} /> -->
  <!-- <meta property="og:url" content={`https://www.forestfounders.org/${slug}`} /> -->
</svelte:head>

<div>
  <div class="container">
    <h1>{title}</h1>
    <!-- <img src={post.imageUrl} /> -->
    <div id="content">
      {@html content}
    </div>
  </div>
</div>
