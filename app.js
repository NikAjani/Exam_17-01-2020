var submittedData = localStorage.getItem('submittedData')?JSON.parse(localStorage.getItem('submittedData')):[];
var Users = function(name,email,password,city,state,birthOfDate,typeOfUser,loginTime,logOutTime){
    this.name = name;
    this.email = email;
    this.password = password;
    this.city = city;
    this.state = state;
    this.birthOfDate = birthOfDate;
    this.typeOfUser = typeOfUser;
    this.loginTime = loginTime;
    this.logOutTime = logOutTime
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
    }else if(email==''){
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
        var user = new Users(name,email,password,city,state,'','Admin','','');
        submittedData.push(user);
        localStorage.setItem('submittedData',JSON.stringify(submittedData));
        
        window.location = 'index.html';
    }
}

function redirectAdmin(){
    window.location = 'Register.html';
}

function loginUser(){
    
}