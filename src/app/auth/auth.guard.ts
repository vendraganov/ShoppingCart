import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {map, take} from "rxjs/operators";

@Injectable({providedIn: "root"})
export class AuthGuard implements CanActivate{

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // this is user observable and we convert it to boolean as we checking if the user is null or not
    return this.authService.user.pipe(take(1), map(user=>{
      const isAuth = !!user;
      // if we have authenticated user we return true else
      // we create tne url tree and passing the url which will be use for redirect
      if(isAuth){
        return true;
      }
      return this.router.createUrlTree(['/auth']);
    }));
  }
}
