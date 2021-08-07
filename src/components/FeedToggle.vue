<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li class="nav-item" v-if="isLoggedIn">
        <router-link :to="{ name: 'yourFeed' }" class="nav-link">
          Your feed
        </router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: 'globalFeed' }" class="nav-link">
          Global feed
        </router-link>
      </li>
      <li class="nav-item" v-if="tagName">
        <router-link :to="{ name: 'tag' }" class="nav-link">
          <i class="ion-pound" />
          {{ tagName }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getterTypes } from "@/store/modules/auth";

export default {
  name: "AppFeedToggle",
  props: {
    tagName: {
      type: String,
      required: false,
    },
  },
  computed: {
    ...mapGetters({
      isLoggedIn: getterTypes.isLoggedIn,
    }),
  },
};
</script>
