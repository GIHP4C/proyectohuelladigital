
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
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    },
    //"data": "{\r\n\"email\": \"snriedel85@gmail.com\"\r\n}",
};


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
        settingsAPI2.url = urlAPI2 + usuario

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
            settingsAPI1['data'] = "{" + dataConf + "}"
            console.log(settingsAPI1['data'])
            console.log('Run api')
            console.log(settingsAPI1)
            try {
                await $.ajax(settingsAPI1).done(function (response) {
                    console.log("Response");
                    console.log(response);
                    perfil['api_full_contact'] = response
                }).fail(function (error) {
                    console.log("Error "+error);
                });
            } catch (error) {
                console.error(error);
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
        }
        if (!!response['api_full_contact']['twitter']) {
            showElements('flag_1')
            showElements('flag_1.2')
            flags.profileTwitter = response['api_full_contact']['twitter']
        }
        if (!!response['api_full_contact']['linkedin']) {
            showElements('flag_1')
            showElements('flag_1.3')
            flags.profileLinkedin = response['api_full_contact']['linkedin']
        }
        if (!!response['api_full_contact']['details']['photos']) {
            if (response['api_full_contact']['details']['photos'].length > 0) {
                showElements('flag_2')
                flags.photos = response['api_full_contact']['details']['photos']
            }
        }
        if (!!response['api_full_contact']['details']['locations']) {
            if (response['api_full_contact']['details']['locations'].length > 0) {
                showElements('flag_3')
                flags.locations = response['api_full_contact']['details']['locations']
            }
        }
        if (!!response['api_full_contact']['details']['employment']) {
            if (response['api_full_contact']['details']['employment'].length > 0) {
                showElements('flag_4')
                flags.employment = response['api_full_contact']['details']['employment']
            }
        }
        if (!!response['api_full_contact']['details']['education']) {
            if (response['api_full_contact']['details']['education'].length > 0) {
                showElements('flag_5')
                flags.education = response['api_full_contact']['details']['education']
            }
        }
        if (!!response['api_full_contact']['ageRange']) {
            showElements('flag_5')
            flags.ageRange = response['api_full_contact']['ageRange']
        }
    }
    //Rapid API Instragram
    /*if(!!response['api_instragram']){
        if(!!response['api_instragram']['facebook']){
            flags.profileFacebook=response['api_full_contact']['facebook']
        }
    }*/
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
}

function hiddenElements(elementID) {
    const element = document.getElementById(elementID)
    element.style.visibility = 'hidden';
}
function showElements(elementID) {
    const element = document.getElementById(elementID)
    element.style.visibility = 'visible';
}
