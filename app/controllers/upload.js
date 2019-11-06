import Controller from '@ember/controller';
import { task } from 'ember-concurrency';
import { get, set } from '@ember/object';
import ENV from 'nilefe/config/environment';
import { inject as service } from '@ember/service';

export default Controller.extend({
  toastr: service('toast'),

  init(){
    this._super(...arguments)
    this.files = {}
  },

  finishline: task(function* (files) {
    set(this.model, 'meta', {});
    const { meta } = this.model;
    set(meta, 'video_originalname', get(files.video, 'name'));
    set(meta, 'video_filesize', get(files.video, 'size'));
    set(meta, 'video_file_id', get(files.video, 'id'));

    set(meta, 'image_originalname', get(files.image, 'name'));
    set(meta, 'image_filesize', get(files.image, 'size'));
    set(meta, 'image_file_id', get(files.image, 'id'));

    if(files.image.extension === "jpeg"){
      set(files.image, 'name', files.image.id + ".jpg")
    } else {
      set(files.image, 'name', files.image.id + '.' + files.image.extension)
    }

    set(files.video, 'name', files.video.id + '.' + files.video.extension)

    try {
      const { image, video } = files;
      image.readAsDataURL().then(function (url) {
        set(meta, 'url', url);
      });
      image.readAsDataURL().then(function (url) {
        set(meta, 'url', url);
      });

      const videoRes = yield video.upload(`${ENV.host}/api/upload`);
      const imageRes = yield image.upload(`${ENV.host}/api/upload`);
      set(meta, 'url', response.headers.Location);
      
      console.log(this.model);
      
      // yield this.model.save();
    } catch (e) {
      console.error(e);
    }
  }).maxConcurrency(3).enqueue(),

  actions: {
    uploadImage(image) {
      try {
        set(this, 'load', true);
        set(this.files, 'image', image);
        set(this, 'load', false);
        this.toastr.success(`Uploaded ${image.name}`, 'Success');
      } catch (error) {
        console.log(error);
        set(this, 'load', false);
        this.toastr.error('Upload did not work', 'Error')        
      }
    },

    uploadVideo(video) {
      try {
        set(this, 'load', true);
        set(this.files, 'video', video);
        set(this, 'load', false);
        this.toastr.success(`Uploaded ${video.name}`, 'Success');
      } catch (error) {
        console.log(error);
        set(this, 'load', false);
        this.toastr.error('Upload did not work', 'Error')
      }
    },

    finalize() {
      set(this, 'load', true);
      get(this, 'finishline').perform(this.files);
      set(this, 'load', false);
    }

  }
});
