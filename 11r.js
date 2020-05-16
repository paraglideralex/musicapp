
let btnBlock = $("#buttonBlock");  
let reaction = $("#reaction");
let btnGenerator = function(el, i){	
	let btn = $("<button>");
	btn.text(el);
	btn.click(function(){
		getAnswer(i);
	});
	
	btnBlock.append(btn);
}

let noteDiezName = [
	'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'H'
]
let noteBemolName = [
	'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Hb', 'H'
]
let intervalName = [
	'', 'малая секунда', 'большая секунда', 'малая терция', 'большая терция', 'кварта', 'тритон', 'квинта', 'малая секста', 'большая секста', 'малая септима', 'большая септима', 'октава'
]

//noteDiezName.forEach(btnGenerator);

let notes = {}
for (i=0; i<12; i++) {
	notes[i] = {
		'DiezName'		: noteDiezName[i], 	// для диезных тональностей
		'BemolName'		: noteBemolName[i],	// для бемольных тональностей
	}
}

let inputTonal		= getRandomInt(2); 	
let keyTonal 		= inputTonal ? 'BemolName' : 'DiezName';
let input_note 		= getRandomInt(11);
let input_interval 	= getRandomInt(11) + 1;
let direction 		= getRandomInt(2); 									// вниз или вверх
let rightAnswer 	= getRightAnswer(input_note, input_interval, direction);

if (keyTonal == 'DiezName') {
	noteDiezName.forEach(btnGenerator);
}
else {
	noteBemolName.forEach(btnGenerator);
}

let questionTitle = 'от "' + notes[input_note][keyTonal] 
	+ '" отложить ' 
	+ strDirection(direction) 
	+ ' интервал: "' + intervalName[input_interval] 
	+ '" в "' + strTonal(inputTonal) + '" тональности';
	
var spanQuestion = document.getElementById("question");
spanQuestion.textContent = questionTitle;

console.log('Ответ: ' + notes[rightAnswer][keyTonal]);	

function getAnswer(userAnswer) {
	if ((userAnswer == rightAnswer)) {
		spanQuestion.style.cssText = "color: green";
		reaction.text('Красавчик! ' + 'ответ - ' + notes[rightAnswer][keyTonal]);
		setTimeout(function(){location.reload()}, 900)
	}
	else {
		spanQuestion.style.cssText = "color: red";
		reaction.text('Тебе повезёт...^^ подумай ещё  ');
	}	
}

// ********************************************************	
	
//let getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));	// arrow notation demo
	
function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function strTonal(tonal) { 
	return (tonal == 0) ? '#' : 'b';
}

function strDirection(direction) {
	return (direction == 0) ? 'вверх' : 'вниз'
}

function getRightAnswer(input_note, input_interval, direction) {
	a = input_note + 12
	b = direction ? (input_interval * -1) : input_interval
	return (a + b) % 12
}


