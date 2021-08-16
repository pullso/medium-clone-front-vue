import { mutationTypes as authMutationTypes } from "@/store/modules/auth";

const state = {
  isSubmitting: false,
  validationErrors: null,
};

const mutations = {
  [authMutationTypes.updateCurrentUserStart](state) {
    state.validationErrors = null;
    state.isSubmitting = true;
  },
  [authMutationTypes.updateCurrentUserSuccess](state) {
    state.isSubmitting = false;
  },
  [authMutationTypes.updateCurrentUserFailure](state, payload) {
    state.validationErrors = payload;
    state.isSubmitting = false;
  },
};

export default {
  state,
  mutations,
};
