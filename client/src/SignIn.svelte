<script>
  import { onMount } from 'svelte'
  import { instance } from './utils'
  import Header from './Header.svelte'

  export let client

  let email,
    password,
    errors = ''

  const handleSubmit = () => {
    if (!email || !password) {
      errors = 'Please provide your email and password'
    } else {
      const loginUser = async () => {
        try {
          const headers = {
            'Content-type': 'application/json',
            Accept: 'application/json',
          }
          const data = { email, password }
          const res = await instance(`/loginUser`, {
            method: 'post',
            data,
            headers,
            withCredentials: true,
          })
          if (res.data) client.navigate('/content')
        } catch (e) {
          errors = 'One or more invalid values supplied'
        }
      }
      loginUser()
    }
  }
</script>

<style>
  div.container {
    margin-top: 25vh;
  }
  div.row {
    justify-content: space-around;
  }
  div.row.left {
    justify-content: initial;
  }
  div.col-8 {
    border-radius: 0.25rem;
    background-color: #ffffff;
    padding: 5%;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.1);
  }
  div.col-8 .row {
    border-bottom: 1.2px solid #f5f6f8;
    margin-right: 0 !important;
    margin-left: 0 !important;
  }
  button {
    margin-top: 0.5rem;
    width: 100%;
  }
  form {
    padding-top: 5%;
    padding-bottom: 5%;
  }
  h1 {
    font-size: 1.5rem;
    font-weight: 430;
    color: #333;
  }
  p.form-error {
    font-size: 0.7em;
    color: red;
  }
</style>

<div>
  <Header />
  <div class="container">
    <div class="row">
      <div class="col-8">
        {#if errors}
          <p class="form-error">{errors}</p>
        {/if}
        <div class="row left">
          <h1>Sign In</h1>
        </div>
        <form on:submit|preventDefault={() => handleSubmit()}>
          <div class="form-group">
            <label class="emailLabel" htmlFor="Email">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              placeholder="Your email"
              bind:value={email}
              on:change={() => (errors = '')} />
            {#if errors.email}
              <p class="form-error">You are not authorized</p>
            {/if}
          </div>
          <div class="form-group">
            <label class="passwordLabel" htmlFor="Password">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              name="password"
              placeholder="Your Password"
              bind:value={password}
              on:change={() => (errors = '')} />
            {#if errors.password}
              <p class="form-error">You are not authorized</p>
            {/if}
          </div>
          <button type="Submit">Sign In</button>
        </form>
      </div>
    </div>
  </div>
</div>
