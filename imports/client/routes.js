// Import the router
import { Meteor } from 'meteor/meteor';
import { RouterFactory, nativeScrollBehavior } from 'meteor/akryum:vue-router2';
import WrapperGame from '/imports/client/ui/pages/WrapperGame';
import PageLogin from '/imports/client/ui/pages/PageLogin';
import PageCharacterCreate from '/imports/client/ui/pages/PageCharacterCreate';
import PageProfile from '/imports/client/ui/pages/PageProfile';
import PageBattle from '/imports/client/ui/pages/PageBattle';
import PageShop from '/imports/client/ui/pages/PageShop';
// Create router instance
const routerFactory = new RouterFactory({
  mode: 'abstract',
  scrollBehavior: nativeScrollBehavior,
});

RouterFactory.configure((router) => {
  router.addRoutes([
    {
      path: '/reset-password/:restorePasswordToken',
      name: 'ResetPassword',
      props: true,
      component: PageLogin,
    },
    {
      path: '/auth',
      name: 'Auth',
      component: PageLogin,
    },
    {
      path: '/game',
      name: 'Game',
      component: WrapperGame,
      children: [
        {
          path: 'create_character',
          name: 'CharacterCreation',
          component: PageCharacterCreate,
        },
        {
          path: 'profile',
          name: 'CharacterProfile',
          component: PageProfile,
        },
        {
          path: 'battle',
          name: 'Battle',
          component: PageBattle,
        },
        {
          path: 'shop',
          name: 'Shop',
          component: PageShop,
        },
      ],
    },
  ]);
});

RouterFactory.configure((router) => {
  router.addRoute({
    path: '*',
    redirect: { name: 'Game' },
  });
}, -1);

const createRouter = () => {
  const router = routerFactory.create();

  router.beforeEach((to, from, next) => {
    if (Meteor.userId() && to.name === 'Auth') {
      next({ name: 'Game' });
    } else if (
      !Meteor.userId()
      && to.name !== 'ResetPassword'
      && to.name !== 'Auth'
    ) {
      next({ name: 'Auth' });
    } else {
      next();
    }
  });

  return router;
};

export default createRouter;
