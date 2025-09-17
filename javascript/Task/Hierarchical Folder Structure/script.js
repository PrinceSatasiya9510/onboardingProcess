let editIndex = null;

function popup() {
    const popupContainer = document.querySelector(".popupContainer");
    let folderNameError = document.querySelector(".folderNameError");
    const deleteContainer = document.querySelector(".deleteContainer");
    const popup = document.querySelector(".popup")
    popup.style.display = "block";
    folderNameError.style.display = "none";
    popupContainer.style.display = "flex";
    deleteContainer.style.display = "none";
    const input = document.querySelector(".folderNameInput")
    input.focus()
}

function popupRemove() {
    const folderCreateButton = document.querySelector(".folderCreateButton")
    const popupContainer = document.querySelector(".popupContainer");
    popupContainer.style.display = "none"
    folderCreateButton.innerText = "CREATE"
    console.log("🚀 ~ popupRemove ~ editIndex:", editIndex)
}

function errorHandling() {
    let input = document.querySelector(".folderNameInput");
    let folderNameError = document.querySelector(".folderNameError");
    if (input.value == "") {
        console.log("🚀 ~ createNewFolder ~ input.value:", input.value);
        folderNameError.style.display = "block";
        return;
    }
    folderNameError.style.display = "none";
    return true;
}

function showFolderNameField(res) {
    console.log("🚀 ~ showFolderNameField ~ res:", res)
    popup();
    let btn = document.querySelector(".folderCreateButton");
    let input = document.querySelector(".folderNameInput");
    let folderNameError = document.querySelector(".folderNameError");
    folderNameError.style.display = "none";
    btn.onclick = function () {
        if (!errorHandling()) {
            return;
        }
        createNewFolder(res, input.value);
        document.querySelector(".popupContainer").style.display = "none";
    };
    input.value = ""
}

function createNewFolder(res, folderName) {
    if (editIndex) {
        res.innerText = folderName
        let folderCreateButton = document.querySelector(".folderCreateButton");
        let popupLabel = document.getElementById("popupLabel")
        popupLabel.innerText = "Create New Folder"
        folderCreateButton.innerText = "CREATE"
        editIndex = null
        popupRemove()
    } else {
        let parentFolder = res.closest(".Folder");
        let childContainer = parentFolder.querySelector(".childContainer");
        let newFolder = document.createElement("div");
        newFolder.className = "Folder";
        newFolder.setAttribute("data-status", "true");
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
    `;
        childContainer.appendChild(newFolder);
        console.log("🚀 ~ createNewFolder ~ childContainer:", childContainer)
        folderToggle(newFolder);
        autoOpenFolder(parentFolder)
    }
}

function folderToggle(newFolder) {
    console.log("🚀 ~ folderToggle ~ newFolder:", newFolder)
    let arrow = newFolder.querySelector(".down_arrow");
    arrow.addEventListener("click", function () {
        let status = newFolder.getAttribute("data-status");
        console.log(status)
        if (status === "true") {
            // ri-arrow-right-s-line
            // ri-arrow-down-s-line
            newFolder.setAttribute("data-status", "false");
            arrow.classList.remove("ri-arrow-down-s-line");
            arrow.classList.add("ri-arrow-right-s-line");
        } else {
            newFolder.setAttribute("data-status", "true");
            arrow.classList.remove("ri-arrow-right-s-line");
            arrow.classList.add("ri-arrow-down-s-line");
        }
    })
}

document.querySelectorAll(".Folder").forEach(folderToggle);

function autoOpenFolder(response) {
    let arrow = response.querySelector(".folderHeading").querySelector("i")
    let getAttributeFolder = response.getAttribute("data-status")

    if (getAttributeFolder === "false") {
        alert("g")
        arrow.classList.remove("ri-arrow-right-s-line")
        arrow.classList.add("ri-arrow-down-s-line")
        response.setAttribute("data-status", "true")
    }
}


function deleteFolder(response) {
    deleteContainer()
    let deleteBTN = document.getElementById("deleteFolderButton")
    deleteBTN.onclick = function () {
        let parentFolder = response.closest(".Folder");
        parentFolder.remove()
        popupRemove()
    }
}

function editFolderName(response) {
    console.log("🚀 ~ editFolderName ~ response:", response)
    popup()
    editIndex = true
    let input = document.querySelector(".folderNameInput")
    let folderCreateButton = document.querySelector(".folderCreateButton");
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
        console.log("🚀 ~ editFolderName ~ currentName:", currentName)
    }
}

// function 


function deleteContainer() {
    const popupContainer = document.querySelector(".popupContainer");
    const deleteContainer = document.querySelector(".deleteContainer");
    const popup = document.querySelector(".popup")
    popup.style.display = "none";
    popupContainer.style.display = "flex";
    deleteContainer.style.display = "block";
}

