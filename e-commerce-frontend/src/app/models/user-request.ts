export interface UserRequest {
  name: string,
  email: string,
  username: string,
  password: string,
  phone: string,
  role: 'USER' | 'ADMIN'
}
