export default interface IUserModel {
    id?: string
    username: string
    password: string
    salt: string
    token?: string
}