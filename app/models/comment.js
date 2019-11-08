import DS from 'ember-data';

export default DS.Model.extend({
  post: DS.belongsTo('post', { async: false}),
  channel: DS.belongsTo('channel', { async: false }),
  comment: DS.attr()
});
