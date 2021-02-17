<template>
  <div>
    <label class="notes">
      <span class="name">备注</span>
      <input v-model="value" type="text" placeholder="在这里输入备注">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Notes extends Vue {
  value = '';
}
</script>

<style lang="scss" scoped>
.notes {
  background: #f5f5f5;
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;

  .name {
    padding-right: 16px;
  }

  input {
    height: 64px;
    border: none;
    flex-grow: 1;
    background: transparent;
    padding-right: 16px;
  }
}
</style>