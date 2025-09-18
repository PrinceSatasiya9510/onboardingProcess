let editIndex = null
let movingFolder = null

function popup() {
    const popupContainer = document.querySelector(".popupContainer")
    let folderNameError = document.querySelector(".folderNameError")
    const deleteContainer = document.querySelector(".deleteContainer")
    const popup = document.querySelector(".popup")
    popup.style.display = "block"
    folderNameError.style.display = "none"
    popupContainer.style.display = "flex"
    deleteContainer.style.display = "none"
    const input = document.querySelector(".folderNameInput")
    input.focus()
}

function popupRemove() {
    const folderCreateButton = document.querySelector(".folderCreateButton")
    const popupContainer = document.querySelector(".popupContainer")
    popupContainer.style.display = "none"
    folderCreateButton.innerText = "CREATE"
    console.log("🚀 ~ popupRemove ~ editIndex:", editIndex)
}

function errorHandling() {
    let input = document.querySelector(".folderNameInput")
    let folderNameError = document.querySelector(".folderNameError")
    if (input.value == "") {
        folderNameError.style.display = "block"
        return
    }
    folderNameError.style.display = "none"
    return true
}

function showFolderNameField(res) {
    popup()
    let btn = document.querySelector(".folderCreateButton")
    const folderCreateButton = document.querySelector(".folderCreateButton")
    let input = document.querySelector(".folderNameInput")
    let folderNameError = document.querySelector(".folderNameError")
    folderNameError.style.display = "none"
    btn.onclick = function () {
        if (!errorHandling()) {
            return
        }
        createNewFolder(res, input.value)
        document.querySelector(".popupContainer").style.display = "none"
    }
    input.value = ""
}

function createNewFolder(res, folderName) {
    if (editIndex) {
        res.innerText = folderName
        let folderCreateButton = document.querySelector(".folderCreateButton")
        folderCreateButton.innerText = "CREATE"
        editIndex = null
        popupRemove()
    } else {
        let parentFolder = res.closest(".Folder")
        let childContainer = parentFolder.querySelector(".childContainer")
        let newFolder = document.createElement("div")
        newFolder.setAttribute("draggable", "true")
        newFolder.className = "Folder"
        newFolder.setAttribute("data-status", "true")
        newFolder.innerHTML = `
        <div class="folderHeading">
            <i class="ri-arrow-down-s-line down_arrow"></i>
            <span class="folderName">${folderName}</span>
            <div class="actionIcons">
                <i class="ri-pencil-fill" onclick="editFolderName(this)"></i>
                <i class="ri-folder-add-fill" onclick="showFolderNameField(this)"></i>
                <i class="ri-delete-bin-6-fill" onclick="deleteFolder(this)"></i>
            </div>
        </div>
        <div class="childContainer"></div>
    `
        childContainer.appendChild(newFolder)
        folderToggle(newFolder)
        autoOpenFolder(parentFolder)
    }
}

function folderToggle(newFolder) {
    let arrow = newFolder.querySelector(".down_arrow")
    arrow.addEventListener("click", function () {
        let status = newFolder.getAttribute("data-status")
        if (status === "true") {
            newFolder.setAttribute("data-status", "false")
            arrow.classList.remove("ri-arrow-down-s-line")
            arrow.classList.add("ri-arrow-right-s-line")
        } else {
            newFolder.setAttribute("data-status", "true")
            arrow.classList.remove("ri-arrow-right-s-line")
            arrow.classList.add("ri-arrow-down-s-line")
        }
    })
}

function autoOpenFolder(response) {
    let arrow = response.querySelector(".folderHeading").querySelector("i")
    let getAttributeFolder = response.getAttribute("data-status")
    if (getAttributeFolder === "false") {
        arrow.classList.remove("ri-arrow-right-s-line")
        arrow.classList.add("ri-arrow-down-s-line")
        response.setAttribute("data-status", "true")
    }
}

function deleteFolder(response) {
    deleteContainer()
    let deleteBTN = document.getElementById("deleteFolderButton")
    deleteBTN.onclick = function () {
        let parentFolder = response.closest(".Folder")
        parentFolder.remove()
        popupRemove()
    }
}

function editFolderName(response) {
    popup()
    editIndex = true
    let input = document.querySelector(".folderNameInput")
    let folderCreateButton = document.querySelector(".folderCreateButton")
    let currentName = response.closest(".folderHeading").querySelector("span")
    let popupLabel = document.getElementById("popupLabel")
    popupLabel.innerText = "Make a new name"
    folderCreateButton.innerText = "UPDATE"
    input.value = currentName.innerText
    folderCreateButton.onclick = function () {
        if (!errorHandling()) {
            return
        }
        createNewFolder(currentName, input.value)
    }
}

function deleteContainer() {
    const popupContainer = document.querySelector(".popupContainer")
    const deleteContainer = document.querySelector(".deleteContainer")
    const popup = document.querySelector(".popup")
    popup.style.display = "none"
    popupContainer.style.display = "flex"
    deleteContainer.style.display = "block"
}


document.addEventListener("dragstart", function (e) {
    // console.log("🚀 ~ e:", e.target)
    console.log("🚀 ~ e:", e)
    const folder = e.target.closest(".Folder")
    console.log("🚀 ~ folder:", folder)
    if (folder) {
        movingFolder = folder
    }
})

document.addEventListener("dragend", function (e) {
    if (movingFolder) {
        movingFolder = null
    }
})
document.addEventListener("dragover", function (e) {
    if (e.target.closest(".Folder")) {
        e.preventDefault()
    }
})

document.addEventListener("drop", function (e) {
    e.preventDefault()
    const currentFolder = e.target.closest(".Folder")
    console.log("🚀 ~ targetFolder:", currentFolder)
    const child = currentFolder.querySelector(".childContainer")
    child.appendChild(movingFolder)
    autoOpenFolder(currentFolder)
})

