// Type definitions for core-js.js
// Project: https://github.com/bq/corbel-js
// Definitions by: Daniel García <https://github.com/danigar>
declare module 'corbel-js';

declare class corbel {
  static getDriver(config: Object): CorbelDriver;
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

declare class Services {
  constructor(driver: CorbelDriver);

  public driver: CorbelDriver;
  public request(args: Object): Promise<any>;

  static getLocationId(responseObject: Object): string;
  static getLocation(responseObject: Object): string;
  static addEmptyJson(response: Object, type: string): Object;
}

declare class Iam {
  constructor (driver: CorbelDriver);

  public token(): TokenBuilder;
  
  public user(userId?: string): UserBuilder | UserMeBuilder;
  public users(): UsersBuilder;

  static create(driver: CorbelDriver): Iam;
  static moduleName: string;
  static defaultPort: string;
  static GRANT_TYPE: string;
  static AUD: string;
  static IAM_TOKEN: string;
  static IAM_TOKEN_SCOPES: string;
  static IAM_DOMAIN: string;
}

declare class TokenBuilder {
  driver: CorbelDriver;
  uri: string;

  create(params: TokenObject, setCookie?: boolean): Promise<any>;
  refresh(refreshToken: string, scopes: string): Promise<any>;
}

declare class TokenObject {
  claims: Object;
}

declare class CommonUserBuilder extends Services{
  constructor(id: string);

  uri: string;
  id: string;

  public get(): Promise<any>;
  public addIdentity(identity: string): Promise<any>;
  public addGroups(groups: Object): Promise<any>;
}

declare class UserBuilder extends CommonUserBuilder {
  public deleteGroup(): Promise<any>;
  public update(): Promise<any>;
  public delete(): Promise<any>;
  public registerDevice(): Promise<any>;      
  public getDevices(): Promise<any>;
  public getDevice(): Promise<any>;
  public deleteDevice(): Promise<any>;
  public signOut(): Promise<any>;
  public disconnect(): Promise<any>;
  public closeSessions(): Promise<any>;
  public getIdentities(): Promise<any>;
  public getProfile(): Promise<any>;
}

declare class UserMeBuilder extends CommonUserBuilder {
  public deleteMyGroup(): Promise<any>;
  public updateMe(): Promise<any>;
  public deleteMe(): Promise<any>;
  public registerMyDevice(): Promise<any>;
  public getMyDevices(): Promise<any>;
  public getMyDevice(): Promise<any>;
  public getMySession(): Promise<any>;
  public deleteMyDevice(): Promise<any>;
  public signOutMe(): Promise<any>;
  public disconnectMe(): Promise<any>;
  public closeSessionsMe(): Promise<any>;
  public getMyIdentities(): Promise<any>;
  public getMyProfile(): Promise<any>;
}

declare class UsersBuilder extends Services{
  uri: string;

  public sendResetPasswordEmail (userEmailToReset: string): Promise<any>;
  public create(data: Object): Promise<any>;
  public get(params: Object): Promise<any>;
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

declare class Resource extends BaseResource {
  constructor (type: string, id: string, driver: CorbelDriver, params: Object);

  public get(options: Object): Promise<any>;
  public add(data: Object, options: Object): Promise<any>;
  public update(data: Object, options: Object): Promise<any>;
  public delete(options: Object): Promise<any>;
}

declare class Collection extends BaseResource {
  constructor (type: string, driver: CorbelDriver, params: Object);

  public get(options: Object): Promise<any>;
  public add(data: Object, options: Object): Promise<any>;
  public update(data: Object, options: Object): Promise<any>;
  public delete(options: Object): Promise<any>;
}

declare class Relation extends BaseResource {
  constructor (srcType: string, srcId: string, destType: string, driver: CorbelDriver, params: Object);

  public get(destId: string, options: Object): Promise<any>;
  public add(destId: string, data: Object, options: Object): Promise<any>;
  public move(destId: string, pos: number, options: Object): Promise<any>;
  public delete(destId: string, options: Object): Promise<any>;
  public addAnonymous(relationData: Object, options: Object): Promise<any>;
}

declare class BaseResource {

  buildUri (srcType: string, srcId?: string, destType?: string, destId?: string): string;

  request(args: Object): Promise<any>;

  getURL(params: Object): String;

  getDefaultOptions(options: Object): Object;
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
