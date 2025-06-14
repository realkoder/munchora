import { atom } from "jotai";
import type { ILoginResponse } from "~/types/user.interface";

export const userLoginAtom = atom<ILoginResponse | null>();