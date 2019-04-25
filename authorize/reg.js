var DataBase = (JSON.parse(window.localStorage.getItem('DataBase'))) ? JSON.parse(window.localStorage.getItem('DataBase')) : [];



function RegisterUser(event) {
    event.preventDefault();

    var email = event.target.elements.email.value;
    var F_pass = event.target.elements.FirstPassword.value;
    var S_pass = event.target.elements.SecondPassword.value;
    var us = 0;

    DataBase.forEach(comp => {
        if (comp.email === email) {
            alert("This user already exists");
            us = 1
        }
    });

    if (us != 1) {


        if (F_pass === S_pass) {
          
            DataBase.push({
                email: email,
                pass: F_pass,
                isonline: false,
                settings: [email,],
            });

            window.localStorage.setItem('DataBase', JSON.stringify(DataBase));
            event.target.reset();
            document.location.href = "./log.html";
        } else {
            alert("2");
        }
    }
    us = 0;
}

// console.log(DataBase);

function Login(event) {
    event.preventDefault();
    var i = 0;
    var email = event.target.elements.email.value;
    var pass = event.target.elements.Password.value;


    if (DataBase && DataBase.length) {

        DataBase.forEach(element => {
            if (element.email === email && element.pass === pass) {
                alert("Hello");
                DataBase[i].isonline = true;
                window.localStorage.setItem('DataBase', JSON.stringify(DataBase));
                document.location.href = "../main/field.html";
            }
            else {
                let textarea = document.getElementById('error');
                textarea.value='Invalid user';
                textarea.background = 'red';
            }
            i++;
        });
    } 
}

function Exit() {
    var i = 0;

    DataBase.forEach(element => {
        if (element.email && element.pass) {
            DataBase[i].isonline = false;
            window.localStorage.setItem('DataBase', JSON.stringify(DataBase));
        }
        i++;
    });
    document.location.href = "../authorize/log.html";
} 