import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, UrlSegment } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanLoad {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): boolean | Observable<boolean> | Promise<boolean> {
    // let isAuth = this.authService.userIsAuthenticated.subscribe((res) => {
    //   if (!res) {
    //     this.router.navigateByUrl('/auth');
    //   }
    // });
    // return isAuth;
    if (!this.authService.userIsAuthenticated) {
      this.router.navigateByUrl("/auth");
    }
    return this.authService.userIsAuthenticated;
    // return true;
  }
}
