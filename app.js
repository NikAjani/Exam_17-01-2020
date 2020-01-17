var submittedData = localStorage.getItem('submittedData')?JSON.parse(localStorage.getItem('submittedData')):[];
var tableHead = ['NAME','EMAIL','PASSWORD','AGE','ACTION'];
var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// show and hide registration Button
function registerButton(){
    if(localStorage.getItem('Admin')){
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


// Register Admin
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
        localStorage.setItem('Admin',1);
        window.location = 'index.html';
    }
}

// redirect To registration Form
function redirectAdmin(){
    window.location = 'Register.html';
}

// Login User
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
                    sessionStorage.setItem('login',submittedData[i].name);
                    alert('login Sucess');
                    createdDate = new Intl.DateTimeFormat().format(Date.now());
                    submittedData[i].loginTime = createdDate;
                    localStorage.setItem('submittedData',JSON.stringify(submittedData));
                    window.location = 'Dashboard.html';
                    break;
                }else if(submittedData[i].email==userName && submittedData[i].password==loginPassword && submittedData[i].typeOfUser=='User'){
                    sessionStorage.setItem('login',submittedData[i].name);
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

//logout
function logout(){
    var activeUser = sessionStorage.getItem('login');
    if(submittedData){
        for(var i = 0;i<submittedData.length;i++){
            if(submittedData[i].name==activeUser){
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

// load Table in DashBoar at user Page
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


// Display age Group counter in Dashboard
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
    document.getElementById('bwAge').innerHTML = "Age 18-50 : "+betweenAge;
    document.getElementById('aboveAge').innerHTML = "Age > 50 : "+aboveAge;

    var todayBirthday = getBirthdayMsg();
    var displayMsg = document.getElementById('birthdayMSG');
    todayBirthday!='' ? displayMsg.innerHTML = "Today's "+todayBirthday+' BirthDay' : displayMsg.innerHTML= '';

    
}

// return Birthday person Name
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
                    sessionStorage.setItem('bithday',submittedData[i].name);
                }
               
                
                BirthdayPersonName += ' '+submittedData[i].name;
            }
        }
        
    }
    return BirthdayPersonName;
}

//Add New User
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
        location.reload();
        
    }
}

//load login and logout Table at user Session Page 
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

                    tr.setAttribute('id','id-'+submittedData[j].id);
                    
                    for(var i=0; i < tableHead.length;i++){

                        var td = document.createElement('td');
                        td = tr.insertCell(i);
                        if(i==0) td.innerHTML = submittedData[j].name;
                        else if(i==1) td.innerHTML = submittedData[j].email;
                        else if(i==2) td.innerHTML = submittedData[j].password;
                        else if(i==3) td.innerHTML = submittedData[j].age;
                        else if(i==4) {
                            td.innerHTML = '<input type="button" value="Edit" onclick="editUser('+submittedData[j].id+')'+'"><input type="button" value="Delete" onclick="deleteUser('+submittedData[j].id+')'+'">';
                        }
                        k++;
                    }
                }

    }
    
    var div = document.getElementById('listUser');
    div.appendChild(userTable);
}

//delete User
function deleteUser(id){

    console.log(id);
    for(var i=0;i<submittedData.length;i++){
        if(submittedData[i].id==id){
            submittedData.splice(i,1);
            localStorage.setItem('submittedData',JSON.stringify(submittedData));
            location.reload();
        }
    }
}

//edit in user Form (display data in form field)
function editUser(id){
    console.log(id);
    var editName = document.getElementById('UsersName');
    var email = document.getElementById('usersEmail');
    var pass = document.getElementById('usersPassword');
    var dateOfBith = document.getElementById('birthDate');
    var btn = document.getElementById('registerUserBtn');
    for(var i=0; i<submittedData.length;i++){
        if(submittedData[i].id==id){
            
            //editName.value = submittedData[i].name;
            email.value = submittedData[i].email;
            pass.value = submittedData[i].pass;
            dateOfBith.value = submittedData[i].birthOfDate;
            btn.innerHTML ='<input type="button" value="Update User" onclick="updateUser('+submittedData[i].id+')'+'">'
        }
    }
}

//update User
function updateUser(id){
    var usersName = document.getElementById('usersName').value;
    var usersEmail = document.getElementById('usersEmail').value;
    var usersPassword = document.getElementById('usersPassword').value;
    var birthOfDate = document.getElementById('birthDate').value;
    var age = countAge(parseInt(birthOfDate.slice(0,4)));
    //console.log(age);

    if(usersName==''){
        alert('Please Enter Valid name')
    }else if(usersEmail=='' || !emailPattern.test(usersEmail)){
        alert('Please Enter Valid Email Id');
    }else if(usersPassword == ''){
        alert('Please Enter valid Password');
    }else if(birthOfDate == ''){
        alert('Please Enter Your BirthDate');
    }else{
        for(var i=0; i<submittedData.length;i++){
            if(submittedData[i].id==id){
                submittedData[i].name = usersName;
                submittedData[i].email = usersEmail;
                submittedData[i].password = usersPassword;
                submittedData[i].birthOfDate=birthOfDate;
                submittedData[i].age= age;
                localStorage.setItem('submittedData',JSON.stringify(submittedData));
                location.reload();
            }
        }
    }
}

//calculate Age
function countAge(birthYear){
    var date = new Date();
    var currentYear = date.getFullYear();
    return currentYear-birthYear;
}
