<template>
  <section class="grid conteiner">
    <header class="grid conteiner__header">
      <div @click="openFormAddPost" class="btn">Добавить сообщение</div>
    </header>
    <section class="grid conteiner__content">
      <section class="navigation">
        <nav-menu @selPost="selectedPost"></nav-menu>
      </section>
      <section class="form">
        <component
          :is="curentComponent"
          :idPost="idPost"
          :key="idPost"
        ></component>
      </section>
    </section>
    <!-- <footer class="conteiner__footer">footer</footer> -->
  </section>
</template>
<script>
import FormAdd from "@/components/FormAdd";
import FormEdit from "@/components/FormEdit";
import NavMenu from "@/components/NavMenu";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      curentComponent: FormAdd,
      idPost: null,
    };
  },
  methods: {
    selectedPost(id) {
      console.log("hhhhhhhhhhhh");
      this.curentComponent = FormEdit;
      this.idPost = id;
    },
    openFormAddPost() {
      this.curentComponent = FormAdd;
    },
  },
  computed: { ...mapGetters("Post", { selected_post: "selected_post" }) },
  watch: {
    selected_post: function (val) {
      if (val == null) {
        this.curentComponent = FormAdd;
      } else {
        this.curentComponent = FormEdit;
      }
    },
  },

  components: {
    FormAdd,
    FormEdit,
    NavMenu,
  },
};
</script>
<style lang="scss">
.conteiner {
  font-family: "OpenSans-Regular";

  height: 100vh;
  grid-template-rows: 100px auto;
  border: 0px solid red;
}
.conteiner__header {
  padding: 20px;
  grid-template-columns: auto auto;
  grid-column-gap: 10px;
  justify-content: end;
  align-content: end;
  justify-items: center;
  align-items: center;
}
.btn {
  @include no_selection;
  padding: 10px 20px;
  @include br(5px);
  cursor: pointer;
  color: #fff;
  background-color: $gray_color_light;
  &:hover {
    background-color: $gray_color;
  }
  &:active {
    background-color: $gray_color_active;
  }
}
.conteiner__footer {
  border: 0px solid green;
  background-color: $gray_color;
}
.conteiner__content {
  grid-template-columns: 1fr 1fr;
  .navigation {
    // overflow: auto;
    // height: calc(100vh - 200px);
  }
  .form {
    box-sizing: border-box;
  }
}
</style>
