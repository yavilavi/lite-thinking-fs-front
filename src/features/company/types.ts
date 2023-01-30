export interface ICompany {
  NIT: string;
  name: string;
  address: string;
  phone: string;
  items: IItem[];

  isDeleted: boolean;
}


export interface IItem {
  id: number;
  name: string;
  companyNIT: string
  stock: number;

  company: ICompany;
}

export interface ICreateCompany extends Omit<Omit<ICompany, "isDeleted">, "items"> {

}

export interface ICreateItem extends Omit<Omit<IItem, "id">, "company"> {
}
