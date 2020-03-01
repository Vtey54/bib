/* eslint-disable no-console, no-process-exit */
const michelin = require('./michelin');
const urlRestaurant = require('./urlRestaurant');
const maitresrestaurateurs = require('./maitresrestaurateurs')
const fs = require('fs')
const restaurantMichelin=[];
const restaurantMaitresRestaurateurs=[];
const urlRestaurantMichelin = [];
const urlRestaurantMaitresRestaurateurs = [];
const restaurantFinal = [];
var pageCountUrlMichelin = 1;

var pageCountMichelin=1;
var pageCountMaitresRestaurateurs=1;



async function sandboxMichelin (searchLink = 'https://guide.michelin.com/fr/fr/centre-val-de-loire/veuves/restaurant/l-auberge-de-la-croix-blanche') {
  try {
    console.log(`🕵️‍♀️  browsing ${searchLink} source`);
    var urlPrefix='https://guide.michelin.com'


    const restaurant = await michelin.scrapeRestaurantMichelin(searchLink);
    if (restaurant!=undefined){
          restaurantMichelin.push(restaurant);
    }

    if(pageCountMichelin!=urlRestaurantMichelin.length-1){
        console.log('Chargement des restaurants :'+pageCountMichelin+'/'+urlRestaurantMichelin.length);
        pageCountMichelin+=1;
        searchLink=urlPrefix;
        sandboxMichelin(searchLink+urlRestaurantMichelin[pageCountMichelin])
    }
    else {
        sandboxUrlMaitresRestaurateurs('https://www.maitresrestaurateurs.fr/annuaire/recherche',1);



    }
 
    //process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
async function sandboxUrlRestaurantsMichelin (searchLink ='https://guide.michelin.com/fr/fr/restaurants/bib-gourmand#' ) {
  try {
    console.log(`🕵️‍♀️  browsing ${searchLink} source`);
    var urlPrefix='https://guide.michelin.com/fr/fr/restaurants/bib-gourmand'

    const urlPage = await urlRestaurant.scrapeUrlRestaurantMichelin(searchLink);

    for(var i=0; i<urlPage.url.length;i++){
          urlRestaurantMichelin.push(urlPage.url[i]);
    }
    pageCountUrlMichelin+=1;
    if(pageCountUrlMichelin!=urlPage.numberPage+2){
      sandboxUrlRestaurantsMichelin(urlPrefix+'/page/'+pageCountUrlMichelin)
    }
    else{
            console.log(urlRestaurantMichelin);
            sandboxMichelin('https://guide.michelin.com/fr/fr/auvergne-rhone-alpes/grenoble/restaurant/le-rousseau');

    }
    
 
    //process.exit(0);
  } catch (e) {
    console.error(e);
    //process.exit(1);
  } 
}
async function sandboxMaitresRestaurateurs (searchLink = 'https://www.maitresrestaurateurs.fr/profil/5867') {
  try {
    console.log(`🕵️‍♀️  browsing ${searchLink} source`);
    const urlPrefix='https://www.maitresrestaurateurs.fr'
 
    const restaurant = await maitresrestaurateurs.scrapeRestaurantMaitresRestaurateurs(searchLink);
    if (restaurant!=undefined){
          restaurantMaitresRestaurateurs.push(restaurant);
    }
    if(pageCountMaitresRestaurateurs!=urlRestaurantMaitresRestaurateurs.length-1){
        console.log('Chargement des restaurants :'+pageCountMaitresRestaurateurs+'/'+urlRestaurantMaitresRestaurateurs.length);
        pageCountMaitresRestaurateurs+=1;
        searchLink=urlPrefix;
        sandboxMaitresRestaurateurs(searchLink+urlRestaurantMaitresRestaurateurs[pageCountMaitresRestaurateurs]);
    }
    else {
        testRestaurant(restaurantMichelin,restaurantMaitresRestaurateurs);

    }
    //console.log(restaurantMaitresRestaurateurs);
    
    //process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
async function sandboxUrlMaitresRestaurateurs (searchLink = 'https://www.maitresrestaurateurs.fr/annuaire/recherche',pageCountUrlMaitresRestaurateurs) {
  try {
    console.log(`🕵️‍♀️  browsing ${searchLink} source, page :`+pageCountUrlMaitresRestaurateurs);


    const urlPage = await urlRestaurant.scrapeUrlRestaurantMaitresRestaurateurs(searchLink,pageCountUrlMaitresRestaurateurs);
    for(var i=0; i<urlPage.url.length;i++){
          urlRestaurantMaitresRestaurateurs.push(urlPage.url[i]);
    }
    pageCountUrlMaitresRestaurateurs+=1;
    
    
    if(pageCountUrlMaitresRestaurateurs!=urlPage.numberPage+2){
      sandboxUrlMaitresRestaurateurs(searchLink,pageCountUrlMaitresRestaurateurs)
    }
    else{
            sandboxMaitresRestaurateurs('https://www.maitresrestaurateurs.fr' +urlRestaurantMaitresRestaurateurs[0])
    }
    
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

function testRestaurant(restaurantMichelin,restaurantMaitresRestaurateurs){
  
  for (var i=0;i<restaurantMichelin.length;i++){
    for(var j=0;j<restaurantMaitresRestaurateurs.length;j++){
      test=false;

      if(restaurantMichelin[i].name.toLowerCase()===restaurantMaitresRestaurateurs[j].name.toLowerCase() && !(restaurantMichelin[i] in restaurantFinal)){
        for (var l=0;l<restaurantFinal.length;l++)
        {
          if(restaurantMichelin[i].name.toLowerCase()==restaurantFinal[l].name.toLowerCase()){
            test=true
          }
        }
        if(test==false){
          restaurantFinal.push(restaurantMichelin[i]);
        }
        
      }
      else{
        if(restaurantMichelin[i].siteWeb===restaurantMaitresRestaurateurs[j].siteWeb && !(restaurantMichelin[i] in restaurantFinal)){
          for (var l=0;l<restaurantFinal.length;l++)
          {
            if(restaurantMichelin[i].name.toLowerCase()==restaurantFinal[l].name.toLowerCase()){
              test=true
          }
          }
          if(test==false){
            restaurantFinal.push(restaurantMichelin[i]);
          }
        }
        else{
          if(restaurantMichelin[i].rue.toLowerCase()===restaurantMaitresRestaurateurs[j].rue.toLowerCase() && restaurantMichelin[i].ville.toLowerCase()===restaurantMaitresRestaurateurs[j].ville.toLowerCase() && !(restaurantMichelin[i] in restaurantFinal)){
            for (var l=0;l<restaurantFinal.length;l++)
            {
              if(restaurantMichelin[i].name.toLowerCase()==restaurantFinal[l].name.toLowerCase()){
                test=true
              }
            }
            if(test==false){
              restaurantFinal.push(restaurantMichelin[i]);
            }
           }
        }
      }
    }
  }
  console.log(restaurantFinal);
  
  fs.writeFile('restaurantFinal.json', JSON.stringify(restaurantFinal,null,2), (err) => {
      if (err) throw err;
      console.log('Data written to file');
  });
}


const [,, searchLink] = process.argv;
//urlRestaurantMaitresRestaurateurs.push();
sandboxUrlRestaurantsMichelin(searchLink);


