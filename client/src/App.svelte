<script>
  import crayon from 'crayon'
  import svelte from 'crayon-svelte'
  import animate from 'crayon-animate'
  import transition from 'crayon-transition'
  import About from './About.svelte'
  import Blog from './Blog.svelte'
  import BlogPost from './BlogPost.svelte'
  import CMS from './CMS.svelte'
  import SignIn from './SignIn.svelte'
  import { instance } from './utils'

  const client = crayon.create()
  client.use(svelte.router())

  client.use(transition.loader())
  client.use(
    animate.routes([
      {
        from: '/blog',
        to: '/**',
        name: 'transition.pushUp',
        duration: 1000,
      },
    ])
  )
  const loggedInUser = async (req, res) => {
    const { data } = await instance.get('/loggedInUser', {
      withCredentials: true,
    })
    if (data) req.user = data
  }

  client.path('/', (req, res) => {
    res.redirect('/blog')
  })

  client.path('/about', (req, res) => {
    res.mount(About)
  })

  client.path('/content', loggedInUser, (req, res) => {
    if (req.user) res.mount(CMS)
    else res.redirect('/signin')
  })

  client.path('/blog', (req, res) => {
    res.mount(Blog, {
      target: document.body,
      client,
    })
  })

  client.path('/blog/:slug', async (req, res) => {
    let { slug } = req.params
    await res.mount(BlogPost, {
      target: document.body,
      slug,
    })
  })

  client.path('/signin', loggedInUser, async (req, res) => {
    if (req.user) {
      res.redirect('/content')
    } else
      await res.mount(SignIn, {
        target: document.body,
        client,
      })
  })

  client.load()
</script>
