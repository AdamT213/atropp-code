<script>
  import { onMount } from 'svelte'
  import Quill from 'quill'
  import { instance } from './utils'

  let editor,
    title,
    meta,
    slug,
    errors = {}

  onMount(() => {
    var toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      ['link', 'image'],

      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],

      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['clean'],
    ]
    var quill = new Quill('#editor', {
      modules: { toolbar: toolbarOptions },
      placeholder: 'New Blog Post',
      theme: 'snow',
    })
    editor = quill
  })

  const savePost = () => {
    const post = async () => {
      var postBody = document.querySelector('#editor')
      postBody.value = JSON.stringify(editor.getContents())
      if (slug.startsWith('/')) slug = slug.slice(1)
      const data = new FormData()
      data.append('title', title)
      data.append('postBody', postBody.value)
      data.append('meta', meta)
      data.append('slug', slug)
      if (!title || !slug || !meta) {
        if (!title) {
          errors = { ...errors, title: true }
        }
        if (!meta) {
          errors = { ...errors, meta: true }
        }
        if (!slug) {
          errors = { ...errors, slug: true }
        }
      } else {
        const res = await instance({
          method: 'POST',
          url: '/savePost',
          headers: {
            Accept: 'multipart/form-data',
            'Content-Type': 'multipart/form-data',
          },
          data,
        })
        if (res.status == 200) {
          alert('Successfully created your new Post!')
        } else {
          alert(
            'Encountered an error while saving your post. Please try again.'
          )
        }
      }
    }
    post()
  }
</script>

<style>
  .card {
    height: 100vh;
    padding: 1em;
  }
  .card .container {
    height: 100%;
    overflow-y: auto;
  }
  .sticky-top {
    margin-top: 20%;
  }
  button {
    margin-top: 0.5rem;
    width: 100%;
  }
  input {
    margin-bottom: 0.5rem;
  }
  p.form-error {
    font-size: 0.7em;
    color: red;
  }
</style>

<div class="container">
  <div class="card">
    <div class="container">
      <div class="row">
        <div class="col-6">
          <h1>New Blog Post</h1>
          <label htmlFor="title">Title</label>
          <input
            bind:value={title}
            class="form-control"
            placeholder="new post title"
            type="text"
            on:change={e => {
              errors.title = false
            }} />
          {#if errors.title}
            <p class="form-error">Please include a title for your post</p>
          {/if}
          <label htmlFor="body">Body</label>
          <link
            href="https://cdn.quilljs.com/1.0.0/quill.snow.css"
            rel="stylesheet" />
          <div id="editor" />
          <button on:click={savePost} type="submit">Submit</button>
        </div>
        <div class="col-6">
          <div class="sticky-top">
            <label htmlFor="meta description" placeholder="SEO Description">
              Meta Description
            </label>
            <input
              bind:value={meta}
              class="form-control"
              placeholder="SEO description for your new post"
              type="text"
              on:change={e => {
                errors.meta = false
              }} />
            {#if errors.meta}
              <p class="form-error">
                Please include an SEO Description for your post
              </p>
            {/if}
            <label htmlFor="slug" placeholder="Post Url">Slug</label>
            <input
              bind:value={slug}
              class="form-control"
              placeholder="/my-new-post"
              type="text"
              on:change={e => {
                errors.slug = false
              }} />
            {#if errors.slug}
              <p class="form-error">
                Please include a unique slug for your post
              </p>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- For my first post on my new blog, I thought it fitting to explain how I created my new blog! There are, of course, many perfectly adequate, fully fledged CMS systems in existence already, and I really can't give you a great reason why you would want to create your own, other than, to paraphrase those dudes that climbed Mount Everest all those years ago, or JFK when he wanted to go the moon: 'cause you can!' (which, incidentally, is the same reason that you might want to drink a Diet Coke(link to video). But don't drink a Diet Coke. It contains aspartame(link to damning facts about diet coke) and other things that will definitely give you cancer. Much safer to just create a custom CMS).  -->
