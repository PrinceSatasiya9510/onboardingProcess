async function getCompanyDataFromLocalStorage() {
    const data = await JSON.parse(localStorage.getItem("companyDetail"))
    if (data) {
        return data
    }
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
    const input = document.querySelector("#company_name")
    let validaation = inputValidation(input)
    if (!validaation) {
        return;
    }
    let previousCompanyData = await getCompanyDataFromLocalStorage()
    if (previousCompanyData) {
        // previousCompanyData
        // start here
    }
}