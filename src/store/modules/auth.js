import authApi from "@/api/auth";
import { setItem } from "@/helpers/persistanceStorage";

const state = {
  isLoading: false,
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null,
};

export const mutationTypes = {
  registerStart: "[auth] registerStart",
  registerSuccess: "[auth] registerSuccess",
  registerFailure: "[auth] registerFailure",

  loginStart: "[auth] loginStart",
  loginSuccess: "[auth] loginSuccess",
  loginFailure: "[auth] loginFailure",

  logout: "[auth] logout",

  getCurrentUserStart: "[auth] getCurrentUserStart",
  getCurrentUserSuccess: "[auth] getCurrentUserSuccess",
  getCurrentUserFailure: "[auth] getCurrentUserFailure",

  updateCurrentUserStart: "[auth] updateCurrentUserStart",
  updateCurrentUserSuccess: "[auth] updateCurrentUserSuccess",
  updateCurrentUserFailure: "[auth] updateCurrentUserFailure",
};

export const actionTypes = {
  register: "[auth] register",
  login: "[auth] login",
  logout: "[auth] logout",
  getCurrentUser: "[auth] getCurrentUser",
  updateCurrentUser: "[auth] updateCurrentUser",
};

export const getterTypes = {
  currentUser: "[auth] currentUser",
  isLoggedIn: "[auth] isLoggedIn",
  isAnonymous: "[auth] isAnonymous",
};

const getters = {
  [getterTypes.currentUser]: (state) => state.currentUser,
  [getterTypes.isLoggedIn]: (state) => !!state.isLoggedIn,
  [getterTypes.isAnonymous]: (state) => state.isLoggedIn === false,
};

const mutations = {
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },

  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },

  [mutationTypes.registerFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },

  [mutationTypes.loginStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },

  [mutationTypes.loginSuccess](state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },

  [mutationTypes.loginFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },

  [mutationTypes.getCurrentUserStart](state) {
    state.isLoading = true;
  },

  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.isLoading = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },

  [mutationTypes.getCurrentUserFailure](state) {
    state.isLoading = false;
    state.isLoggedIn = false;
    state.isCurrentUser = null;
  },

  [mutationTypes.updateCurrentUserStart]() {},
  [mutationTypes.updateCurrentUserSuccess](state, payload) {
    state.currentUser = payload;
  },
  [mutationTypes.updateCurrentUserFailure]() {},

  [mutationTypes.logout](state) {
    state.currentUser = null;
    state.isLoggedIn = false;
  },
};

const actions = {
  [actionTypes.register](context, credentials) {
    context.commit(mutationTypes.registerStart);
    return new Promise((resolve) => {
      authApi
        .register(credentials)
        .then((response) => {
          context.commit(mutationTypes.registerSuccess, response.data.user);
          resolve(response.data.user);
        })
        .catch(() => {
          context.commit(mutationTypes.getCurrentUserFailure);
        });
    });
  },
  [actionTypes.login](context, credentials) {
    context.commit(mutationTypes.loginStart);
    return new Promise((resolve) => {
      authApi
        .login(credentials)
        .then((response) => {
          context.commit(mutationTypes.loginSuccess, response.data.user);
          setItem("accessToken", response.data.user.token);
          resolve(response.data.user);
        })
        .catch((result) => {
          context.commit(
            mutationTypes.loginFailure,
            result.response.data.errors
          );
        });
    });
  },
  [actionTypes.logout](context) {
    return new Promise((resolve) => {
      setItem("accessToken", "");
      context.commit(mutationTypes.logout);
      resolve();
    });
  },
  [actionTypes.getCurrentUser](context) {
    context.commit(mutationTypes.getCurrentUserStart);
    return new Promise((resolve) => {
      authApi
        .getCurrentUser()
        .then((response) => {
          context.commit(
            mutationTypes.getCurrentUserSuccess,
            response.data.user
          );
          setItem("accessToken", response.data.user.token);
          resolve(response.data.user);
        })
        .catch((result) => {
          context.commit(
            mutationTypes.getCurrentUserFailure,
            result.response.data.errors
          );
        });
    });
  },
  [actionTypes.updateCurrentUser](context, { currentUserInput }) {
    context.commit(mutationTypes.updateCurrentUserStart);
    return new Promise((resolve) => {
      authApi
        .updateCurrentUser(currentUserInput)
        .then((user) => {
          context.commit(mutationTypes.updateCurrentUserSuccess, user);
          resolve(user);
        })
        .catch((result) => {
          context.commit(
            mutationTypes.updateCurrentUserFailure,
            result.response.data.errors
          );
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
