import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './page/main.component';


const routes: Routes = [
    {
        path: '',  component: MainComponent
    },
    {
        path: ':listId',  component: MainComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class MainRoutingModule {

}