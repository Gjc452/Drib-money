const tagListKeyName = 'tagList';
type TagListModel = {
  data: string[];
  fetch: () => string[];
  create: (name: string) => 'duplicated' | 'success';
  save: () => void;
}
const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(tagListKeyName) || '["衣","食","住","行"]');
    return this.data;
  },
  create(name) {
    if (this.data.indexOf(name) >= 0) {
      return 'duplicated';
    }
    this.data.push(name);
    this.save;
    return 'success';
  },
  save() {
    window.localStorage.setItem(tagListKeyName, JSON.stringify(this.data));
  }
};
export default tagListModel;