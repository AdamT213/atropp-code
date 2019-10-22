<script>
  import { onMount } from 'svelte'
  import axios from 'axios'
  import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
  import { instance } from './utils'
  import Header from './Header.svelte'

  export let slug

  let post, content, title, meta, imageUrl

  onMount(() => {
    const getPost = async () => {
      try {
        const getPostDetails = async () => {
          post = (await instance.get(`/postDetails?slug=${slug}`)).data
          title = post.title
          imageUrl = post.imageUrl
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
  div.row {
    height: 100%;
    width: 100%;
    margin-right: 0;
    margin-left: 0;
    justify-content: center;
  }
</style>

<svelte:head>
  <title>{title}</title>
  <meta name="og:description" content={meta} />
  <meta property="og:title" content={title} />
  <meta property="og:image" content={imageUrl} />
  <!-- <meta property="og:url" content={`https://www.forestfounders.org/${slug}`} /> -->
</svelte:head>

<div>
  <div class="container">
    <div class="row">
      <div class="col-10">
        <Header />
        <h1>{title}</h1>
        <img id="hero" alt="hero image" src={imageUrl} />
        <div id="content">
          {@html content}
        </div>
      </div>
    </div>
  </div>
</div>
