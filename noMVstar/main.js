let person,
    txtName,
    txtSurname,
    btnSave,
    btnReset,
    divMessage;

function Person(name, surname) {
    this.name = name;
    this.surname = surname;
}

function savePerson(person) {
    // save local data or send them to the server
    console.log("Saved!");
}

window.onload = function() {
    txtName = document.getElementById("txtName");
    txtSurname = document.getElementById("txtSurname");
    btnSave = document.getElementById("btnSave");
    btnReset = document.getElementById("btnReset");
    divMessage = document.getElementById("divMessage");

    person = new Person("John", "Smith");

    txtName.value = person.name;
    txtSurname.value = person.surname;

    btnSave.onclick = function() {
        if (txtName.value && txtSurname.value) {
            person.name = txtName.value;
            person.surname = txtSurname.value;
            savePerson(person);
            divMessage.innerHTML = "Saved!";
        } else {
            divMessage.innerHTML = "Enter name and surname";
        }
    };

    btnReset.onclick = function() {
        txtName.value = "";
        txtSurname.value = "";
        divMessage.innerHTML = "";
        person.name = "";
        person.surname = "";
    };
};