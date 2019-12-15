const Ejs = require('ejs');
const Hapi = require('@hapi/hapi');
const Vision = require('@hapi/vision');
const Inert = require('@hapi/inert');
const clientID = require('./helix.js');
const HelixAPI = require("simple-helix-api");
const Helix = new HelixAPI({
    client_id: clientID.client_id
});

 
const server = Hapi.Server({ port: 3000, host: 'localhost' });
 
    
 
const provision = async () => {
  await server.register(Vision);
 	await server.register(Inert);
 
  user = await Helix.getUser('jujuu_lol')
    server.views({
        engines: { ejs: Ejs },
        relativeTo: __dirname,
        path: 'ejs/'
    });
  server.route({  
  method: 'GET',
  path: '/stylesheets/style.css',
  handler: (request, h) => {
return h.file('ejs/stylesheets/style.css')
    }
});
    server.route({  
  method: 'GET',
  path: '/javascripts/menu.js',
  handler: (request, h) => {
return h.file('ejs/javascripts/menu.js')
    }
});
        server.route({
        method: 'GET',
        path: '/',
        handler: function (request, h) {

            return h.view('index', {
        userName: user.display_name,
        userPic: user.profile_image_url,
        userViewcount: user.view_count, 
        page:'Home', 
        menuId:'home'
    });
        
    }
 });
        server.route({
    method: 'POST',
    path: '/search',
    handler: async (request, h) => {
      user = await Helix.getUser(request.payload.search);
       return h.view('index', {
        userName: user.display_name,
        userPic: user.profile_image_url,
        userViewcount: user.view_count,
        page:'Home', 
        menuId:'home'
      });
 
}
});
     await server.start();
    console.log('Server running at:', server.info.uri);
};
 
provision();