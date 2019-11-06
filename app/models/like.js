import DS from 'ember-data';

export default DS.Model.extend({
  p_id: DS.belongsTo('post', { async: false }),
  c_id: DS.belongsTo('channel', { async: false})
});
