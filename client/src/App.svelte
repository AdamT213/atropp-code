<script context="module">
  import crayon from 'crayon'
  import svelte from 'crayon-svelte'
  import CMS from './CMS.svelte'
  import Blog from './Blog.svelte'
  import BlogPost from './BlogPost.svelte'

  export const client = crayon.create()
  client.use(svelte.router())

  client.path('/content', (req, res) => {
    return res.mount(CMS)
  })

  client.path('/blog', (req, res) => {
    res.mount(Blog)
    return res.onLeave(() => res.unmount(Body))
  })

  client.path('/blog/:slug', (req, res) => {
    let { slug } = req.params
    return res.mount(
      new BlogPost({
        target: document.body,
        props: {
          slug,
        },
      })
    )
  })

  client.load()
</script>
