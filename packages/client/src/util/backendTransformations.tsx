import { UserBase } from '../helpers/auth'

export const transformBackendUserToUserBase = (user: BackendUser): UserBase => {
  const { birthdate, direction, dni, email, first_name, id, last_name, password } = user
  return {
    birthdate,
    last_name,
    first_name,
    id,
    userID: id,
    email,
    direction,
    dni,
    password,
  }
}