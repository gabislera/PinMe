export function maskCep(value: string) {
  value = value.replace(/\D/g, '');
  if (value.length > 8) value = value.slice(0, 8);
  if (value.length > 5) {
    return value.replace(/(\d{5})(\d{1,3})/, '$1-$2');
  } else {
    return value;
  }
}
