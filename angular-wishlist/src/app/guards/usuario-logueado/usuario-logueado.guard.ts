import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioLogueadoGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  CanActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | Promise<boolean | boolean {
    const isLoggedIn = this.authService.isLoggedIN();
    console.log('canActive', isLoggedIn);
    return isLoggedIn;
  }
  
}
