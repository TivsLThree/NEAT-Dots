/**
An attempt of utilizing the NEAT method in order to create AIs for a group of "Dots" that can fight against other "Dots"
Created by Tivs. 
Helpful resources include:




*/
//TODO: Document this mofo so I can actually understand it after taking a break.
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var networks = [];
var hiddenOffset = 200;

/**
the diameter of the input square of a network
*/
var rangeOfSight = 7;


/**
A Neuron does a lot of stuff.
*/
function Neuron(type){
	this.x = canvas.width / 2;
	this.y= 0;
	this.size = 15;
	this.color = ranColor();
	this.type = type;// INPUT, HIDDEN, or the various output options
	this.source = []; //This will be a collection of all synapses where this neuron is the source
	this.destination = []; // A collection of synapses where this neuron is the destination;
	this.activated = false;
	this.actReq = 1;
	this.totalSum = 0;
	this.isBias = false;
	this.activate = function(synapse){
		if(this.type == "INPUT"){
			this.activated = true;
			/**
			TODO: Code that detects the Dot's surroundings. ie, input nodes;
				if(Map[this.x][this.y] == true){
					totalSum = actReq;
				}
			
			
			
			**/
			if(this.isBias){
					this.totalSum = this.actReq;
			}
		}
		else if(!this.activated){
				for(var i = 0; i < destination.length; i++){
					totalSum += destination[i].source.activate(destination[i]);
			
				}
			this.activated = true;
		}	else if(this.type != "INPUT" && this.type != "HIDDEN"){
			return (totalSum >= actReq) ? this.type: undefined;
			}
				return (totalSum >= actReq) ? synapse.weight: 0;
		}
	
	
	
	this.reset = function(){
		this.activated = false;
		this.totalSum = 0;		
	}
	
	
	

	
	
	//TODO
	//Figure out how to render the networks
	this.draw = function(){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x ,this.y,this.size,this.size);	
	}
}
/**
A Synapse simply contains a reference to a source neuron, a destination neuron, and a signal strength;
*/
function Synapse(source, dest, weight){
	this.startNeuron = source;
	this.endNeuron = dest;
	this.weight = weight;
	this.draw = function(){
		ctx.strokeStyle = this.startNeuron.color;
		ctx.beginPath();
		ctx.moveTo(this.startNeuron.x+(this.startNeuron.size /2),this.startNeuron.y+(this.startNeuron.size /2));
		ctx.lineTo(this.endNeuron.x +(this.endNeuron.size /2),this.endNeuron.y+(this.endNeuron.size /2));
		ctx.lineWidth = 5;
		ctx.stroke();
	}
}
/**
A network contains a list of the input nodes, hidden nodes, and output nodes and synapses; This class also handles a bunch of other code
*/
function Network(){
	networks[networks.length] = this;
	this.inputNeurons = [];
	this.hiddenNeurons = new Array();
	this.outputNeurons = [];
	this.synapses = [];
	this.init = function(){

			for(var i = 0; i < rangeOfSight; i++){
				for(var k = 0; k < rangeOfSight; k++){
					var num = this.inputNeurons.length;
					this.inputNeurons[num] = new Neuron("INPUT");
					this.inputNeurons[num].x = i*((canvas.width /2)/rangeOfSight)
					this.inputNeurons[num].y = k*((canvas.height /2)/rangeOfSight)
					this.inputNeurons[num].size = ((canvas.width /2)/rangeOfSight) -2;
					this.inputNeurons[num].color = "rgba(55,55,55,0.2)"
				}
			}
			var num = this.inputNeurons.length;
			this.inputNeurons[num] = new Neuron("INPUT");
			this.inputNeurons[num].x = (rangeOfSight -1)*((canvas.width /2)/rangeOfSight)
			this.inputNeurons[num].y = rangeOfSight*((canvas.height /2)/rangeOfSight)
			this.inputNeurons[num].size = ((canvas.width /2)/rangeOfSight) -2;
			this.inputNeurons[num].isBias = true;
			this.inputNeurons[num].color = ranColor("0.3")
			
	this.outputNeurons[0] = new Neuron("UP");
	this.outputNeurons[1] = new Neuron("DOWN");
	this.outputNeurons[2] = new Neuron("LEFT");
	this.outputNeurons[3] = new Neuron("RIGHT");
		for(var i = 0; i < this.outputNeurons.length; i++){
			this.outputNeurons[i].x = canvas.width - this.outputNeurons[i].size;
			this.outputNeurons[i].y = i * (canvas.height /2)/this.outputNeurons.length;
		}
	}
	this.actionsToBeDone = [];
	this.shouldDraw = true;
	
	
	
	
	this.draw = function(){
		for(var i = 0; i < this.inputNeurons.length; i++){

			this.inputNeurons[i].draw();
		}
		for(var i = 0; i < this.hiddenNeurons.length; i++){
			this.hiddenNeurons[i].draw();
		}
		for(var i = 0; i < this.outputNeurons.length; i++){
			this.outputNeurons[i].draw();
		}
		for(var i = 0; i < this.synapses.length; i++){
			this.synapses[i].draw();
		}
	}
	
	this.run = function(){
		this.reset();
		for(var i = 0; i < outputNeurons.length; i++){
			this.actionsToBeDone[this.actionsToBeDone.length] = outputNeurons[i].activate(undefined);
			if(this.actionsToBeDone[this.actionsToBeDone.length] == undefined){
				this.actionsToBeDone[this.actionsToBeDone.length].splice(this.actionsToBeDone.length,1)
			}
		}
	}
	
	this.reset = function(){
		for(var i = 0; i < this.hiddenNeurons.length; i++){
			this.hiddenNeurons[i].reset()
		}
		for(var i = 0; i < this.inputNeurons.length; i++){
			this.inputNeurons[i].reset();
		}
		for(var i = 0; i < this.outputNeurons.length; i++){
			this.outputNeurons[i].reset();
		}
	}
		/**
		manually add a neuron. 
		*/
	this.debugAddNeuron = function(num){
		var s;
		var n;
		try{
		s = this.synapses[num];
		n = new Neuron("HIDDEN");
		
			n.destination[0] = new Synapse(s.startNeuron,n,s.weight);
			n.source[0] = new Synapse(n,s.endNeuron,1)
			this.synapses[this.synapses.length] = n.source[0]
		}catch(error){
			console.error(error+": Presumably there were no synapses and as a result no neuron could be created")
			console.log();
			return;
		}
		n.actReq = s.endNeuron.actReq;
		n.source[0] = new Synapse(n,s.endNeuron,1);
		n.x = (((s.startNeuron.type == "INPUT") ? (canvas.width/2): s.startNeuron.x) + s.endNeuron.x)  /2;
		n.y = (s.startNeuron.y + s.endNeuron.y) / 2;
		
		var a = 0;
		for(var z = 0; z < s.startNeuron.source.length;z++){
			if(s.startNeuron.source[z].endNeuron == s.endNeuron){
				a = z;

				break;
			}
		}
		
		
		//TODO: Watch out for bugs here. The previous issue may be fixed.
		try{
		s.startNeuron.source[a].endNeuron = n; //Need to remove the old synapse that connected the neurons. In this case, the end neuron needs to be replaced
		}catch(err){
			console.log(err);
			console.log(s);
			console.log(s.startNeuron);
			console.log(s.startNeuron.source);
			console.log("a:" + a)

			
				
		}
		var b;
		for(var z = 0; z < s.endNeuron.destination.length;z++){
			if(s.endNeuron.destination[z].startNeuron == s.startNeuron){
				b = z;
				break;
			}
		}
		s.endNeuron.destination.splice(b,1);
		this.hiddenNeurons[this.hiddenNeurons.length] = n;
		return true;
		
	}
	this.mutateAddNeuron = function(){
		var s;
		var n;
		try{
		s = this.synapses[Math.floor(Math.random() * (this.synapses.length - 1))];
		n = new Neuron("HIDDEN");
		
			n.destination[0] = new Synapse(s.startNeuron,n,s.weight);
			n.source[0] = new Synapse(n,s.endNeuron,1)
			this.synapses[this.synapses.length] = n.source[0]
		}catch(error){
			console.error(error+": Presumably there were no synapses and as a result no neuron could be created")
			console.log();
			return;
		}
		n.actReq = s.endNeuron.actReq;
		n.source[0] = new Synapse(n,s.endNeuron,1);
		n.x = (((s.startNeuron.type == "INPUT") ? (canvas.width/2): s.startNeuron.x) + s.endNeuron.x)  /2;
		n.y = (s.startNeuron.y + s.endNeuron.y) / 2;
		
		var a = 0;
		for(var z = 0; z < s.startNeuron.source.length;z++){
			if(s.startNeuron.source[z].endNeuron == s.endNeuron){
				a = z;

				break;
			}
		}
		//TODO: Watch out for bugs here. The previous issue may be fixed.
		try{
		s.startNeuron.source[a].endNeuron = n; //Need to remove the old synapse that connected the neurons. In this case, the end neuron needs to be replaced
		}catch(err){
			console.log(err);
			console.log(s);
			console.log(s.startNeuron);
			console.log(s.startNeuron.source);
			console.log("a:" + a)

			
				
		}
		var b;
		for(var z = 0; z < s.endNeuron.destination.length;z++){
			if(s.endNeuron.destination[z].startNeuron == s.startNeuron){
				b = z;
				break;
			}
		}
		s.endNeuron.destination.splice(b,1);
		this.hiddenNeurons[this.hiddenNeurons.length] = n;
		return true;
	}
	this.debugAddSynapse = function(num, num2){
		var s; var dest;
		var i = 0;
		do {
			i++
			if(i > 10){
		
				return false;
			}
			//console.log(i)
		s = this.inputNeurons.concat(this.hiddenNeurons)[num];
		dest = this.outputNeurons.concat(this.hiddenNeurons)[num2];
		
		}while(checkForRecursiveFeedback(s, dest) == false);
		if(!checkForDuplicateSynapse(s,dest)){

			return false;
		}
		if(s.type == "INPUT" && s.source.length == 0){
			s.color = ranColor("0.2");
		}
		var syn = new Synapse(s,dest,1);
		s.source[s.source.length] = syn;
		dest.destination[dest.destination.length] = syn;
		this.synapses[this.synapses.length] = syn;
		
		
		function checkForRecursiveFeedback(neuron, dest){

				if(dest == neuron){
					console.log("Attempted add to a synapse that would result in recursive feedback.");
				return false;
			}

			for(var i = 0; i < neuron.destination.length; i++){
				if(neuron.destination[i].startNeuron.type =="INPUT"){
					break;
				}
				if(checkForRecursiveFeedback(neuron.destination[i].startNeuron, dest) == false){
					//console.log("Attempted add to a synapse that would result in recursive feedback.");
					return false;
				}
			}
			return true;
		}
	//
		function checkForDuplicateSynapse(s, n){
			for(var i = 0; i < s.source.length;i++){
				if(s.source[i].endNeuron == n){
					console.log("Attempted to create a synapse that was a duplicate")
					return false;
				}
			}
			return true;
		}
	}
	

	//TODO: CheckForRecursiveFeedBackLoop seems to be working correctly now.
	this.mutateAddSynapse = function(){
		var s; var dest;
		var i = 0;
		do {
			i++
			if(i > 10){
		
				return false;
			}
			//console.log(i)
		s = this.inputNeurons.concat(this.hiddenNeurons)[Math.round(Math.random() * (-1+this.inputNeurons.concat(this.hiddenNeurons).length))];
		dest = this.outputNeurons.concat(this.hiddenNeurons)[Math.round(Math.random() * (-1+this.outputNeurons.concat(this.hiddenNeurons).length))];
		
		}while(checkForRecursiveFeedback(s, dest) == false);
		if(!checkForDuplicateSynapse(s,dest)){

			return false;
		}
		if(s.type == "INPUT" && s.source.length == 0){
			s.color = ranColor("0.2");
		}
		var syn = new Synapse(s,dest,1);
		s.source[s.source.length] = syn;
		dest.destination[dest.destination.length] = syn;
		this.synapses[this.synapses.length] = syn;
		
		
		function checkForRecursiveFeedback(neuron, dest){

				if(dest == neuron){
					console.log("Attempted add to a synapse that would result in recursive feedback.");
				return false;
			}

			for(var i = 0; i < neuron.destination.length; i++){
				if(neuron.destination[i].startNeuron.type =="INPUT"){
					break;
				}
				if(checkForRecursiveFeedback(neuron.destination[i].startNeuron, dest) == false){
					//console.log("Attempted add to a synapse that would result in recursive feedback.");
					return false;
				}
			}
			return true;
		}
		function checkForDuplicateSynapse(s, n){
			for(var i = 0; i < s.source.length;i++){
				if(s.source[i].endNeuron == n){
					console.log("Attempted to create a synapse that was a duplicate")
					return false;
				}
			}
			return true;
		}
		
	}
	this.mutateCullSynapse = function(neuron){
				var i; 
				var s;
				if(neuron== undefined){
					i = Math.floor(Math.random() * (-1 +this.synapses.length));
				s = this.synapses[i];
				}else{
					
				}
				//TODO
				//Remove this synapse from the source neuron's list. 
				//Also remove this synapse from the destination neuron's list.
				s.splice(i,1);
				//TODO add code to handle when there are no synapses
				
	}
	this.mutateCullNeuron = function(){
			var i = Math.floor(Math.random() * (-1 +this.hiddenNeurons.length));
			//TODO add code to handle when there are no neurons
			
	}
	
	
	
}

var aBrain = new Network();
aBrain.init();





//**Main Loop** //
//Used soley for display currently. Will eventually create a way of running other stuff(running a network and generating outputs).
setInterval(function(){
	ctx.clearRect(0,0,canvas.height,canvas.width);
	for(var i = 0; i < networks.length; i++){
		if(networks[i].shouldDraw)
			networks[i].draw();		
	}
},60);
	function debugRecursion(){	
	aBrain.debugAddSynapse(0,0);
	aBrain.debugAddSynapse(5,3);
	aBrain.debugAddNeuron(0);
	aBrain.debugAddNeuron(1);
	aBrain.debugAddNeuron(2);
	aBrain.debugAddSynapse(51,4);
	debugger;
	aBrain.debugAddSynapse(52,5);
	}
	function debugBrain(){
		setInterval(function(){
		aBrain.mutateAddSynapse();
		aBrain.mutateAddNeuron();
		},500);
	}
/**
Generates a random rgba color with the alpha at 0.5;
*/
function ranColor(alpha){
	return"rgba(" + Math.round(Math.random() * 255) + ","+ Math.round(Math.random() * 255) + ","+ Math.round(Math.random() * 255) + "," +((alpha == undefined) ? "0.5" :alpha)+")"
}