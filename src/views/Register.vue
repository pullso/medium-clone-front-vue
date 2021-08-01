<template>
  <div class="auth-page">
    <div class="container-page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <div class="text-xs-center">Sign Up</div>
          <p class="text-xs-center">
            <router-link :to="{ name: 'login' }">Have an account?</router-link>
          </p>
          <app-validation-errors
            v-if="validationErrors"
            :validation-errors="validationErrors"
          />
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                type="text"
                placeholder="Username"
                v-model="username"
                class="form-control form-control-lg"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                type="text"
                v-model="email"
                placeholder="Email"
                class="form-control form-control-lg"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                type="password"
                v-model="password"
                placeholder="Password"
                class="form-control form-control-lg"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="isSubmitting"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppValidationErrors from "@/components/ValidationErrors";
import { actionTypes } from "@/store/modules/auth";
import { mapState } from "vuex";

export default {
  name: "AppRegister",
  data() {
    return {
      email: "",
      password: "",
      username: "",
    };
  },
  components: {
    AppValidationErrors,
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.auth.isSubmitting,
      validationErrors: (state) => state.auth.validationErrors,
    }),
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(actionTypes.register, {
          email: this.email,
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ name: "globalFeed" });
        });
    },
  },
};
</script>
