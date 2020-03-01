const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */
const parseMichelin = data => {
  try{
    const $ = cheerio.load(data);
    var name = $('.section-main h2.restaurant-details__heading--title').text();
    const experience = $('#experience-section > ul > li:nth-child(2)').text().split('\n')[2].trim();
    const adresseScraped=$(".restaurant-details__heading > ul > li:nth-child(1)").text();
    const rue=adresseScraped.split(',')[0];
    const ville=adresseScraped.split(',')[1];
    const codePostal=adresseScraped.split(',')[2].trim();
    const telephone =$('.section-main span.flex-fill').text().substring(0,17);
    const siteWeb=$('.section-main a').map(function(i,el){
      return $(this).attr('href');
    }).toArray()[5];

    return {name, experience,rue,ville,codePostal,telephone,siteWeb};
  }
  catch (e) {
    console.log('Erreur dans la page de donnée du restaurant.')
  }
  
};

/**
 * Scrape a given restaurant url
 * @param  {String}  url
 * @return {Object} restaurant
 */
module.exports.scrapeRestaurantMichelin = async url => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return parseMichelin(data);
  }

  console.error(status);

  return null;
};

/**
 * Get all France located Bib Gourmand restaurants
 * @return {Array} restaurants
 */
module.exports.get = () => {
  return [];
};
