export const setClassName = (...classesNames: any[]): string => {
  return classesNames.filter((className) => {
    if (!Boolean(className)) {
      return false;
    }
    return true;
  }).join(' ');
};
