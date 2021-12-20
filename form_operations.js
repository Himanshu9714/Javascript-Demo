var selectedRow = null;

var button = document.createElement('button');
button.type = 'button'; 
button.id = 'cancel';
button.value = 'cancel'; 
button.className = 'btn';
button.innerHTML = 'Cancel';

var countryDropDown = document.getElementsByTagName("select")[0];
var stateDropDown = document.getElementsByTagName("select")[1];
var cityDropDown = document.getElementsByTagName("select")[2];

var indexes = JSON.parse('{"Himanshu": [103, 11, 262], "Hrithik": [103, 21, 342]}');

function onFormSubmit() {
    var formData = readFormData();

    if (selectedRow == null) {
        persons_obj.push(formData);
        let len = persons_obj.length;
        updateTable(len);
        selectedRow = -1;
        resetForm();
        selectedRow = null;
    }
    else {
        updateRecord(formData, selectedRow);
        selectedRow = null;
        resetForm();
    }
};

function getCheckedBoxes(chkboxName) {
    var checkboxes = document.getElementsByName(chkboxName);
    var checkboxesChecked = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkboxesChecked.push(checkboxes[i].value);
        }
    }
    return checkboxesChecked.length > 0 ? checkboxesChecked : null;
}

function readFormData() {
    var formData = {};
    formData["name"] = document.querySelector("input[type='text']").value;
    formData["email"] = document.querySelector("input[type='email']").value;
    formData["age"] = document.querySelector("input[type='date']").value;
    formData["gender"] = document.querySelector('input[name=gender]:checked').value;
    formData["hobbies"] = getCheckedBoxes("messageCheckbox");
    formData["country"] = countryDropDown.options[countryDropDown.selectedIndex].text;
    formData["state"] = stateDropDown.options[stateDropDown.selectedIndex].text;
    formData["city"] = cityDropDown.options[cityDropDown.selectedIndex].text;

    if (document.querySelector("input[type='submit']").value === "Update") {
        delete indexes[formData["name"]];
        indexes[formData["name"]] = [countryDropDown.selectedIndex, stateDropDown.selectedIndex, cityDropDown.selectedIndex];
        indexes = JSON.stringify(indexes);
        indexes = JSON.parse(indexes);
    }
    else {
        indexes[formData["name"]] = [countryDropDown.selectedIndex, stateDropDown.selectedIndex, cityDropDown.selectedIndex];
        indexes = JSON.stringify(indexes);
        indexes = JSON.parse(indexes);
    }
    return formData;
};

function resetForm() {
    document.getElementById('personForm').reset();

    if (selectedRow == null) {
        var ele = document.getElementById("cancel");
        ele.parentNode.removeChild(ele);
    }
    var states_selected = document.getElementsByTagName("select")[1];
    var cities_selected = document.getElementsByTagName("select")[2];

    while (states_selected.firstChild) { states_selected.removeChild(states_selected.firstChild); }
    while (cities_selected.firstChild) { cities_selected.removeChild(cities_selected.firstChild); }

    var select_option = document.createElement("option");
    var select_option2 = document.createElement("option");
    var textNode = document.createTextNode("Select");
    var textNode2 = document.createTextNode("Select");

    select_option.appendChild(textNode);
    select_option2.appendChild(textNode2);
    select_option.value = '-';
    select_option2.value = '-';
    states_selected.appendChild(select_option);
    cities_selected.appendChild(select_option2);
    document.querySelector("input[type='submit']").value = "Save";
};

function genderChecked(i) {
    let male = document.getElementsByName("gender")[0].value;
    if (male === persons_obj[i].gender) {
        document.getElementsByName("gender")[0].checked = true;
    }
    else {
        document.getElementsByName("gender")[1].checked = true;
    }
};

function checkboxesChecked(i) {
    let checkboxes = persons_obj[i].hobbies;
    let hobbies = ["Music", "Singing", "Reading"];

    for (let j = 0; j < 3; j++) {
        if (checkboxes.indexOf(hobbies[j]) > -1) {
            document.getElementsByName("messageCheckbox")[j].checked = true;
        }
    }
};

function onEdit(i) {
    selectedRow = i;
    if (searched === true) {
        for (let indx = 0; indx < persons_obj.length; indx++){
            if (persons_obj[i]["name"] === persons_obj[indx]["name"]) {
                i = indx;
                break;
            }
        }
    }
    if (i>=persons_obj.length) {
        for (let ind=0; ind<persons_obj.length; ind++) {
            if (persons_obj[i-1]["name"] == persons_obj[ind]["name"]) {
                i = ind;
                break;
            }
        }
    }
    resetForm();
    document.querySelector("input[type='submit']").value = "Update";
    document.querySelector("input[type='text']").value = persons_obj[i].name;
    document.querySelector("input[type='email']").value = persons_obj[i].email;
    document.querySelector("input[type='date']").value = persons_obj[i].age;
    genderChecked(i);
    checkboxesChecked(i);
    document.getElementsByTagName("select")[0].selectedIndex = indexes[persons_obj[i].name][0];
    country.onchange();
    document.getElementsByTagName("select")[1].selectedIndex = indexes[persons_obj[i].name][1];
    state.onchange();
    document.getElementsByTagName("select")[2].selectedIndex = indexes[persons_obj[i].name][2];

    button.onclick = function () {
        selectedRow = null;
        resetForm();
    };
    const form = document.getElementsByName('lastTd')[0];
    form.appendChild(button);
};

function updateRecord(formData, i) {
    document.querySelector("input[type='submit']").value = "Save";
    for (const x in persons_obj[i]) {
        persons_obj[i][x] = formData[x];
    }
    clearTable();
    updateTable();
};

function onDelete(i) {
    if (confirm("Are you sure?")) {
        delete indexes[persons_obj[i].name];
        persons_obj.splice(i, 1);
        clearTable();
        updateTable();
    }
};