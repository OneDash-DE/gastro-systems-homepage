export const downloadFile = (path, filename) => {
	const link = document.createElement("a");
	link.setAttribute("download", filename);
	link.href = path;
	document.body.appendChild(link);
	link.click();
	link.remove();
};
