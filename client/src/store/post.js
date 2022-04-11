import axios from "axios";
export default {
  namespaced: true,
  state: () => ({
    listPost: null,
    selectedPost: null,
  }),

  getters: {
    list_post: (state) => state.listPost,
    selected_post: (state) => state.selectedPost,
  },
  mutations: {
    setlistpost(state, payload) {
      state.listPost = payload.listPost;
      console.log(state.listPost);
    },
    setselectedpost(state, payload) {
      state.selectedPost = payload.selectedPost;
      console.log("1");
      console.log(state.selectedPost);
    },
    cancelselectedpost(state) {
      state.selectedPost = null;
    },
  },

  actions: {
    async get_list_posts({ commit }) {
      let result = await axios.get("/api/post/list");
      let lp = result.data.listPost;
      console.log(lp);
      commit("setlistpost", { listPost: lp });
    },

    async add_post({ dispatch }, payload) {
      console.log(payload.textPost);
      let result = await axios.post("/api/post/add", {
        textPost: payload.textPost,
      });

      if (result.status == 200) {
        console.log("Сообщение успешно добавлено в базу");
        dispatch("get_list_posts");
      }
      ///////
      console.log(result.data);
      dispatch("get_list_posts");
    },
    async del_post({ dispatch, commit }, payload) {
      console.log("удаление сообщения!!!");
      let result = await axios.delete(`/api/post/delete/${payload.idPost}`);
      console.log(result);
      if (result.status == 200) {
        console.log(result.data.message);
        commit("cancelselectedpost");
        dispatch("get_list_posts");
      }
    },
    async get_selected_post({ commit }, payload) {
      console.log(payload.idPost);
      let result = await axios.get(`/api/post/list/${payload.idPost}`);
      console.log("Выбранное сообщение:");
      console.log(result.data);
      commit("setselectedpost", {
        selectedPost: result.data.post,
      });
    },

    async save_izm_post({ dispatch }, payload) {
      await axios.put(`/api/post/change/${payload.idPost}`, {
        textPost: payload.textPost,
      });
      dispatch("get_selected_post", { idPost: payload.idPost });
      dispatch("get_list_posts");
    },
    async find_post({ commit }, payload) {
      console.log(payload.findstr);
      let result = await axios.get(`/api/post/find?findstr=${payload.findstr}`);
      console.log(result.data);
      commit("setlistpost", { listPost: result.data.filteredListPost });
    },
  },
};
