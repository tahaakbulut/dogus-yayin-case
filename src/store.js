import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const state = {
  sites: [
    { id: 1, title: "Example Site", link: "www.link.com", vote: 0, page: 1 },
  ],
  currentPage: 1,
};
const getters = {
  getSites(state) {
    return state.sites;
  },
  getCurrentPage(state) {
    return state.currentPage;
  },
};
const mutations = {
  getLocalSites(state) {
    const data = JSON.parse(localStorage.getItem("sites"));
    data && (state.sites = data);
  },
  addSite(state, payload) {
    const sitesIds = state.sites.map((e) => e.id);
    state.sites.push({
      id: Math.max(...sitesIds) + 1,
      ...payload,
      vote: 0,
      page: parseInt(sitesIds.length / 5) + 1,
    });
    localStorage.setItem("sites", JSON.stringify(state.sites));
  },
  removeSite(state, id) {
    const siteIndex = state.sites.findIndex((site) => site.id == id);
    siteIndex > -1 && state.sites.splice(siteIndex, 1);
    localStorage.setItem("sites", JSON.stringify(state.sites));
  },
  updateVote(state, payload) {
    state.sites.find((site) => site.id == payload.id).vote = payload.vote;
    localStorage.setItem("sites", JSON.stringify(state.sites));
  },
  sortLinks(state, params) {
    const shortLink = state.sites.sort(
      (a, b) => (!params ? a.vote - b.vote : b.vote - a.vote) || b.id - a.id
    );
    state.map = shortLink;
  },
  updateCurrentPage(state, page) {
    state.currentPage = page;
  },
};

const actions = {
  initApp({ commit }) {
    commit("getLocalSites");
  },
  addSite({ commit }, payload) {
    commit("addSite", payload);
  },
  removeSite({ commit }, id) {
    commit("removeSite", id);
  },
  updateVote({ commit }, payload) {
    commit("updateVote", payload);
    commit("sortLinks", true);
  },
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});

export default store;
