<script>
  import crayon from 'crayon'
  import svelte from 'crayon-router-svelte'
  import animate from 'crayon-router-animate'
  import transition from 'crayon-router-transition'
  import About from './About.svelte'
  import Blog from './Blog.svelte'
  import BlogPost from './BlogPost.svelte'
  import CMS from './CMS.svelte'
  import SignIn from './SignIn.svelte'
  import { instance } from './utils'

  const outlet = document.getElementById('root')

  const client = crayon.create()
  client.use(svelte.router(outlet))

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
    console.log(res)
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
    console.log(res)
    res.mount(Blog, {
      client,
    })
  })

  client.path('/blog/:slug', async (req, res) => {
    let { slug } = req.params
    await res.mount(BlogPost, {
      slug,
    })
  })

  client.path('/signin', loggedInUser, async (req, res) => {
    if (req.user) {
      res.redirect('/content')
    } else
      await res.mount(SignIn, {
        client,
      })
  })

  client.load()
</script>
