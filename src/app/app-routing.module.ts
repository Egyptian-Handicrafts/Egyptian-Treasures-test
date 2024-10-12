import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { PaymentComponent } from './component/payment/payment.component';
import { AddProductComponent } from './component/add-product/add-product.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { UsersComponent } from './component/users/users.component';
import { ProductsComponent } from './component/products/products.component';
import { NotFondComponent } from './component/not-fond/not-fond.component';





import { EditProfileComponent } from './component/edit-profile/edit-profile.component';
import { CartComponent } from './component/cart/cart.component';




import { DashHomeComponent } from './component/dashboard/dash-home/dash-home.component';
import { ProductListComponent } from './component/dashboard/product-list/product-list.component';
import { UserAddComponent } from './component/dashboard/user-add/user-add.component';
import { EditProductComponent } from './component/dashboard/edit-product/edit-product.component';
import { authChildGuard, authGuardGuard } from './guards/guards/auth.guard';




const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "payment", component: PaymentComponent },
  { path: "add-prouduct", component: AddProductComponent ,  canActivate: [authGuardGuard] },
  { path: "product/:id", component: ProductDetailsComponent },
  {
    path: 'Users',
    canActivateChild: [authChildGuard],
    children: [
      { path: 'add-product', component: AddProductComponent },
      { path: 'cart', component: CartComponent }
    ]
  },
  { path: "users", component: UsersComponent },
  {path:"cart",component:CartComponent},
  { path: "products", component: ProductsComponent },



  { path: "dash-bode", component: DashHomeComponent },
  { path: "product-list", component: ProductListComponent },
  { path: "user-add", component: UserAddComponent },
  { path: "edit-product", component: EditProductComponent },





  { path: "edit-profile", component: EditProfileComponent},
  { path: "**", component: NotFondComponent },
  { path: "", component: NotFondComponent },


  { path: "cart", component: CartComponent, canActivate: [authGuardGuard] },

  { path: "edit-profile", component: EditProfileComponent},



  { path: "**", component: NotFondComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
