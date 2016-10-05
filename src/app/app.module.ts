import {NgModule, ApplicationRef} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
import { App } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InteralStateType } from './app.service';
import { NoContent } from './no-content';
import { RecipesNewComponent } from "./recipes";
import {ImageService} from "./image.service";
import {RecipesEditComponent} from "./recipes/recipe-edit.component";
import {RecipesByCategoryComponent} from "./recipes/recipes-by-category.component";
import {RecipeService} from "./recipes";
import {ServiceFactory} from "./service.factory";
import {RecipeViewComponent} from "./recipes/recipe-view.component";
import {RecipesListComponent} from "./recipes/recipes-list.component";
import {BeveragesListComponent} from "./beverages/beverages-list.component";
import {BeverageService} from "./recipes/beverage.service";
import {BeverageViewComponent} from "./beverages/beverage-view.component";
import {BeverageEditComponent} from "./beverages/beverage-edit.component";

// Application wide providers
const APP_PROVIDERS = [
    ...APP_RESOLVER_PROVIDERS,
    AppState,
    ImageService,
    { provide: RecipeService, useClass: ServiceFactory.getRecipeService() },
    { provide: BeverageService, useClass: ServiceFactory.getBeverageService() },
];

type StoreType = {
  state: InteralStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
    bootstrap: [ App ],
    declarations: [
        App,
        RecipesNewComponent,
        RecipesEditComponent,
        RecipeViewComponent,
        RecipesByCategoryComponent,
        RecipesListComponent,
        BeveragesListComponent,
        BeverageViewComponent,
        BeverageEditComponent,
        NoContent,
    ],
    imports: [ // import Angular's modules
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(ROUTES, { useHash: true })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})

export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}

