const Ejs = require('ejs');
const Hapi = require('@hapi/hapi');
const Vision = require('@hapi/vision');
const Inert = require('@hapi/inert');
const clientID = require('./helix.js');
const HelixAPI = require("simple-helix-api");
const https = require('hapi-require-https');
const fs = require("fs");
const Helix = new HelixAPI({
    client_id: clientID.client_id
});

 
const server = Hapi.Server({ port: 443,  tls: {
  key: fs.readFileSync("/etc/letsencrypt/live/jujuu.tk/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/jujuu.tk/cert.pem")
} });


 /*const server = Hapi.Server({ port: 443});*/
    
 
const provision = async () => {
  await server.register(Vision);
 	await server.register(Inert);
  await server.register(https);
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
        path: '/test',
        handler: async (request, h) => {
    } 
 });

var followersJan;
var followersFeb;
var followersMar;
var followersApr;
var followersMay;
var followersJun;
var followersJul;
var followersAug;
var followersSep;
var followersOct;
var followersNov;
var followersDec;

countFollows = async () => {
          allFollowers = await Helix.getAllFollowers(user.id);
            var countJan = 0;
            var countFeb = 0;
            var countMar = 0;
            var countApr = 0;
            var countMay = 0;
            var countJun = 0;
            var countJul = 0;
            var countAug = 0;
            var countSep = 0;
            var countOct = 0;
            var countNov = 0;
            var countDec = 0;
          for (let follower of allFollowers) {
            month = follower.followed_at.slice(5, -13)
            switch(month) {
                    case "01":
                    countJan++;
                    break;
                     case "02":
                    countFeb++;
                    break;
                    case "03":
                    countMar++;
                    break;
                    case "04":
                    countApr++;
                    break;
                    case "05":
                    countMay++;
                    break;
                    case "06":
                    countJun++;
                    break;
                    case "07":
                    countJul++;
                    break;
                    case "08":
                    countAug++;
                    break;
                    case "09":
                    countSep++;
                    break;
                    case "10":
                    countOct++;
                    break;
                    case "11":
                    countNov++;
                    break;
                    case "12":
                    countDec++;
                    break;
                  default:
                }
          }
          followersJan = countJan;
          followersFeb = countFeb + followersJan;
          followersMar = countMar + followersFeb;
          followersApr = countApr + followersMar;
          followersMay = countMay + followersApr;
          followersJun = countJun + followersMay;
          followersJul = countJul + followersJun;
          followersAug = countAug + followersJul;
          followersSep = countSep + followersAug;
          followersOct = countOct + followersSep;
          followersNov = countNov + followersOct;
          followersDec = countDec + followersNov;
}
        server.route({
        method: 'GET',
        path: '/',
        handler: async (request, h) => {
          user = await Helix.getUser('jujuu_lol');
          followerCount = await Helix.getFollowersCount(user.id);
          await countFollows();
            return h.view('index', {
        userName: user.display_name,
        userPic: user.profile_image_url,
        userViewcount: user.view_count,
        followerCount: followerCount,
        january: followersJan,
        february: followersFeb,
        march: followersMar,
        april: followersApr,
        may: followersMay,
        june: followersJun,
        july: followersJul,
        august: followersAug,
        september: followersSep,
        october: followersOct,
        november: followersNov,
        december: followersDec,
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
      followerCount = await Helix.getFollowersCount(user.id);
      await countFollows();
            return h.view('index', {
        userName: user.display_name,
        userPic: user.profile_image_url,
        userViewcount: user.view_count,
        followerCount: followerCount,
        september: followersSeptember,
        october: followersOctober,
        november: followersNovember,
        december: followersDecember,
        page:'Home', 
        menuId:'home'
      });
 
}
});
     await server.start();
    console.log('Server running at:', server.info.uri);
};
 
provision();