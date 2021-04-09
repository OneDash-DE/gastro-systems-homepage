import "./styles/styles.sass";
import platform from "platform-detect";
import CONFIG from "./script/config";
import axios from "axios";
import yaml from "js-yaml";
import { downloadFile } from "./script/download";
// eslint-disable-next-line no-console
console.log("❤❤ Hello World ❤❤");

let fileName;
let latest;

// Load OS Version
const osElement = document.querySelector("#os");
const filenameElement = document.querySelector("#filename");

if (platform.windows) {
	osElement.innerHTML = "Windows";
	latest = CONFIG.windows;
} else if (platform.linux) {
	osElement.innerHTML = "Linux";
	latest = CONFIG.linux;
} else if (platform.macos) {
	osElement.innerHTML = "MacOS";
	latest = CONFIG.mac;
} else {
	osElement.innerHTML = "Nicht verfügbar";
}

if (latest) {
	axios.get(`${CONFIG.host}${latest}`).then((x) => {
		const doc = yaml.load(x.data);
		fileName = doc.files.find(y => {
			const extension = y.url.split('.').pop();
			return ["exe", "dmg", "AppImage"].includes(extension);
		}).url;
		filenameElement.innerHTML = `(${fileName})`;

		document.querySelector("#download-btn").addEventListener("click", () => {
			downloadFile(CONFIG.host + fileName, fileName);
		});
	});
}
