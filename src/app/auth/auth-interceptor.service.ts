import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {exhaustMap, take} from "rxjs/operators";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // takes subscribes only ones
    // exhaustMap chains the observables (returns observable)
    // after that we can execute the map and tap operator
    return this.authService.user
      .pipe(
        take(1),
        exhaustMap(user => {
          // if there is no login user we resend the request
          if(!user){
            return next.handle(req);
          }
          let params = new HttpParams();
          params = params.set('auth', user.token);
          const modifiedReq = req.clone(
            {params: params}
          )
          return next.handle(modifiedReq);
        }));
  }

}
