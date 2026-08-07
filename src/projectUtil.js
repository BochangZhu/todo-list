class projectUtil{
    // arr to store all projs
    static projectArr = [];

    static selectedProjID = 0;

    // items arr (5 priorities)
    itemsArr = [[],[],[],[],[]];

    constructor(name = "untitled", color = "blue", isDefault = 0){
        this.name = name;
        this.color = color;
        this.isDefault = isDefault;

        this.id = projectUtil.projectArr.length;
        projectUtil.projectArr.push(this);
    }

    static refreshItems(){
        this.itemsArr.sort((a, b) => {
            return (a.dueDate.getTime() - b.dueDate.getTime());
        });
    }

    updateName(newName){
        this.name = newName;
    }

    removeProj(){
        if (this.id == projectUtil.selectedProjID) {
            projectUtil.selectedProjID -= 1;
        }
        projectUtil.projectArr.splice(this.id,1);
    }

    static removeProjByID(id){
        if (id == projectUtil.selectedProjID) {
            projectUtil.selectedProjID -= 1;
        }
        projectUtil.projectArr.splice(id, 1);
    }

    addTodoItem(todoObj){
        this.itemsArr.push(todoObj);
    }

}

export {projectUtil};