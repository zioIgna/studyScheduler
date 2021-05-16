import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable, Injector, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "./auth/authentication.service";

@Injectable({
  providedIn: "root",
})
export class ErrorService implements ErrorHandler {
  constructor(private injector: Injector, private zone: NgZone) {}

  handleError(error: Error): void {
    const router = this.injector.get(Router);
    const authService = this.injector.get(AuthenticationService);
    if (error instanceof HttpErrorResponse) {
      console.log(error.status);
    } else {
      console.error("an error occurred here broo: " + error);
    }
    authService.logout();
    this.zone.run(() => {
      router.navigateByUrl("/auth");
    });
  }
}
