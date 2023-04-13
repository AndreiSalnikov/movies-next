import {useContext} from 'react';
import {CurrentUserContext} from "@/hoc/CurrentUserProvider";

export function useAuth() {
  return useContext(CurrentUserContext);
}
