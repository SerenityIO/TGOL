var DataBase = (JSON.parse(window.localStorage.getItem('DataBase'))) ? JSON.parse(window.localStorage.getItem('DataBase')) : [];

var users = [{
    email: "admin@admin.com",
    pass: "admin",
    isonline: false,
    settings: [{
        size: '20x10',
        arr: []
    }]
}];


function RegisterUser(event) {
    event.preventDefault();

    var email = event.target.elements.email.value;
    var F_pass = event.target.elements.FirstPassword.value;
    var S_pass = event.target.elements.SecondPassword.value;

    var temp = DataBase.forEach(comp => {
        if (comp.email === email) {
            alert("This user already exists");
            return 1;
        }
    });

    if (temp != 1) {

        if (F_pass === S_pass) {
            users = {
                email: email,
                pass: F_pass,
                isonline: false
            };

            DataBase.push({
                email: email,
                pass: F_pass,
                isonline: false
                
            });

            window.localStorage.setItem('DataBase', JSON.stringify(DataBase));
            event.target.reset();
            document.location.href = "./log.html";
        } else {
            alert("2");
        }
    }
}

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
            i++;
        });
    } else {
        alert("No user");
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
    document.location.href = "./log.html";
} 0