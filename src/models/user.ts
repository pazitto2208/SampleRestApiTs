export default interface IUserModel {
    _id?: string
    username: string
    password: Buffer | string
    salt: Buffer | string
    token?: string
}