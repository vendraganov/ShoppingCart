import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AuthModel} from "./auth.model";
import {AuthResponseModel} from "./auth.response.model";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {UserModel} from "./user.model";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Injectable({providedIn: "root"})
export class AuthService {

  user: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(null);

  private errorMessage = 'An unknown error occurred!';
  private signUpUrl: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey;
  private signInUrl: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=ng' + environment.firebaseAPIKey;
  private tokenExpirationTimer: any;
  constructor(private http: HttpClient, private router: Router) {
  }

  signUp(authModel: AuthModel) {
    return this.http.post<AuthResponseModel>(this.signUpUrl, authModel)
      .pipe(catchError(this.handelResponseError), tap(response => {
        this.handelResponseUser(response);
      }));
  }

  signIn(authModel: AuthModel){
    return this.http.post<AuthResponseModel>(this.signInUrl, authModel)
      .pipe(catchError(this.handelResponseError), tap(response=>{
        this.handelResponseUser(response);
      }));
  }

  autoSignIn(){
    const userData: {
    id: string;
    email: string;
    _token: string;
     _tokenExpirationData: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
      return;
    }
    const userModel = new UserModel(userData.id, userData.email, userData._token, new Date(userData._tokenExpirationData));

    if(userModel.token){
      this.user.next(userModel);
      // getting the remind time of the token
      const expirationDuration = new Date(userData._tokenExpirationData).getTime() - new Date().getTime();

    }
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expiration: number){
    this.tokenExpirationTimer = setTimeout(()=>{
      this.logout();
    },expiration);
  }

  private handelResponseUser(data: AuthResponseModel){
    // firebase return string time in seconds. we get the expiration time by
    // creating new Date and getting the current time in milliseconds and adding
    // string which we convert to number (seconds) and multiply by 1000 to convert in milliseconds
    const expirationDate = new Date(new Date().getTime() + +data.expiresIn*1000);
    const userModel = new UserModel(data.localId, data.email, data.idToken, expirationDate);
    console.log(userModel);
    this.user.next(userModel);
    this.autoLogout(+data.expiresIn*1000);
    localStorage.setItem('userData', JSON.stringify(userModel));
  }

  private handelResponseError(errorResponse: HttpErrorResponse){
    if(!errorResponse.error || !errorResponse.error.error){
      return throwError(this.errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_NOT_FOUND': {
        this.errorMessage = 'Invalid Email or Password!';
        break;
      }
      case 'INVALID_PASSWORD': {
        this.errorMessage = 'Invalid Email or Password!';
        break;
      }
      case 'USER_DISABLED': {
        this.errorMessage = ' The user account has been disabled by an administrator.';
        break;
      }
      case 'EMAIL_EXISTS': {
        this.errorMessage = 'This email exist already'
        break;
      }
      case 'OPERATION_NOT_ALLOWED': {
        this.errorMessage = 'The operation is not allowed!'
        break;
      }
      case 'TOO_MANY_ATTEMPTS_TRY_LATER': {
        this.errorMessage = 'Too many attempts to sign up. Please try later!'
        break;
      }
    }
    return throwError(this.errorMessage);
  }
}
