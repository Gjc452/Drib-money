<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
    <div class="notes">
      <FormItem field-name="备注" :value.sync="record.notes" placeholder="在这里输入备注"/>
    </div>
    <Tags :value.sync="record.tags"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/NumberPad.vue';
import FormItem from '@/components/FormItem.vue';
import Tags from '@/components/Tags.vue';
import {Component} from 'vue-property-decorator';
import store2 from '@/store/index';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';

@Component({
  components: {Tabs, Tags, FormItem, NumberPad},
})
export default class Money extends Vue {
  recordTypeList = recordTypeList;
  record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};

  get count() {
    return store2.state.recordList;
  }

  created() {
    this.$store.commit('fetchRecords');
  }

  saveRecord() {
    if (this.record.tags.length === 0) {
      window.alert('请至少选择一个标签');
    } else if (this.record.amount === 0) {
      window.alert('金额不能为0');
    } else {
      this.$store.commit('createRecord', this.record);
      this.record.notes = '';
    }
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.notes {
  padding: 12px 0;
}
</style>