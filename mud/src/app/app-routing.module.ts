import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [ 
  { path: 'login-page', loadChildren: './login-page/login-page.module#LoginPagePageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'load', loadChildren: './load/load.module#LoadPageModule' },
  { path: 'cadastro', loadChildren: './cadastro-user/cadastro-user.module#CadastroUserPageModule' },
  { path: '', loadChildren: './relatorio-semanal/relatorio-semanal.module#RelatorioSemanalPageModule' },
  { path: 'relatorio-crise', loadChildren: './relatorio-crise/relatorio-crise.module#RelatorioCrisePageModule' }
  
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
