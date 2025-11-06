export interface LoginParams {
  username: string
  password: string
}

export interface LoginResponseType {
  user: {
    token: string
  }
  message: string
}

export interface RegisterParams {
  username: string
  phone: string
  password: string
  confirmPassword: string
}

export interface RegisterResponseType {
  message: string
}
