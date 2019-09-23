import request from "../require/request/request.js";
            
const url1 = "https://gymherderschule.de/iserv/login_check";
const url2 = "https://gymherderschule.de/iserv/infodisplay/file/23/infodisplay/0/SchuelerOnline/subst_002.htm";
request('http://www.google.com', function (error, response, body) {
console.log('error:', error);
console.log('statusCode:', response && response.statusCode); 
console.log('body:', body);
});

// void get_plan(webpage_content) {
// plan = webpage_content.getElementsByClassName("mon_list");
// }