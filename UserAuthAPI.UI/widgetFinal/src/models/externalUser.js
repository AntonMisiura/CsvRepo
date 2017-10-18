export class ExternalUser{
    
    constructor(Id, Name, Email, Token, StartDate, EndDate, LoginType) {
        this.id = Id;
        this.email = Email;
        this.userName = Name;
        this.token = Token;
        this.loginType = LoginType;
        this.startDate = StartDate;
        this.endDate = EndDate;
    }
}