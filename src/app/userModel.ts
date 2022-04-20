import Role from './enum'
export class User {


    id!: number
    firstname!: string
    middlename?: string;
    lastname!: string
    email!: string
    phone!: string
    role!: Role;
    address!: string

}