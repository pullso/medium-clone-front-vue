<template>
  <div v-if="isLoading">Loading...</div>
  <div v-if="error">Something bad happened</div>
  <div class="sidebar" v-if="popularTags">
    <p>Popular tags</p>
    <div class="tag-list">
      <router-link
        v-for="popularTag in popularTags"
        :key="popularTag"
        :to="{ name: 'tag', params: { slug: popularTag } }"
        class="tag-default tag-pill"
      >
        {{ popularTag }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { actionTypes } from "@/store/modules/tags";
import { mapState } from "vuex";

export default {
  name: "AppPopularTags",
  mounted() {
    this.$store.dispatch(actionTypes.getTags);
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.tags.isLoading,
      error: (state) => state.tags.error,
      popularTags: (state) => state.tags.data,
    }),
  },
};
</script>
