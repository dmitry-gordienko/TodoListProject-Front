import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthModule } from './modules/auth/auth.module';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule)
    },
    {
        path: 'main',
        loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule)
    },

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
        AuthModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }