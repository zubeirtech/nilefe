import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Route.extend({
  session: service(),

  async afterModel(model) {
    if (this.session.isAuthenticated) {
      
      try {
        const getCurrentUser = await this.store.queryRecord('channel', {
          access_token: this.session.data.authenticated.access_token,
        })
        set(model, 'currentUser', getCurrentUser)
        const record = await this.store.queryRecord('like', {
          channel_id: model.currentUser.id
        });
        if (record) {
          set(model, 'liked', true)
        } else {
          set(model, 'liked', false)
        }
      } catch (error) {
        console.log(error);
        this.toastr.error('Something went wrong', 'Error');
      }
    }
  }
});
