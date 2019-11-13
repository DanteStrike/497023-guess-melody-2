export const newArray = (length = 0, fillValue = null) => {
  return new Array(length).fill(fillValue);
};

// export const updateItemInArray = (array, itemId, updateItemCallback) => {
//   const updatedItems = array.map((item) => {
//     if (item.id !== itemId) {
//       return item;
//     }

//     const updatedItem = updateItemCallback(item);
//     return updatedItem;
//   });

//   return updatedItems;
// };
