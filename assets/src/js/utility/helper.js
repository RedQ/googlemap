import request from 'superagent';
import  rn  from 'random-number';

function setOutputIntoDiv(output, objectName, object) {
  if (typeof object === 'undefined') {
    return;
  }
  let values = {};
  try {
    values = JSON.parse(document.getElementById(output).value);
  } catch (e) {}
  values[objectName] = object;
  document.getElementById(output).value = JSON.stringify(values);
}
function visibleDiv(divName, visiblity) {
  if (visiblity === true) {
    document.getElementById(divName).style.display = 'block';
  } else {
    document.getElementById(divName).style.display = 'none';
  }
}
function randomNumber(min, max) {
  min = min ? min : 1;
  max = max ? max : 1111111;
  // return Math.floor(Math.random() * min) + max - min + 1;
  const options = {
    min,
    max,
    integer: true,
  };
  return rn(options);
}

// For All ajax handling
const http = {
  post : function( data ){
    if(typeof data === 'object'){
      const url = GOOGLE_MAP_AJAX_DATA.admin_url;
      data.action = GOOGLE_MAP_AJAX_DATA.action;
      data.nonce = GOOGLE_MAP_AJAX_DATA.nonce;
      let param = '';
  		if( data ){
  			param = jQuery.param(data)
  		}
  		return request.post(url).send(param).set('Accept', 'application/x-www-form-urlencoded');
    }
  }
}

export {
  setOutputIntoDiv,
  visibleDiv,
  randomNumber,
  http,
}
