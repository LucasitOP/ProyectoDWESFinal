import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RoleService } from '../services/role.service';
import { map, tap } from 'rxjs/operators';

export const staffGuard: CanActivateFn = () => {
  const roleService = inject(RoleService);
  const router = inject(Router);

  return roleService.isStaff().pipe(
    tap(isStaff => {
      if (!isStaff) {
        router.navigate(['/']);
      }
    })
  );
};
