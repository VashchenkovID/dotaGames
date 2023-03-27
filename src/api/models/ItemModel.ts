export interface ItemModel {
  hint: string[];
  id: number;
  img: string;
  dname: string;
  qual: string;
  cost: number;
  notes: string;
  attrib: {
    key: string;
    header: string;
    value: string;
    footer: string;
  }[];
  mc: number;
  cd: number;
  lore: string;
  components: string[];
  created: boolean;
  charges: boolean;
}
