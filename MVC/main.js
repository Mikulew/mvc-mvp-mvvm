let Model = (function() {

    function Model(name, surname) {
        this.name = name;
        this.surname = surname;
    }

    return Model;
})();

let View = (function() {

    function View(model, controller) {
        let self = this,
            txtName = document.getElementById("txtName"),
            txtSurname = document.getElementById("txtSurname"),
            btnSave = document.getElementById("btnSave"),
            btnReset = document.getElementById("btnReset");

        self.controller = controller;
        txtName.value = model.name;
        txtSurname.value = model.surname;

        btnSave.onclick = function() {
            self.save();
        };

        btnReset.onclick = function() {
            self.clear();
        };
    }

    View.prototype.clear = function() {
        let txtName = document.getElementById("txtName"),
            txtSurname = document.getElementById("txtSurname"),
            divMessage = document.getElementById("divMessage");

        txtName.value = "";
        txtSurname.value = "";
        divMessage.innerHTML = "";
    };

    View.prototype.save = function() {
        let txtName = document.getElementById("txtName"),
            txtSurname = document.getElementById("txtSurname"),
            data = {
                name: txtName.value,
                surname: txtSurname.value
            };

        this.controller.save(data);
    };

    Object.defineProperty(View.prototype, "message", {
        set: function(message) {
            let divMessage = document.getElementById("divMessage");
            divMessage.innerHTML = message;
        },
        enumerable: true,
        configurable: true
    });

    return View;
})();

let Controller = (function() {

    function Controller() {
        //
    }

    Controller.prototype.initialize = function(model, view) {
        this.model = model;
        this.view = view;
    };

    Controller.prototype.save = function(data) {
        if(data.name && data.surname) {
            this.model.name = data.name;
            this.model.surname = data.surname;
            this.view.message = "Saved!";
        } else {
            this.view.message = "Enter name and surname!";
        }
    };

    return Controller;
})();

window.onload = function() {
    let model = new Model("John", "Smith");
    let controller = new Controller();
    let view = new View(model, controller);
    controller.initialize(model, view);
};