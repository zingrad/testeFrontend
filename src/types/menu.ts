export type SubMenu = {
  id: number;
  name: string;
};

export type Menu = {
  id: number;
  name: string;
  subMenus: SubMenu[];
};
