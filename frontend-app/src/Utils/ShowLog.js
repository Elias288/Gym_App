/**
 * Muestra log
 * @param {string} place lugar desde donde se muestra el log
 * @param {any} [message] mensaje que se quiera mostrar
 * @param {boolean} [expanded=false] muestra el mensaje expandido, default = false
 */
function ShowLog(place, message, expanded = false) {
  if (process.env.EXPO_PUBLIC_DEVELOP === "true") {
    console.log(`\u001b[1;32m ${place}`);

    if (message)
      expanded === true
        ? console.log(JSON.stringify(message, null, 4))
        : console.log(JSON.stringify(message));

    console.log(
      "\u001b[1;35m =================================================================="
    );
  }
}

export default ShowLog;
