var submittedData = localStorage.getItem('submittedData')?JSON.parse(localStorage.getItem('submittedData')):[];
var tableHead = ['NAME','EMAIL','PASSWORD','AGE','ACTION'];
var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
function registerButton(){
    if(sessionStorage.getItem('Admin')){
        document.querySelector('#registerDiv').style.display = 'none';
    }
}

var Users = function(id,name,email,password,city,state,birthOfDate,typeOfUser,loginTime,logOutTime,age){
    this.id = id,
    this.name = name,
    this.email = email,
    this.password = password,
    this.city = city,
    this.state = state,
    this.birthOfDate = birthOfDate,
    this.typeOfUser = typeOfUser,
    this.loginTime = loginTime,
    this.logOutTime = logOutTime,
    this.age = age
};


function registerAdmin(){
    //document.getElementById('registerNow').style.display = 'none';
    var name = document.getElementById('name').value;
    var email = document.getElementById('emailId').value;
    var password = document.getElementById('pass').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var city = document.getElementById('city').value;
    var state = document.getElementById('state').value;
    var term = document.getElementById('terms');

    if(name==''){
        alert('Please Enter Valid name')
    }else if(email=='' || !emailPattern.test(email)){
        alert('Please Enter Valid Email Id');
    }else if(password == ''){
        alert('Please Enter valid Password');
    }else if(confirmPassword == '' || confirmPassword != password){
        alert('Please Enter valid Confrim Password');
    }else if(city == 'select'){
        alert('Please select Your City');
    }else if(state == 'select'){
        alert('Please select Your state');
    }else if(!term.checked){
        alert('Please check Term And Conditions');
    }else{
        var id = submittedData.length-1;
        if(localStorage.getItem('submittedData')){
            id = parseInt((submittedData[id].id))+1;
        }else{
            id = 1;
        }
        var user = new Users(id,name,email,password,city,state,'','Admin','','',0);
        submittedData.push(user);
        localStorage.setItem('submittedData',JSON.stringify(submittedData));
        sessionStorage.setItem('Admin',1);
        window.location = 'index.html';
    }
}

function redirectAdmin(){
    window.location = 'Register.html';
}

function loginUser(){
    var userName = document.getElementById('userName').value;
    var loginPassword = document.getElementById('loginPassword').value;

    if(userName == '' || !emailPattern.test(userName)){
        alert("Please Enter valid Email Id");
    }else if(loginPassword == ''){
        alert("Please Enter Valid Password");
    }else{

        if(submittedData){
            for(var i = 0;i<submittedData.length;i++){
                if(submittedData[i].email==userName && submittedData[i].password==loginPassword && submittedData[i].typeOfUser=='Admin'){
                    sessionStorage.setItem('login',userName);
                    alert('login Sucess');
                    createdDate = new Intl.DateTimeFormat().format(Date.now());
                    submittedData[i].loginTime = createdDate;
                    localStorage.setItem('submittedData',JSON.stringify(submittedData));
                    window.location = 'Dashboard.html';
                    break;
                }else if(submittedData[i].email==userName && submittedData[i].password==loginPassword && submittedData[i].typeOfUser=='User'){
                    sessionStorage.setItem('login',userName);
                    alert('login Sucess');
                    createdDate = new Intl.DateTimeFormat().format(Date.now());
                    submittedData[i].loginTime = createdDate;
                    localStorage.setItem('submittedData',JSON.stringify(submittedData));
                    window.location = 'userIndex.html';
                    break;
                }
            }
        }else{
            alert('First Register Your Self..');
        }
    }
}

function registerUser(){

    var usersName = document.getElementById('usersName').value;
    var usersEmail = document.getElementById('usersEmail').value;
    var usersPassword = document.getElementById('usersPassword').value;
    var birthOfDate = document.getElementById('birthDate').value;
    var age = countAge(parseInt(birthOfDate.slice(0,4)));
    console.log(age);
    
    

    if(usersName==''){
        alert('Please Enter Valid name')
    }else if(usersEmail=='' || !emailPattern.test(usersEmail)){
        alert('Please Enter Valid Email Id');
    }else if(usersPassword == ''){
        alert('Please Enter valid Password');
    }else if(birthOfDate == ''){
        alert('Please Enter Your BirthDate');
    }else{
        var id = submittedData.length-1;
        if(localStorage.getItem('submittedData')){
            id = parseInt((submittedData[id].id))+1;
        }else{
            id = 1;
        }
        var user = new Users(id,usersName,usersEmail,usersPassword,'','',birthOfDate,'User','','',age);
        submittedData.push(user);
        localStorage.setItem('submittedData',JSON.stringify(submittedData));
        
    }
}

function loadTable(){
    var userTable = document.createElement('table');
    userTable.setAttribute('id', 'userData');
    userTable.setAttribute('border','1');

    var tr = userTable.insertRow(-1);

    for (var i = 0; i < tableHead.length; i++) {
        var th = document.createElement('th');
        th.innerHTML = tableHead[i];
        tr.appendChild(th);
    }
    
    var submittedData = JSON.parse(localStorage.getItem('submittedData'));
    console.log(submittedData);
    if(submittedData){
        var k = 0;
        for(var j=1;j<submittedData.length;j++){

                var noOfRows = userTable.rows.length;
                    var tr = userTable.insertRow(noOfRows);

                    tr.setAttribute('id',submittedData[i].id);
                    
                    for(var i=0; i < tableHead.length;i++){

                        var td = document.createElement('td');
                        td = tr.insertCell(i);
                        if(i==0) td.innerHTML = submittedData[j].name;
                        else if(i==1) td.innerHTML = submittedData[j].email;
                        else if(i==2) td.innerHTML = submittedData[j].password;
                        else if(i==3) td.innerHTML = submittedData[j].age;
                        else if(i==4) {

                            var edit = document.createElement('input');
                            edit.setAttribute('type', 'button');
                            edit.setAttribute('value', ' Edit ');
                            edit.setAttribute('onClick', 'editUser(this)');
                            
                            var remove = document.createElement('input');
                            remove.setAttribute('type', 'button');
                            remove.setAttribute('value', 'Remove');
                            remove.setAttribute('onClick', 'deleteUser(this)');

                            td.appendChild(edit);
                            td.appendChild(remove);
                        }
                        k++;
                    }
                }

    }
    
    var div = document.getElementById('listUser');
    div.appendChild(userTable);
}

function deleteUser(oButton){
    submittedData = JSON.parse(localStorage.getItem('submittedData'));

    var userTable = document.getElementById('userData');
    var id = oButton.parentNode.parentNode.rowIndex;
    console.log(id);
    userTable.deleteRow(oButton.parentNode.parentNode.rowIndex);
    console.log(submittedData);
    
    for(var i=0;i<submittedData.length;i++){
        if((i+1)==id){
            submittedData.splice(i,1);
            localStorage.setItem('submittedData',JSON.stringify(submittedData));
        }
    }
}

function editUser(oButton){
    submittedData = JSON.parse(localStorage.getItem('submittedData'));

    var userTable = document.getElementById('userData');
    var id = oButton.parentNode.parentNode.rowIndex;
    console.log(id);
    
    id = id==1 ? id : id-1;
    console.log(id);
}

function logout(){
    var activeUser = sessionStorage.getItem('login');
    if(submittedData){
        for(var i = 0;i<submittedData.length;i++){
            if(submittedData[i].email==activeUser){
                sessionStorage.removeItem('login');
                alert('logout');
                createdDate = new Intl.DateTimeFormat().format(Date.now());
                submittedData[i].logOutTime = createdDate;
                localStorage.setItem('submittedData',JSON.stringify(submittedData));
                window.location = 'index.html';
                break;
            }
        }
    }
}

function loadSessionTable(){
    var userTable = document.getElementById('sessionTable');

    
    var tempfetchData = JSON.parse(localStorage.getItem('submittedData'));
    console.log(tempfetchData);
    if(tempfetchData){
        var k = 0;
        for(var j=0;j<tempfetchData.length;j++){
            
            var noOfRows = userTable.rows.length;
            var tr = userTable.insertRow(noOfRows);
            tr = userTable.insertRow(noOfRows);
            
            for(var i=0; i < 3;i++){
                var td = document.createElement('td');
                td = tr.insertCell(i);
                if(i==0) td.innerHTML = tempfetchData[j].name;
                else if(i==1) td.innerHTML = tempfetchData[j].loginTime;
                else if(i==2) td.innerHTML = tempfetchData[j].logOutTime;
                k++;
            }
        }
    }
}

function countAge(birthYear){
    var date = new Date();
    var currentYear = date.getFullYear();
    return currentYear-birthYear;
}

function displayAgeCount(){
    var belowAge=0,betweenAge=0,aboveAge=0;

    for(var i=0; i<submittedData.length;i++){
        
        if(submittedData[i].typeOfUser=='User'){
            if(submittedData[i].age < 18){
                belowAge++;
            }else if(submittedData[i].age >= 18 && submittedData[i].age<50){
                betweenAge++;
            }else{
                aboveAge++;
            }
        }
        
    }
    document.getElementById('downAge').innerHTML = "Age < 18 : "+belowAge;
    document.getElementById('bwAge').innerHTML = "Age >= 18 And <50 : "+betweenAge;
    document.getElementById('aboveAge').innerHTML = "Age > 50 : "+aboveAge;

    var todayBirthday = getBirthdayMsg();
    document.getElementById('birthdayMSG').innerHTML = "Today's "+todayBirthday+' BirthDay';

    
}

function getBirthdayMsg(){
    BirthdayPersonName = '';
    currentDate = new Date();
    var date = currentDate.getDate();
    var month = currentDate.getMonth();
    
    
    for(var i=0; i<submittedData.length;i++){

        if(submittedData[i].birthOfDate != ''){
            var birthDay = Date.parse(submittedData[i].birthOfDate);
            birthDay = new Date(birthDay);
            
            var dateinLoop = birthDay.getDate();
            var monthinLoop = birthDay.getMonth();

            
            if(date == dateinLoop && month==monthinLoop){
                if(sessionStorage.getItem('login')==submittedData[i].email);
                {
                    sessionStorage.setItem('bithday',submittedData[i].email);
                }
               
                
                BirthdayPersonName += ' '+submittedData[i].name;
            }
        }
        
    }
    return BirthdayPersonName;
}