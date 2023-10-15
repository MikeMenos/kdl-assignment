export const updateObjectValues = (object: any, path: string, value: string) => {
    const keys = Array.isArray(path) ? path : path.split(".");
    const copy = { ...object };
    let current = copy;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]] = { ...current[keys[i]] };
    }

    current[keys[keys.length - 1]] = value;

    return copy;
  }