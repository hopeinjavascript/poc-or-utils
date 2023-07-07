export function mySlice(arr, start, end) {
  let updatedItems = [];

  console.log({ arr, start, end });

  for (let i = start ?? 0; i < (end ?? arr.length); i++) {
    const element = arr[i];
    console.log({ element });
    updatedItems = [...updatedItems, element];
  }

  return updatedItems;
}
