window.onload = function () {
    class Person {
        constructor(firstName, lastName, gender, birthDate, city) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.gender = gender;
            this.birthDate = birthDate;
            this.city = city;
        }
        Print() {

        }
    }

    class Student extends Person {
        constructor(firstName, lastName, gender, birthDate, city, yearStarted, department, group) {
            super(firstName, lastName, gender, birthDate, city);
            this.yearStarted = yearStarted;
            this.department = department;
            this.group = group;

        }
    }

    class Teacher extends Person {
        constructor(firstName, lastName, gender, birthDate, city, subject, teachingGroups) {
            super(firstName, lastName, gender, birthDate, city);
            this.subject = subject;
            this.teachingGroups = teachingGroups;
        }
    }

    class Book {
        constructor(role) {
            this.teacher = [];
            this.student = [];
            this.table = {
                student: document.querySelector(".table__student"),
                teacher: document.querySelector(".table__teacher"),
            }
        }
        Add(role, person) {
            this[role].push(person);
        }
        Remove() {

            for (let role in this.table) {
                let table = this.table[role];
                let checks = table.querySelectorAll(".check");
                checks.forEach((person, index) => {
                    if (person.checked) {
                        this[role].splice(index, 1);
                        table.removeChild(table.childNodes[index + 1]);
                    }
                    person.checked = false;
                });
                table.childNodes.forEach((person, index)=>{
                    if(person.childNodes[1] != undefined)
                        person.childNodes[1].innerText = index;
                });
            };
            
            
        }
        Print(role, person) {
            let parent = this.table[role];
            let row = document.createElement("tr");
            parent.appendChild(row);

            let tdArr = [];
            for (let i = 0; i < 4; i++) {
                tdArr.push(document.createElement("td"));
                row.appendChild(tdArr[i]);
            }

            let td_3;
            role == "student" ? td_3 = person.department : td_3 = person.subject
            let fullName = `${person.firstName} ${person.lastName}`;

            tdArr[0].innerHTML = `<input type="checkbox" class="check">`;
            tdArr[1].innerText = this[role].length; // Set the row index
            tdArr[2].innerText = fullName; // Set the name cell
            tdArr[3].innerText = td_3; //Set last cell according to row
        }
    }

    let book = new Book;
    let form = document.forms.form;
    let btnDelete = document.getElementById("btn--delete");
    let roleOptions = document.getElementById("roleOptions");
    let role = null;

    function addOptions(...args) {
        roleOptions.innerHTML = "";
        args.forEach((item) => {
            let label = document.createElement("label");
            let input = document.createElement("input");

            roleOptions.appendChild(label).setAttribute("for", item);
            label.className = "label";
            label.innerText = item.replace(/([A-Z])/g, ' $1');

            roleOptions.appendChild(input).setAttribute("name", item);
            input.setAttribute("required", "true");
            input.setAttribute("maxlength", "20");
            input.id = item;
            input.type = "text";
        });
    }

    form.addEventListener("change", function (evt) {
        let oldRole = role;
        role = this.role.value;
        if (role != "" && oldRole != role) {
            if (role == "teacher")
                addOptions("subject", "groups");
            else
                addOptions("yearStarted", "department", "group");
        }
    });

    form.addEventListener("submit", function (evt) {
        evt.preventDefault();
        if(roleOptions.length == 0){
            alert("You didn't select a role!");
        }
        let firstName = this.firstName.value;
        let lastName = this.lastName.value;
        let gender = this.gender.value;
        let birthDate = this.birthDate.value;
        let city = this.city.value;
        if (role == "teacher") {
            let subject = roleOptions.children[1].value;
            let groups = roleOptions.children[3].value;
            let teacher = new Teacher(firstName, lastName, gender, birthDate, city, subject, groups);
            book.Add("teacher", teacher);
            book.Print("teacher", teacher);
        } else {
            let yearStarted = roleOptions.children[1].value;
            let department = roleOptions.children[3].value;
            let group = roleOptions.children[5].value;
            let student = new Student(firstName, lastName, gender, birthDate, city, yearStarted, department, group);
            book.Add("student", student);
            book.Print("student", student);
        }
        roleOptions.innerHTML = "";
        this.reset();
    });

    btnDelete.addEventListener("click", function (evt) {

        if(confirm("Are you sure you want to remove the selected user/users"));
            book.Remove();
    });
}