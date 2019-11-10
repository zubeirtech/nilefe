import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Route.extend({
  session: service(),
  toastr: service('toast'),

  async afterModel(model) {
    try {
      const getComments = await this.store.query('comment', {
        post_id: model.id
      })
      if (this.session.isAuthenticated) {
        const getCurrentUser = await this.store.queryRecord('channel', {
          access_token: this.session.data.authenticated.access_token,
        });
        set(model, 'currentUser', getCurrentUser);
        set(model, 'comments', getComments);
        const record = await this.store.queryRecord('upvote', {
          channel_id: model.currentUser.id
        });
        if (record) {
          set(model, 'liked', true)
        } else {
          set(model, 'liked', false)
        }        
      }
    } catch (error) {
      console.log(error);
      this.toastr.error('Something went wrong', 'Error');
    }
  }
});
