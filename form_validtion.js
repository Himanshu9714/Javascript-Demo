function validateForm() {
    var name = document.querySelector("input[type='text']").value;
    var email = document.querySelector("input[type='email']").value;
    var age = document.querySelector("input[type='date']").value;
    var gender = document.querySelectorAll('input[name=gender]');
    var hobbies = document.getElementsByName("messageCheckbox");
  
    var country = document.getElementsByTagName("select")[0];
    var state = document.getElementsByTagName("select")[1];
    var city = document.getElementsByTagName("select")[2];

    var err_disp = document.getElementsByTagName("span");

    let name_err = email_err = age_err = gender_err = hobbies_err = country_err = state_err = city_err = true;

    if (name == "") {
        err_disp[0].textContent = "Please Enter Your Name!";
        err_disp[0].style.color = "red";
    }
    else {
        let pattern = /^[a-zA-Z\s]+$/;
        if (pattern.test(name) === false) {
            err_disp[0].textContent = "Enter Valid Name!";
            err_disp[0].style.color = "red";
        }
        else { err_disp[0].textContent = ""; name_err = false; }
    }

    if (email == "") {
        err_disp[1].textContent = "Please Enter Valid Mail!";
        err_disp[1].style.color = "red";
    }
    else {
        let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;
        if (pattern.test(email) === false) {
            err_disp[1].textContent = "Enter Valid Mail!";
            err_disp[1].style.color = "red";
        }
        else { err_disp[1].textContent = ""; email_err = false; }
    }

    if (age == "") {
        err_disp[2].textContent = "Please Select Your DOB!";
        err_disp[2].style.color = "red";
    }
    else {
        err_disp[2].textContent = ""; age_err = false;
    }


    if (gender[0].checked == false && gender[1].checked == false) {
        err_disp[3].textContent = "Please Select Your Gender!";
        err_disp[3].style.color = "red";
    }
    else { err_disp[3].textContent = ""; gender_err = false; }

    if (hobbies[0].checked == false && hobbies[1].checked == false && hobbies[2].checked == false) {
        err_disp[4].textContent = "Please Select One of the Checkboxes!";
        err_disp[4].style.color = "red";
    }
    else { err_disp[4].textContent = ""; hobbies_err = false; }

    if (country.options[country.selectedIndex].value == "-") {
        err_disp[5].textContent = "Please Select the Country!";
        err_disp[5].style.color = "red";
    }
    else { err_disp[5].textContent = ""; country_err = false; }

    if (state.options[state.selectedIndex].value == "-") {
        err_disp[6].textContent = "Please Select the State!";
        err_disp[6].style.color = "red";
    }
    else { err_disp[6].textContent = ""; state_err = false; }

    if (city.options[city.selectedIndex].value == "-") {
        err_disp[7].textContent = "Please Select the City!";
        err_disp[7].style.color = "red";
    }
    else { err_disp[7].textContent = ""; city_err = false; }

    if ((name_err || email_err || age_err || gender_err || country_err || state_err || city_err) == true) {
        return false;
    }
    else { onFormSubmit(); }
};