
function RevisarCampos(){
    let nom = document.getElementById("nombre").value.trim();
    let ape = document.getElementById("ape").value.trim();
    let email = document.getElementById("mail").value.trim();
    let tel = document.getElementById("tel").value.trim();
    let mensaje = document.getElementById("mensaje").value.trim();
    let boton = document.getElementById("botoncito");
    if (nom && ape && email && tel && mensaje) {
    boton.disabled = false;
    } else {
    boton.disabled = true;
    }
}



function Campos(){
    var nom=document.getElementById("nombre").value.trim();
    var ape=document.getElementById("ape").value.trim();
    var email=document.getElementById("mail").value.trim();
    var tel=document.getElementById("tel").value.trim();
    var pais=document.getElementById("pais").value.trim();
    var mensaje=document.getElementById("mensaje").value;
    var error=document.getElementById("error");


        
            
            error.innerHTML="REVISE EN CASO DE ERRORES EN LOS CAMPOS";
            let n=Nombre(nom);
            let a=Ape(ape);
            let e=Email(email);
            let p=Pais(pais);
            let t=Tel(tel);
            var T_P = false;

            if (t >= 0 && p >= 0 && t === p) {
                T_P = true;
                document.getElementById("telERROR").innerHTML = "";
                document.getElementById("paisERROR").innerHTML = "";
            } 
            else if (t === -2) {
                document.getElementById("telERROR").innerHTML = "<ul><li>El código de país ingresado no es válido</li></ul>";
            } 
            else if (t !== p) {
                document.getElementById("telERROR").innerHTML = "<ul><li>El prefijo telefónico no coincide con el país seleccionado</li></ul>";
            }
            if(n && a && e && T_P){
                error.innerHTML="FORMULARIO ENVIADO CORRECTAMENTE. ¡GRACIAS POR CONTACTARNOS!";
                document.getElementById("nombre").value="";
                document.getElementById("ape").value="";
                document.getElementById("mail").value="";
                document.getElementById("tel").value="";
                document.getElementById("mensaje").value="";
                document.getElementById("pais").value="Argentina";
                document.getElementById("archivo").value="";
                document.getElementById("botoncito").disabled = true;
            }
}

function Nombre(nom){
    // Expresión regular para permitir solo letras y espacios, las barras delimitan la expresion regular,
    // el ^ indica el inicio de la cadena, el $ indica el final de la cadena, y los corchetes [] indican un conjunto de caracteres permitidos.
    
    const caracteres=/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/; 
    const n=document.getElementById("nomERROR");

    if(nom.length<3){
        n.innerHTML="<ul><li>El nombre debe tener al menos 3 caracteres</li><li>NO debe contener nombres irreales (ej: XD, gamer23, skibidi,etc...)</li></ul>";
    }
    else {
        if(caracteres.test(nom)){
            n.innerHTML="";
            return true;
        }
        else{
            n.innerHTML="<ul><li>NO debe tener caracteres especiales</li></ul>";

        }
    }
}

function Ape(ape){
    const caracteres=/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/; 
    const a=document.getElementById("apeERROR");
    if(ape.length<5){
        a.innerHTML="<ul><li>Minimo 5 caracteres en el apellido</li></ul>";
    }
    else {
        if(caracteres.test(ape)){
            a.innerHTML="";
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
    const caracteres=/^[a-z0-9_]+@[a-z]+\.[a-z]{2,}$/;
    const proveedores = ["gmail.com", "hotmail.com", "yahoo.com", "outlook.com"];
    const dominio = email.split("@")[1]; 
    const m=document.getElementById("emailERROR");
    if(email.split("@").length !==2){ // verificamos que solo haya un @ en el email, si llegasen a tener mas, tira error
        m.innerHTML="Ingrese un correo válido con un solo @";
    }
    else{
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
    

}
function Pais(pais){
    
    paises=["Argentina", "Brasil", "Chile", "Colombia", "Mexico", "Peru", "Uruguay", "Venezuela", "Otro"];
        
            for(let i=0; i<paises.length; i++){
                if(pais==paises[i]) {
                    return i;
                }
            }
    return -1;
}
function Tel(tel){
    let numeros=/^[0-9+]+$/;
    tel=tel.trim();
    let telError=document.getElementById("telERROR");
    telefonos=["+54", "+55", "+56", "+57", "+52", "+51", "+598", "+58"];
    if((numeros.test(tel)) && (tel.startsWith("+"))) {
        for(let i=0; i<telefonos.length; i++){
            if(tel.startsWith(telefonos[i])) {
                return i;
            }
        }
        telError.innerHTML ="<ul><li>El código de país ingresado no es válido</li></ul>";
        return -2;
        
    }

    else {
        telError.innerHTML ="<ul><li>El número de teléfono solo puede contener números y el símbolo + al inicio</li></ul>";
    }

    return -1;
}


