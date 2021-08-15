<template>
  <app-loading v-if="isLoading" />
  <app-article-form
    v-if="initialValues"
    :initial-values="initialValues"
    :errors="validationErrors"
    :is-submitting="isSubmitting"
    @articleSubmit="onSubmit"
  />
</template>

<script>
import AppArticleForm from "@/components/ArticleForm";
import AppLoading from "@/components/Loading";
import { mapState } from "vuex";
import { actionTypes } from "@/store/modules/editArticle";

export default {
  name: "AppEditArticle",
  mounted() {
    this.$store.dispatch(actionTypes.getArticle, {
      slug: this.$route.params.slug,
    });
  },
  computed: {
    ...mapState({
      isSubmitting: (state) => state.editArticle.isSubmitting,
      validationErrors: (state) => state.editArticle.validationErrors,
      isLoading: (state) => state.editArticle.isLoading,
      article: (state) => state.editArticle.article,
    }),
    initialValues() {
      if (!this.article) return null;
      console.log(this.article);
      return {
        title: this.article.title,
        description: this.article.description,
        body: this.article.body,
        tagList: this.article.tagList,
      };
    },
  },
  methods: {
    onSubmit(articleInput) {
      const slug = this.$route.params.slug;
      this.$store
        .dispatch(actionTypes.updateArticle, { slug, articleInput })
        .then((article) => {
          this.$router.push({
            name: "article",
            params: { slug: article.slug },
          });
        });
    },
  },
  components: {
    AppArticleForm,
    AppLoading,
  },
};
</script>
