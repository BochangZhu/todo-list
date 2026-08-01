import { add, sub} from 'date-fns';
import { lastDayOfISOWeekYearWithOptions } from 'date-fns/fp';

let maxPriority = 0;
// factory func for creating todoItem
function createTodoItem(tit = "No Title", des, due, pri = -1, pos_arr){
    // base properties title, description, dueDate and priority
    let title = tit;
    let description = des;
    let dueDate = due;
    let priority = pri;
    let uid = pos_arr;
    
    if (priority > maxPriority) {
        maxPriority = priority;
    }
    
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

    return {
        title,
        description,
        dueDate,
        priority,
        uid,
        changeTitle,
        changeDes,
        extendDue,
        shrinkDue,
    };

}

export {createTodoItem, maxPriority};