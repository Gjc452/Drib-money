import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined
  } as RootState,
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    createRecord(state, record: RecordItem) {
      const record2: RecordItem = clone(record);
      record2.createAt = new Date().toISOString();
      state.recordList.push(clone(record2));
      store.commit('saveRecords');
      window.alert('创建成功');
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if (!state.tagList || state.tagList.length === 0) {
        store.commit('createTag', '衣');
        store.commit('createTag', '食');
        store.commit('createTag', '住');
        store.commit('createTag', '行');
      }
    },
    createTag(state, name: string | null) {
      if (name === '') {
        window.alert('标签名不能为空');
      } else if (name) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert('标签名已存在');
        } else {
          const id = createId();
          state.tagList.push({id: id.toString(), name: name});
          store.commit('saveTags');
        }
      }
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0];
    },
    updateTag(state, payload: { id: string; name: string }) {
      const {id, name} = payload;
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert('标签已重复');
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit('saveTags');
        }
      }
    },
    removeTag(state, id: string) {
      const idList = state.tagList.map(item => item.id);
      const index = idList.indexOf(id);
      state.tagList.splice(index, 1);
      store.commit('saveTags');
    }
  },
});
export default store;