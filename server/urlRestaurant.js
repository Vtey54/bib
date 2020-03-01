const axios = require('axios');
const cheerio = require('cheerio');
const querystring = require('querystring');


const parseUrlRestaurantMichelin = data => {
  const $ = cheerio.load(data);
  const urlDuplicat = $('.card__menu a' ).map(function(i, el){
  	return $(this).attr('href');
  }).toArray();

  var url=[]
  for(var i=2;i<urlDuplicat.length;i=i+3){
  	url.push(urlDuplicat[i]);
  }
  var numberPage=$('body > main > section.section-main.search-results.search-listing-result > div > div > div.search-results__count > div.d-flex.align-items-end.search-results__status > div.flex-fill > h1').text().split('\n')[5].match(/\d+/)[0];
  numberPage=Math.floor(numberPage/20);

  return {url,numberPage};
};

const parseUrlRestaurantMaitresRestaurateurs = data => {
  try{
  	const $ = cheerio.load(data);
  	const urlScraped = $('.single_libel a' ).map(function(i, el){
  		return $(this).attr('href');
  	}).toArray();
  	var url =[];
  	for(var i=0;i<urlScraped.length;i=i+1){
  		url.push(urlScraped[i]);
  	}
  	var numberPage=$('.filter_content').text().split('\n')[4].trim().match(/\d+/)[0];
  	numberPage=Math.floor(numberPage/10)
  	return {url,numberPage};
	} 
  catch (e) {
    console.error(e);
    process.exit(1);
  }
}

module.exports.scrapeUrlRestaurantMichelin = async url => {
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return parseUrlRestaurantMichelin(data);
  }

  console.error(status);

  return null;
};
module.exports.scrapeUrlRestaurantMaitresRestaurateurs = async (url,pageCounter) => {
  

  const response = await axios.post('https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult', querystring.stringify({ page:pageCounter ,request_id: '6c8167688245175a1aed8cba7bcd13c5' }));
  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return parseUrlRestaurantMaitresRestaurateurs(data);
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
