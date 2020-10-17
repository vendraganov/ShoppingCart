export class UserModel{

  private id: string;
  private email: string;
  private readonly _token: string;
  private readonly _tokenExpirationData: Date;


  constructor(id: string, email: string, token: string, tokenExpirationData: Date) {
    this.id = id;
    this.email = email;
    this._token = token;
    this._tokenExpirationData = tokenExpirationData;
  }

  get token(): string {
    if(!this._tokenExpirationData || new Date > this._tokenExpirationData){
      return null;
    }
    return this._token;
  }
}
