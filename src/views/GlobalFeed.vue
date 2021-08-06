<template>
  <div class="home-page">
    Banner
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <app-feed :api-url="apiUrl" />
        </div>
        <div class="col-md-3">
          <app-popular-tags />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppFeed from "@/components/Feed";
import AppPopularTags from "@/components/PopularTags";

export default {
  name: "AppGlobalFeed",
  data() {
    return {
      apiUrl: "/articles",
    };
  },
  components: {
    AppPopularTags,
    AppFeed,
  },
};
</script>
