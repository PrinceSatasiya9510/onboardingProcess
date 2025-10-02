document.addEventListener("DOMContentLoaded", (event) => {
    userLoginOrNot()
    renderCompanies();
});

async function getUserData() {
    let data = await JSON.parse(localStorage.getItem("folderStructureData"))
    if (data == null || data == undefined) {
        data = []
        localStorage.setItem("folderStructureData", JSON.stringify(data))
    }


    let userToken = await JSON.parse(localStorage.getItem("token"));
    let ID = userToken.previousUserID;
    let companyData = await JSON.parse(localStorage.getItem("companyDetail"));

    let filterAdminCompanies = companyData.filter((ele) => {
        let checkIdIncludeOrNot = ele.admin_id.some((ele) => ele == ID);

        if (checkIdIncludeOrNot) {
            return ele;
        }
    });

    return filterAdminCompanies;
}


async function renderCompanies() {
    const Data = await getUserData();
    const companyNameContainer = document.querySelector(".companyNameContainer");

    let companyData = "";
    Data.forEach((element) => {
        companyData += `
            <div class="companyName">
            <div id="profilePictureContainer">
                <img id="profile" src="${element.profile_picture_path}" alt="">
                <span id="companyNameTagSpan">${element.company_name}</span>
            </div>
            <button onclick="loginToCompany(${element.company_id})">Login</button>
          </div>
        `;
    });
    companyNameContainer.innerHTML = companyData;
}

async function getUserTokenFromLocalStorage() {
    let userToken = await JSON.parse(localStorage.getItem("token"))
    return userToken
}

async function compnayLogout() {
    let token = await getUserTokenFromLocalStorage()
    token.company_id = null
    updateUserToken(token)
}

function updateUserToken(updatedToken) {
    localStorage.setItem("token", JSON.stringify(updatedToken))
}



async function setFolderStructure(data) {
    let folderStructureData = await JSON.parse(localStorage.getItem("folderStructureData")) || []

    if (data) {
        folderStructureData.push(data)
        localStorage.setItem("folderStructureData", JSON.stringify(folderStructureData))
        let folderData = await JSON.parse(localStorage.getItem("folderStructureData"))
        return folderData
    }

    return folderStructureData
}


async function loginToCompany(company_id) {
    let userToken = await getUserTokenFromLocalStorage()
    userToken.company_id = company_id.toString()

    const folderStructureData = await setFolderStructure()

    if (folderStructureData.length == 0) {
        let myFolderData =
        {
            company_id: userToken.company_id,
            admin_id: userToken.previousUserID,
            folder_structure: {
                id: 1000,
                parentId: null,
                name: "Folder 1",
                childrens: [],
            }
        }
        setFolderStructure(myFolderData)


    } else {
        let alreadyExits = folderStructureData.find(ele => ele.company_id == company_id && ele.admin_id == userToken.previousUserID)
        if (!alreadyExits) {
            let myFolderData =
            {
                company_id: userToken.company_id,
                admin_id: userToken.previousUserID,
                documents: [],
                folder_structure: {
                    id: 1000,
                    parentId: null,
                    name: "Folder 1",
                    childrens: [],
                }
            }
            setFolderStructure(myFolderData)
        }
    }

    updateUserToken(userToken)
    window.location.href = "../admin/admin.html"
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
