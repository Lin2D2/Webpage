
const url_login = "https://gymherderschule.de/iserv/login_check";
const url_today = "https://gymherderschule.de/iserv/infodisplay/file/23/infodisplay/0/SchuelerOnline/subst_002.htm";

let day = 0;

function sizeObj(obj) {
    return Object.keys(obj).length;
  }

/* how to import json in java script!!!!!! */

function loadJSON(callback) {   

    let xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', '/planstuff/plan.json', true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

 function init() {
    loadJSON(function(response) {
     // Parse JSON string into object
     let dict = JSON.parse(response)
     set_plan_data(dict[day]["table"]);
     set_title(dict[day]["title"]);
     set_message(dict[day]["message"]);
    });
   }

init();

function set_message(message) {
    document.getElementById("message").innerHTML = message;
};

function set_title(title) {
    document.getElementById("title").innerHTML = title;
};

function set_plan_data(raw_plan_data) { 
    for(i = 0; i < sizeObj(raw_plan_data) - 1; i+= 2) {
        const html_plan_odd = `
            <tr class="odd">
                <td class="title">${raw_plan_data[i]["klasse"]}</td>
                <td class=" tablesaw-priority-1">${raw_plan_data[i]["stunde"]}</td>
                <td class=" tablesaw-priority-5">${raw_plan_data[i]["vertreter"]}</td>
                <td class=" tablesaw-priority-4">${raw_plan_data[i]["fach"]}</td>
                <td class=" tablesaw-priority-3">${raw_plan_data[i]["raum"]}</td>
                <td class=" tablesaw-priority-2">${raw_plan_data[i]["(lehrer)"]}</td>
                <td class=" tablesaw-priority-1">${raw_plan_data[i]["(fach)"]}</td>
                <td class=" tablesaw-priority-2">${raw_plan_data[i]["(raum)"]}</td>
                <td class=" tablesaw-priority-5">${raw_plan_data[i]["vertretungs-text"]}</td>
                <td class=" tablesaw-priority-6">${raw_plan_data[i]["stattvertr.von"]}</td>
                <td class=" tablesaw-priority-5">${raw_plan_data[i]["mitbetreuung"]}</td>
                <td class=" tablesaw-priority-1">${raw_plan_data[i]["entfall"]}</td>
                <td class=" tablesaw-priority-0">${raw_plan_data[i]["n.druck.(n)"]}</td>
            </tr>`;
        
        const html_plan_even = `
            <tr class="even">
                <td class="title">${raw_plan_data[i + 1]["klasse"]}</td>
                <td class=" tablesaw-priority-1">${raw_plan_data[i + 1]["stunde"]}</td>
                <td class=" tablesaw-priority-5">${raw_plan_data[i + 1]["vertreter"]}</td>
                <td class=" tablesaw-priority-4">${raw_plan_data[i + 1]["fach"]}</td>
                <td class=" tablesaw-priority-3">${raw_plan_data[i + 1]["raum"]}</td>
                <td class=" tablesaw-priority-2">${raw_plan_data[i + 1]["(lehrer)"]}</td>
                <td class=" tablesaw-priority-1">${raw_plan_data[i + 1]["(fach)"]}</td>
                <td class=" tablesaw-priority-2">${raw_plan_data[i + 1]["(raum)"]}</td>
                <td class=" tablesaw-priority-5">${raw_plan_data[i + 1]["vertretungs-text"]}</td>
                <td class=" tablesaw-priority-6">${raw_plan_data[i + 1]["stattvertr.von"]}</td>
                <td class=" tablesaw-priority-5">${raw_plan_data[i + 1]["mitbetreuung"]}</td>
                <td class=" tablesaw-priority-1">${raw_plan_data[i + 1]["entfall"]}</td>
                <td class=" tablesaw-priority-0">${raw_plan_data[i + 1]["n.druck.(n)"]}</td>
            </tr>`;

            document.getElementById('t-body').innerHTML += html_plan_odd;
            document.getElementById('t-body').innerHTML += html_plan_even;

    };
};
