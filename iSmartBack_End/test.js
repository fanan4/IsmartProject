const items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
    // Add more items as needed
  ];
  
  // Function to find an item by its ID
  function findItemById(array, idToFind) {
    return array.find(item => item.id === idToFind);
  }
  
  // Example usage
  const itemIdToFind = 2;
  const foundItem = findItemById(items, itemIdToFind);
  
  if (foundItem) {
    console.log("Item found:", foundItem);
  } else {
    console.log("Item not found.");
  }