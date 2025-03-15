import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { USERS } from './users.routes';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(USERS)],
})
export class UsersModule {}
