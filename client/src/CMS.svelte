<script>
  import { onMount } from 'svelte'
  import Quill from 'quill'
  import { instance } from './utils'

  let editor,
    title,
    meta,
    slug,
    image,
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
      data.append('image', image)
      data.append('title', title)
      data.append('postBody', postBody.value)
      data.append('meta', meta)
      data.append('slug', slug)
      if (!title || !slug || !meta || !image) {
        if (!title) {
          errors = { ...errors, title: true }
        }
        if (!meta) {
          errors = { ...errors, meta: true }
        }
        if (!slug) {
          errors = { ...errors, slug: true }
        }
        if (!image) {
          errors = { ...errors, image: true }
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

  function PreviewImage() {
    var oFReader = new FileReader()
    oFReader.onload = function(oFREvent) {
      document.getElementById('uploadPreview').src = oFREvent.target.result
    }
    oFReader.readAsDataURL(document.getElementById('uploadImage').files[0])
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
  #feat-img {
    height: 150px;
    border: 3px dashed #f2f4f7;
    margin-bottom: 1rem;
    color: #f2f4f7;
    text-align: center;
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
            <div id="feat-img">
              {#if image}
                <img
                  alt="preview"
                  src="#"
                  id="uploadPreview"
                  style="width: 100px; height: 100px;" />
                <button on:click={() => (image = '')}>Discard</button>
              {:else}
                <i class="fas fa-cloud-upload-alt" />
                <p>Feature Image</p>
                <input
                  id="uploadImage"
                  type="file"
                  style="opacity: 0.0; position: absolute; top: 0; left: 0;
                  bottom: 0; right: 0; width: 100%; height:100%;"
                  on:change={e => {
                    errors.image = false
                    PreviewImage()
                    image = e.target.files[0]
                  }} />
              {/if}
            </div>
            {#if errors.image}
              <p class="form-error">
                Please include a feature image (png, jpeg/jpg) to accompany your
                post
              </p>
            {/if}
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
