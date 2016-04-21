// Page Components
import Home from 'page/Home';
import PublicCollections from 'page/PublicCollections';
import CollectionSingle from 'page/CollectionSingle';
import Profile from 'page/Profile';
import UserProfile from 'page/UserProfile';
import NotFound from 'page/NotFound';

// Subroute components
import EditProfile from 'component/EditProfile';
import ItemAdd from 'component/ItemAdd';
import EditCollection from 'component/EditCollection';
import SuggestedGames from 'component/SuggestedGames';

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
            subRoutes: {
                '/add': {
                    name: 'addGames',
                    component: ItemAdd,
                },
                '/manage': {
                    name: 'manageCollection',
                    component: EditCollection,
                },
                '/suggestions': {
                    name: 'gameSuggestions',
                    component: SuggestedGames,
                },
            },
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
            subRoutes: {
                '/manage': {
                    name: 'manageProfile',
                    component: EditProfile,
                },
            },
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
