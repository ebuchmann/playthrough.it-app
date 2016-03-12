// Page Components
import Home from './components/pages/Home';
import PublicCollections from './components/pages/PublicCollections';
import CollectionSingle from './components/pages/CollectionSingle';
import Profile from './components/pages/Profile';
import NotFound from './components/pages/NotFound';

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
        '/collection/:collection_id': {
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
