<template>
  <div class="modal-container" role="presentation">
    <form class="sign-in">
      <header>
        {{ formName.value === "sign-in" ? "Sign In" : "Sign Up" }}
      </header>
      <main>
        <input name="email" v-model="email" type="email" />
        <label for="email">Email Address</label>
        <input name="password" v-model="password" type="password" />
        <label for="password">Password</label>
        <transition name="fly-left">
          <input
            v-show="formName.value === 'sign-up'"
            name="confirm-password"
            v-model="confirmPassword"
            type="password"
          />
        </transition>
        <transition name="fly-left">
          <label v-show="formName.value === 'sign-up'" for="confirm-password"
            >Confirm Password</label
          >
        </transition>
        <p v-if="formName.value === 'sign-in'" class="to-sign-up">
          Not registered? <router-link to="/sign-up">Sign Up →</router-link>
        </p>
        <p v-else class="to-sign-in">
          <router-link to="/sign-in"
            >← Sign In with Existing Account</router-link
          >
        </p>
      </main>
    </form>
  </div>
</template>

<style lang="less" scoped>
.sign-in {
  flex-direction: column;
  overflow: hidden;

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
    input[name="password"] {
      margin-top: 35px;
    }

    label {
      margin: 2px 0 15px;
      text-align: right;
      font-size: 13px;
      color: #005d57;
    }

    a {
      font-weight: 500;
      text-decoration: none;
      color: #009086;
      cursor: pointer;
    }

    .to-sign-in,
    .to-sign-up {
      margin-top: 30px;
      line-height: 1.5;
      font-size: 14px;
    }
    .to-sign-up {
      text-align: right;
    }
  }
}

// TRANSITIONS
input.fly-left-enter-active,
input.fly-left-leave-active {
  transition: opacity 400ms, transform 500ms cubic-bezier(0.33, 1, 0.68, 1);
}
label.fly-left-enter-active,
label.fly-left-leave-active {
  transition: opacity 500ms, transform 500ms cubic-bezier(0.65, 0, 0.35, 1);
}
.fly-left-enter,
.fly-left-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>

<script lang="ts">
import { defineComponent, ref, computed } from "@vue/composition-api";

export default defineComponent({
  setup(props, context) {
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");

    const formName = computed(() =>
      ref<"sign-in" | "sign-up">(
        context.root.$route.path === "/sign-in" ? "sign-in" : "sign-up"
      )
    );

    return {
      email,
      password,
      confirmPassword,
      formName
    };
  }
});
</script>