'use strict';

module.exports = function(/* environment, appConfig */) {
  // See https://zonkyio.github.io/ember-web-app for a list of
  // supported properties

  return {
    name: "nilefe",
    short_name: "nilefe",
    description: "",
    start_url: "/",
    display: "standalone",
    background_color: "#470FF4",
    theme_color: "#470FF4",
    icons: [
      {
        src: "https://imgur.com/jImv69z.png",
        sizes: "540x540",
        type: "image/png"
      }
    ],
    ms: {
      tileColor: '#fff'
    }
  };
}
