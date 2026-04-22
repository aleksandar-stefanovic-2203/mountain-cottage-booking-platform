export class User {
    username: string = ""
    password: string = ""
    firstName: string = ""
    lastName: string = ""
    gender: string = "мушки"
    address: string = ""
    phoneNumber: string = ""
    email: string = ""
    profilePicture: File | null = null
    profilePictureBytes: string | null = null
    creditCardNumber: string = ""
    type: string = "туриста"
    status: string = "непознат"
}