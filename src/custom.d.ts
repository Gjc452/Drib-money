type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createAt?: Date;
}
type Tag = {
  id: string;
  name: string;
}

interface Window {
  tagList: Tag[];
}