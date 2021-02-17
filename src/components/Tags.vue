<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li @click="toggle(tag)" v-for="tag in tags"
          :key="tag" :class="{selected:value.indexOf(tag)>=0}">{{ tag }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';

tagListModel.fetch();
@Component
export default class Tags extends Vue {
  @Prop(Array) readonly value!: string[];
  tags = tagListModel.data;

  toggle(tag: string) {
    const index = this.value.indexOf(tag);
    if (index < 0) {
      this.value.push(tag);
    } else {
      this.value.splice(index, 1);
    }
    this.$emit('update:value', this.value);
  }

  createTag() {
    const name = window.prompt('请输入需要添加的标签');
    if (name === '') {
      window.alert('标签名不能为空');
    } else if (name) {
      const message = tagListModel.create(name);
      if (message === 'duplicated') {
        window.alert('标签名已存在');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;

  > .current {
    display: flex;
    flex-wrap: wrap;
    overflow: auto;

    li {
      $h: 24px;
      $bg: #d9d9d9;
      background: $bg;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 8px;

      &.selected {
        background: darken($bg, 16%);
      }
    }
  }

  > .new {
    padding-top: 16px;

    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>