<script>
  import crayon from 'crayon'
  import svelte from 'crayon-svelte'
  import About from './About.svelte'
  import Blog from './Blog.svelte'
  import BlogPost from './BlogPost.svelte'
  import CMS from './CMS.svelte'

  const client = crayon.create()
  client.use(svelte.router())

  client.path('/', (req, res) => {
    res.redirect('/blog')
  })

  client.path('/about', (req, res) => {
    res.mount(About)
  })

  client.path('/content', (req, res) => {
    res.mount(CMS)
  })

  client.path('/blog', (req, res) => {
    res.mount(
      new Blog({
        target: document.body,
        props: {
          client,
        },
      })
    )
  })

  client.path('/blog/:slug', async (req, res) => {
    let { slug } = req.params
    await res.mount(
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
