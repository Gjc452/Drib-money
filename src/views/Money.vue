<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <Notes :value.sync="record.notes"/>
    <Tags :value.sync="record.tags"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/NumberPad.vue';
import Types from '@/components/Types.vue';
import Notes from '@/components/Notes.vue';
import Tags from '@/components/Tags.vue';
import {Component, Watch} from 'vue-property-decorator';
import recordListModel from '@/models/recordListModel.ts';

const recordList = recordListModel.fetch();
@Component({
  components: {Tags, Notes, Types, NumberPad}
})
export default class Money extends Vue {
  record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};
  recordList: RecordItem[] = recordList;

  saveRecord() {
    const record2: RecordItem = recordListModel.clone(this.record);
    record2.createAt = new Date();
    this.recordList.push(record2);
  }

  @Watch('recordList')
  onRecordListChange() {
    recordListModel.save(this.recordList);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>