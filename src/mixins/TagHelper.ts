import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export class TagHelper extends Vue {
  createTag() {
    const name = window.prompt('请输入需要添加的标签');
    this.$store.commit('createTag', name);
  }
}