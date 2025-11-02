
function Campos(){
    var nom=document.getElementById("nombre").value.trim();
    var ape=document.getElementById("ape").value.trim();
    var email=document.getElementById("mail").value.trim();
    var tel=document.getElementById("tel").value.trim();
    var pais=document.getElementById("pais").value.trim();
    var mensaje=document.getElementById("mensaje").value;
    var archv=document.getElementById("archivo").value;
    var error=document.getElementById("error");


        if(nom=="" || ape=="" || email=="" || mensaje=="" || tel==""){
            error.innerHTML="POR FAVOR COMPLETE TODOS LOS CAMPOS";
        }
        else if(nom !=="" && ape!=="" && email !=="" && mensaje !=="" && tel !==""){
            error.innerHTML="REVISE EN CASO DE ERRORES EN LOS CAMPOS";
            var n=Nombre(nom);
            var a=Ape(ape);
            var e=Email(email);
            var p=Pais(pais,tel);
            if(n && a && e && p){
                error.innerHTML="FORMULARIO ENVIADO CORRECTAMENTE. ¡GRACIAS POR CONTACTARNOS!";
                document.getElementById("nombre").value="";
                document.getElementById("ape").value="";
                document.getElementById("mail").value="";
                document.getElementById("tel").value="";
                document.getElementById("mensaje").value="";
                document.getElementById("pais").value="";
                document.getElementById("archivo").value="";

            }
                
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
            return true;
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
            return true;
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
            return true;
        } 
        else {
            m.innerHTML = "<ul><li>El correo que ingreso es desconocido, por favor ingrese el proveedor correctamente para evitar errores</li></ul>";
        }
    }
    else {
        m.innerHTML = "<ul><li>El correo no debe contener caracteres especiales</li></ul>";
    }

    

}
function Pais(pais, tel){
    telError=document.getElementById("telERROR"); 
    paisError=document.getElementById("paisERROR");
    var p1=-1;
    paises=["Argentina", "Brasil", "Chile", "Colombia", "Mexico", "Peru", "Uruguay", "Venezuela", "Otro"];
        

        if (pais =="") {
            paisError.innerHTML = "<ul><li>Por favor seleccione un país</li></ul>";
            telError.innerHTML = "";
            return false;
            }
        else {
            for(var i=0; i<paises.length; i++){
                if(pais==paises[i]) {
                    p1=i;
                    break;
                }
            }
            var p2=Tel(tel);
            if(p1==8){
                paisError.innerHTML ="<ul><li>Pais seleccionado: Otros </li></ul>";
                telError.innerHTML ="<ul><li>Ingrese correctamente el prefijo de su pais, ya que no esta registrado en nuestro sistema</li></ul>";
            }
            else if (p1 == -1 || p2 == -1) {
                paisError.innerHTML = "<ul><li>País o prefijo desconocido</li></ul>";
                telError.innerHTML = "<ul><li>Verifique que ambos existan y estén escritos correctamente</li></ul>";
            } 
            else if(p1==p2){
                telError.innerHTML ="";
                paisError.innerHTML ="";
                return true;
            }
            else {
                paisError.innerHTML = "<ul><li>El país no coincide con el prefijo ingresado</li></ul>";
                telError.innerHTML = "<ul><li>El prefijo no corresponde con el país seleccionado</li></ul>";
            }
        }
}
function Tel(tel){
    var numeros=/^[0-9+]+$/
    telefonos=["+54", "+55", "+56", "+57", "+52", "+51", "+598", "+58"];
    if((numeros.test(tel)) && (tel.startsWith("+"))) {
        for(var i=0; i<telefonos.length; i++){
            if(tel.startsWith(telefonos[i])) {
                return i;
            }
        }
    }
    else {
        telError.innerHTML ="<ul><li>El número de teléfono solo puede contener números y el símbolo + al inicio</li></ul>";
    }

    return -1;
}

