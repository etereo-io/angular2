let curValue: any = null;

export function SessionStorage (propertyName?: string): any{

  return function (target: any, name: string) {

      const key = propertyName || name;

      const getter = function () {
        if (curValue ===  null) {
          return sessionStorage.getItem(key);
        }
        else {
          return curValue;
        }
      }

      const setter = function (value: any) {
        if (value !== null) {
          sessionStorage.setItem(key, value);
        }
        else {
          sessionStorage.removeItem(key);
        }
        curValue = value;
        setter.apply(this, value);
      }

      return Object.defineProperty(target, name, {
        value: sessionStorage.getItem(key),
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
      });
  };
}