// Page Components
import Home from 'page/Home';
import PublicCollections from 'page/PublicCollections';
import CollectionSingle from 'page/CollectionSingle';
import Profile from 'page/Profile';
import NotFound from 'page/NotFound';

export function configRouter(router) {
    router.map({
        '/': {
            name: 'home',
            component: Home,
        },
        '/collections': {
            name: 'collections',
            component: PublicCollections,
        },
        '/collection/:collectionId': {
            name: 'single_collection',
            component: CollectionSingle,
        },
        '/profile': {
            name: 'profile',
            component: Profile,
        },
        '*': {
            component: NotFound,
        },
    });
}
