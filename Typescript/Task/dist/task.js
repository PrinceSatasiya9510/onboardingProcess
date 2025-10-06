document.addEventListener("DOMContentLoaded", function () {
    renderData();
});
const btn = document.querySelector(".addBTN");
let editIndex = null;
btn.addEventListener("click", function () {
    addData();
});
async function updateLocalStorage(response) {
    const rawDataFromLocalStorage = localStorage.getItem("myData");
    if (rawDataFromLocalStorage) {
        const data = await JSON.parse(rawDataFromLocalStorage);
        data.push(response);
        localStorage.setItem("myData", JSON.stringify(data));
    }
    else {
        localStorage.setItem("myData", JSON.stringify([response]));
    }
    renderData();
}
async function getDataFromLocalStorage() {
    const rawDataFromLocalStorage = localStorage.getItem("myData");
    if (rawDataFromLocalStorage) {
        const data = await JSON.parse(rawDataFromLocalStorage);
        return data;
    }
    return;
}
function validation() {
    let isValid = true;
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");
    let arrayOfInputDetail = [
        { input: nameInput, error: nameError, message: "name are required!" },
        { input: emailInput, error: emailError, message: "email are requied!" },
        { input: phoneInput, error: phoneError, message: "phone are requied!" }
    ];
    arrayOfInputDetail.forEach(element => {
        if (element.input.value == "") {
            element.error.style.display = "block";
            element.error.innerText = element.message;
            isValid = false;
        }
        else {
            element.error.style.display = "none";
            isValid = true;
        }
    });
    return isValid;
}
async function addData() {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const valid = validation();
    if (!valid) {
        return;
    }
    if (editIndex != null) {
        const data = await getDataFromLocalStorage();
        if (data) {
            data[editIndex].name = nameInput.value;
            data[editIndex].email = emailInput.value;
            data[editIndex].phone = Number(phoneInput.value);
            localStorage.setItem("myData", JSON.stringify(data));
            renderData();
        }
        editIndex = null;
    }
    else {
        const data = {
            id: Date.now(),
            name: nameInput.value,
            email: emailInput.value,
            phone: Number(phoneInput.value)
        };
        updateLocalStorage(data);
    }
    nameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
}
async function renderData() {
    const tbody = document.querySelector("tbody");
    const myData = await getDataFromLocalStorage();
    if (myData) {
        let tr = "";
        myData.forEach(element => {
            tr += `
            <tr>
                <td>${element.name}</td>
                <td>${element.email}</td>
                <td>${element.phone}</td>
                    <td>
                        <button class="editBTN" data-id="${element.id}">EDIT</button>
                        <button class="deleteBTN" data-id="${element.id}">DELETE</button>
                    </td>
            </tr>
            `;
        });
        if (tbody) {
            tbody.innerHTML = tr;
            tbody.addEventListener("click", handleTableButtonClick);
        }
    }
}
function handleTableButtonClick(event) {
    const target = event.target;
    if (target.classList.contains("editBTN")) {
        const id = target.getAttribute("data-id");
        id ? editData(id) : null;
    }
    else if (target.classList.contains("deleteBTN")) {
        const id = target.getAttribute("data-id");
        id ? deleteData(id) : null;
    }
}
async function editData(response) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const myData = await getDataFromLocalStorage();
    if (myData) {
        const index = myData?.findIndex(ele => ele.id.toString() == response);
        nameInput.value = myData[index]?.name ? myData[index]?.name : "";
        emailInput.value = myData[index]?.email ? myData[index]?.email : "";
        phoneInput.value = myData[index]?.phone ? myData[index]?.phone.toString() : "";
        editIndex = index;
    }
}
async function deleteData(response) {
    const myData = await getDataFromLocalStorage();
    let deleteData = myData?.filter(ele => ele.id.toString() !== response);
    localStorage.setItem("myData", JSON.stringify(deleteData));
    renderData();
}
export {};
