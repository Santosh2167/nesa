const LOCAL_STORAGE_KEY = 'favourites';

export default class Favourites {
  get() {
    const favourites = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    return favourites ? JSON.parse(favourites) : [];
  }

  add(favourite) {
    const favourites = this.get();
    const duplicated = favourites.some(fav => fav.id === favourite.id);
    if (duplicated) return favourites;

    const newFavourites = [
      ...favourites,
      { ...favourite, favourite: true },
    ];

    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newFavourites));
    return newFavourites;
  }

  remove(favouriteId) {
    const favourites = this.get();
    const filtered = favourites.filter(fav => fav.id !== favouriteId);
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));

    return filtered;
  }
};
