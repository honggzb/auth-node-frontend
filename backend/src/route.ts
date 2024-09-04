import { Router } from 'express';
import { register, login, authenticatedUser, logout, refresh } from './controllers/auth.controller';
import { forgot, reset } from './controllers/forgot.controller';

export const routes =(router: Router) => {
  router.post('/api/register', register);
  router.post('/api/login', login);
  router.post('/api/logout', logout);
  router.get('/api/user', authenticatedUser);
  router.post('/api/forgot', forgot);
  router.post('/api/reset', reset);
  router.post('/api/refresh', refresh);
}