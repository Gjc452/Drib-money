import createId from '@/lib/createId';

const tagListKeyName = 'tagList';

const tagStore = {
  tagList: [] as Tag[],
  fetchTags() {
    this.tagList = JSON.parse(window.localStorage.getItem(tagListKeyName) || '[]');
    return this.tagList;
  },
  createTag(name: string | null) {
    if (name === '') {
      window.alert('标签名不能为空');
    } else if (name) {
      const names = this.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        return window.alert('标签名已存在');
      }
      const id = createId();
      this.tagList.push({id: id.toString(), name: name});
      this.saveTags();
      return 'success';
    }
  },
  removeTag(id: string) {
    const idList = this.tagList.map(item => item.id);
    const index = idList.indexOf(id);
    this.tagList.splice(index, 1);
    this.saveTags();
    return true;
  },
  updateTag(id: string, name: string) {
    const idList = this.tagList.map(item => item.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        return 'duplicated';
      } else {
        const tag = this.tagList.filter(item => item.id === id)[0];
        tag.name = name;
        this.saveTags();
        return 'success';
      }
    } else {
      return 'not found';
    }
  },
  findTag(id: string) {
    return this.tagList.filter(t => t.id === id)[0];
  },
  saveTags() {
    window.localStorage.setItem(tagListKeyName, JSON.stringify(this.tagList));
  }
};
tagStore.fetchTags();
export default tagStore;