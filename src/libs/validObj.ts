export function validObj(obj?: any) {
  return Object.values(obj).filter((e) => e != 'undefined').length > 0;
}
