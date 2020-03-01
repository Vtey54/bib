const axios = require('axios');
const cheerio = require('cheerio');


//LOADRESULT ON NETWORK ON INVESTIGATE
/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */
const parseMaitresrestaurateurs = data => {
  try{
	  const $ = cheerio.load(data);
	  var coordinates = $('#module_ep > div.ep-container.container > div > div > div.ep-content-left.col-md-8 > div > div.ep-section.ep-section-parcours.row > div > div > div.section-item-right.text.flex-5').text().split('\n');
	  const name = coordinates[2].trim();
	  const rue=coordinates[11].trim();
	  const ville=coordinates[15].trim();
	  const codePostal=coordinates[14].trim();
	  const telephone =coordinates[28].trim();//.substring(0,17);
	  const siteWeb=coordinates[31].trim();

  	  return {name,rue,ville,codePostal, telephone, siteWeb};
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
module.exports.scrapeRestaurantMaitresRestaurateurs = async url => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return parseMaitresrestaurateurs(data);
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