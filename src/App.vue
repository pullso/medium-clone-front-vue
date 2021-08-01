<template>
  <app-topbar />
  <router-view />
</template>

<script>
import AppTopbar from "@/components/Topbar";
import { actionTypes } from "@/store/modules/auth";

export default {
  name: "App",
  mounted() {
    this.$store.dispatch(actionTypes.getCurrentUser);
  },
  components: {
    AppTopbar,
  },
};
</script>
