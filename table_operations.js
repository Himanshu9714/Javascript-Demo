var persons_obj =
    [{
        "name": "Himanshu",
        "email": "himanshu.tagline@gmail.com",
        "age": "2005-08-21",
        "gender": "Male",
        "hobbies": "Singing",
        "country": "India",
        "state": "Gujarat",
        "city": "Surat", 
    }, 
    {
        "name": "Hrithik",
        "email": "hrithik@gmail.com",
        "age": "1975-02-12",
        "gender": "Male",
        "hobbies": "Music",
        "country": "India",
        "state": "Maharashtra",
        "city": "Mumbai",
    }];
function updateTable(len = 1) {
    try {
        var keys = Object.keys(persons_obj[0]);
        var date = new Date();
        for (let i = len - 1; i < persons_obj.length; i++) {
            var table = document.getElementById("personDetails").getElementsByTagName('tbody')[0];
            var row = table.insertRow();
            for (let j = 0; j < 8; j++) {
                var col = row.insertCell(j);
                if (keys[j] == "age") {
                    col.innerHTML = date.getFullYear() - new Date(persons_obj[i]["age"]).getFullYear();
                }
                else { col.innerHTML = persons_obj[i][keys[j]]; }
            }
            cell9 = row.insertCell(8);
            cell9.innerHTML = `<button onClick="onEdit(${i})">Edit</button>
                        <button onClick="onDelete(${i})">Delete</button>`;
            cell10 = row.insertCell(9);
            cell10.innerHTML = ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' +
                ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + date.getFullYear() + ' ' +
                ((date.getHours() > 9 ? date.getHours() : ('0' + date.getHours()))) + ':' +
                ((date.getMinutes() > 9 ? date.getMinutes() : ('0' + date.getMinutes())));
        }
    }
    catch (err) { console.log(err); }
};

function clearTable() {
    var table = document.getElementById("personDetails");
    while (table.rows.length > 1) {
        table.deleteRow(-1);
    }
};
var searched = false;
var filtered = [];
document.getElementById("reset").hidden = true;
function searchTable() {
    var searchQuery = document.getElementById("search").value;

    filtered = [];
    var persons_arr = [];
    for (let j = 0; j < persons_obj.length; j++) {
        var nested_arr = []
        for (let x in persons_obj[j]) {
            if (x == "age") {
                nested_arr.push((new Date()).getFullYear() - (new Date(persons_obj[j][x]).getFullYear()));
            }
            else { nested_arr.push(persons_obj[j][x]); }
        }
        persons_arr.push(nested_arr);
    }

    for (i = 0; i < persons_obj.length; i++) {

        var match = persons_arr[i].findIndex(element => {
            if (element.toString().toLowerCase().includes(searchQuery.toLowerCase())) { return true; }
        });

        for (let x in persons_obj[i]) {
            if (match > -1) {
                filtered.push(persons_obj[i]);
                break;
            }
        }
    }
    try {
        persons_obj = persons_obj.concat(filtered);
        clearTable();
        searched = true;
        updateTable(persons_obj.length - filtered.length + 1);
    }
    catch (err) { console.log(err); }
    document.getElementById("reset").hidden = false;
};

function resetTable() {
    searched = false;
    persons_obj.splice(persons_obj.length - filtered.length, filtered.length);
    clearTable();
    updateTable();
    document.getElementById("reset").hidden = true;
    document.getElementById("search").value = "";
};

function filterNameWise() {
    var dropDownVal = document.getElementById("dropDownSort");
    dropDownVal.onchange = function () {
        if (dropDownVal.value == "ascending") {
            try {
                persons_obj.sort(function (a, b) {
                    var name1 = a.name.toUpperCase();
                    var name2 = b.name.toUpperCase();
                    if (name1 < name2) { return -1; }
                    if (name1 > name2) { return 1; }
                    return 0;
                });
            }
            catch (err) { console.log(err); }
        }

        else if (dropDownVal.value == "descending") {
            try {
                persons_obj.sort(function (a, b) {
                    var name2 = b.name.toUpperCase();
                    var name1 = a.name.toUpperCase();
                    if (name1 > name2) { return -1; }
                    if (name1 < name2) { return 1; }
                    return 0;
                });
            }
            catch (err) { console.log(err); }
        }
        clearTable();
        updateTable();
    };
};
filterNameWise();