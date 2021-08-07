<template>
  <div class="home-page">
    <app-banner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <app-feed-toggle :tag-name="tagName" />
          <app-feed :api-url="apiUrl" :key="tagName" />
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
import AppFeedToggle from "@/components/FeedToggle";
import AppPopularTags from "@/components/PopularTags";
import AppBanner from "@/components/Banner";

export default {
  name: "AppYourFeed",
  computed: {
    apiUrl() {
      return `/articles?tag=${this.tagName}`;
    },
    tagName() {
      return this.$route.params.slug;
    },
  },
  components: {
    AppBanner,
    AppPopularTags,
    AppFeed,
    AppFeedToggle,
  },
};
</script>
