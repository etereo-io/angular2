let curValue: any = null;

export function SessionStorage (propertyName?: string): any{

  return function (target: any, name: string) {
     
      const key = propertyName || name;

      let prop = target[key];

      const getter = function () {
        if (curValue ===  null) {
          return deserializeData(sessionStorage.getItem(key));
        }
        else {
          return curValue;
        }
      }

      const setter = function (value: any) {
        let serialized;

        if (value !== null) {
          if (typeof value === 'object') {
            serialized = JSON.stringify(value);
          }
          else {
            serialized = value;
          }
          
          sessionStorage.setItem(key, serialized);
        }
        else {
          sessionStorage.removeItem(key);
        }
        
        curValue = value;
        prop = value;
      }

      const deserializeData = function (data: any) {
        let serialized;

        if (data) {
          try {
            serialized = JSON.parse(data);
          }
          catch (e) {
            serialized = data;
          }

          return serialized;
        }
      }

      return Object.defineProperty(target, name, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
      });
  };
}