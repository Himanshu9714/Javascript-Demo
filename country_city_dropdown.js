var country = document.getElementsByTagName("select")[0];
var state = document.getElementsByTagName("select")[1];
var city = document.getElementsByTagName("select")[2];
function dropDownSet() {
    var countryIndex = null; 

    country.onchange = function () {
        state.length = 1;
        city.length = 1; 

        var index = -1;
        var val = this.value
        var filteredObj = Countries.find(function (cntry, i) {
            if (cntry.iso2 === val) {
                index = i;
                return i;
            }
        });
        countryIndex = index;
        for (var i = 0; i < Countries[index].states.length; i++) {
            var option = Countries[index].states[i].name;
            var ele = document.createElement("option");
            ele.textContent = option;
            ele.value = Countries[index].states[i].state_code;
            state.add(ele);
        }
    };

    state.onchange = function () {
        city.length = 1;
        let indexState = -1;
        var val = this.value;
        var filteredObj = Countries[countryIndex].states.find(function (stte, i) {
            if (stte.state_code === val) {
                indexState = i;
                return i;
            }
        });

        for (var k = 0; k < Countries[countryIndex].states[indexState].cities.length; k++) {
            var option = Countries[countryIndex].states[indexState].cities[k].name;
            var ele = document.createElement("option");
            ele.textContent = option;
            ele.value = Countries[countryIndex].states[indexState].cities[k].id;
            city.add(ele);
        }
    };
    for (let i = 0; i < Countries.length; i++) {
        var option = Countries[i].name;
        var ele = document.createElement("option");
        ele.textContent = option;
        ele.value = Countries[i].iso2;
        country.add(ele);
    }
};
dropDownSet();

