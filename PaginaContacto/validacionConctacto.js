
function Campos(){
    var nom=document.getElementById("nombre").value;
    var ape=document.getElementById("ape").value;
    var email=document.getElementById("mail").value;
    var tel=document.getElementById("tel").value;
    var pais=document.getElementById("pais").value;
    var mensaje=document.getElementById("mensaje").value;
    var error=document.getElementById("error");


        if(nom=="" || ape=="" || email=="" || mensaje=="" || tel==""){
            error.innerHTML="POR FAVOR COMPLETE TODOS LOS CAMPOS";
        }
        else if(nom !=="" && ape!=="" && email !=="" && mensaje !=="" && tel !==""){
            error.innerHTML="REVISE EN CASO DE ERRORES EN LOS CAMPOS";
            Nombre(nom);
            Ape(ape);
            Email(email);
            Tel(tel);
            Pais(pais, tel);
    }
}

function Nombre(nom){
    // Expresión regular para permitir solo letras y espacios, las barras delimitan la expresion regular,
    // el ^ indica el inicio de la cadena, el $ indica el final de la cadena, y los corchetes [] indican un conjunto de caracteres permitidos.
    
    var caracteres=/^[A-Za-záéíóúÁÉÍÓÚñÑ\s-]+$/; 
    var n=document.getElementById("nomERROR");

    if(nom.length<3){
        n.innerHTML="<ul><li>El nombre debe tener al menos 3 caracteres</li><li>NO debe tener caracteres especiales</li><li>NO debe contener nombres irreales (ej: XD, gamer23, skibidi,etc...)</li></ul>";
    }
    else {
        if(caracteres.test(nom)){
            n.innerHTML="";
        }
        else{
            n.innerHTML="<ul><li>NO debe tener caracteres especiales</li></ul>";

        }
    }
}

function Ape(ape){
    var caracteres=/^[A-Za-záéíóúÁÉÍÓÚñÑ\s-]+$/; 
    var a=document.getElementById("apeERROR");
    if(ape.length<5){
        a.innerHTML="<ul><li>Minimo 5 caracteres en el apellido</li></ul>";
    }
    else {
        if(caracteres.test(ape)){
            a.innerHTML="";
        }
        else{
            a.innerHTML="<ul><li>NO debe tener caracteres especiales</li></ul>";
        }
    }
}
function Email(email){

    // el split basicamente sirve para separar una variable tipo string en partes DEPENDIENDO de que letra u otro caracter 
    // le coloquemos entre parentesis. En este caso separamos el email en dos partes, antes y despues de la @
    var caracteres=/^[A-Za-z@0-9.\s-]+$/;
    var proveedores = ["gmail.com", "hotmail.com", "yahoo.com", "outlook.com"];
    var dominio = email.split("@")[1]; 
    var m=document.getElementById("emailERROR");

    if(caracteres.test(email)){
        if(proveedores.includes(dominio)) {
        m.innerHTML = "";
        } 
        else {
            m.innerHTML = "<ul><li>El correo que ingreso es desconocido, por favor ingrese el proveedor correctamente para evitar errores</li></ul>";
        }
    }
    else {
        m.innerHTML = "<ul><li>El correo no debe contener caracteres especiales</li></ul>";
    }

    

}

function Tel(){
    t=document.getElementById("telERROR");
    
    if(tel.value.startsWith("+299")){
        resp.innerHTML="Por favor ingrese un numero de telefono valido";
    }

}

function Pais(){
    if(!pais.value.includes("Argentina")){
                resp.innerHTML="Por favor ingrese un numero de telefono valido";
            }
}

