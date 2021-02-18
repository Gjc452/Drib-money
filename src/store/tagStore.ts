import tagListModel from '@/models/tagListModel';

export default {
  tagList: tagListModel.fetch(),
  createTag: (name: string) => {
    if (name === '') {
      window.alert('标签名不能为空');
    } else if (name) {
      const message = tagListModel.create(name);
      if (message === 'duplicated') {
        window.alert('标签名已存在');
      }
    }
  },
  removeTag: (id: string) => {
    return tagListModel.remove(id);
  },
  updateTag: (id: string, name: string) => {
    return tagListModel.update(id, name);
  },
  findTag(id: string) {
    return this.tagList.filter(t => t.id === id)[0];
  }
};