document.addEventListener("DOMContentLoaded", (event) => {
  userLoginOrNot()

});

var myFolderData;
let movingFolder = null;
let editIndex = null;
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
  console.log("🚀 ~ getFoldersDataFromLocalStorage ~ companyLoginToken:", companyLoginToken)
  console.log("🚀 ~ getFoldersDataFromLocalStorage ~ folderStructureData:", folderStructureData)
  console.log("🚀 ~ getFoldersDataFromLocalStorage ~ folders:", folders)
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



function renderFolder(folder) {
  const folderDiv = document.createElement("div");
  folderDiv.className = "Folder";
  folderDiv.setAttribute("data-status", "true");
  folderDiv.setAttribute("draggable", "true");
  folderDiv.setAttribute("data-id", folder.id);

  const folderHeading = document.createElement("div");
  folderHeading.className = "folderHeading";
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
      const children = renderFolder(child);
      childContainer.appendChild(children);
    });
  }

  folderDiv.appendChild(folderHeading);
  folderDiv.appendChild(childContainer);
  // console.log("🚀 ~ renderFolder ~ folderDiv:", folderDiv)
  folderToggle(folderDiv);

  return folderDiv;
}

async function genrateMainFolderContainer() {
  const container = document.querySelector(".container");
  container.innerHTML = "";
  const mainFolder = renderFolder(myFolderData);
  container.appendChild(mainFolder);
}

function createNewFolder(parentFolderId, folderEditIndex) {
  let input = document.querySelector(".folderNameInput");
  let folderName = errorHandling();
  if (!folderName) {
    return;
  }
  let parentObject = findByID(parentFolderId, myFolderData);
  // console.log("🚀 ~ createNewFolder ~ parentObject:", parentObject)
  input.value = parentObject.name;

  if (folderEditIndex) {
    parentObject["name"] = folderName;
  } else {
    let newobject = {
      id: Date.now(),
      parentId: parentFolderId,
      name: folderName,
      childrens: [],
    };
    parentObject.childrens = [...parentObject.childrens, newobject];
  }
  // console.log(myFolderData)
  updateLocalStorage(myFolderData, getFoldersDataFromLocalStorage);
  popupRemove();
}

function folderDelete(folderId) {
  let findDeleteFolder = findByID(folderId, myFolderData);
  let parentFolder = findByID(findDeleteFolder.parentId, myFolderData);
  let findIndexOfDeleteFolder = parentFolder["childrens"].findIndex(
    (item) => item.id == folderId
  );
  // console.log("🚀 ~ folderDelete ~ findIndexOfDeleteFolder:", findIndexOfDeleteFolder)
  parentFolder["childrens"].splice(findIndexOfDeleteFolder, 1);
  // console.log(myFolderData)
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
  console.log("🚀 ~ currentFolder:", currentFolder)
  console.log("🚀 ~ movingFolder:", movingFolder)
  if (!movingFolder || !currentFolder || movingFolder === currentFolder) {
    return;
  }

  const movingId = Number(movingFolder.getAttribute("data-id"));
  const targetId = Number(currentFolder.getAttribute("data-id"));

  if (movingId === targetId) {
    return;
  }

  const movingObj = findByID(movingId, myFolderData);
  // console.log("🚀 ~ movingObj:", movingObj)
  const targetObj = findByID(targetId, myFolderData);
  // console.log("🚀 ~ targetObj:", targetObj)
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

  // console.log("🚀 ~ movingObjectAreNotPutInChildObject:", movingObjectAreNotPutInChildObject)

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