import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as Tag[]
  },
  mutations: {
    fetchRecords(state) {
      return state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    createRecord(state, record: RecordItem) {
      const record2: RecordItem = clone(record);
      record2.createAt = new Date();
      state.recordList.push(clone(record2));
      console.log(state.recordList);
      store.commit('saveRecords');
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    fetchTags(state) {
      return state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
    },
    createTag(state, name: string | null) {
      if (name === '') {
        window.alert('标签名不能为空');
      } else if (name) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          return window.alert('标签名已存在');
        }
        const id = createId();
        state.tagList.push({id: id.toString(), name: name});
        store.commit('saveTags');
        return 'success';
      }
    },
    saveTags(state) {
       window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    findTag(state, id: string) {
      return state.tagList.filter(t => t.id === id)[0];
    }
  },
});
export default store;