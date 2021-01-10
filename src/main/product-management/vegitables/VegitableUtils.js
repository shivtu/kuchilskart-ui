function getItemCategories(appData) {
  let itemCategories = appData.utilityData.result.itemCategories.filter(
    (category) => category.itemCategory
  );

  itemCategories.forEach((category, i) => {
    if (category.itemCategory === itemCategories[i + 1]?.itemCategory) {
      itemCategories.splice(itemCategories.indexOf(itemCategories[i + 1], 1));
    }
  });

  return itemCategories;
}

export { getItemCategories };
