import DS from 'ember-data';

export default DS.Model.extend({
  post: DS.belongsTo('post', { async: false}),
  channel: DS.belongsTo('channel', { async: false }),
  post_id: DS.attr(),
  channel_id: DS.attr(),
  comment: DS.attr(),
  created_at: DS.attr()
});
