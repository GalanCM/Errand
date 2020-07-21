<template>
  <div class="modal-container" role="presentation">
    <form class="sign-in" v-show="form === 'sign-in'">
      <header>Sign In</header>
      <main>
        <input name="email" v-model="email" type="email" />
        <label for="email">Email Address</label>
        <input name="password" v-model="password" type="password" />
        <label for="password">Password</label>
        <p>Not registered? <a @click.prevent="form = 'sign-up'">Sign Up</a></p>
      </main>
    </form>
    <form class="sign-in" v-show="form === 'sign-up'">
      <header>Sign Up</header>
      <main>
        <input name="email" v-model="email" type="email" />
        <label for="email">Email Address</label>
        <input name="password" v-model="password" type="password" />
        <label for="password">Password</label>
        <input
          name="confirm-password"
          v-model="confirmPassword"
          type="password"
        />
        <label for="confirm-password">Confirm Password</label>
        <p>
          Already registered?
          <a @click.prevent="form = 'sign-in'">Return to Sign In</a>
        </p>
      </main>
    </form>
  </div>
</template>

<style lang="less" scoped>
.sign-in {
  flex-direction: column;

  header {
    display: flex;
    margin: 0 0 15px;
    padding: 3px 0 3px 10px;
    border-bottom: 1px dashed white;
    background-color: #121;
    color: white;
    font-size: 26px;
    font-weight: 500;

    button {
      line-height: 0;
      height: 32px;
      width: 32px;
      margin: -3px 0 auto auto;
      border: none;
      background-color: transparent;
      color: rgba(255, 255, 255, 0.9);
      font-size: 30px;
      cursor: pointer;
    }
  }

  main {
    margin: 0 35px;

    > * {
      display: block;
    }

    input {
      background-color: #e5e5e5;
      border: none;
      border-bottom: 1px solid transparent;
      border-radius: 2px;
      font-family: inherit;
      font-size: 16px;
      padding: 3px 5px;

      &:focus {
        outline: black;
        border-color: black;
      }
    }

    label {
      margin: 2px 0 15px;
      text-align: right;
      font-size: 13px;
      color: #005d57;
    }

    a {
      font-weight: 500;
      color: #009086;
      cursor: pointer;
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, ref } from "@vue/composition-api";

export default defineComponent({
  setup() {
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");

    const form = ref<"sign-in" | "sign-up">("sign-in");

    return {
      email,
      password,
      confirmPassword,
      form
    };
  }
});
</script>