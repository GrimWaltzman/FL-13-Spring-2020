//Those are here just to prevent eslint errors
const listOfStudents = [];
const homeworkResults = [];

function Student(student){
    let name = student.name;
    let email = student.email;
    let homeworkResults = [];

    this.getName = function(){
        return name;
    }

    this.getEmail = function(){
        return email
    }

    this.getHomeworkResult = function(){ 
        //Only returns the array instead of printing it in the console, because otherwise either 
        // printStudentsEligibleForTest stops working or logs it several times on other functions;
        return homeworkResults; 
    }

    this.addHomeworkResult = function(topic, success){
        let result = {
            topic: topic,
            success: success
        }
        homeworkResults.push(result);
    }
}



function FrontEndLab(list, limit) {
    let studentList = list;

    this.printStudentList = function(){
        for(let student in studentList){
            console.log(`name: ${studentList[student].getName()}, email: ${studentList[student].getEmail()}`);
            console.log(studentList[student].getHomeworkResult());
        }
    }

    this.addHomeworkResult = function (homeworkResults){ 
        //This method only works with full array ot the type described in data.js as it was described in the task 
        // and will not work with separate arrays as it was shown on pictures
        homeworkResults.forEach(e => {
            for(let i in list){
                let mail = list[i].getEmail();
                let stud = e.results.find(x => x.email === mail);
                list[i].addHomeworkResult(e.topic, stud.success);
            }  
        });
    }

    this.printStudentsEligibleForTest = function(){
        for(let i in studentList){
            let results = studentList[i].getHomeworkResult();
            let pass = 0;
            for (let x = 0; x<results.length; x++){
                if(!results[x].success){
                    pass++;
                }
            }
            if(pass<limit){
                console.log(`name: ${studentList[i].getName()}, email: ${studentList[i].getEmail()}`);
            }
        }
    }
}


