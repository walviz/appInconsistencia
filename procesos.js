
//id de los inputs
const inputs = ["Caso", "IdLlamada", "Legado", "Gis", "CC", "Entra", "Sale"];

//datos de los botones
const datos ={
  sincr:"SINCRONIZACION",
  inst:"INST-EQUIPO",
  cambio:"CAMBIO-EQUIPO",
  reuso:"REUSO-ACCESO",
  retiro:"RETIRO-EQUIPO",
  une:"UNE",
  ceros:"0000000000000000000",
  link: "http://10.100.66.199:8082/RepEquiposDireccion.aspx",
  ubicacion:"UBICGENCPE"
};

//copiar elementos al portapapeles
inputs.forEach(inputId => {
  document.getElementById(`bt${inputId}`).addEventListener("click", () => copyToClipBoard(inputId));
});


//eliminar inputs y text areas
inputs.forEach(inputId => {
  document.getElementById(`delete${inputId}`).addEventListener("click", () => deliteTextbox(inputId));
});

document.getElementById("btBorrarTodo").addEventListener("click", borrarTodo);


//selecciona todos los botones con la clase btDatos
const botones = document.querySelectorAll(".btDatos");

// recorre los botones para obtener el id, ya se le asigna el valor segun la const datos
botones.forEach(boton => {
  boton.addEventListener("click", (event) => {
    const idBoton = event.target.id;
    navigator.clipboard.writeText(datos[idBoton])
  });
});

//btn para la fecha
document.getElementById("fecha").addEventListener("click", () => fecha());

//inputs  para copiar al portapapeles
document.getElementById("btGuion").addEventListener("click", () => copyToClipBoard("observaciones"));


// con esta funcion el texto queda selecionado
function copyToClipBoard(parametro) {
  var texto = document.getElementById(parametro);
  texto.select();
  document.execCommand("copy");
}

//text areas
document.getElementById("btMssP").addEventListener("click", () => capturarTodoM6());
document.getElementById("btGenerar").addEventListener("click", () => capturarTodo());


// eliminar espacios y :
inputs.slice(-6).forEach(elemento => {
  eliminarEspacios(document.getElementById(elemento));
});

function eliminarEspacios(input) {
  input.addEventListener("input", e => {
    let string = e.target.value;
    string = string.replace(/[ :	]/g, "");
    e.target.value = string;
  });
}

// funcion para evitar ctrl+s y/o enviar info a servidor
document.addEventListener("keydown", function(event) {
  if (event.ctrlKey && event.key === "s") {
    event.preventDefault(); // evita el comportamiento predeterminado del navegador
    // código para guardar la información o enviarla al servidor si se requiere
  }
});

// convertir a mayusculas
function mayus(e) {
  e.value = e.value.toUpperCase(); 
}

//funcion para obtener la fecha
function fecha(){
  var fecha = new Date();
  var year = fecha.getFullYear();
  var mes=fecha.getMonth()+1;
  var dia=fecha.getDate();
  navigator.clipboard.writeText(year+"-0"+mes+"-"+dia);
}

//borra un solo texto
function deliteTextbox(param){
  document.getElementById(param).value = "";
  var input = document.getElementById(param);
  input.focus();
}

//borra todo
function borrarTodo(){
  var elementos= ["Caso","IdLlamada","Legado","Gis","CC","Entra","Sale","observaciones","nota"];

  for(let i=0;i<elementos.length;i++){
    var item=elementos[i];
    document.getElementById(item).value = "";
  }
  document.getElementById("guiones").selectedIndex = "";
}

//generar
function capturarTodo() {
  let caso = document.getElementById("Caso").value;
  let llamada = document.getElementById("IdLlamada").value;
  let legado = document.getElementById("Legado").value;
  let gis = document.getElementById("Gis").value;
  let cc = document.getElementById("CC").value;
  let entra = document.getElementById("Entra").value;
  let sale = document.getElementById("Sale").value;
  let observaciones = document.getElementById("observaciones").value;
  let fecha = new Date();
  //enviar toda la informacion capturada  a la plantilla
  document.getElementById("plantilla").value =
    "\n" +
    "Fecha: " + converMonth(fecha.getMonth()) +"-" +fecha.getDate() +"\n" +
    "ID GDI: " + caso + "\n" +
    "ID llamada: " +  llamada + "\n" +
    "ID servicio: " + legado +"\n" +
    "ID Gis: " +gis +"\n" +
    "Cedula: " +cc +"\n" +
    "Equipo entrante: " +entra +"\n" +
    "Equipo saliente: " +sale +"\n" +
    "Observaciones: " + observaciones + "\n" +
    "Login: Walvizva";
  copyToClipBoard("plantilla");
  document.getElementById("btGenerar").innerHTML ="Generado!";
  setTimeout(resGenerar,1000);
 
}

//funcion notificacion de copiado temporal
function resGenerar(){document.getElementById("btGenerar").innerHTML ="Generar"}
function resMSS(){document.getElementById("btMssP").innerHTML ="MSS"}

// capturar sintexto
function captura(parametro) {
  var codigoACopiar = document.getElementById(parametro);
  navigator.clipboard.writeText(codigoACopiar.value);
}

//convertir numero del mes en mes texto
function converMonth(mes){
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  return meses[mes];
}

//para plantilla M6
function capturarTodoM6(){
  let caso = document.getElementById("Caso").value;
  let llamada = document.getElementById("IdLlamada").value;
  let legado = document.getElementById("Legado").value;
  let gis = document.getElementById("Gis").value;
  let cc = document.getElementById("CC").value;
  let entra = document.getElementById("Entra").value;
  let sale = document.getElementById("Sale").value;
  let fecha = new Date();
  document.getElementById("plantilla").value =
    "Fecha: " + converMonth(fecha.getMonth()) +"-" +fecha.getDate() +"\n" +
    "ID GDI: " + caso + "\n" +
    "ID llamada: " +  llamada + "\n" +
    "ID servicio: " + legado +"\n" +
    "ID Gis: " +gis +"\n" +
    "Cedula: " +cc +"\n" +
    "Equipo entrante: " +entra +"\n" +
    "Equipo saliente: " +sale +"\n" +
    "Login: Walvizva";
    copyToClipBoard("plantilla");
    document.getElementById("btMssP").innerHTML ="Generado!";
    setTimeout(resMSS,1000);
}

//guiones select
document.getElementById("guiones").addEventListener("change", selecion);

function selecion(){
  let opcion = document.getElementById("guiones").value;
  let entra = document.getElementById("Entra").value;
  let legado = document.getElementById("Legado").value;
  let sale = document.getElementById("Sale").value;
  var input = document.getElementById("observaciones");

  switch(opcion){
    case "0":
      document.getElementById("observaciones").value ="Buen día, se ingresa equipo " + entra + " según lo indicado, prueba integrada: ";
      input.focus();
      break;   
    case "1":
      document.getElementById("observaciones").value = "Buen día, No se actualiza equipo porque no nos suministra cual es el equipo que sale en reemplazo del que entra, ya que cliente cuenta en oss con la misma cantidad de equipos  que la contratada ";
      copyToClipBoard("observaciones");
      break;
    case "2":
      document.getElementById("observaciones").value ="Buen día compa, la MAC O serial o NSCID: " +entra +" que nos suministras NO trae información al respecto en inventario";
      copyToClipBoard("observaciones");
      break;
    case "3":
      document.getElementById("observaciones").value ="Buen día, no se corrige ya que equipo que nos indicas aparecen asignado a otro id servicio xxx  que actualmente no ha sido retirado, se debe legalizar equipos con técnico en terreno.";
        break;
    case "4":
      document.getElementById("observaciones").value = "Buen día, se crea CR xxx para el correcto cierre del pedido xxx y poder corregir equipos en oss";
        break;
    case "5":
      document.getElementById("observaciones").value ="Buen día. en nuestra base de datos no registra el ID " +legado +" que nos indicas, se debe validar la información para la corrección del servicio.";
      copyToClipBoard("observaciones");
        break;
    case "6":
      document.getElementById("observaciones").value = "Buen día, no se corrige ya que pedido cuenta con ordenes abiertas en GTC,MSS y no es posible realizar modificaciones hasta que estas estén cerradas, Se debe hacer SS PUMED y esperar el cierre de este.";
        break;
    case "7":
      document.getElementById("observaciones").value ="Buen día, Desde nuestro grupo no se actualizan equipos de ELITE por lo tanto lo debes escalar por CONSULTA LIDERES";
      copyToClipBoard("observaciones");
        break;
    case "8":
      document.getElementById("observaciones").value ="Buen día, Desde nuestro grupo no se actualizan equipos de Tecnología REDCO/GPON y servicios C3 PYMES  de ANTIOQUIA  asi sea HFC que carguen por nacional, porque el inventario y la infraestructura sigue estando montada en Fénix ATC, por lo tanto lo debes escalar por CONSULTA LIDERES.";
      copyToClipBoard("observaciones");
        break;
    case "9":
      document.getElementById("observaciones").value ="Buen día, compa no nos indicas cuan es el ID del servicio al cual hay que generar la corrección";
      copyToClipBoard("observaciones");
        break;
    case "10":
      document.getElementById("observaciones").value ="Buen día, servicio aparece con los equipos que nos indicas Prueba Integrada xxx , para crear o activar cuentas en verimatrix es con consulta lideres o rescate virtual";
        break;
    case "11":
      document.getElementById("observaciones").value ="Buen día, no se puede corregir ya que servicio que nos indicas cuenta con pedido de retiro en proceso xxx  con ordenes abiertas en MSS (Baja por solicitud del cliente)";
        break;
    case "12":
      document.getElementById("observaciones").value ="Buen día, se ingresa equipo " +entra +" que nos indicas al OSS, se debe validar con rescate virtual o lideres si pueden cargar paquete de canales ya que cuenta con pedidos en proceso  Prueba Integrada: ";
      input.focus();
        break;
    case "13":
      document.getElementById("observaciones").value ="Buen día, Servicio se encuentra con estado inactivo, servicio retirado";
      copyToClipBoard("observaciones");
        break;
    case "14":
      document.getElementById("observaciones").value ="Buen día, para temas de reaprovisionamiento, registro o permisos de líneas telefónicas debe ser escalado con el área de consulta lideres";
      copyToClipBoard("observaciones");
        break;
    case "15":
      document.getElementById("observaciones").value = "Buen día, compa el nscid xxxx que nos indicas nos registra con un serial totalmente diferente al que nos indicas, se debe validar correctamente la información del equipo o legalizarlo con técnico en terreno";
      break;
    case "16":
      document.getElementById("observaciones").value = "Buen día, compa no se puede realizar corrección en OSS ya que actualmente servicio se encuentra suspendido por falta de pago Prueba Integrada:"
      input.focus();
      break;
    case "17":
      document.getElementById("observaciones").value = "Buen día, no se puede ingresar equipo ya que los Lite Zapper no se puede ingresar en una oferta NOV Android Trio, se debe enviar con premisas para cambio de equipo ";
      copyToClipBoard("observaciones");
      break;
    case "18":
      document.getElementById("observaciones").value = "Buen dia, se devuelve caso ya que el equipo: " +sale +" que notifican retirar no esta en oss, por favor validar cuales son los equipos que salen";
      copyToClipBoard("observaciones");
      break;
    case "19":
      document.getElementById("observaciones").value = "Buen día, no se puede asociar ya que servicio se encuentra bajo una promoción asociada diferente, se debe validar con servicio al cliente para en caso que aplique, realizar el correcto empaquetamiento del servicio. ";
      copyToClipBoard("observaciones");
      break;
    case "20":
      document.getElementById("observaciones").value ="Buen dia, compa no nos llenaste la plantilla completamente, falta el id de la llamada para realizar cualquier modificación desde nuestra área, se debe montar nuevamente y con los datos solicitados en la plantilla.";
      copyToClipBoard("observaciones");
      break;
    case "21":
      document.getElementById("observaciones").value = "Buen dia, compa no se puede asociar la telefonía al CM que nos indicas ya que este pertenece al id servicio xxx y al ser empresa, se manejan infraestructuras diferentes, si hay que asociar la to, se debe validar con premisas y verificar dicho equipo. ";
      break;
    case "22":
      document.getElementById("observaciones").value ="Buen dia, equipo que nos indicas " + entra +" ya aparece en el oss del usuario, para cargar paquete de canales en los decodificadores se debe verificar con rescate virtual o lideres.Prueba Integrada: ";
      input.focus();
      break;
    case "23":
      document.getElementById("observaciones").value = "Buen dia, compa no se pueden eliminar la cantidad de equipos que nos indicas ya que usuario tiene contratado 4 equipos no se puede dejar los 3 que nos indicas, para eliminar equipo sobrante se debe validar con SAC, para poder legalizar la totalidad de equipos en oss";
      break;
    case "24":
      document.getElementById("observaciones").value = "Buen dia, desde nuestra area no se realizan reconexiones de servicio, se debe validar con servicio al cliente.";
      copyToClipBoard("observaciones");
      break;
    case "25":
      document.getElementById("observaciones").value = "Buen día, servicio aparece con los equipos que nos indicas en OSS Prueba Integrada  xxx, no hay inconsistencia. se debe validar con rescate virtual o lideres si pueden cargar paquete de canales ya que cuenta con pedidos en proceso ";
      break;
    case "26":
      document.getElementById("observaciones").value ="Buen día, equipo " +entra +" que nos indicas ya aparece en el oss del usuario, no hay inconsistencia, prueba integrada ";
        break;
    case "s":
      document.getElementById("observaciones").value ="";
      break;
    default: false;
  }
}

/*LocalStorage*/

// guardar datos en local storage
document.getElementById("btSavePass").addEventListener("click", savePass);

function savePass() {
  let savered = document.getElementById("passRed").value;
  let saveWts = document.getElementById("passWts").value;
  let saveMss = document.getElementById("passMss").value;
  localStorage.setItem("red", savered);
  localStorage.setItem("wts", saveWts);
  localStorage.setItem("mss", saveMss);
  console.log(localStorage.getItem("red","wts","mss"));
}

//cargar info en input de opciones
document.addEventListener("DOMContentLoaded", cargarValores);

function cargarValores() {
  var savedRed = localStorage.getItem("red");
  var saveWts = localStorage.getItem("wts");
  var saveMss = localStorage.getItem("mss");
  if (savedRed) {
    document.getElementById("passRed").value = savedRed;
    
  }
  if (saveWts) {
    document.getElementById("passWts").value = saveWts;
    
  }
  if (saveMss) {
    document.getElementById("passMss").value = saveMss;
    
  }
}
/*funcion asignar contrasenas a los botones*/
document.getElementById("btRed").addEventListener("click", () => asignarLocalStorage("red"));
document.getElementById("btMss").addEventListener("click", () => asignarLocalStorage("mss"));
document.getElementById("btWts").addEventListener("click", () => asignarLocalStorage("wts"));

function asignarLocalStorage(valor) {
  var savedValue = localStorage.getItem(valor);
  if (savedValue) {
    navigator.clipboard.writeText(savedValue)
  }
}