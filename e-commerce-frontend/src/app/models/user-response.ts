import {Address} from "./address";

export interface UserResponse {
  id: string,
  name: string,
  email?: string,
  username: string,
  password: string,
  phone: string,
  role: string,
  addresses: Address[] | null
}
