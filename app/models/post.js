import DS from 'ember-data';

export default DS.Model.extend({
  creator: DS.belongsTo('channel', { async: false}),
  title: DS.attr(),
  description: DS.attr(),
  meta: DS.attr(),
  thumbnail_url: DS.attr(),
  video_url: DS.attr(),
  views: DS.attr(),
  likes: DS.hasMany('like', { async: false }),
  comments: DS.hasMany('comment', { async: false })
});
