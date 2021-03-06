import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('sign-up');
  this.route('about');
  this.route('upload');
  this.route('my-account');

  this.route('watch', function() {
    this.route('video', { path: ':post_id' });
  });

  this.route('channels', function() {
    this.route('channel', { path: ':channel_id' });
  });
});

export default Router;
