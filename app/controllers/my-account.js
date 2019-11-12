import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';
import ENV from 'nilefe/config/environment';
import { set, get } from '@ember/object';

export default Controller.extend({
  session: service(),
  toastr: service('toast'),

  init() {
    this._super(...arguments);
    this.files = {},
    this.profile = true
  }, 

  finishline: task(function* (file) {

    set(file, 'name', file.id + '.' + file.extension)

    set(this.model, 'image_url', `https://storage.googleapis.com/thenile/${file.name}`);

    try {

      yield file.upload(`${ENV.host}/api/upload`);

      yield this.model.save();
      document.location.reload();
    } catch (e) {
      console.error(e);
    }
  }).maxConcurrency(3).enqueue(),

  actions: {
    invalidate(){
      this.session.invalidate();
    },

    finalize(file) {
      set(this, 'load', true);
      get(this, 'finishline').perform(file);
      set(this, 'load', false);
    },

    save() {
      this.model.save();
    },

    async delete(post) {
      try {
        await post.destroyRecord()
      } catch (error) {
        console.log(error);
        this.toastr.error('Something went wrong', 'Error');
      }
    }
  }
});
