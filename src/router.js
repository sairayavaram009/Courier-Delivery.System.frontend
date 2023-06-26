import { createRouter, createWebHistory } from 'vue-router';
import Login from '../src/views/Login.vue';
import SubscribersView from '../src/views/SubscribersView.vue';
import ToursWeoffer from '../src/views/ToursWeoffer.vue';
import ProfileSettings from '../src/views/ProfileSettings.vue';
import TrackDelivery from '../src/views/TrackDelivery.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresAuth: false, // Allow access to all users, including guests
      },
    },
    {
      path: '/subscribe',
      name: 'subscribe',
      component: SubscribersView,
      meta: {
        requiresAuth: true, // Only allow access to authenticated users
        allowedRoles: ['admin', 'cleark'], // Only allow access to users with "admin" or "cleark" role
      },
    },
    {
      path: '/tours',
      name: 'tours',
      component: ToursWeoffer,
      meta: {
        requiresAuth: false, // Allow access to all users, including guests
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileSettings,
      meta: {
        requiresAuth: true, // Only allow access to authenticated users
        allowedRoles: ['admin'], // Only allow access to users with "admin" role
      },
    },
    {
      path: '/track',
      name: 'track',
      component: TrackDelivery,
      meta: {
        requiresAuth: true, // Only allow access to authenticated users
        allowedRoles: ['admin', 'user', 'guest'], // Allow access to users with "admin", "user", or "guest" role
      },
    },
  ],
});

// Navigation guard to check authentication and role before accessing routes with requiresAuth meta field
router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const allowedRoles = to.meta.allowedRoles;
  const isAuthenticated = /* Add your authentication check logic here */;
  const userRole = /* Get the user's role from your user object or authentication state */;

  if (requiresAuth && !isAuthenticated) {
    // Redirect to login if the route requires authentication and the user is not authenticated
    next({ name: 'login' });
  } else if (requiresAuth && allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect to unauthorized page if the user's role is not allowed for the route
    next({ name: 'unauthorized' });
  } else {
    // Proceed to the route
    next();
  }
});

export default router;
