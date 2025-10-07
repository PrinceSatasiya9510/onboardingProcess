document.addEventListener("DOMContentLoaded", (event) => {
  userLoginOrNot()

});

var myFolderData;
var folder_selected_id = 1000
let movingFolder = null;
let editIndex = null;
let selectedFile = null;
const circle = document.querySelector(".circle")

let logoutStatus = true;
circle.addEventListener("click", function () {
  const logoutContainer = document.querySelector(".logoutContainer")
  if (logoutStatus) {
    logoutContainer.style.display = "flex"
    logoutStatus = false
  } else {
    logoutContainer.style.display = "none"
    logoutStatus = true
  }
})


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
        window.location.href = "../../../authentication/login/login.html";
      }
    }
  }
}

async function getLocalStorageData(storage_name) {
  let data = await JSON.parse(localStorage.getItem(storage_name))
  if (!data) {
    return "Data Not Found!"
  }
  return data
}


async function updateLocalStorage(data, callback) {
  const companyLoginToken = await JSON.parse(localStorage.getItem("token"))
  const folderStructureData = await JSON.parse(localStorage.getItem("folderStructureData"))

  let folders = folderStructureData.find(ele => ele.company_id == companyLoginToken.company_id && ele.admin_id == companyLoginToken.previousUserID)
  folders.folder_structure = data


  localStorage.setItem("folderStructureData", JSON.stringify(folderStructureData));

  callback();
}

async function getFoldersDataFromLocalStorage() {

  const companyLoginToken = await JSON.parse(localStorage.getItem("token"))
  const company_data = await JSON.parse(localStorage.getItem("companyDetail"))
  const folderStructureData = await JSON.parse(localStorage.getItem("folderStructureData"))
  const companyNameTag = document.getElementById("companyNameTag")
  const logoutFromCompany = document.getElementById("logoutFromCompany")

  let folders = folderStructureData.find(ele => ele.company_id == companyLoginToken.company_id && ele.admin_id == companyLoginToken.previousUserID)
  myFolderData = folders.folder_structure;

  let company_name = company_data.find(ele => ele.company_id == folders.company_id)
  companyNameTag.innerText = company_name.company_name
  logoutFromCompany.innerText = `Logout From ${company_name.company_name}`
  genrateMainFolderContainer();

}
getFoldersDataFromLocalStorage();

function findByID(id, obj) {
  if (obj.id === id) {
    return obj;
  }

  if (obj.childrens && obj.childrens.length > 0) {
    for (let innerObject of obj.childrens) {
      const found = findByID(id, innerObject);
      if (found) {
        return found;
      }
    }
  }
  return null;
}


function renderFolder(folder, selectedFolderId) {
  const folderDiv = document.createElement("div");
  folderDiv.className = "Folder";
  folderDiv.setAttribute("data-status", "true");
  folderDiv.setAttribute("draggable", "true");
  folderDiv.setAttribute("data-id", folder.id);


  if (folder.id == selectedFolderId) {
    folderDiv.setAttribute("selected", "true");
  } else {
    folderDiv.setAttribute("selected", "false");
  }

  folderDiv.setAttribute("onclick", `folderSelectStatus(this,event,${folder.id},renderFolderDocument)`);

  const folderHeading = document.createElement("div");
  folderHeading.setAttribute("data-id", folder.id)
  folderHeading.className = "folderHeading";

  if (folder.id == selectedFolderId) {
    folderHeading.style.backgroundColor = "#082d46";
    folderHeading.style.color = "#FFF";
  }

  folderHeading.innerHTML = `
      <i class="ri-arrow-down-s-line down_arrow"></i>
      <span class="folderName">${folder.name}</span>
      <div class="actionIcons">
          <i class="ri-pencil-fill" onclick="popup(${folder.id},true)"></i>
          <i class="ri-folder-add-fill" onclick="popup(${folder.id})"></i>
          <i class="ri-delete-bin-6-fill" onclick="deleteContainerPopup(${folder.id})"></i>
      </div>
  `;

  const childContainer = document.createElement("div");
  childContainer.className = "childContainer";

  if (folder.childrens && folder.childrens.length > 0) {
    folder["childrens"].forEach((child) => {
      const children = renderFolder(child, selectedFolderId);
      childContainer.appendChild(children);
    });
  }

  folderDiv.appendChild(folderHeading);
  folderDiv.appendChild(childContainer);
  folderToggle(folderDiv);

  return folderDiv;
}

async function genrateMainFolderContainer() {
  const container = document.querySelector(".container");
  container.innerHTML = "";
  const mainFolder = renderFolder(myFolderData, folder_selected_id);
  container.appendChild(mainFolder);
  if (folder_selected_id !== null) {
    renderFolderDocument(folder_selected_id);
  }
}


function createNewFolder(parentFolderId, folderEditIndex) {
  let input = document.querySelector(".folderNameInput");
  let folderName = errorHandling();
  if (!folderName) {
    return;
  }
  let parentObject = findByID(parentFolderId, myFolderData);
  input.value = parentObject.name;

  if (folderEditIndex) {
    parentObject["name"] = folderName;
  } else {
    let newobject = {
      id: Date.now(),
      parentId: parentFolderId,
      name: folderName,
      documents: [],
      childrens: [],
    };
    parentObject.childrens = [...parentObject.childrens, newobject];
  }
  updateLocalStorage(myFolderData, getFoldersDataFromLocalStorage);
  popupRemove();
}

function folderDelete(folderId) {
  let findDeleteFolder = findByID(folderId, myFolderData);
  let parentFolder = findByID(findDeleteFolder.parentId, myFolderData);
  let findIndexOfDeleteFolder = parentFolder["childrens"].findIndex(
    (item) => item.id == folderId
  );
  parentFolder["childrens"].splice(findIndexOfDeleteFolder, 1);
  updateLocalStorage(myFolderData, getFoldersDataFromLocalStorage);
  popupRemove();
}

function deleteContainerPopup(folderId) {
  let findDeleteFolder = findByID(folderId, myFolderData);
  let checkFolderHaveSubFolder = findDeleteFolder.childrens.length > 0;
  const popupContainer = document.querySelector(".popupContainer");
  const deleteContainer = document.querySelector(".deleteContainer");
  const popup = document.querySelector(".popup");
  const deleteFolderButton = document.getElementById("deleteFolderButton");
  const deleteFolderCancelButton = document.getElementById(
    "deleteFolderCancelButton"
  );
  const okButton = document.getElementById("okButton");
  popup.style.display = "none";
  popupContainer.style.display = "flex";
  deleteContainer.style.display = "block";
  let deleteContainertext = document.getElementById("deleteContainertext");

  if (checkFolderHaveSubFolder || findDeleteFolder.parentId == null) {
    deleteFolderButton.style.display = "none";
    deleteFolderCancelButton.style.display = "none";
    deleteContainertext.innerText = "Can not delete this folder!";
    deleteContainertext.style.color = "red";
    okButton.style.display = "block";
    return;
  } else {
    deleteFolderButton.style.display = "inline";
    deleteFolderCancelButton.style.display = "inline";
    deleteContainertext.innerText = "Are you Sure!";
    deleteContainertext.style.color = "red";
    okButton.style.display = "none";
  }
  deleteFolderButton.onclick = function () {
    folderDelete(folderId);
  };
}

function popup(response, folderEditIndex) {
  let folderCreateButton = document.querySelector(".folderCreateButton");
  const popupContainer = document.querySelector(".popupContainer");
  let folderNameError = document.querySelector(".folderNameError");
  const deleteContainer = document.querySelector(".deleteContainer");
  const popup = document.querySelector(".popup");
  popup.style.display = "block";
  folderNameError.style.display = "none";
  popupContainer.style.display = "flex";
  deleteContainer.style.display = "none";
  const input = document.querySelector(".folderNameInput");
  input.focus();

  if (folderEditIndex) {
    let parentObject = findByID(response, myFolderData);
    input.value = parentObject.name;
  }

  if (!editIndex) {
    folderCreateButton.setAttribute(
      "onclick",
      `createNewFolder(${response},${folderEditIndex})`
    );
    folderCreateButton.innerText = "CREATE";
  } else {
    folderCreateButton.innerText = "UPDATE";
  }
}

function popupRemove() {
  const input = document.querySelector(".folderNameInput");
  input.value = "";
  const folderCreateButton = document.querySelector(".folderCreateButton");
  const popupContainer = document.querySelector(".popupContainer");
  popupContainer.style.display = "none";
  folderCreateButton.innerText = "CREATE";
}

function errorHandling() {
  let input = document.querySelector(".folderNameInput");
  let folderNameError = document.querySelector(".folderNameError");
  if (input.value.trim() == "") {
    folderNameError.style.display = "block";
    return;
  }
  folderNameError.style.display = "none";
  return input.value;
}

function folderToggle(newFolder) {
  let arrow = newFolder.querySelector(".down_arrow");
  arrow.addEventListener("click", function () {
    let status = newFolder.getAttribute("data-status");
    if (status === "true") {
      newFolder.setAttribute("data-status", "false");
      arrow.classList.remove("ri-arrow-down-s-line");
      arrow.classList.add("ri-arrow-right-s-line");
    } else {
      newFolder.setAttribute("data-status", "true");
      arrow.classList.remove("ri-arrow-right-s-line");
      arrow.classList.add("ri-arrow-down-s-line");
    }
  });
}

document.addEventListener("dragstart", function (e) {
  const folder = e.target.closest(".Folder");
  if (folder) {
    movingFolder = folder;
  }
});

document.addEventListener("dragend", function () {
  if (movingFolder) {
    movingFolder = null;
  }
});
document.addEventListener("dragover", function (e) {
  if (e.target.closest(".Folder")) {
    e.preventDefault();
  }
});

document.addEventListener("drop", function (e) {
  e.preventDefault();
  const currentFolder = e.target.closest(".Folder");
  if (!movingFolder || !currentFolder || movingFolder === currentFolder) {
    return;
  }

  const movingId = Number(movingFolder.getAttribute("data-id"));
  const targetId = Number(currentFolder.getAttribute("data-id"));

  if (movingId === targetId) {
    return;
  }

  const movingObj = findByID(movingId, myFolderData);
  const targetObj = findByID(targetId, myFolderData);
  if (!movingObj || !targetObj) {
    return;
  }
  if (!movingObj || !targetObj) {
    return;
  }

  let movingObjectAreNotPutInChildObject = findByID(targetId, movingObj)

  if (movingObjectAreNotPutInChildObject) {
    return;
  }


  const oldParent = findByID(movingObj.parentId, myFolderData);
  if (oldParent) {
    oldParent.childrens = oldParent.childrens.filter(
      (child) => child.id !== movingId
    );
  }


  movingObj.parentId = targetId;
  targetObj.childrens.push(movingObj);

  updateLocalStorage(myFolderData, getFoldersDataFromLocalStorage);
});


async function logoutFromCompany() {
  const token = JSON.parse(localStorage.getItem("token"))
  delete token.company_id

  localStorage.setItem("token", JSON.stringify(token))
  window.location.href = "../companyLogin/companyLogin.html"
}

function logout() {
  localStorage.removeItem("token")
  window.location.href = "../../../authentication/login/login.html"
}



function folderSelectStatus(div, event, folder_id, callback) {
  event.stopPropagation();
  const addDocumentButton = document.getElementById("addDocBTN")
  addDocumentButton.setAttribute("onclick", `documentUploadPopup(${folder_id})`)
  const currentFolderHeading = div.querySelector(".folderHeading");

  if (folder_selected_id !== null) {
    const previousSelected = document.querySelector(`.Folder[data-id="${folder_selected_id}"]`);
    if (previousSelected) {
      previousSelected.querySelector(".folderHeading").style.backgroundColor = "transparent";
      previousSelected.querySelector(".folderHeading").style.color = "#000";
      previousSelected.setAttribute("selected", "false");
    }
  }


  div.setAttribute("selected", "true");
  currentFolderHeading.style.backgroundColor = "#082d46";
  currentFolderHeading.style.color = "#FFF";

  folder_selected_id = folder_id;
  callback(folder_id)
}


function renderFolderDocument(folder_id) {
  const documentRenderContainer = document.querySelector(".documentRenderContainer")
  let folder = findByID(folder_id, myFolderData)
  let documents = folder.documents

  if (documents.length <= 0) {
    documentRenderContainer.innerHTML = "<h1>Empty Folder!</h1>"
    documentRenderContainer.style.display = "flex"
    documentRenderContainer.style.justifyContent = "center"
    documentRenderContainer.style.alignItems = "center"
    documentRenderContainer.style.color = "gray"
    return
  } else {
    documentRenderContainer.style.display = ""
    documentRenderContainer.style.justifyContent = ""
    documentRenderContainer.style.alignItems = ""
    documentRenderContainer.style.color = ""
  }

  let doc = ""
  documents.forEach(ele => {
    doc += `
       <div class="document" data-img="${ele.url}">
          <div class="documentImageContainer">
              <img src="${ele.url}" alt="">
          </div>
          <div class="documentNameContainer">
              <div class="documentName">
                  <span>${ele.fileName}</span>
              </div>
              <div class="documentActionButton">
                  <div class="circle" id="viewDoc" onclick="imageViewer('${ele.url}')"><i class="ri-eye-line"></i></div>
                  <div class="circle" id="deleteDoc" onclick="deleteFile(${ele.file_id})"><i class="ri-delete-bin-6-fill"></i></div>
              </div>
            </div>
        </div>
    `
  })
  documentRenderContainer.innerHTML = doc


  const viewDoc = document.querySelectorAll(".document")
  viewDoc.forEach(ele => {
    ele.addEventListener("dblclick", function () {
      let arrtibite = this.getAttribute("data-img")
      imageViewer(arrtibite)
    })
  })
}





function handleDragOver(e) {
  e.preventDefault();
  const uploadContainer = document.querySelector(".uploadContainer");
  uploadContainer.classList.add("hover");
}

function handleDragLeave() {
  const uploadContainer = document.querySelector(".uploadContainer");
  uploadContainer.classList.remove("hover");
}

function handleDrop(e) {
  e.preventDefault();
  handleDragLeave();

  const files = e.dataTransfer.files;
  if (files.length > 0) {
    selectedFile = files[0];

    document.getElementById("uploadName").innerText = selectedFile.name;
    const uploadContainer = document.querySelector(".uploadContainer");
    uploadContainer.style.border = "1px dashed green";
    uploadContainer.style.background = "#eef";
    uploadContainer.style.borderColor = "#339";
    document.getElementById("uploadButton").style.display = "block";
  }
}


function handleFileChange() {
  const files = upload.files;
  if (files.length > 0) {
    selectedFile = files[0]
    document.getElementById("uploadName").innerText = selectedFile.name;
    const uploadContainer = document.querySelector(".uploadContainer");
    const filesActions = document.querySelector(".filesActions")
    uploadContainer.style.border = "1px dashed green";
    uploadContainer.style.background = "#eef";
    uploadContainer.style.borderColor = "#339";
    filesActions.style.display = "flex"
    document.getElementById("uploadButton").style.display = "block";
  }
}


function handleContainerClick() {
  const upload = document.getElementById("upload");
  upload.click();
}

function documentUploadPopup(folder_id) {
  const documentPopupContainer = document.querySelector(".documentPopupContainer");
  const uploadContainer = document.querySelector(".uploadContainer");
  const upload = document.getElementById("upload");
  const uploadButton = document.getElementById("uploadButton");

  documentPopupContainer.style.display = "flex";
  uploadContainer.addEventListener("dragover", handleDragOver);
  uploadContainer.addEventListener("dragleave", handleDragLeave);
  uploadContainer.addEventListener("drop", handleDrop);
  uploadContainer.addEventListener("click", handleContainerClick);
  upload.addEventListener("change", handleFileChange);

  uploadButton.onclick = async function (e) {
    e.preventDefault();
    if (selectedFile) {
      await uploadDocument(selectedFile, folder_id);
      removeDocumentUploadPopup();
    }
  };
}


function removeDocumentUploadPopup() {
  selectedFile = null
  const documentPopupContainer = document.querySelector(".documentPopupContainer");
  const uploadContainer = document.querySelector(".uploadContainer");
  const upload = document.getElementById("upload");
  const uploadName = document.getElementById("uploadName");
  const uploadButton = document.getElementById("uploadButton");


  uploadContainer.style.background = "transparent";
  uploadContainer.style.borderColor = "#000";
  uploadName.innerText = "Upload & Drag and drop";
  documentPopupContainer.style.display = "none";
  uploadButton.style.display = "none";
  upload.value = "";
  uploadContainer.removeEventListener("dragover", handleDragOver);
  uploadContainer.removeEventListener("dragleave", handleDragLeave);
  uploadContainer.removeEventListener("drop", handleDrop);
  uploadContainer.removeEventListener("click", handleContainerClick);
  upload.removeEventListener("change", handleFileChange);
}



async function uploadDocument(document, folder_id) {
  let folder = await findByID(folder_id, myFolderData)
  const reader = new FileReader()
  const index = document.name.indexOf(".")
  reader.addEventListener("load", function () {
    let url = reader.result
    let obj = {
      file_id: Date.now(),
      url,
      fileName: document.name.slice(0, index)
    }
    folder.documents.push(obj)
    updateLocalStorage(myFolderData, getFoldersDataFromLocalStorage)
    renderFolderDocument(folder_id)
  })
  reader.readAsDataURL(document)
}


function imageViewer(url) {
  const imageViewContainer = document.querySelector(".imageViewContainer")
  const imageViwerImageTag = document.getElementById("imageViwerImageTag")
  imageViewContainer.style.display = "flex";
  imageViwerImageTag.src = url;

}

function removeImageViwer() {
  const imageViewContainer = document.querySelector(".imageViewContainer")
  imageViewContainer.style.display = "none"
}

function deleteFile(file_id) {
  let folder = findByID(folder_selected_id, myFolderData)
  let deleteDocumentIndex = folder.documents.findIndex(ele => ele.file_id == file_id)
  folder.documents.splice(deleteDocumentIndex, 1)

  renderFolderDocument(folder_selected_id)
  updateLocalStorage(myFolderData, getFoldersDataFromLocalStorage)
}
