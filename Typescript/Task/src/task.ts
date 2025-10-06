import { objectData, } from "../src/interface"

document.addEventListener("DOMContentLoaded", function () {
    renderData()
})

const btn = document.querySelector(".addBTN") as HTMLButtonElement
let editIndex: null | number = null
btn.addEventListener("click", function (): void {
    addData()
})



async function updateLocalStorage(response: objectData): Promise<void> {
    const rawDataFromLocalStorage = localStorage.getItem("myData")
    if (rawDataFromLocalStorage) {
        const data: objectData[] = await JSON.parse(rawDataFromLocalStorage)
        data.push(response)
        localStorage.setItem("myData", JSON.stringify(data))
    } else {
        localStorage.setItem("myData", JSON.stringify([response]))
    }
    renderData()
}

async function getDataFromLocalStorage(): Promise<objectData[] | undefined> {
    const rawDataFromLocalStorage = localStorage.getItem("myData")
    if (rawDataFromLocalStorage) {
        const data: objectData[] = await JSON.parse(rawDataFromLocalStorage)
        return data
    }
    return
}

function validation(): boolean {
    let isValid: boolean = true
    interface Validation {
        input: HTMLInputElement,
        error: HTMLParagraphElement,
        message: string
    }

    const nameInput = document.getElementById("name") as HTMLInputElement
    const emailInput = document.getElementById("email") as HTMLInputElement
    const phoneInput = document.getElementById("phone") as HTMLInputElement
    const nameError = document.getElementById("nameError") as HTMLParagraphElement
    const emailError = document.getElementById("emailError") as HTMLParagraphElement
    const phoneError = document.getElementById("phoneError") as HTMLParagraphElement


    let arrayOfInputDetail: Validation[] = [
        { input: nameInput, error: nameError, message: "name are required!" },
        { input: emailInput, error: emailError, message: "email are requied!" },
        { input: phoneInput, error: phoneError, message: "phone are requied!" }
    ]

    arrayOfInputDetail.forEach(element => {
        if (element.input.value == "") {
            element.error.style.display = "block"
            element.error.innerText = element.message
            isValid = false
        } else {
            element.error.style.display = "none"
            isValid = true
        }
    });
    return isValid
}


async function addData(): Promise<void> {
    const nameInput = document.getElementById("name") as HTMLInputElement
    const emailInput = document.getElementById("email") as HTMLInputElement
    const phoneInput = document.getElementById("phone") as HTMLInputElement
    const valid: boolean = validation()
    if (!valid) {
        return
    }

    if (editIndex != null) {
        const data = await getDataFromLocalStorage()

        if (data) {
            data![editIndex]!.name = nameInput.value
            data![editIndex]!.email = emailInput.value
            data![editIndex]!.phone = Number(phoneInput.value)
            localStorage.setItem("myData", JSON.stringify(data))
            renderData()
        }
        editIndex = null
    } else {


        const data: objectData = {
            id: Date.now(),
            name: nameInput.value,
            email: emailInput.value,
            phone: Number(phoneInput.value)
        }
        updateLocalStorage(data)
    }
    nameInput.value = ""
    emailInput.value = ""
    phoneInput.value = ""
}

async function renderData(): Promise<void> {
    const tbody = document.querySelector("tbody") as HTMLTableSectionElement
    const myData: objectData[] | undefined = await getDataFromLocalStorage()

    if (myData) {
        let tr: string = ""
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
            `
        });
        if (tbody) {
            tbody.innerHTML = tr
            tbody.addEventListener("click", handleTableButtonClick)
        }
    }
}


function handleTableButtonClick(event: Event) {
    const target = event.target as HTMLElement

    if (target.classList.contains("editBTN")) {
        const id: string | null = target.getAttribute("data-id")
        id ? editData(id) : null
    }
    else if (target.classList.contains("deleteBTN")) {
        const id: string | null = target.getAttribute("data-id")
        id ? deleteData(id) : null
    }
}

async function editData(response: string) {
    const nameInput = document.getElementById("name") as HTMLInputElement
    const emailInput = document.getElementById("email") as HTMLInputElement
    const phoneInput = document.getElementById("phone") as HTMLInputElement
    const myData = await getDataFromLocalStorage()


    if (myData) {
        const index = myData?.findIndex(ele => ele.id.toString() == response)
        nameInput.value = myData[index]?.name ? myData[index]?.name : ""
        emailInput.value = myData[index]?.email ? myData[index]?.email : ""
        phoneInput.value = myData[index]?.phone ? myData[index]?.phone.toString() : ""
        editIndex = index
    }
}

async function deleteData(response: string): Promise<void> {
    const myData = await getDataFromLocalStorage()
    let deleteData: objectData[] | undefined = myData?.filter(ele => ele.id.toString() !== response)
    localStorage.setItem("myData", JSON.stringify(deleteData))
    renderData()
}
