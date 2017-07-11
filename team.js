var synaptic = require('synaptic');

var myNetwork = new synaptic.Architect.Perceptron(2, 3, 1)
var trainer = new synaptic.Trainer(myNetwork)

var trainingSet = [];
for(var i = 0; i < 5000;i++){
	var a = Math.floor(Math.random() * (50 - 0 + 50)) + 0;
	var b = Math.floor(Math.random() * (50 - 0 + 50)) + 0;
	
	var result;
	if(a > b) {
		result = 0;
	} else {
		result = 1;
	}
	
	trainingSet.push({input: [a, b], output: [result]});
}


trainer.train(trainingSet, {
	rate: .1,
	iterations: 20000,
	error: .005,
	shuffle: true,
	log: 100,
	cost: synaptic.Trainer.cost.CROSS_ENTROPY
});


var xScore = Math.floor(Math.random() * (50 - 0 + 50)) + 0;
var yScore = Math.floor(Math.random() * (50 - 0 + 50)) + 0;

console.log("who_Win(Team 0: " + xScore + ", Team 1: " + yScore + ") = " + Math.round(myNetwork.activate([xScore, yScore])));
