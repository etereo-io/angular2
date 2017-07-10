export function LocalStorage (propertyName?: string): any{

  return function (target: any, name: string) {
     
      const key = propertyName || name;

      let prop = target[key];
      let curValue: any = null;

      const getter = function () {
        if (curValue ===  null) {
          return deserializeData(localStorage.getItem(key));
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
          
          localStorage.setItem(key, serialized);
        }
        else {
          localStorage.removeItem(key);
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