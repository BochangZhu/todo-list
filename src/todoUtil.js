import { add, sub} from 'date-fns';
// factory func for creating todoItem
function createTodoItem(tit = "No Title", des = "No description", due, pri = -1){
    // base properties title, description, dueDate and priority
    let title = tit;
    let description = des;
    let dueDate = due;
    let priority = pri;
    const uid = crypto.randomUUID();
    
    
    // edit funcs
    function changeTitle(newTitle){
        this.title = newTitle;
    }

    function changeDes(newDes){
        this.description = newDes;
    }
    
    function extendDue(days, hrs, mins){
        this.dueDate = add(this.dueDate, {
            days: days,
            hours: hrs,
            minutes: mins
        });
    }

    function shrinkDue(days, hrs, mins) {
        this.dueDate = sub(this.dueDate, {
            days: days,
            hours: hrs,
            minutes: mins
        });
    }

    function incPriority(){
        this.priority += 1;
    }

    function decPriority(){
        this.priority -= 1;
    }





}
