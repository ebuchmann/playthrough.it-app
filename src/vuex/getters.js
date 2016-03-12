export function selectedCollection(store) {
    return store.collections[window.location.pathname.split('/')[2]];
}

export function selectedGameList(store) {
    return store.collections[window.location.pathname.split('/')[2]].gameList;
}

export function selectedTracking(store) {
    return store.collections[window.location.pathname.split('/')[2]].tracking;
}
