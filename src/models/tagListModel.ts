import createId from '@/lib/createId';

const tagListKeyName = 'tagList';
type Tag = {
  id: string;
  name: string;
}
type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => 'duplicated' | 'success';
  save: () => void;
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
  remove: (id: string) => boolean;
}
const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(tagListKeyName) || '[]');
    return this.data;
  },
  create(name) {
    const names = this.data.map(item => item.name);
    const id = createId()
    if (names.indexOf(name) >= 0) {
      return 'duplicated';
    }
    this.data.push({id: id.toString(), name: name});
    this.save();
    return 'success';
  },
  remove(id) {
    const idList = this.data.map(item => item.id);
    const index = idList.indexOf(id);
    this.data.splice(index, 1);
    this.save();
    return true
  },
  save() {
    window.localStorage.setItem(tagListKeyName, JSON.stringify(this.data));
  },
  update(id, name) {
    const idList = this.data.map(item => item.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.data.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        return 'duplicated';
      } else {
        const tag = this.data.filter(item => item.id === id)[0];
        tag.name = name;
        this.save();
        return 'success';
      }
    } else {
      return 'not found';
    }
  }
};
export default tagListModel;