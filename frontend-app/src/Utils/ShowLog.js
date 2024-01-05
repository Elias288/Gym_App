/**
 * Muestra log
 * @param {string} place lugar desde donde se muestra el log
 * @param {any} [message] mensaje que se quiera mostrar
 */
function ShowLog(place, message) {
  if (process.env.EXPO_PUBLIC_DEVELOP) {
    console.log(`\u001b[1;32m ${place}`);
    if (message) console.log(message);
    console.log(
      "\u001b[1;35m =================================================================="
    );
  }
}

export default ShowLog;
