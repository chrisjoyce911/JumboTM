// ==UserScript==
// @name		Fill_Dividend
// @namespace	https://www.demo.jumbolotto.com/
// @description	Fill dividends in on dev sites
// @include		https://admin.kr.chrisj.dev.iris.lan/lottery/*/draw/*/dividend/edit
// @include		http://admin.kr.chrisj.dev.iris.lan/lottery/*/draw/*/dividend/edit
// @version		20
// @author		Chris Joyce
// @downloadURL	https://raw.githubusercontent.com/chrisjoyce911/JumboTM/master/Fill_Dividend.user.js
// @updateURL	https://raw.githubusercontent.com/chrisjoyce911/JumboTM/master/Fill_Dividend.user.js
// @copyright	2015+, Chris Joyce <chris@joyce.id.au>
// ==/UserScript==


function main() {
	
	var currentPageUrlIs = "";
	if (typeof this.href != "undefined") {
       currentPageUrlIs = this.href.toString().toLowerCase(); 
	}else{ 
		currentPageUrlIs = document.location.toString().toLowerCase();
	}
	console.log(currentPageUrlIs);
	
	var howmany_div = 12 ; 
	if( currentPageUrlIs.indexOf('lottery/305/draw') >= 0 ){
		console.log('Super 6');
		howmany_div =  6 ;
		var divinfo = [
			{"div":1,"num_winners":1,"prize_each":100000},
			{"div":2,"num_winners":16,"prize_each":6666},
			{"div":3,"num_winners":124,"prize_each":666},
			{"div":4,"num_winners":1424,"prize_each":66},
			{"div":5,"num_winners":14125,"prize_each":6},
			{"div":6,"num_winners":145819,"prize_each":2.5}
		] ;
	} else if( currentPageUrlIs.indexOf('lottery/1/draw') >= 0 || currentPageUrlIs.indexOf('lottery/3/draw') >= 0 || currentPageUrlIs.indexOf('lottery/5/draw') >= 0 ){
		console.log('Monday/Wednesday/Saturday Lotto');
		howmany_div =  6 ;
		var divinfo = [
			{"div":1,"num_winners":2,"prize_each":1000000},
			{"div":2,"num_winners":11,"prize_each":5951.60},
			{"div":3,"num_winners":214,"prize_each":475.90},
			{"div":4,"num_winners":9448,"prize_each":30.05},
			{"div":5,"num_winners":23413,"prize_each":16.80},
			{"div":6,"num_winners":50163,"prize_each":12.20}
		] ;
	}  else if( currentPageUrlIs.indexOf('lottery/301/draw') >= 0 ){
		console.log('Lotto 6 aus 49');
		howmany_div =  9 ;
		var divinfo = [
			{"div":1,"num_winners":1,"prize_each":4444951.10},
			{"div":2,"num_winners":8,"prize_each":222111.60},
			{"div":3,"num_winners":117,"prize_each":7593.50},
			{"div":4,"num_winners":1324,"prize_each":1986.00},
			{"div":5,"num_winners":5979,"prize_each":148.50},
			{"div":6,"num_winners":62645,"prize_each":28.30},
			{"div":7,"num_winners":96860,"prize_each":18.30},
			{"div":8,"num_winners":1012010,"prize_each":7.90},
			{"div":9,"num_winners":626735,"prize_each":5}
		] ;
	} else if( currentPageUrlIs.indexOf('lottery/304/draw') >= 0 ){
		console.log('Spiel 77');
		howmany_div =  7 ;
		var divinfo = [
			{"div":1,"num_winners":1,"prize_each":977777.00},
			{"div":2,"num_winners":2,"prize_each":77777.00},
			{"div":3,"num_winners":59,"prize_each":7777.00},
			{"div":4,"num_winners":496,"prize_each":777.00},
			{"div":5,"num_winners":4767,"prize_each":77.00},
			{"div":6,"num_winners":47000,"prize_each":17.00},
			{"div":7,"num_winners":424636,"prize_each":5.00}
		] ;
	} else if( currentPageUrlIs.indexOf('lottery/13/draw') >= 0 ){
		console.log('Powerball AU');
		howmany_div =  8 ;
		var divinfo = [
			{"div":1,"num_winners":1,"prize_each":30000000.00},
			{"div":2,"num_winners":27,"prize_each":25039.60},
			{"div":3,"num_winners":153,"prize_each":4622.70},
			{"div":4,"num_winners":2320,"prize_each":170.35},
			{"div":5,"num_winners":5147,"prize_each":58.60},
			{"div":6,"num_winners":73590,"prize_each":35.75},
			{"div":7,"num_winners":94885,"prize_each":24.90},
			{"div":8,"num_winners":415894,"prize_each":13.00}
		] ;
	} else if( currentPageUrlIs.indexOf('lottery/302/draw') >= 0 ){
		console.log('Euro Jackpot');
		howmany_div =  12 ;
		var divinfo = [
			{"div":1,"num_winners":1,"prize_each":19536863.80},
			{"div":2,"num_winners":1,"prize_each":617557.10},
			{"div":3,"num_winners":1,"prize_each":82163.90},
			{"div":4,"num_winners":23,"prize_each":3297.50},
			{"div":5,"num_winners":226,"prize_each":265.60},
			{"div":6,"num_winners":304,"prize_each":124.70},
			{"div":7,"num_winners":829,"prize_each":64.80},
			{"div":8,"num_winners":9939,"prize_each":26.00},
			{"div":9,"num_winners":12640,"prize_each":17.20},
			{"div":10,"num_winners":13951,"prize_each":16.30},
			{"div":11,"num_winners":72228,"prize_each":10.50},
			{"div":12,"num_winners":152140,"prize_each":9.50}
		] ;
	}
	
	var i ;
	for (d = 0; d < howmany_div; d++) {
		i = d + 1 ;
		MySetElementName('divisions_data['+ i +'][num_winners]',divinfo[d].num_winners);
		MySetElementName('divisions_data['+ i +'][prize_each]',divinfo[d].prize_each);
	//	MySetElementName('divisions_data['+ i +'][prize_pool]',d );
	}
}

function MySetElementName(Element,Data)
{
	//console.log("Element " + Element + " Data "+ Data);
	if (document.getElementsByName(Element) != null) 
	{
		document.getElementsByName(Element)[0].value=Data;
	}
	return true ;
}


GM_registerMenuCommand("Division", function () { main() });
