import makeWASocket, {
  useMultiFileAuthState,
  fetchLatestBaileysVersion
} from "@whiskeysockets/baileys";

import pino from "pino";

const { state, saveCreds } = await useMultiFileAuthState("./session");
const { version } = await fetchLatestBaileysVersion();

const sock = makeWASocket({
  version,
  auth: state,
  logger: pino({ level: "silent" }),
  printQRInTerminal: false
});

sock.ev.on("creds.update", saveCreds);

const phoneNumber = "255790803590"; // Change this number whenever you want

if (!sock.authState.creds.registered) {
  const code = await sock.requestPairingCode(phoneNumber);

  console.log("================================");
  console.log("PAIRING CODE:", code);
  console.log("================================");
} else {
  console.log("Already linked.");
}

setInterval(() => {}, 1000);
