<template>
  <nav class="nav1 grid">
    <input
      class="nav1__find"
      type="text"
      placeholder="Введите текст для поиска"
      v-model="strFind"
      @input="seekPost"
    />
    <article
      class="nav1__href"
      v-for="(post, index) in listPost"
      :key="index"
      @click="$emit('selPost', post._id)"
    >
      {{ post.textPost }}
    </article>
  </nav>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  emits: ["selPost"],
  data() {
    return {
      strFind: "",
    };
  },
  computed: { ...mapGetters("Post", { listPost: "list_post" }) },
  methods: {
    ...mapActions("Post", {
      getListPosts: "get_list_posts",
      findPost: "find_post",
    }),
    seekPost() {
      if (this.strFind.length > 0 && !!this.strFind.trim()) {
        var finalStrFind = this.strFind.trim();
        // console.log(`dddd:${finalStrFind}`);
        this.findPost({ findstr: finalStrFind });
      } else if (this.strFind.length == 0) {
        // console.log("длинна ноль");
        this.getListPosts();
      }
    },
  },
  created() {
    this.getListPosts();
  },
};
</script>
<style lang="scss" scoped>
.nav1 {
  padding: 10px 20px;
  grid-row-gap: 10px;
}
.nav1__href {
  padding: 20px;
  text-align: justify;
  cursor: pointer;
  @include br(5px);
  background-color: $gray_color_lighter;
  &:hover {
    background-color: $gray_color_lighter_href;
  }
  &:active {
    background-color: $gray_color_active_href;
  }
}
.nav1__find {
  outline: none;
  width: 100%;
  @include br(5px);
  border: 2px solid $gray_color_light;
  padding: 20px;
  box-sizing: border-box;
  font-size: 16px;
  &:focus {
    border: 2px solid black;
  }
}
</style>