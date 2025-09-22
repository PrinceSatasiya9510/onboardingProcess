var myFolderData;
let movingFolder = null;
let editIndex = null;

function updateLocalStorage(data, callback) {
  localStorage.setItem("folderData", JSON.stringify(data));
  callback();
}

async function getFoldersDataFromLocalStorage() {
  let data = await JSON.parse(localStorage.getItem("folderData"));
  // console.log("🚀 ~ getFoldersDataFromLocalStorage ~ data:", data)
  if (!data) {
    myFolderData = {
      id: 101,
      parentId: null,
      name: "Folder 1",
      childrens: [],
    };
  } else {
    myFolderData = data;
  }
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

  const movingId = Number(movingFolder.getAttribute("data-id"));
  const targetId = Number(currentFolder.getAttribute("data-id"));

  const movingObj = findByID(movingId, myFolderData);
  const targetObj = findByID(targetId, myFolderData);

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
