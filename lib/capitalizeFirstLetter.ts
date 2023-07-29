export function capitalizeFirstLetter(string: string) {
  console.log(string);

  if (string !== undefined || string)
    return string?.charAt(0).toUpperCase() + string.slice(1);
  else return;
}
