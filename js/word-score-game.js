var BAG_OF_LETTERS = [
		new Letter('_', 2, 0),
		new Letter('_', 2, 0),
		new Letter('A', 9, 1),
		new Letter('A', 9, 1),
		new Letter('A', 9, 1),
		new Letter('A', 9, 1),
		new Letter('A', 9, 1),
		new Letter('A', 9, 1),
		new Letter('A', 9, 1),
		new Letter('A', 9, 1),
		new Letter('A', 9, 1),
		new Letter('B', 2, 3),
		new Letter('B', 2, 3),
		new Letter('C', 2, 3),
		new Letter('C', 2, 3),
		new Letter('D', 4, 2),
		new Letter('D', 4, 2),
		new Letter('D', 4, 2),
		new Letter('D', 4, 2),
		new Letter('E', 12, 1),
		new Letter('E', 12, 1),
		new Letter('E', 12, 1),
		new Letter('E', 12, 1),
		new Letter('E', 12, 1),
		new Letter('E', 12, 1),
		new Letter('E', 12, 1),
		new Letter('E', 12, 1),
		new Letter('E', 12, 1),
		new Letter('E', 12, 1),
		new Letter('E', 12, 1),
		new Letter('E', 12, 1),
		new Letter('F', 2, 4),
		new Letter('F', 2, 4),
		new Letter('G', 3, 2),
		new Letter('G', 3, 2),
		new Letter('G', 3, 2),
		new Letter('H', 2, 4),
		new Letter('H', 2, 4),
		new Letter('I', 9, 1),
		new Letter('I', 9, 1),
		new Letter('I', 9, 1),
		new Letter('I', 9, 1),
		new Letter('I', 9, 1),
		new Letter('I', 9, 1),
		new Letter('I', 9, 1),
		new Letter('I', 9, 1),
		new Letter('I', 9, 1),
		new Letter('J', 1, 8),
		new Letter('K', 1, 5),
		new Letter('L', 4, 1),
		new Letter('L', 4, 1),
		new Letter('L', 4, 1),
		new Letter('L', 4, 1),
		new Letter('M', 2, 3),
		new Letter('M', 2, 3),
		new Letter('N', 6, 1),
		new Letter('N', 6, 1),
		new Letter('N', 6, 1),
		new Letter('N', 6, 1),
		new Letter('N', 6, 1),
		new Letter('N', 6, 1),
		new Letter('O', 8, 1),
		new Letter('O', 8, 1),
		new Letter('O', 8, 1),
		new Letter('O', 8, 1),
		new Letter('O', 8, 1),
		new Letter('O', 8, 1),
		new Letter('O', 8, 1),
		new Letter('O', 8, 1),
		new Letter('P', 2, 3),
		new Letter('P', 2, 3),
		new Letter('Q', 1, 10),
		new Letter('R', 6, 1),
		new Letter('R', 6, 1),
		new Letter('R', 6, 1),
		new Letter('R', 6, 1),
		new Letter('R', 6, 1),
		new Letter('R', 6, 1),
		new Letter('S', 4, 1),
		new Letter('S', 4, 1),
		new Letter('S', 4, 1),
		new Letter('S', 4, 1),
		new Letter('T', 6, 1),
		new Letter('T', 6, 1),
		new Letter('T', 6, 1),
		new Letter('T', 6, 1),
		new Letter('T', 6, 1),
		new Letter('T', 6, 1),
		new Letter('U', 4, 1),
		new Letter('U', 4, 1),
		new Letter('U', 4, 1),
		new Letter('U', 4, 1),
		new Letter('V', 2, 4),
		new Letter('V', 2, 4),
		new Letter('W', 2, 4),
		new Letter('W', 2, 4),
		new Letter('X', 1, 8),
		new Letter('Y', 2, 4),
		new Letter('Y', 2, 4),
		new Letter('Z', 1, 10),
];

var YOUR_HAND = new Array();
var SCORE = 0;
function startGame() {
	addNumbersFromBag();
	displayHand();
	
};



function addNumbersFromBag(){
	console.log("your hand has:" + YOUR_HAND.length);
	for(i=YOUR_HAND.length; i < 7; i++){
		YOUR_HAND[i] = getAvailableLetter();
	}
	
}


function displayHand(){
	console.log("your hand has:" + YOUR_HAND.length);
	for (i = 0; i < YOUR_HAND.length; i++) {

		console.log("#letter-" + (i+1) +" set to " + YOUR_HAND[i].letter);
		$( "#letter-" + (i+1)).addClass("letter-" + YOUR_HAND[i].letter);
		$( "#points-" + (i+1)).addClass("points-" + YOUR_HAND[i].pointsWhenLettersUsed);

		$( "#letter-" + (i+1)).html(YOUR_HAND[i].letter);
		$( "#points-" + (i+1)).html(YOUR_HAND[i].pointsWhenLettersUsed);
	}
	
}



function getAvailableLetter(){
	var randomIndex = Math.floor(Math.random() * BAG_OF_LETTERS.length);
	var randomLetter = BAG_OF_LETTERS.splice(randomIndex, 1);
	console.log(randomLetter[0]);
	return randomLetter[0];
}

/* HAN BAO
 * 用排过序的7张牌可以有效减少检查分值次数
 */
function findWordToUse(){
 //TODO Your job starts here.

 	var str = getStrFromLargeToSmall();//从分值的大小重新得到手上的7张牌
 	if(str.indexOf('_')==-1){//如果没有下划线，直接用这7张牌做
 		return findTheHighestScoreWord(str);
	}else{
		for(i=0;i<str.length;i++){
 			if(str[i]=='_'){
 				for(m='A';m<='Z';m++){
 					console.log(m);
 					var newStr = "";
 					newStr = str.substring(0,i) + m + str.substring(i+1,str.length);
 					console.log(newStr);
 					findTheHighestScoreWord(newStr);//用新的的7张牌做
 				}
 			}
 		}
	}


}

/* HAN BAO
 * 用这7张牌先得到所有可能的组合但自身先不排序（7张的组合，6张的组合。。。1张的组合）
 * 再拿这7张的组合去得到所有排序可能性
 * 得到可能性后直接用humanFindWordToUse 这个function来查看其合理性，如存在，这就是最高分了，不必接下去看了。
 */
function findTheHighestScoreWord(str){
	let strArr = getCombination(str);
 	for(ii=0;ii<strArr.length;ii++){
 		let allPerputation = getPerputation(strArr[ii]);
 		for(m=0;m<allPerputation.length;m++){
 			if(isThisAWord(allPerputation[m])){
				humanFindWordToUse(allPerputation[m]);
				//alert("Try this word:   "+allPerputation[m] + ".  You will get the highest score");	
	 			return ;
			}
		}
 	}
 	 alert("No valid words!");
}

/* HAN BAO
 * 因为只有7张，所以冒泡排序就可以很快的解决从大到小的问题。
 * 因为我没学过js,所以这个地方有点浪费代码。是用了两个array来分别记录分数和字母，最后用String重新组起来。
 */
function getStrFromLargeToSmall(){
	let tempStrArr = [];
	for(i=0;i<YOUR_HAND.length;i++){
 		tempStrArr.push(YOUR_HAND[i].letter);
 	}
 	let tempArr = [];
 	for(i=0;i<YOUR_HAND.length;i++){
 		tempArr.push(YOUR_HAND[i].pointsWhenLettersUsed);
 	}
 	for(i=0;i<YOUR_HAND.length;i++){
 		for(ii=0;ii<YOUR_HAND.length-1;ii++){
 			if(tempArr[ii] < tempArr[ii+1]){
 				var temp = tempArr[ii+1];
 				tempArr[ii+1] = tempArr[ii];
 				tempArr[ii] = temp;

 				var tempStr = tempStrArr[ii+1];
 				tempStrArr[ii+1] = tempStrArr[ii];
 				tempStrArr[ii] = tempStr;
 			}
 		}
 	}
 	var str="";
 	for(i=0;i<YOUR_HAND.length;i++){
 		str=str+tempStrArr[i];
 	}
 	console.log(str);
	return str;

}

/* HAN BAO
 * Eg. str = abc, 那么我就能得到abc,ab,bc,ac,a,b,c六种可能。但是这六种是按照abc的顺序来的，并没有考虑自身的排序。
 */
function getCombination(str){
    if(str.length === 1){
        return [str]
    }

    let arr1 = arguments.callee(str.slice(1));
    let res1 = arr1.map(x => str[0]+x);
    let res2 = arguments.callee(str.slice(1));
    let res3 = [str[0]]
    return res1.concat(res2,res3);
}

/* HAN BAO
 * Eg. str = abc, 那么我就能得到abc,acb,bac,bca,cab,cba也是六种可能性。这样可以节省时间和空间。
 */
function getPerputation(str){
    if (str.length == 1) {
        return [str];
    }
    let res = []
    let arr = arguments.callee(str.slice(1));
    for(let i = 0;i < arr.length;i++){
        let partArr = [];
        for(let j = 0;j < arr[i].length+1;j++){
            let newStr = arr[i].slice(0,j) + str[0] + arr[i].slice(j);
            partArr.push(newStr);
        }
        res = res.concat(partArr)
    }
    return res;
}

/* HAN BAO
 * 改了签名，加了一个input，因为我在check每个单词的时候，直接用的这个function。
 */
function humanFindWordToUse(humanFoundWord){
	
	 //var humanFoundWord = $( "#human-word-input").val();
	 console.log("Checking human workd of:" + humanFoundWord);
	 if(isThisAWord(humanFoundWord)){
		 if(haveLettersForWord(humanFoundWord)){
			 successfullyAddedWord(humanFoundWord);
		 }else{
			 alert(humanFoundWord + " - Do not have the letters for this word");
		 }
	 }else{
		 alert(humanFoundWord + " is not a valid word.");
	 } 
		
}


function successfullyAddedWord(foundWord){
	$( "#word-history-list").append("<li>" + foundWord + "</li>");
	clearClasses();
	takeOutUsedLetters();
	addNumbersFromBag();
	displayHand();
	$( "#human-word-input").val('');
	
}

function addToScore(letterToAddToScore){
	SCORE = SCORE + letterToAddToScore.pointsWhenLettersUsed;
	console.log(letterToAddToScore.pointsWhenLettersUsed + "<-Points added for " + letterToAddToScore.letter);
	$( "#score-number").html(SCORE);
}


function takeOutUsedLetters(){
	
	for(ii=0; ii < YOUR_HAND.length; ii++){
		if(YOUR_HAND[ii].used){
			addToScore(YOUR_HAND[ii]);
			YOUR_HAND.splice(ii, 1);
			ii = ii-1;
		}else{
			console.log(YOUR_HAND[ii].letter + "<- Not Used");
		}
	}
	
}

function haveLettersForWord(aProposedWord){
	//You could code the _ logic could go in this function
	var wordAsArray = aProposedWord.toUpperCase().split("");
	/* HAN BAO
	 * mark how many letters have been used.
	 */
	var underLine = "_";
	for (i = 0; i < wordAsArray.length; i++) {
		var foundLetter = false;
		console.log(wordAsArray[i] + "<-For match");
		mark =-1;
		for(ii=0; ii<YOUR_HAND.length; ii++){
			console.log("              " + YOUR_HAND[ii].letter + "<-Checking");
			/* HAN BAO
			 * only need to add a mark to "_"
			 */
			if(YOUR_HAND[ii].letter == underLine){
				mark = ii;
			}

			if(YOUR_HAND[ii].letter == wordAsArray [i]){ 
				if(!YOUR_HAND[ii].used && !foundLetter){
					console.log("     " + YOUR_HAND[ii].letter + "<-Found");
					YOUR_HAND[ii].used = true;
					foundLetter = true;
					/* HAN BAO
			 		 * do not need to continue the loop
			         */
					break;
					
				}
			}
			/* HAN BAO
			 * if there is no current letter in hand but there is a "_" in hand, use "_" to replace this letter.
			 */
			if(ii == YOUR_HAND.length-1 && mark >= 0){
				YOUR_HAND[mark].used = true;
				foundLetter = true;
			}
		}

		
		
		if(!foundLetter){
			resetHand();
			return false;
		}
	}
	
	return true;
}


function resetHand(){
	
	for(ii=0; ii<YOUR_HAND.length; ii++){
		YOUR_HAND[ii].used = false;
		/* HAN BAO
		 *  ii ? i。。。。 maybe wrong?
		 */
	}
}

function isThisAWord(aProposedWord){
	  if (Word_List.isInList(aProposedWord)) {
	      return true;
	  }
	  return false;
}

function retireHand(){
	//Loose all the points in your hand
	clearClasses();
	YOUR_HAND = new Array();
	addNumbersFromBag();
	displayHand();
}

function clearClasses(){
	for(ii=0; ii < YOUR_HAND.length; ii++){
		$("#letter-" + (ii+1)).removeClass("letter-" + YOUR_HAND[ii].letter);
		$("#points-" + (ii+1)).removeClass("points-" + YOUR_HAND[ii].pointsWhenLettersUsed);
	}
}

$(document).ready(function() {
	startGame();
	
	$("#find-word-button").click(function() {
		findWordToUse();
	});
	$("#human-find-word-button").click(function() {
		var humanFoundWord = $( "#human-word-input").val();
		humanFindWordToUse(humanFoundWord);
	});
	$("#retire-hand-button").click(function() {
		retireHand();
	});
	$('#human-word-input').keypress(function(event) {
		if (event.which == 13) {
			var humanFoundWord = $( "#human-word-input").val();
			humanFindWordToUse(humanFoundWord);
		}
	});
});
