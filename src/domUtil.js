import { projectUtil } from "./projectUtil";
import plusIcon from "./asset/plus-icon.svg";
// iife create domUtil module
export const domUtil = (() => {
    function projRefresher(){
        // clean old projs 
        const projCont = document.querySelector(".projCont");
        [...projCont.children].forEach(obj => obj.remove());

        // append all projs from arr
        projectUtil.projArr.forEach(projObj => {
            const temp = document.createElement("div");
            temp.id = projObj.id.toString();
            temp.classList.add(projObj.color);
            temp.textContent = projObj.name;

            projCont.appendChild(temp);
        });
    }

    function todoLstRefresher(){

    }

    function domInit(){
        // create a default project
        const defaultProj = new projectUtil("Default Project");

        // basic html layout

        // dialogs for projBtn and todoBtn
        
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
            // open dialog
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