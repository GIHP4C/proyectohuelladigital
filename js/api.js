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


function consultarAPI2() {
    const text=$("#usuario").val()
    console.log(text)
    if(!!text){
        hiddenElements("btn2")
        hiddenElements("usuario")
        showElements("loading2")
        settingsAPI2.url=urlAPI2+text
        $.ajax(settingsAPI2).done(function (response) {
            console.log(response);
            showElements("btn2")
            showElements("usuario")
            hiddenElements("loading2")
        }).fail(function (response) {
            console.error(response);
            showElements("btn2")
            showElements("usuario")
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
