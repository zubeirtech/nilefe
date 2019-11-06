import DS from 'ember-data';

export default DS.Model.extend({
  p_id: DS.belongsTo('post', { async: false}),
  author: DS.belongsTo('channel', { async: false }),
  comment: DS.attr()
});
