import Controller from '@ember/controller';
import { task } from 'ember-concurrency';
import { get, set } from '@ember/object';
import ENV from 'nilefe/config/environment';

export default Controller.extend({
    uploadPhoto: task(function* (file) {
      console.log(file);

      set(this.model, 'meta', {});
      const { meta } = this.model;

      set(meta, 'filename', get(file, 'name'));
      set(meta, 'filesize', get(file, 'size'));
      set(meta, 'file_id', get(file, 'id'));
  
      try {
        file.readAsDataURL().then(function (url) {
          set(meta, 'url', url);
        });
  
        let response = yield file.upload(`${ENV.host}/api/video/upload`);
        set(meta, 'url', response.headers.Location);
        console.log(this.model);
        
        yield this.model.save();
      } catch (e) {
        console.error(e);
        // document.location.reload();
      }
  }).maxConcurrency(3).enqueue(),

  actions: {
    uploadImage(file) {
      get(this, 'uploadPhoto').perform(file);
    }
  }
});
