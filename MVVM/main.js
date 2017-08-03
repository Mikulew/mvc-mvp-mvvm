let Model = (function() {

    function Model(name, surname) {
        this.name = name;
        this.surname = surname;
    }

    return Model;
})();

let View = (function() {
    function View(modelView) {
        let self = this,
            txtName = document.getElementById("txtName"),
            txtSurname = document.getElementById("txtSurname"),
            btnSave = document.getElementById("btnSave"),
            btnReset = document.getElementById("btnReset");

        self.modelView = modelView;
        txtName.value = modelView.name;
        txtSurname.value = modelView.surname;

        btnSave.onclick = function() {
            self.save();
        };

        btnReset.onclick = function() {
            self.clear();
        }
    }

    View.prototype.clear = function() {
        let txtName = document.getElementById("txtName"),
            txtSurname = document.getElementById("txtSurname"),
            divMessage = document.getElementById("divMessage");

        txtName.value = "";
        txtSurname.value = "";
        divMessage.innerHTML = "";
    };

    View.prototype.setMessage = function(message) {
        let divMessage = document.getElementById("divMessage");
        divMessage.innerHTML = message;
    };

    View.prototype.save = function() {
        let txtName = document.getElementById("txtName"),
            txtSurname = document.getElementById("txtSurname"),
            data = {
                name: txtName.value,
                surname: txtSurname.value
            };
        this.modelView.save(data, this.setMessage);
    };

    return View;
})();

let ViewModel = (function() {
    function ViewModel(model) {
        this.model = model;
    }

    Object.defineProperty(ViewModel.prototype, "name", {
        get: function() {
            return this.model.name;
        }
    });

    Object.defineProperty(ViewModel.prototype, "surname", {
        get: function() {
            return this.model.surname;
        }
    });

    ViewModel.prototype.save = function(data, callback) {
        if(data.name && data.surname) {
            this.model.name = data.name;
            this.model.surname = data.surname;

            if(callback) {
                callback("Saved!");
            }
        } else {
            if(callback) {
                callback("Enter name and surname!");
            }
        }
    };

    return ViewModel;
})();

window.onload = function() {
    let model = new Model("John", "Smith");
    let viewModel = new ViewModel(model);
    let view = new View(viewModel);
};