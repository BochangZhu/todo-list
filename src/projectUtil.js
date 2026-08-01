class projectUtil{
    // arr to store all projs
    static #projectArr = [];

    // items arr for individual proj
    itemsArr = [];

    constructor(name = "untitled", color = "blue"){
        this.name = name;
        this.color = color;

        this.id = projectUtil.#projectArr.length;
        projectUtil.#projectArr.push(this);
    }

    refreshItems(){
        this.itemsArr.sort((a, b) => {
            return (a.dueDate.getTime() - b.dueDate.getTime());
        });
    }

    updateName(newName){
        this.name = newName;
    }

    removeProj(id){
        projectUtil.#projectArr.splice(id,1);
    }

}

export {projectUtil};