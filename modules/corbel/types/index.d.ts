// Type definitions for core-js.js
// Project: https://github.com/bq/corbel-js
// Definitions by: Daniel García <https://github.com/danigar>
declare module 'corbel-js';

declare class corbel {
  public getDriver(config: Object): CorbelDriver;
}

declare class CorbelDriver {
  constructor (config: Object, events: Object);

  public dispatch(name: string, options: Object): void; 
  public trigger(name: string, options: Object): void; 
  public addEventListener(name: string, cb: () => void): void;
  public removeEventListener(name: string, cb: () => void): void;
  public on(name: string, cb: () => void): void;
  public off(name: string, cb: () => void): void;
  public clone() : CorbelDriver;
  
  public iam: Iam;
  public resources: Resources;
  public assets: Assets;
  public oauth: Oauth;
  public ec: Ec;
  public evci: Evci;
  public borrow: Borrow;
  public composr: CompoSR;
  public scheduler: Scheduler;
  public webfs: Webfs;
  public domain: Domain;
}

declare class Iam {
  constructor (driver: CorbelDriver);

  static create(driver: CorbelDriver): Iam;
  static moduleName: string;
  static defaultPort: string;
  static GRANT_TYPE: string;
  static AUD: string;
  static IAM_TOKEN: string;
  static IAM_TOKEN_SCOPES: string;
  static IAM_DOMAIN: string;
}

declare class Resources {
  constructor (driver: CorbelDriver);

  public collection(type: string): Collection;
  public resource(type: string, id: string): Resource;
  public relation(srcType: string, srcId: string, destType: string): Relation;
  
  static moduleName: string;
  static defaultPort: number;
  static sort: Object;

  /**
   * constant for use to specify all resources wildcard
   * @namespace
   */
  static ALL: string;
  static create (driver: CorbelDriver): Resources;
}

declare class Resource {
  constructor (type: string, id: string, driver: CorbelDriver, params: Object);

  public get(options: Object): Promise<any>;
  public add(data: Object, options: Object): Promise<any>;
  public update(data: Object, options: Object): Promise<any>;
  public delete(options: Object): Promise<any>;
}

declare class Collection {
  constructor (type: string, driver: CorbelDriver, params: Object);

  public get(options: Object): Promise<any>;
  public add(data: Object, options: Object): Promise<any>;
  public update(data: Object, options: Object): Promise<any>;
  public delete(options: Object): Promise<any>;
}

declare class Relation {
  constructor (srcType: string, srcId: string, destType: string, driver: CorbelDriver, params: Object);

  public get(destId: string, options: Object): Promise<any>;
  public add(destId: string, data: Object, options: Object): Promise<any>;
  public move(destId: string, pos: number, options: Object): Promise<any>;
  public delete(destId: string, options: Object): Promise<any>;
  public addAnonymous(relationData: Object, options: Object): Promise<any>;
}

declare class Assets {


}

declare class Oauth {


}

declare class Notifications {


}

declare class Ec {


}

declare class Evci {


}

declare class Borrow {


}

declare class CompoSR {


}

declare class Scheduler {


}

declare class Webfs {

}

declare class Domain {


}