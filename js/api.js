//Configuraciones API Instragram
urlAPI2 = "https://instagram29.p.rapidapi.com/user/"
var settingsAPI2 = {
    "async": true,
    "crossDomain": true,
    "url": "",
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "instagram29.p.rapidapi.com",
        "x-rapidapi-key": "97d67d68c2msh3d57b22d5f25d7cp1b9033jsn4c2ce0faa31c"
    }
};

//Configuraciones API Full Contact
var settingsAPI1 = {
    "url": "https://api.fullcontact.com/v3/person.enrich",
    "method": "POST",
    "async": true,
    "crossDomain": true,
    // This is the important part
    /*"xhrFields": {
        "withCredentials": true
    },*/
    "timeout": 0,
    "headers": {
        "Authorization": "Bearer GIbUNEeE0ZBei7W7ZzHMw6LK0iwfz7Md",
        "Content-Type": "text/plain",
        //"Access-Control-Allow-Origin": "*",
        //"Access-Control-Allow-Credentials": true
    },
    //"data": "{\r\n\"email\": \"snriedel85@gmail.com\"\r\n}",
};

function handleClick(event) {
    consultarAPIs()
    return false;
}
async function consultarAPIs() {
    const usuario = $("#usuario").val()
    const correo = $("#correo").val()
    const nombre = $("#nombre").val()

    let perfil = {}
    console.log(usuario, correo)

    //Ocultar los mensajes
    hidenAllFlags()

    if (!!usuario || !!correo) {
        hiddenElements("form")
            //hiddenElements("usuario")
        showElements("loading2")
        showElements("loading3")


        //Service Full Contact
        if (!!correo || !!usuario) {
            dataConf = ''
            if (!!correo) {
                console.log('Correo')
                dataConf = dataConf + "\r\n\"email\": \"" + correo + "\"\r\n"
            }
            if (!!usuario) {
                console.log('Usuario')
                if (dataConf.length > 0) {
                    dataConf = dataConf + ","
                }
                dataConf = dataConf + "\r\n\"twitter\": \"@" + usuario + "\"\r\n"
            }
            if (!!nombre) {
                console.log('Nombre')
                if (dataConf.length > 0) {
                    dataConf = dataConf + ","
                }
                dataConf = dataConf + "\r\n\"fullName\": \"" + nombre + "\"\r\n"
            }
            if (!!correo || !!usuario) {
                //API1
                settingsAPI1['data'] = "{" + dataConf + "}"
                console.log(settingsAPI1['data'])
                console.log('Run api')
                console.log(settingsAPI1)
                try {
                    await $.ajax(settingsAPI1).done(function(response) {
                        console.log("Response");
                        console.log(response);
                        perfil['api_full_contact'] = response
                    }).fail(function(error) {
                        console.log("Error API1: " + error);
                    });
                } catch (error) {
                    console.error(error);
                }
            }

            //API2
            if (!!usuario) {
                settingsAPI2.url = urlAPI2 + usuario
                try {
                    await $.ajax(settingsAPI2).done(function(response) {
                        console.log(response);
                        perfil['api_instragram'] = response['data']
                    }).fail(function(response) {
                        console.error("Error API2: " + response);
                    });
                } catch (error) {
                    console.error(error);
                }
            }
            console.log('API Done')
        }


        /*await $.ajax(settingsAPI2).done(function (response) {
            console.log(response);
            perfil['api_instragram']=response['data']
            showElements("form")
            //showElements("usuario")
            hiddenElements("loading2")
        }).fail(function (response) {
            console.error(response);
            showElements("form")
            //showElements("usuario")
            hiddenElements("loading2")
        });*/

        console.log(perfil)

        showElements("form")
        hiddenElements("loading2")
        hiddenElements("loading3")
        checkFlags(perfil)

    } else {
        console.warn("Texto en blanco no valido")
    }

}

function checkFlags(response) {
    flags = {
            profileFacebook: '',
            profileTwitter: '',
            profileLinkedin: '',
            profileInstagram: '',
            photos: [],
            locations: [],
            employment: [],
            education: [],
        }
        //Full Contact
    if (!!response['api_full_contact']) {
        if (!!response['api_full_contact']['facebook']) {
            showElements('flag_1')
            showElements('flag_1.1')
            flags.profileFacebook = response['api_full_contact']['facebook']
            document.getElementById("text_flag_1.1").innerHTML = flags.profileFacebook;
        }
        if (!!response['api_full_contact']['twitter']) {
            showElements('flag_1')
            showElements('flag_1.2')
            flags.profileTwitter = response['api_full_contact']['twitter']
            document.getElementById("text_flag_1.2").innerHTML = flags.profileTwitter;
        }
        if (!!response['api_full_contact']['linkedin']) {
            showElements('flag_1')
            showElements('flag_1.3')
            flags.profileLinkedin = response['api_full_contact']['linkedin']
            document.getElementById("text_flag_1.3").innerHTML = flags.profileLinkedin;
        }
        if (!!response['api_full_contact']['details']['photos']) {
            if (response['api_full_contact']['details']['photos'].length > 0) {
                showElements('flag_2')
                flags.photos = response['api_full_contact']['details']['photos']
                console.log(flags.photos)
                document.getElementById("img_flag_2").src = flags.photos[0].value;
            }
        }
        if (!!response['api_full_contact']['details']['locations']) {
            if (response['api_full_contact']['details']['locations'].length > 0) {
                showElements('flag_3')
                flags.locations = response['api_full_contact']['details']['locations']
                text = ''
                for (const address in flags.locations) {
                    //console.log(flags.locations[address])
                    if ('formatted' in flags.locations[address]) {
                        text += flags.locations[address].formatted + "\n"
                    }
                }
                //console.log(text)
                document.getElementById("text_flag_3").innerHTML = text;
            }
        }
        if (!!response['api_full_contact']['details']['employment']) {
            if (response['api_full_contact']['details']['employment'].length > 0) {
                showElements('flag_4')
                flags.employment = response['api_full_contact']['details']['employment']
                    //console.log(flags.employment)
                text = ''
                for (const id in flags.employment) {
                    //console.log(flags.locations[address])
                    if ('name' in flags.employment[id]) {
                        console.log(flags.employment[id])
                        text += '- Nombre: ' + flags.employment[id].name + "\n"
                    }
                }
                document.getElementById("text_flag_4").innerHTML = text;
            }
        }
        if (!!response['api_full_contact']['details']['education']) {
            if (response['api_full_contact']['details']['education'].length > 0) {
                showElements('flag_5')
                flags.education = response['api_full_contact']['details']['education']
                text = ''
                for (const id in flags.education) {
                    if ('degree' in flags.education[id]) {
                        text += '- Nombre: ' + flags.education[id].degree + "\n"
                    }
                }
                document.getElementById("text_flag_5").innerHTML = text;
            }
        }
        if (!!response['api_full_contact']['ageRange']) {
            showElements('flag_6')
            flags.ageRange = response['api_full_contact']['ageRange']
                //console.log(flags.ageRange)
            document.getElementById("text_flag_6").innerHTML = flags.ageRange;
        }
    }
    //Rapid API Instragram
    if (!!response['api_instragram']) {
        if (!!response['api_instragram']['user']) {
            if (!!response['api_instragram']['user']['username'] && !!response['api_instragram']['user']['is_private'] == false) {
                showElements('flag_1')
                showElements('flag_1.5')
                flags.profileInstagram = response['api_instragram']['user']['username']
                document.getElementById("text_flag_1.5").innerHTML = flags.profileInstagram;
            }
            if (!!response['api_instragram']['user']['website']) {
                showElements('flag_1')
                showElements('flag_1.6')
                flags.profileWebsite = response['api_instragram']['user']['website']
                document.getElementById("text_flag_1.6").innerHTML = flags.profileWebsite;
            }
            if (!!response['api_instragram']['user']['follower_count']) {
                showElements('flag_1')
                showElements('flag_1.7')
                flags.profileFollower = response['api_instragram']['user']['follower_count']
                document.getElementById("text_flag_1.7").innerHTML = flags.profileFollower;
            }
            /*if (!!response['api_instragram']['user']['profile_pic_url']) {
                console.log("Photo")
                showElements('flag_2')
                flags.photo_instagram = response['api_instragram']['user']['profile_pic_url']
                console.log(flags.photos)
                document.getElementById("img_flag_2").src = flags.photo_instagram;
            }*/

        }
        /*if(!!response['api_instragram']['facebook']){
            flags.profileFacebook=response['api_full_contact']['facebook']
        }*/

    }
}

function hidenAllFlags() {
    hiddenElements('flag_1')
    hiddenElements('flag_1.1')
    hiddenElements('flag_1.2')
    hiddenElements('flag_1.3')
    hiddenElements('flag_2')
    hiddenElements('flag_3')
    hiddenElements('flag_4')
    hiddenElements('flag_5')
    hiddenElements('flag_6')
}

function hiddenElements(elementID) {
    const element = document.getElementById(elementID)
    element.style.visibility = 'hidden';
    element.style.display = 'none';
}

function showElements(elementID) {
    const element = document.getElementById(elementID)
    element.style.visibility = 'visible';
    element.style.display = '';
}




$("#formulario").submit(function(e) {
    e.preventDefault();
});

//console.log(enviroment.enviroment)

async function getData() {
    //Open json from enviroment/enviroment.json
    let enviroment = await fetch("./enviroment/enviroment.json")
    enviroment = await enviroment.json()
    console.log(enviroment)
}
//getData()