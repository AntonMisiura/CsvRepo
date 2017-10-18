export namespace UserModels{

export interface LoginResponse{
    jwtToken: string;
    userName: string;
}
export class User{
    constructor(UserName?: string, JWTToken?: string, Email?:string, UserID?: string){
        this.userName = UserName;
        this.jwtToken = JWTToken;
        this.email = Email;
        this.userID = UserID;
        
    }
    userName: string;
    jwtToken: string;
    email: string;
    isLoggedIn?: boolean;
    userID: string;

}
export let LoginTypes = {
    login: "login",
    register: "register",
    facebook: "facebook",
    google: "google"
}
export class ExternalUser{
    id: string;
    name: string;
    email:string;
    token:string;
    loginType: string;
    
    constructor(Id, Name, Email, Token, LoginType) {
        this.id = Id;
        this.email = Email;
        this.name = Name;
        this.token = Token;
        this.loginType = LoginType;
    }
}
}





