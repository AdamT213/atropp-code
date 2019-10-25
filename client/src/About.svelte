<script>
  import Header from './Header.svelte'
</script>

<style>
  div.row {
    height: 100%;
    width: 100%;
    margin-right: 0;
    margin-left: 0;
    justify-content: center;
  }
  p {
    margin-top: 1rem;
  }
  p#about {
    margin-top: 10vh;
  }
</style>

<div class="container">
  <div class="row">
    <div class="col-10">
      <Header />
      <p id="about">
        Hi, I am Adam, a software engineer specializing in web development with
        Javascript. I hail from New Jersey, and have also spent significant time
        living in the San Francisco Bay Area, which I consider my second (read:
        "real") home. At the time of this writing, I have 23 years of life under
        my belt. When I am not
        <a
          target="blank"
          href="https://en.wikipedia.org/wiki/Computer_programming">
          performing ritualistic sacrifices to the machines that will one day be
          our overlords,
        </a>
        you might find me:
      </p>
      <li>
        Tearing it up on the
        <a href="https://en.wikipedia.org/wiki/Poker">felt</a>
      </li>
      <li>Playing guitar</li>
      <li>Playing Basketball</li>
      <li>
        Playing the ancient Chinese board game
        <a target="blank" href="https://online-go.com/player/590574">Go</a>
      </li>
      <li>
        Consuming the
        <a href="https://en.wikipedia.org/wiki/Book">written</a>
        or
        <a href="https://en.wikipedia.org/wiki/Hip_hop_music">spoken</a>
        word
      </li>
      <li>Watching baseball or football</li>
      <p>
        Eventually, I plan to make this site into a repository for all the
        things I love, including my thoughts and ramblings about stuff that
        isn't code. So if you are interested in hearing such things, you have
        come to the right place! And if not... well.... you're here, so I guess
        maybe you gotta reevaluate that.
      </p>
    </div>
  </div>
</div>
