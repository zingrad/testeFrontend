import type { Menu } from "../types/menu";
import type { MessageItem } from "../types/item";

const BASE_URL =
  "https://my-json-server.typicode.com/EnkiGroup/DesafioFrontEnd2026Jr";

export async function getMenus(): Promise<Menu[]> {
  const response = await fetch(`${BASE_URL}/menus`);

  if (!response.ok) {
    throw new Error("Não foi possível carregar os menus.");
  }

  return response.json();
}

export async function getItemsBySubMenu(id: number): Promise<MessageItem[]> {
  const response = await fetch(`${BASE_URL}/items/${id}`);

  if (!response.ok) {
    throw new Error("Não foi possível carregar os itens.");
  }

  const data = await response.json();
  const rawItems = data.subMenuItems || [];
  
  return rawItems.map((item: any) => ({
    ...item,
    id: String(item.id),
  }));
}
