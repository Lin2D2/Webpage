
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
            callback(xobj.responseText);
          }
    };
    xobj.send(null);
 }

 function init_plan() {
    loadJSON(function(response) {
     // Parse JSON string into object
     let dict = JSON.parse(response)
     let day = reverse_day_state(dict)
     set_plan_data(dict[day]["table"]);
     set_title(dict[day]["title"]);
     set_message(dict[day]["message"]);
    });
   }

function filter_plan() {
    console.log("filter");
    loadJSON(function(response) {
        // Parse JSON string into object
        let dict = JSON.parse(response)
        let day = day_state(dict)
        let filter_for = document.getElementById("filter_input").value;
        if(filter_for == "") {filter_for = null};
        let filter_in = document.getElementById("filter_select").value;
        set_plan_data(dict[day]["table"], filter_for, filter_in);
        set_title(dict[day]["title"]);
        set_message(dict[day]["message"]);
       });
}

init_plan();

function reverse_day_state(dict) {
    for(i = 0; i < sizeObj(dict); i++) {
        if(dict[i]["title"] != document.getElementById("title").innerHTML) {
            return i;
        }
    }
};

function day_state(dict) {
    for(i = 0; i < sizeObj(dict); i++) {
        if(dict[i]["title"] == document.getElementById("title").innerHTML) {
            return i;
        }
    }
};

function set_message(message) {
    document.getElementById("message").innerHTML = message;
};

function set_title(title) {
    document.getElementById("title").innerHTML = title;
};

function set_plan_data(raw_plan_data, filter_for=null, filter_in=null) {
    document.getElementById('t-body').innerHTML = ``;
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
        if(filter_for == null) {
            document.getElementById('t-body').innerHTML += html_plan_odd;
            document.getElementById('t-body').innerHTML += html_plan_even;
        }
        else{
            if(raw_plan_data[i][filter_in] == filter_for){
                document.getElementById('t-body').innerHTML += html_plan_odd;
            };
            if(raw_plan_data[i + 1][filter_in] == filter_for){
                document.getElementById('t-body').innerHTML += html_plan_even;
            }
        };
    };
};
