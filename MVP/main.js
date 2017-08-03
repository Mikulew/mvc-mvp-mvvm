let Model = (function() {

    function Model(name, surname) {
        this.name = name;
        this.surname = surname;
    }

    return Model;
})();

let View = (function() {

    function View(presenter) {
        let self = this,
            btnSave = document.getElementById("btnSave"),
            btnReset = document.getElementById("btnReset");

        self.presenter = presenter;

        btnSave.onclick = function() {
            self.save();
        };

        btnReset.onclick = function() {
            self.clear();
        };
    }

    View.prototype.clear = function() {
        let txtName = document.getElementById("txtName"),
            txtSurname = document.getElementById("txnSurname"),
            divMessage = document.getElementById("divMessage");

        txtName.value = "";
        txtSurname.value = "";
        divMessage.innerHTML = "";
    };

    Object.defineProperty(View.prototype, "message", {
        set: function(message) {
            let divMessage = document.getElementById("divMessage");
            divMessage.innerHTML = message;
        }
    });

    Object.defineProperty(View.prototype, "name", {
        set: function(value) {
            let txtName = document.getElementById("txtName");
            txtName.value = value;
        }
    });

    Object.defineProperty(View.prototype, "surname", {
        set: function(value) {
            let textSurname = document.getElementById("txtSurname");
            txtSurname.value = value;
        },
        enumerable: true,
        configurable: true
    });

    View.prototype.save = function() {
        let txtName = document.getElementById("txtName"),
            txtSurname = document.getElementById("txtSurname"),
            data = {
                name: txtName.value,
                surname: txtSurname.value
            };
        this.presenter.save(data);
    };

    return View;
})();

let Presenter = (function() {

    function Presenter() {
        //
    }

    Presenter.prototype.initialize = function(model, view) {
        this.model = model;
        this.view = view;
        this.view.name = this.model.name;
        this.view.surname = this.model.surname;
    };

    Presenter.prototype.save = function(data) {
        if(data.name && data.surname) {
            this.model.name = data.name;
            this.model.surname = data.surname;
            this.view.message = "Saved!";
        } else {
            this.view.message = "Enter name and surname!";
        }
    };

    return Presenter;
})();

window.onload = function() {
    let model = new Model("John", "Smith");
    let presenter = new Presenter();
    let view = new View(presenter);
    presenter.initialize(model, view);
};