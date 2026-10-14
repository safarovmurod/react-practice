import axios from "axios";
import { atomWithRefresh, unwrap } from "jotai/utils";
import { api } from "../api/api";
import { atom } from "jotai";

type User = {
  id: string;
  name: string;
  img: string;
  job: string;
  desc: string;
};

export const getData = atomWithRefresh(async (get) => {
    try {
      const { data } = await axios.get<User[]>(get(api));
      return data
  } catch (error) {
    console.error(error); 
  }
});

export const DeleteAtom = atom(null, async (get, set, id: string) => {
    try {
        await axios.delete(`${get(api)}/${id}`);
        set(getData);
    } catch (error) {
        console.error(error);
    }
});


export const unwapAtom =unwrap(getData,(prev)=>prev||[])