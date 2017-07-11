var synaptic = require('synaptic');
var fs = require('fs');


var content;
try {
	content = fs.readFileSync('./model.json');
} catch(e) {}


var myNetwork;

if (content!=undefined) {
	myNetwork = synaptic.Network.fromJSON(JSON.parse(content));
} else {
	console.log("-----Training-----");
	myNetwork = new synaptic.Architect.Perceptron(2, 3, 1)
	var trainer = new synaptic.Trainer(myNetwork)

	var trainingSet = [
		{ input: [0,0], output: [0] },
		{ input: [0,1], output: [1] },
		{ input: [1,0], output: [1] },
		{ input: [1,1], output: [0] },
	]


	trainer.train(trainingSet, {
		rate: .1,
		iterations: 8000,
		error: .005,
		shuffle: true,
		log: 500,
		cost: synaptic.Trainer.cost.CROSS_ENTROPY
	});
	
	

	let exported = JSON.stringify(myNetwork.toJSON());
	fs.writeFile("./model.json", exported);

}

console.log("-----Production-----");
for(var x = 0; x <= 1; x++) {
	for(var y = 0; y <= 1; y++) {
		console.log("xor(" + x + ", " + y + ") = " + Math.round(myNetwork.activate([x, y])));
	}
}

console.log(myNetwork.standalone());