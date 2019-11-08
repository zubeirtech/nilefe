import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Controller.extend({
  session: service(),
  toastr: service('toast'),

  actions: {
    async like() {
      if(this.session.isAuthenticated) {
        try {
          if(this.model.liked) {
            const record = await this.store.queryRecord('upvote', {
              channel_id: this.model.currentUser.id
            });
            await record.destroyRecord();
            set(this.model, 'liked', false);
          } else {
            const newLike = await this.store.createRecord('upvote', {
              post_id: this.model.id,
              channel_id: this.model.currentUser.id
            })
            await newLike.save();
            set(this.model, 'liked', true);
          }
        } catch (error) {
          console.log(error);
          this.toastr.error('Something went wrong', 'Error');
        }
      } else {
        this.toastr.info('Please register to like a video', 'Warning');
      }
    }
  }
});
