import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Controller.extend({
  session: service(),
  toastr: service('toast'),
  ajax: service(),

  actions: {
    login(){
      if(this.channelname && this.password){
        this.session.authenticate('authenticator:oauth2', this.channelname, this.password).then(async user => {
        }).catch((reason) => {
          this.set('errorMessage', reason.error || reason);
          console.log(reason.error || reason)
        });
      }else {
        this.toastr.warning('Please enter all fields', 'Warning');
      }
    }
  }
});
