import { networkInterfaces} from "node:os";


function getThisComputerLocalIp() {
	let networkInterfaceOutput = networkInterfaces();
	let results = Object
		.keys(networkInterfaceOutput)
		.map(interf =>
			networkInterfaceOutput[interf].map(o => !o.internal && o.family === 'IPv4' && o.address))
		.reduce((a, b) => a.concat(b))
		.filter(o => o);
	
	// console.log(results);

	let nicerResult = results.find(result => {
		if (result.startsWith("192.168")){
			// console.log("Found IP starting with 192.168, returning that as result.");
			return result;
		}
	});

	if (nicerResult) {
		return nicerResult
	};

	return results[0];
}

module.exports = {
	getThisComputerLocalIp
}