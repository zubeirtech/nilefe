import DS from 'ember-data';
// import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from '../config/environment';
import { isPresent } from '@ember/utils';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default DS.JSONAPIAdapter.extend(/*DataAdapterMixin */{
    session: service(),
    namespace: 'api',
    host: ENV.host,
    authorize(xhr) {
        let { access_token } = this.get('session.data.authenticated');
        if (isPresent(access_token)) {
            xhr.setRequestHeader('Authorization', `Bearer ${access_token}`);
        }
    },
    headers: computed('session.data.authenticated.access_token', function () {
        const headers = {};
        if (this.session.isAuthenticated) {
            headers['Authorization'] = `Bearer ${this.session.data.authenticated.access_token}`;
        }

        return headers;
    }),
});
