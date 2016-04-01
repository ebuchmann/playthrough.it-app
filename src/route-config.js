// Page Components
import Home from 'page/Home';
import PublicCollections from 'page/PublicCollections';
import CollectionSingle from 'page/CollectionSingle';
import Profile from 'page/Profile';
import UserProfile from 'page/UserProfile';
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
        '/profile/:userId': {
            name: 'user_profile',
            component: Profile,
        },
        '/user-profile': {
            name: 'userProfile',
            component: UserProfile,
        },
        '*': {
            component: NotFound,
        },
    });

    // router.beforeEach(({ to, abort, next }) => {
    //     debug(to);
    //     if (to.name === 'collections') {
    //         abort();
    //     }
    //     next();
    // });
}
