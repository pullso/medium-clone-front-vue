<template>
  <div class="home-page">
    Banner
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <app-feed :api-url="apiUrl" />
        </div>
        <div class="col-md-3">Popular tags</div>
      </div>
    </div>
  </div>
</template>

<script>
import AppFeed from "@/components/Feed";

export default {
  name: "AppGlobalFeed",
  data() {
    return {
      apiUrl: "/articles",
    };
  },
  components: {
    AppFeed,
  },
};
</script>
