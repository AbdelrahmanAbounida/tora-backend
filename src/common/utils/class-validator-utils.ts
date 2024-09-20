// omi peropery in child classes
export const OmitProperty = <T, K extends keyof T>(
  Class: new () => T,
  keys: K[],
): new () => Omit<T, (typeof keys)[number]> => Class;

// child extend Omit<Parent,["prop1",...]
