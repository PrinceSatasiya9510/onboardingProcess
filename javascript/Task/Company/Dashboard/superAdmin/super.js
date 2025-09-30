document.addEventListener("DOMContentLoaded", (event) => {
    userLoginOrNot()
    renderComapnyDetail()
    renderAdminDetail()
});
let editIndex = null

async function getCompanyDataFromLocalStorage(response) {
    let data;
    if (response === "adminDetail") {
        data = await JSON.parse(localStorage.getItem(response))
    } else if (response === "companyDetail") {
        data = await JSON.parse(localStorage.getItem(response))
    }
    if (data) {
        return data
    }
}


function updateCompanyData(data, response) {
    localStorage.setItem(response, JSON.stringify(data))
}

function createCompanyPopup() {
    const popupContainer = document.querySelector(".popupContainer")
    popupContainer.style.display = "flex"
}
function removeCreateCompanyPopup() {
    const company_name_error = document.getElementById("company_name_error")
    const input = document.querySelector("#company_name")
    input.value = ""
    company_name_error.style.display = "none"
    const popupContainer = document.querySelector(".popupContainer")
    popupContainer.style.display = "none"
    editIndex = null
}


function inputValidation(input) {
    const company_name_error = document.getElementById("company_name_error")
    if (input.value.trim() == "") {
        company_name_error.style.display = "block"
        return
    }
    company_name_error.style.display = "none"
    return true
}

async function registerNewCompany() {
    const input = document.querySelector("#company_name");
    const profile_picture_Input = document.getElementById("profile_picture");
    let validation = inputValidation(input);
    if (!validation) return;

    let company_data = await getCompanyDataFromLocalStorage("companyDetail") || [];

    if (editIndex) {
        let accessById = company_data.findIndex(ele => ele.company_id === editIndex.company_id);
        company_data[accessById].company_name = input.value;
        let file = profile_picture_Input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                company_data[accessById].profile_picture_path = e.target.result;

                updateCompanyData(company_data, "companyDetail");
                removeCreateCompanyPopup();
                renderComapnyDetail();
                editIndex = null;
            };
            reader.readAsDataURL(file);
            return;
        }

        updateCompanyData(company_data, "companyDetail");
        removeCreateCompanyPopup();
        renderComapnyDetail();
        editIndex = null;
        return;
    }


    let file = profile_picture_Input.files[0];
    if (!file) {
        alert("Please select a profile picture");
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        let url = e.target.result;
        let company = {
            company_id: Date.now(),
            company_name: input.value,
            admin_id: [],
            profile_picture_path: url
        };

        company_data.push(company);

        updateCompanyData(company_data, "companyDetail");
        removeCreateCompanyPopup();
        renderComapnyDetail();
    };

    reader.readAsDataURL(file);
}
async function renderComapnyDetail() {
    const companyContainer = document.querySelector(".companyContainer")
    let company_data = await getCompanyDataFromLocalStorage("companyDetail")
    if (!company_data) {
        return
    }

    let companyElement = ""
    company_data.forEach(element => {
        companyElement += `
        <div class="company" data-id="${element.company_id}">
            <div class="comapnyNameContainer">
            <div id="profilePictureContainer">
                <img id="profile" src="${element.profile_picture_path}" alt="">
                </div>
                <span id="companyNameTagSpan">${element.company_name}</span>
            </div>
            <div class="comapnyActionButtonContainer">
                <div class="circle" onclick="updateCompanyName(${element.company_id})">
                    <i class="ri-pencil-line" title="Edit Comapny Name"></i>
                </div>
                <div class="circle" onclick="renderAdminDetail(${element.company_id})">
                    <i class="ri-table-view" title="View Admin"></i>
                </div>
                <div class="circle" onclick="renderAdminDetailWhenAssign(${element.company_id})">
                    <i class="ri-user-add-line" title="Assgin Admin"></i>
                </div>
            </div>
        </div>
        `
    });
    companyContainer.innerHTML = companyElement
}

function logout() {
    localStorage.removeItem("token")
    window.location.href = "../../authentication/login/login.html"
}


async function renderAdminDetail(company_id) {
    const adminContainer = document.querySelector(".adminContainer")
    adminContainer.innerHTML = ""
    let admin_data = await getCompanyDataFromLocalStorage("adminDetail")
    let withoutSuperAdmin = admin_data.filter(ele => ele.email !== "satasiyaprince9510@gmail.com")



    if (company_id) {
        withoutSuperAdmin = withoutSuperAdmin.filter(ele => {
            let status = ele.companies_id.some(e => e == company_id)
            if (status) {
                return ele
            }
        })
    }

    const adminHeading = document.querySelector("#adminHeading")
    if (!withoutSuperAdmin || withoutSuperAdmin.length <= 0) {
        adminHeading.innerText = "Company have no admins!"
        adminHeading.style.color = "gray"
        return
    } else {
        adminHeading.innerText = "Admins"
        adminHeading.style.color = "black"
    }

    let adminElement = ""
    withoutSuperAdmin.forEach(element => {
        adminElement += `
        <div class="admin" data-id="${element.id}">
            <div class="adminNameContainer">
                <span>${element.name}</span>
            </div>
            <div class="adminActionButtonContainer">
                <span id="status" style="color: ${element.status ? "#008000" : "#FF0000"};">${element.status ? "active" : "inactive"}</span>
            </div>
        </div>
        `
    });
    adminContainer.innerHTML = adminElement
}


async function updateCompanyName(company_id) {
    const input = document.querySelector("#company_name")
    let companyData = await getCompanyDataFromLocalStorage("companyDetail")
    let company_name = companyData.find(ele => ele.company_id === company_id)
    editIndex = company_name
    input.value = company_name.company_name
    createCompanyPopup()
}

function assignPopup() {
    const assignCompanyContainer = document.querySelector(".assignCompanyContainer")
    assignCompanyContainer.style.display = "flex"
}
function removeAssignPopup() {
    const assignCompanyContainer = document.querySelector(".assignCompanyContainer")
    const adminSelectError = document.getElementById("adminSelectError")

    adminSelectError.style.display = "none"
    assignCompanyContainer.style.display = "none"
}


async function renderAdminDetailWhenAssign(company_id) {
    assignPopup()
    let adminData = await getCompanyDataFromLocalStorage("adminDetail")
    let withoutSuperAdmin = adminData.filter(ele => ele.email !== "satasiyaprince9510@gmail.com")
    const parentContainerOfAdminNames = document.querySelector(".parentContainerOfAdminNames")
    const assignAdminsButton = document.getElementById("assignAdminsButton")
    const assignHeading = document.querySelector("#assignHeading")
    const getCompanyData = await getCompanyDataFromLocalStorage("companyDetail")
    const speceficCompanyData = getCompanyData.find(ele => ele.company_id === company_id)
    const filterAdmin = await withoutSuperAdmin.filter(ele => {
        let status = ele.companies_id.some(ele => ele == company_id)
        if (!status) {
            return ele
        }
    })

    if (filterAdmin.length <= 0) {
        assignHeading.innerText = "All users already assigned!"
        assignAdminsButton.style.display = "none"
    } else {
        assignHeading.innerText = "Assign In " + speceficCompanyData.company_name
        assignAdminsButton.style.display = "block"

    }


    let adminElement = ""
    filterAdmin.forEach(element => {
        adminElement += `
            <div class="adminsNames" data-selected="false" data-id="${element.id}">
                <div class="selectCircle"><i class="ri-check-line"></i></div>
                <div class="adminName"><span>${element.name}</span></div>
            </div>
        `
    })
    parentContainerOfAdminNames.innerHTML = adminElement

    const adminDetails = document.querySelectorAll(".adminsNames")

    adminDetails.forEach(ele => {
        ele.addEventListener("click", function () {
            let select = ele.getAttribute("data-selected")
            let closestCircle = ele.querySelector(".selectCircle")
            if (select === "false") {
                closestCircle.style.backgroundColor = "#0000ff"
                closestCircle.style.color = "#fff"
                closestCircle.style.border = "1px solid green"

                ele.setAttribute("data-selected", "true")
            } else {
                closestCircle.style.border = ""
                closestCircle.style.backgroundColor = ""
                closestCircle.style.color = "#000"
                ele.setAttribute("data-selected", "false")
            }
        })
    })

    assignAdminsButton.onclick = async function () {
        const adminDetails = document.querySelectorAll(".adminsNames")
        const findCompanyIndex = getCompanyData.findIndex(ele => ele.company_id === company_id)

        const adminDetailsArray = [...adminDetails];
        let validation = adminDetailsArray.every(ele => ele.getAttribute("data-selected") == "false");
        const adminSelectError = document.getElementById("adminSelectError")


        if (validation) {
            adminSelectError.style.display = "block"
            adminSelectError.style.color = "red"
            return
        } else {
            adminSelectError.style.display = "none"
        }


        adminDetails.forEach(ele => {
            if (ele.getAttribute("data-selected") === "true") {
                let ID = Number(ele.getAttribute("data-id"))
                getCompanyData[findCompanyIndex].admin_id.push(...getCompanyData[findCompanyIndex].admin_id, ID)

                let findAdmin = adminData.find(ele => ele.id == ID)
                findAdmin.status = true
                findAdmin.companies_id.push(...findAdmin.companies_id, company_id)
            }
        })
        updateCompanyData(getCompanyData, "companyDetail")
        updateCompanyData(adminData, "adminDetail")
        renderAdminDetail()
        removeAssignPopup()
    }
}

function getUsers() {
    return JSON.parse(localStorage.getItem("adminDetail")) || [];
}

function userLoginOrNot() {

    let token = JSON.parse(localStorage.getItem("token"));
    let users = getUsers();

    if (token) {
        let userObject = users.find((e) => e.id == token.previousUserID);
        if (userObject) {
            let getTime = (Date.now() - userObject.timestamp) / 1000;
            if (getTime > 3600) {
                window.location.href = "../../authentication/login/login.html";
            }
        }
    }
}
