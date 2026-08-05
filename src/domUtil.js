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
            temp.addEventListener("mouseenter", () => {
                const deleteIcon = document.createElement("img");
                deleteIcon.className = "deleteIcon";
                deleteIcon.src = deleteIcon;
                deleteIcon.alt = "Delete project";
                deleteIcon.addEventListener("click", () => {
                    // open delete dialog

                    // delete current project in the backend
                    projObj.removeProj();
                    // call projRefresher()
                    projRefresher();
                });
                temp.appendChild(deleteIcon);
            });
            temp.addEventListener("mouseleave", () => {
                temp.querySelector(".deleteIcon").remove();
            });

            // also have event that when clicked, render the todolist in the main panel
            temp.addEventListener("click", () => {
                // ignore action for multi click
                if (temp.hasAttribute("selected")) {
                    return;
                }
                // clear existing attribute
                projDomArr.forEach(obj => obj.removeAttribute("selected"));
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
        const defaultProj = new projectUtil("Default Project");

        // dialogs for projBtn and todoBtn

        // projBtn
        const projDialog = document.createElement("dialog");
        projDialog.className = "projDialog";

        const projForm = document.createElement("form");
        projForm.method = "dialog";
        const para = document.createElement("p");
        para.textContent = "Add project";
        const input1 = document.createElement("input");
        input1.type = "text";
        input1.name = "name";
        input1.required = true;
        const label1 = document.createElement("label");
        label1.textContent = "Name";
        label1.appendChild(input1);
        const para1 = document.createElement("p");
        para1.textContent = "Color";
        para1.className = "color";
        projForm.append(para, label1, para1);

        const colorArr = ["blue", "green", "yellow", "orange", "red"];
        const colorCont = document.createElement("div");
        colorCont.className = "colorCont";
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

        projForm.appendChild(colorCont);

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




        // sidebar
        const sideBar = document.createElement("div");
        sideBar.className = "sideBar";

        const projContainer = document.createElement("div");
        projContainer.className = "projCont";

        const projBtn = document.createElement("div");
        projBtn.className = "projBtn";
        projBtn.addEventListener("")
        const plusIcon = document.createElement("img");
        plusIcon.src = plusIcon;
        plusIcon.alt = "Add a new project";
        plusIcon.addEventListener("click", () => {
            projForm.reset();
            projDialog.showModal();
        });
        projDialog.addEventListener("close", () => {
            if (projDialog.returnValue) {
                // add a new project
            }
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


        
        document.body.append(sideBar, mainPanel);

        


    };

})();