// ==UserScript==
// @name		CardPayment
// @namespace	https://www.demo.jumbolotto.com/
// @description	Card Payment
// @include		https://*/deposit/*
// @include		http://*/deposit/*
// @include		https://*/my-account/deposit/*
// @include		http://*/my-account/deposit/*
// @include		http://*/konto/einzahlungen/*
// @include		https://*/konto/einzahlungen/*
// @include		https://*/einkaufswagen/einzahlungen/*
// @version		30
// @author		Chris Joyce
// @downloadURL	https://raw.githubusercontent.com/chrisjoyce911/JumboTM/master/CardPayment.user.js
// @updateURL	https://raw.githubusercontent.com/chrisjoyce911/JumboTM/master/CardPayment.user.js
// @copyright	2015+, Chris Joyce <chris@joyce.id.au>
// ==/UserScript==


function main(ServiceType) {

	var theCard = LoadCards(ServiceType) ;

	var currentPageUrlIs = "";
	if (typeof this.href != "undefined") {
       currentPageUrlIs = this.href.toString().toLowerCase();
	}else{
		currentPageUrlIs = document.location.toString().toLowerCase();
	}
	 console.log(currentPageUrlIs);

	//var variant ;
	if( currentPageUrlIs.indexOf('kr') >= 0 || currentPageUrlIs.indexOf('ozdreamlotto') >= 0 ){
		MySetSelect2('card_expiry_month',"select2-chosen-2",value=theCard.ExpiryMonth);
		MySetSelect2('card_expiry_year',"select2-chosen-3",value=theCard.ExpiryYear);
	} else if( currentPageUrlIs.indexOf('au') >= 0){
		console.log("Debug 2");
		MySetSelect2('card_expiry_month',"select2-chosen-2",value=theCard.ExpiryMonth);
		MySetSelect2('card_expiry_year',"select2-chosen-3",value=theCard.ExpiryYear);
	} else 	if( currentPageUrlIs.indexOf('us') >= 0){
		console.log("Debug 3");
	//	variant = "US";
	} else 	if( currentPageUrlIs.indexOf('de') >= 0){
		console.log("Debug 4");
		MySetSelect2('card_expiry_month',"select2-chosen-3",value=theCard.ExpiryMonth);
		MySetSelect2('card_expiry_year',"select2-chosen-4",value=theCard.ExpiryYear);
	}

	// KR AU
	MySetrElementChecked('card_add_to_saved');

	// Common
	MySetElementValue('card_ccv',theCard.CCV);
	MySetElementValue('amount_cc',Math.floor(Math.random() * 80) + 20);

	document.getElementById('card_name').value=theCard.CardName;
	document.getElementById('card_number').value=theCard.CardNumber;

}

function objCard(CardName,CardNumber,ExpiryMonth,ExpiryYear,CCV)
{
	this.CardName = CardName;
	this.CardNumber = CardNumber;
	this.ExpiryMonth = ExpiryMonth;
	this.ExpiryYear = ExpiryYear;
	this.CCV = CCV;
}

function LoadCards(ServiceType)
{
	if (ServiceType == 'comweb')
    {
		var CardNames = ["MasterCard", "Visa", "Diners Club"];
		var CardNumbers = ["5123456789012346","4987654321098769","30123456789019"];
		var CCVs = ["196","196", "123"];

		// Com Web Cards
		// MasterCard 5123456789012346 05/17 Any 3 digits
		// Visa 4987654321098769 05/17 Any 3 digits
		// Amex 345678901234564 05/17 Any 4 digits
		// Diners Club 30123456789019 05/17
		var card_pick = Math.floor(Math.random() * CardNames.length) ;
		var MyCard = new objCard(CardNames[card_pick],CardNumbers[card_pick],"5","2017",CCVs[card_pick]) ;
	}

	if (ServiceType == 'fake')
    {
		var CardsNames = ["Alan Bond", "Jaspreet Singh","Paul Francis McCuskey","Wissam Fattal","Lesley Jonathon","Glenn Matthew","Carl Damain Morris"];
		var CardNumbers = ["5484835096757854", "5350124676004412", "5241347950793110", "5384982309183733", "5433563375829226", "5385355895151530", "5433162927399182", "5527365046553053", "5241957363821306", "5199132758708615", "5589572574828030", "5591109576148301", "5139261542110680", "5571020411414838", "5316801836709575", "5552162238674187", "5429301843517545", "5300643554282049", "5162347371771278", "5107921758399263"];
		var card_expiry_month = ["1", "2","3","4","5","6","7","8", "9", "10", "11", "12"] ;
		var card_expiry_year = ["2016", "2017","2018","2019","2020","2021","2022"] ;
		var CCVs = ["196","765","186", "342"];

		var CardName = CardsNames[Math.floor(Math.random() * CardsNames.length)];
		var CardNumber = CardNumbers[Math.floor(Math.random() * CardNumbers.length)];
		var card_expiry_year = card_expiry_year[Math.floor(Math.random() * card_expiry_year.length)];
		var card_expiry_month = card_expiry_month[Math.floor(Math.random() * card_expiry_month.length)];
		var CCV = CCVs[Math.floor(Math.random() * CCVs.length)];

		var MyCard = new objCard(CardName,CardNumber,card_expiry_month,card_expiry_year,CCV) ;
	}

	console.log(MyCard);
	return MyCard ;
}

function MySetSelect2(Element,Label,Data)
{
	console.log("Element " + Element + " Label "+ Label + " Data "+ Data);
	 if (document.getElementById(Element) != null)
	{
		document.getElementById(Element).value=Data;
		var span = document.getElementById(Label);
		span.textContent = Data;
	}
	return true ;
}
function MySetElementValue(Element,Data)
{
	//console.log("Element " + Element + " Data "+ Data);
	 if (document.getElementById(Element) != null)
	{
		document.getElementById(Element).value=Data;
	}
	return true ;
}

function MySetElementIndex(Element,Data)
{
	//console.log("Element " + Element + " Data "+ Data);
	 if (document.getElementById(Element) != null)
	{
		document.getElementById(Element).selectedIndex = Data;
	}
	return true ;
}

function MySetrElementChecked(Element)
{
	 if (document.getElementById(Element) != null)
	{
		document.getElementById(Element).checked=true;
	}
	return true ;
}

GM_registerMenuCommand("Add Fake Card", function () { main("fake") });
GM_registerMenuCommand("Add ComBank Card", function () { main("comweb") });
