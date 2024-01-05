function ShowLog(place: string, message?: any) {
  if (process.env.EXPO_PUBLIC_DEVELOP) {
    console.log(`\u001b[1;32m ${place}`);
    if (message) console.log(message);
    console.log(
      "\u001b[1;35m =================================================================="
    );
  }
}

export default ShowLog;
