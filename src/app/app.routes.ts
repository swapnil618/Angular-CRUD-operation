import { Routes, RouterModule} from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { DetailsComponent } from './components/details/details.component';
import { ListComponent } from './components/list/list.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path:'books',component:ListComponent},
    {path:'books/:id',component:DetailsComponent},
    {path:'add',component:CreateComponent},
    {path:'**', redirectTo:'books',pathMatch:'full'}


];
@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})


export class AppRoutingModule{}
