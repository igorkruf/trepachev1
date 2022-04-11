<template>
  <div>
    <form class="form">
      <textarea
        placeholder="Введи сообщение"
        ref="btnsection"
        class="form__textarea"
        v-model="textPost"
        @keyup="validateInput"
      ></textarea>
      <section class="grid form__btnsection" v-if="hasChanges">
        <div @click="cancel" class="btn" ref="btnsection">Сбросить</div>
        <div @click="addPost" class="btn">Принять и добавить в базу</div>
      </section>
    </form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      textPost: "",
      hasChanges: false,
    };
  },
  methods: {
    ...mapActions("Post", { add_post: "add_post" }),
    addPost() {
      this.add_post({ textPost: this.textPost });
      console.log(this.textPost);
    },
    cancel() {
      this.hasChanges = false;
      this.textPost = "";
    },
    validateInput() {
      if (!!this.textPost.trim() && this.textPost != "") {
        console.log("не пусто");
        this.hasChanges = true;
      } else {
        console.log("пусто");
        this.hasChanges = false;
      }
    },
  },
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
  grid-template-columns: auto auto;
  grid-column-gap: 10px;
  justify-content: end;
  align-content: end;
  justify-items: center;
  align-items: center;
}
</style>