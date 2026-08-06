import { projectUtil } from "./projectUtil";
import plusIcon from "./asset/plus-icon.svg";
import deleteIcon from "./asset/delete-icon.svg";

// iife create domUtil module
export const domUtil = (() => {
    function projRefresher(){
        // clean old projs 
        const projCont = document.querySelector(".projCont");
        const projDomArr = [...projCont.children];
        projDomArr.forEach(obj => obj.remove());

        // append all projs from arr
        projectUtil.projArr.forEach(projObj => {
            const temp = document.createElement("div");
            temp.id = projObj.id.toString();
            temp.className = "projDIV";
            temp.setAttribute("style", `--color: var(--${projObj.color})`);
            temp.textContent = projObj.name;
            // deleteIcon only available for none default project
            if (!projObj.isDefault) {
                const deleteIcon = document.createElement("img");
                deleteIcon.className = "deleteIcon";
                deleteIcon.src = deleteIcon;
                deleteIcon.alt = "Delete project";
                deleteIcon.style.display = "none";
                deleteIcon.addEventListener("click", () => {
                    // personalize & open deleteDialog
                    const deleteDialog = document.querySelector(".deleteDialog");
                    deleteDialog.querySelector(".projName").textContent = projObj.name;
                    deleteDialog.querySelector(".itemsCount").textContent = projObj.itemsArr.length;
                    // wipes prev confirm btn event Listener
                    const confirmBtn = deleteDialog.querySelector(".confirm");
                    const tempClone = confirmBtn.cloneNode(true);
                    confirmBtn.replaceWith(tempClone);
                    confirmBtn.addEventListener("click", () => {
                        deleteDialog.close(projObj.id);
                    });
                    // open deleteDialog
                    deleteDialog.showModal();
                });
                temp.appendChild(deleteIcon);
                temp.addEventListener("mouseenter", () => {
                    deleteIcon.style.display = "";
                });
                temp.addEventListener("mouseleave", () => {
                    deleteIcon.style.display = "none";
                });
            }

            // also have event that when clicked, render the todolist in the main panel
            temp.addEventListener("click", () => {
                // ignore action for multi click
                if (temp.hasAttribute("selected")) {
                    return;
                }
                // clear existing attribute
                [...projCont.children].forEach(obj => obj.removeAttribute("selected"));
                temp.setAttribute("selected", "");
                projectUtil.selectedProjID = projObj.id;
                todoLstRefresher();
            });
            projCont.appendChild(temp);
        });

        // click the last selected(or -1 last selected just got deleted)
        const id = projectUtil.selectedProjID;
        projDomArr[id].click();
        

    }
    // need to refine logic of building dynamic todoList interface / time logic
    function todoLstRefresher(){
        // clean old todoList data
        const tdWin = document.querySelector(".tdWin");
        tdWin.replaceChildren();

        const currProj = projectUtil.projectArr[projectUtil.selectedProjID];

        const todoArr = currProj.itemsArr;
        // if empty insert some para saying get started by clicking add btn below...

        // else add them
        todoArr.forEach(todoObj => {
            const tempTodo = document.createElement("div");
            tempTodo.className = "todoDIV";

            const title = document.createElement("p");
            const statusCont = document.createElement("div");
            const statusIcon = document.createElement("img");
            const statusDes = document.createElement("div");
        });
        
    }

    function domInit(){
        // create a default project
        const defaultProj = new projectUtil("Default Project", undefined, 1);

        // dialogs for projBtn and todoBtn and deleteBtn

        // projBtn
        const projDialog = document.createElement("dialog");
        projDialog.className = "projDialog";

        const projForm = document.createElement("form");
        projForm.className = "projForm";
        projForm.method = "dialog";

        const para = document.createElement("p");
        para.textContent = "Add project";

        const input1 = document.createElement("input");
        input1.type = "text";
        input1.name = "name";
        input1.required = true;
        const label1 = document.createElement("label");
        label1.textContent = "Name";

        const para1 = document.createElement("p");
        para1.textContent = "Color";
        para1.className = "color";

        const colorCont = document.createElement("div");        
        colorCont.className = "colorCont";
        const colorArr = ["blue", "green", "yellow", "orange", "red"];
        colorArr.forEach(color => {
            const tempLabel = document.createElement("label");
            tempLabel.className = "colorLabel";
            tempLabel.setAttribute("style", `--color-fill: var(--${color})`);

            const tempInput = document.createElement("input");
            tempInput.className = "colorRadio";
            tempInput.setAttribute("style", `--color-fill: var(--${color})`);
            tempInput.type = "radio";
            tempInput.name = "color";
            tempInput.value = color;
            if (color == "blue") {
                tempInput.checked = true; 
            }

            tempLabel.append(tempInput, document.createTextNode(`${color}`));
            colorCont.appendChild(tempLabel);
        });

        projForm.append(para, label1, input1, para1, colorCont);

        const btnCont = document.createElement("div");
        btnCont.className = "btnCont";
        const cancel = document.createElement("button");
        cancel.value = "";
        cancel.type = "submit";
        const confirm = document.createElement("button");
        confirm.value = "confirm";
        confirm.type = "submit";
        btnCont.append(cancel, confirm);
        projForm.appendChild(btnCont);
        projDialog.appendChild(projForm);

        // todoBtn
        const toDoDialog = document.createElement("dialog");
        toDoDialog.className = "toDoDialog";
        const toDoForm = document.createElement("form");
        toDoForm.method = "dialog";

        // deleteBtn
        const deletedialog = document.createElement("dialog");
        deletedialog.className = "deleteDialog";

        const title = document.createElement("div");
        title.textContent = "Do you really want to delete ";
        const projName = document.createElement("span");
        projName.className = "projName";
        title.appendChild(projName);
        title.append(" ?");

        const disclaimer = document.createElement("div");   
        disclaimer.className = "disclaimer";
        disclaimer.textContent = "Warning: Deleting this project will permanently remove all associated to-do items. Current to-do counts: ";
        const itemsCount = document.createElement("span");
        itemsCount.className = "itemsCount";
        disclaimer.appendChild(itemsCount);

        const cancelBtn = document.createElement("button");
        cancelBtn.className = "cancel";
        cancelBtn.addEventListener("click", () => {
            deletedialog.close("");
        });
        const confirmBtn = document.createElement("button");
        confirmBtn.className = "confirm";

        deletedialog.addEventListener("close", () => {
            const projID = +deletedialog.returnValue;
            
            // if confirm Btn is clicked
            if (projID) {
                // delete current project in the backend
                projectUtil.removeProjByID(projID);
                // call projRefresher()
                projRefresher();
            }
        })
        deletedialog.append(title, disclaimer, cancelBtn, confirmBtn);



        // sidebar
        const sideBar = document.createElement("div");
        sideBar.className = "sideBar";

        const projContainer = document.createElement("div");
        projContainer.className = "projCont";

        const projBtn = document.createElement("div");
        projBtn.className = "projBtn";
        const plusIcon = document.createElement("img");
        plusIcon.src = plusIcon;
        plusIcon.alt = "Add a new project";
        plusIcon.addEventListener("click", () => {
            projForm.reset();
            projDialog.showModal();
        });

        projBtn.appendChild(plusIcon);

        sideBar.append(projContainer, projBtn);
        

        // main
        const mainPanel = document.createElement("div");
        mainPanel.className = "mainPanel";

        const todoWindow = document.createElement("div");
        todoWindow.className = "tdWin";

        const tdBtn = document.createElement("div");
        tdBtn.className = "tdBtn";
        const plusIcon1 = document.createElement("img");
        plusIcon1.src = plusIcon;
        plusIcon1.alt = "Add a new Todo";

        tdBtn.appendChild(plusIcon1);
        
        mainPanel.append(todoWindow, tdBtn);


        
        document.body.append(sideBar, mainPanel, projDialog, toDoDialog, deletedialog);

        


    };

})();