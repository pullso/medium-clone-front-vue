import articleApi from "@/api/article";

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const mutationTypes = {
  getArticleStart: "[article] getArticleStart",
  getArticleSuccess: "[article] getArticleSuccess",
  getArticleFailure: "[article] getArticleFailure",
  deleteArticleStart: "[article] deleteArticleStart",
  deleteArticleSuccess: "[article] deleteArticleSuccess",
  deleteArticleFailure: "[article] deleteArticleFailure",
};

export const actionTypes = {
  getArticle: "[article] getArticle",
  deleteArticle: "[article] getArticle",
};

const mutations = {
  [mutationTypes.getArticleStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getArticleFailure](state) {
    state.isLoading = false;
  },
  [mutationTypes.deleteArticleStart]() {},
  [mutationTypes.deleteArticleSuccess]() {},
  [mutationTypes.deleteArticleFailure]() {},
};

const actions = {
  [actionTypes.getArticle](context, { slug }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getArticleStart, slug);
      articleApi
        .getArticle(slug)
        .then((article) => {
          context.commit(mutationTypes.getArticleSuccess, article);
          resolve(article);
        })
        .catch(() => {
          context.commit(mutationTypes.getArticleFailure, slug);
        });
    });
  },
  [actionTypes.deleteArticle](context, { slug }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getArticleStart);
      articleApi
        .deleteArticle(slug)
        .then(() => {
          context.commit(mutationTypes.getArticleSuccess);
          resolve();
        })
        .catch(() => {
          context.commit(mutationTypes.getArticleFailure);
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
