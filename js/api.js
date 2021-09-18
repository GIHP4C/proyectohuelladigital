
//Configuraciones API Instragram
urlAPI2="https://instagram29.p.rapidapi.com/user/"
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
    const usuario=$("#usuario").val()
    const correo=$("#correo").val()
    let perfil={}
    console.log(usuario, correo)
    if(!!usuario || !!correo) {
        hiddenElements("form")
        //hiddenElements("usuario")
        showElements("loading2")
        settingsAPI2.url=urlAPI2+usuario
        /*if(!!correo){
            settingsAPI1['data']="{\r\n\"email\": \""+correo+"\"\r\n}"
            console.log('Run api')
            console.log(settingsAPI1)
            await $.ajax(settingsAPI1).done(function (response) {
                console.log(response);
            });
            console.log('API Done')
        }*/
        
        await $.ajax(settingsAPI2).done(function (response) {
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
        });
    }else{
        console.warn("Texto en blanco no valido")
    }
    
  }
function hiddenElements(elementID){
    const element=document.getElementById(elementID)
    element.style.visibility='hidden';
}
function showElements(elementID){
    const element=document.getElementById(elementID)
    element.style.visibility='visible';
}
