# @etereo/corbel
 Angular2 module that provides communication with corbel backends. 
  

## How to install

  ~~~~~
    npm install @etereo/corbel --save
  ~~~~~

## How to use

  To add the module you have to import it in the root module and provide the corbel configuration.

  ~~~~~
  import { NgModule } from '@angular/core';
  import { BrowserModule } from '@angular/platform-browser';

  import { CorbelModule } from '@etereo/corbel';

  @NgModule({
    declarations: [
    ],

    providers: [],

    // Modules
    imports: [
      BrowserModule,
      CorbelModule.forRoot({/* corbel config */}),
    ]
  })
  export class AppModule {}
  ~~~~~

  ### Services

  The main service you can import and inject is **orbelService**. It contains the Resources services you can use to communicate with Corbel resources micro-service.

  ~~~~~~
    import { CorbelService } from '@etereo/corbel';

    @Component({

    })
    export class Home {
      constructor (private corbel: CorbelService) {

      }
      onClick () {
        corbel.collection.get('id')
        .subscribe((data) => {

        });
        corbel.resources.add('colName', 'id', {data})
        .subscribe((data) => {

        });
      }
    }
  ~~~~~~

  #### Resources API

  ~~~~~~
  corbelService.collection.get(collectionName: string, options: Object): Observable<Any>;
  corbelService.collection.add(collectionName: string, data: Object, options: Object): Observable<Any>;
  corbelService.collection.update(collectionName: string, data: Object, options: Object): Observable<Any>;
  corbelService.collection.delete(collectionName: string, options: Object): Observable<Any>;
  ~~~~~~
  
  ~~~~~~
  corbelService.resource.get(collectionName: string, resourceId: string, options: Object): Observable<Any>;
  corbelService.resource.add(collectionName: string, resourceId: string, data: Object, options: Object): Observable<Any>;
  corbelService.resource.update(collectionName: string, resourceId: string, data: Object, options: Object): Observable<Any>;
  corbelService.resource.delete(collectionName: string, resourceId: string, options: Object): Observable<Any>;
  ~~~~~~

  #### ResourcesCache

  The resources services has its own cache implementation. It only works fetching resources from the server (**on GET requests**). You can customize the expiration time of the cache when you import the module.

  ~~~~~~
    @NgModule({
      imports: [
        BrowserModule,
        CoreModule,
        CorbelModule.forRoot({ /*corbelConfig*/ }, cacheExpirationTime: number)
      ],

      // Main Component
      bootstrap: [ AppComponent ]
    })
    export class AppModule {
    }
  ~~~~~~

  Also you can avoid the use of the cache for specific requests. You can provide an argument as option when making the request to avoid the cache use.

  ~~~~~~
    corbel.resources.get('id', { avoidCache: true })
    .subscribe((data) => {

    });
  ~~~~~~


## IAM

## Contrib

  To compile the project you only need to run `npm run build`.
