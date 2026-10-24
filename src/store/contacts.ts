import { create } from "zustand";
import { axiosRequest } from "../token/token";
export interface Contact {
  id: string;
  name: string;
  phone?: string | null;
  note?: string | null;
  email?: string | null;
  folder_id?: string | null;
}
export interface Folder {
  id: string;
  name: string;
  color?: string;
}
interface ContactStore {
  contacts: Contact[];
  folders: Folder[];
  getContacts: () => Promise<void>;
  getFolders: () => Promise<void>;
}
export const useContactStore = create<ContactStore>((set) => ({
  contacts: [],
  folders: [],
  getContacts: async () => {
    const { data } = await axiosRequest.get("/api/contacts");
    set({ contacts: data });
  },
  getFolders: async () => {
    const { data } = await axiosRequest.get("/api/folders");
    set({ folders: data });
  },
}));
