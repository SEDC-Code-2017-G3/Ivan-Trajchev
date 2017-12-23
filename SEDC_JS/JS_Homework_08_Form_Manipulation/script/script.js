function Contact(id, firstName, lastName, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.id = id;
}

function AdressBook() {
    let contacts = [];
    let index = 1;

    let form = document.getElementById("contacts-form");
    let table = document.getElementById("contacts-table");
    let save = document.getElementById("contacts-op-save");
    let discard = document.getElementById("contacts-op-discard");

    this.init = function () {
        let self = this;
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            let name = this.first_name.value;
            let lastName = this.last_name.value;
            let email = this.email.value;
            let contact = new Contact(index, name, lastName, email);

            self.addRow(contact);
            index++;
            this.reset();

        });

        discard.addEventListener("click", function () {
            forms.reset();
        });
    }

    this.addRow = function (contact) {
     
        let tr = document.createElement("tr");
        let attr = document.createAttribute("id");
        attr.value = "row-" + contact.id;
        tr.setAttributeNode(attr);

        let td = document.createElement("td");
        td.textContent = contact.id;
        tr.appendChild(td);

        let td1 = document.createElement("td");
        td1.textContent = contact.firstName;
        tr.appendChild(td1);

        let td2 = document.createElement("td");
        td2.textContent = contact.lastName;
        tr.appendChild(td2);

        let td3 = document.createElement("td");
        td3.textContent = contact.email;
        tr.appendChild(td3);

        let td4 = document.createElement("td");
        td4.innerHTML = `<a href='#' id="edit-${contact.id}">edit</a> | <a href='#' id="delete-${contact.id}">delete</a>`;
        tr.appendChild(td4);
        table.appendChild(tr);

        this.editRow(contact, td1, td2, td3);
   
    }

    this.editRow = function (contact, td1, td2, td3) {

        let switchBtn = false;
        let delId = document.getElementById(`delete-${contact.id}`);
        let editId = document.getElementById(`edit-${contact.id}`);
        let temp = [];

        console.log(editId);


        delId.addEventListener("click", function () {
            if (!switchBtn) {
                let row = document.getElementById("row-" + contact.id);
                row.remove();
            } else {
                endEdit(false);
            }

        });

        editId.addEventListener("click", function () {

            if (!switchBtn) {
                switchBtn = true;
                this.innerText = "save";
                delId.innerText = "discard";

                temp[0] = contact.firstName;
                temp[1] = contact.lastName;
                temp[2] = contact.email;
                temp[3] = td1.style.backgroundColor;

                let td1edit = document.createAttribute("contenteditable");
                td1edit.value = "true";
                td1.setAttributeNode(td1edit);
                td1.style.backgroundColor = "#ccd6fb";
                let td2edit = document.createAttribute("contenteditable");
                td2edit.value = "true";
                td2.setAttributeNode(td2edit);
                td2.style.backgroundColor = "#ccd6fb";
                let td3edit = document.createAttribute("contenteditable");
                td3edit.value = "true";
                td3.setAttributeNode(td3edit);
                td3.style.backgroundColor = "#ccd6fb";

            } else {

                endEdit(true);
            }


        });

        function endEdit(save) {

            switchBtn = false;
            editId.innerText = "edit";
            delId.innerText = "delete";

            if (save) {
                contact.firstName = td1.innerText;
                contact.lastName = td2.innerText;
                contact.email = td3.innerText;
            } else {

                td1.textContent = temp[0];
                td2.textContent = temp[1];
                td3.textContent = temp[2];
            }

            td1.removeAttribute("contenteditable");
            td1.style.backgroundColor = temp[3];;
            td2.removeAttribute("contenteditable");
            td2.style.backgroundColor = temp[3];;
            td3.removeAttribute("contenteditable");
            td3.style.backgroundColor = temp[3];
        }
    }
}


let adressBook = new AdressBook();
adressBook.init();