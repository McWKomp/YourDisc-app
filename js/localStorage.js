
class List {
    constructor(name, phoneNumber, eMail) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.eMail = eMail;

    }
}

class UI {


    static displayList() {
        const lists = LStore.getElement();
        lists.forEach((list) => UI.addElementToList(list));
    }

    static addElementToList(list) {
        const elementList = document.querySelector('.table-body');

        const row = document.createElement('tr');

        row.innerHTML = `
                    <td>${list.name}</td>
                    <td>${list.phoneNumber}</td>
                    <td>${list.eMail}</td>
                    <td><a href="#" class="delete btn btn-outline-danger d-flex align-items-center justify-content-center fw-bold" style="width:30px; height:30px;">X</a></td>
                `;

        elementList.appendChild(row);
    }

    static deleteRow(element) {
        if (element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();
        }
    }

    static alertShow(message, className) {
        const div = document.createElement("div")
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));

        $(div).css({
            "right": "260px",
            "top": "70px",
            "position": "absolute"
        }).hide();

        mainBody.append(div)

        $(div).fadeIn(200);
        setTimeout(() => {
            $(div).fadeOut('slow', function () { $(div).remove(); });
        }, 3000);

    }

    static inputClear() {

        document.querySelector("#name").value = "";
        document.querySelector("#phone-number").value = "";
        document.querySelector("#e-mail").value = "";

    }
}

class LStore {
    static getElement() {
        let lists;
        if (localStorage.getItem('lists') === null) {
            lists = []
        } else {
            lists = JSON.parse(localStorage.getItem('lists'));
        }
        return lists;
    }

    static addElement(element) {
        const lists = LStore.getElement();
        lists.push(element);
        localStorage.setItem('lists', JSON.stringify(lists));
    }

    static removeElement(eMail) {
        const lists = LStore.getElement();
        lists.forEach((element, i) => {
            if (element.eMail === eMail) {
                lists.splice(i, 1);
            }
        });
        localStorage.setItem('lists', JSON.stringify(lists));
    }
}

var mainBody = document.querySelector(".main-body")

$(".button").click(function () {

    const name = document.querySelector("#name").value;
    const phoneNumber = document.querySelector("#phone-number").value;
    const eMail = document.querySelector("#e-mail").value;

    if (name === "" || phoneNumber === "" || eMail === "") {

        UI.alertShow("Fill all the lines!", "danger")

    } else {

        const elementList = new List(name, phoneNumber, eMail);
        UI.addElementToList(elementList);
        UI.alertShow("Element added!", "success")
        LStore.addElement(elementList);
        UI.inputClear()

    }

});

$(".table-body").click(function (e) {

    UI.alertShow("Element deleted!", "warning")
    UI.deleteRow(e.target);
    LStore.removeElement(e.target.parentElement.previousElementSibling.textContent);

});

document.addEventListener('DOMContentLoaded', UI.displayList);