<template>
  <div>
    <form class="form">
      <!-- <header class="form__header">Форма Редактирования Сообщения</header> -->
      <textarea
        class="form__textarea"
        v-model="textPost"
        @keyup="validateInput"
      ></textarea>

      <section class="grid form__btnsection">
        <div @click="resetChangesPost" class="btn" v-if="hasChanges">
          Отменить
        </div>
        <div @click="saveChangesPost" class="btn" v-if="hasChanges">
          Сохранить
        </div>

        <div @click="delPost" class="btn">Удалить</div>
      </section>
    </form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["idPost"],
  data() {
    return {
      textPost: null,
      hasChanges: false,
    };
  },
  methods: {
    ...mapActions("Post", {
      getSelectedPost: "get_selected_post",
      saveIzmPost: "save_izm_post",
      deletePost: "del_post",
    }),
    delPost() {
      this.deletePost({ idPost: this.idPost });
    },
    validateInput() {
      // console.log(this.$refs.btnsection.value.length);
      // console.log(!!this.$refs.btnsection.value.trim());

      if (
        // this.textPost.length > 0 &&
        !!this.textPost.trim() &&
        this.textPost != ""
      ) {
        //   this.$refs.btnsection.value[0] != ""
        //   //   this.$refs.btnsection.value === ""
        // )
        console.log("не пусто");
        this.hasChanges = true;
      } else {
        console.log("пусто");
        this.hasChanges = false;
      }
    },
    resetChangesPost() {
      this.textPost = this.selectedPost.textPost;
    },
    saveChangesPost() {
      this.saveIzmPost({ textPost: this.textPost, idPost: this.idPost });
    },
  },
  computed: { ...mapGetters("Post", { selectedPost: "selected_post" }) },

  async created() {
    await this.getSelectedPost({ idPost: this.idPost });
    let selPost = { ...this.selectedPost };
    this.textPost = selPost.textPost;
  },

  mounted() {},
};
</script>

<style lang="scss" scoped>
.form {
  box-sizing: border-box;
  padding: 20px;
}
.form__header {
  padding: 20px;
}
.form__textarea {
  font-size: 16px;
  outline: none;
  padding: 20px;
  width: 100%;
  height: 30vh;
  resize: none;
  border: 2px solid $gray_color_light;
  @include br(5px);
  box-sizing: border-box;
  &:focus {
    border: 2px solid black;
  }
}

.form__btnsection {
  padding: 20px;
  grid-template-columns: auto auto auto;
  grid-column-gap: 10px;
  justify-content: end;
  align-content: end;
  justify-items: center;
  align-items: center;
}
</style>