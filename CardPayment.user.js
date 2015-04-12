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
// @version		35
// @author		Chris Joyce
// @downloadURL	https://raw.githubusercontent.com/chrisjoyce911/JumboTM/master/CardPayment.user.js
// @updateURL	https://raw.githubusercontent.com/chrisjoyce911/JumboTM/master/CardPayment.user.js
// @copyright	2015+, Chris Joyce <chris@joyce.id.au>
// ==/UserScript==


function main(numbersource,issurer) {

	console.log("numbersource : " + numbersource + " issurer : " + issurer);
	
	var theCard = LoadCards(numbersource,issurer) ;

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

//return an array of objects according to key, value, or key and value matching
function getObjects(obj, key, val)
{
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));    
        } else 
        //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
        if (i == key && obj[i] == val || i == key && val == '') { //
            objects.push(obj);
        } else if (obj[i] == val && key == ''){
            //only add if the object is not already in the array
            if (objects.lastIndexOf(obj) == -1){
                objects.push(obj);
            }
        }
    }
    return objects;
}

//return an array of values that match on a certain key
function getValues(obj, key)
{
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getValues(obj[i], key));
        } else if (i == key) {
            objects.push(obj[i]);
        }
    }
    return objects;
}

//return an array of keys that match on a certain value
function getKeys(obj, val)
{
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getKeys(obj[i], val));
        } else if (obj[i] == val) {
            objects.push(i);
        }
    }
    return objects;
}


function objCard(CardName,CardNumber,ExpiryMonth,ExpiryYear,CCV)
{
	this.CardName = CardName;
	this.CardNumber = CardNumber;
	this.ExpiryMonth = ExpiryMonth;
	this.ExpiryYear = ExpiryYear;
	this.CCV = CCV;
}

function LoadCards(numbersource,issurer)
{

	var cards = [
		{"class":"fake","cardnumber":"5426 5712 2157 3822","expiryyear":2017,"expirymonth":12,"issurer":"MasterCard","cvv":99},
		{"class":"fake","cardnumber":"5230 4077 5235 0015","expiryyear":2018,"expirymonth":4,"issurer":"MasterCard","cvv":777},
		{"class":"fake","cardnumber":"5206 1458 4516 7877","expiryyear":2017,"expirymonth":2,"issurer":"MasterCard","cvv":86},
		{"class":"fake","cardnumber":"5172 5636 1620 7864","expiryyear":2018,"expirymonth":5,"issurer":"MasterCard","cvv":190},
		{"class":"fake","cardnumber":"5291 6673 8581 2220","expiryyear":2018,"expirymonth":3,"issurer":"MasterCard","cvv":479},
		{"class":"fake","cardnumber":"5228 5677 3347 7841","expiryyear":2017,"expirymonth":11,"issurer":"MasterCard","cvv":641},
		{"class":"fake","cardnumber":"5031 4183 8747 3610","expiryyear":2017,"expirymonth":8,"issurer":"MasterCard","cvv":665},
		{"class":"fake","cardnumber":"5286 4032 2050 1035","expiryyear":2018,"expirymonth":8,"issurer":"MasterCard","cvv":881},
		{"class":"fake","cardnumber":"5211 2806 6052 0364","expiryyear":2018,"expirymonth":9,"issurer":"MasterCard","cvv":868},
		{"class":"fake","cardnumber":"5204 4536 8246 8354","expiryyear":2018,"expirymonth":7,"issurer":"MasterCard","cvv":954},
		{"class":"fake","cardnumber":"5130 7404 7460 6814","expiryyear":2017,"expirymonth":8,"issurer":"MasterCard","cvv":328},
		{"class":"fake","cardnumber":"5206 1122 7021 0374","expiryyear":2017,"expirymonth":1,"issurer":"MasterCard","cvv":83},
		{"class":"fake","cardnumber":"5160 4364 4554 1056","expiryyear":2017,"expirymonth":10,"issurer":"MasterCard","cvv":574},
		{"class":"fake","cardnumber":"5227 6158 3511 1015","expiryyear":2017,"expirymonth":10,"issurer":"MasterCard","cvv":215},
		{"class":"fake","cardnumber":"5236 4517 0635 1244","expiryyear":2017,"expirymonth":4,"issurer":"MasterCard","cvv":287},
		{"class":"fake","cardnumber":"5291 1263 6440 6447","expiryyear":2018,"expirymonth":3,"issurer":"MasterCard","cvv":80},
		{"class":"fake","cardnumber":"5254 8165 6454 4600","expiryyear":2017,"expirymonth":11,"issurer":"MasterCard","cvv":566},
		{"class":"fake","cardnumber":"5181 3153 4782 5848","expiryyear":2017,"expirymonth":1,"issurer":"MasterCard","cvv":808},
		{"class":"fake","cardnumber":"5213 3571 0275 8600","expiryyear":2017,"expirymonth":9,"issurer":"MasterCard","cvv":535},
		{"class":"fake","cardnumber":"5217 6625 0781 4536","expiryyear":2017,"expirymonth":7,"issurer":"MasterCard","cvv":830},
		{"class":"fake","cardnumber":"5213 5504 2182 8738","expiryyear":2018,"expirymonth":11,"issurer":"MasterCard","cvv":571},
		{"class":"fake","cardnumber":"5208 1834 4303 2860","expiryyear":2017,"expirymonth":7,"issurer":"MasterCard","cvv":134},
		{"class":"fake","cardnumber":"5211 2238 0748 3252","expiryyear":2017,"expirymonth":9,"issurer":"MasterCard","cvv":325},
		{"class":"fake","cardnumber":"5434 4783 1667 8252","expiryyear":2017,"expirymonth":2,"issurer":"MasterCard","cvv":622},
		{"class":"fake","cardnumber":"5216 0710 5008 4268","expiryyear":2017,"expirymonth":1,"issurer":"MasterCard","cvv":331},
		{"class":"fake","cardnumber":"5207 0586 8331 2886","expiryyear":2018,"expirymonth":10,"issurer":"MasterCard","cvv":977},
		{"class":"fake","cardnumber":"5100 5511 8333 2733","expiryyear":2017,"expirymonth":5,"issurer":"MasterCard","cvv":788},
		{"class":"fake","cardnumber":"5235 4315 2163 0205","expiryyear":2017,"expirymonth":11,"issurer":"MasterCard","cvv":623},
		{"class":"fake","cardnumber":"5031 0418 8563 7732","expiryyear":2018,"expirymonth":12,"issurer":"MasterCard","cvv":580},
		{"class":"fake","cardnumber":"5209 5733 8768 3638","expiryyear":2017,"expirymonth":2,"issurer":"MasterCard","cvv":177},
		{"class":"fake","cardnumber":"5426 4231 8343 5410","expiryyear":2018,"expirymonth":4,"issurer":"MasterCard","cvv":455},
		{"class":"fake","cardnumber":"5234 8708 2163 7314","expiryyear":2018,"expirymonth":8,"issurer":"MasterCard","cvv":383},
		{"class":"fake","cardnumber":"5291 7465 3227 7873","expiryyear":2017,"expirymonth":10,"issurer":"MasterCard","cvv":715},
		{"class":"fake","cardnumber":"5031 7604 6323 6878","expiryyear":2018,"expirymonth":12,"issurer":"MasterCard","cvv":938},
		{"class":"fake","cardnumber":"5202 6368 6512 5385","expiryyear":2017,"expirymonth":12,"issurer":"MasterCard","cvv":957},
		{"class":"fake","cardnumber":"5434 7337 8646 7556","expiryyear":2018,"expirymonth":2,"issurer":"MasterCard","cvv":570},
		{"class":"fake","cardnumber":"4110 3537 8502 3427","expiryyear":2017,"expirymonth":12,"issurer":" Visa","cvv":802},
		{"class":"fake","cardnumber":"4122 4865 3557 8724","expiryyear":2018,"expirymonth":1,"issurer":"Visa","cvv":603},
		{"class":"fake","cardnumber":"4231 1617 2435 2748","expiryyear":2017,"expirymonth":1,"issurer":"Visa","cvv":405},
		{"class":"fake","cardnumber":"4722 1542 7080 8714","expiryyear":2017,"expirymonth":7,"issurer":"Visa","cvv":589},
		{"class":"fake","cardnumber":"4537 1123 8552 8382","expiryyear":2017,"expirymonth":6,"issurer":"Visa","cvv":416},
		{"class":"fake","cardnumber":"4916 7603 7744 5451","expiryyear":2017,"expirymonth":3,"issurer":"Visa","cvv":636},
		{"class":"fake","cardnumber":"4013 2021 6836 7075","expiryyear":2017,"expirymonth":1,"issurer":"Visa","cvv":116},
		{"class":"fake","cardnumber":"4897 3305 4618 7104","expiryyear":2017,"expirymonth":11,"issurer":"Visa","cvv":216},
		{"class":"fake","cardnumber":"4131 3715 6846 0561","expiryyear":2018,"expirymonth":9,"issurer":"Visa","cvv":18},
		{"class":"fake","cardnumber":"4421 6772 0210 5316","expiryyear":2018,"expirymonth":7,"issurer":"Visa","cvv":971},
		{"class":"fake","cardnumber":"4302 6321 5508 3733","expiryyear":2017,"expirymonth":11,"issurer":"Visa","cvv":821},
		{"class":"fake","cardnumber":"4131 5677 4751 8340","expiryyear":2018,"expirymonth":9,"issurer":"Visa","cvv":283},
		{"class":"fake","cardnumber":"4510 5087 3266 3866","expiryyear":2017,"expirymonth":9,"issurer":"Visa","cvv":452},
		{"class":"fake","cardnumber":"4253 5021 2201 8808","expiryyear":2017,"expirymonth":6,"issurer":"Visa","cvv":599},
		{"class":"fake","cardnumber":"4114 2104 2081 6027","expiryyear":2017,"expirymonth":5,"issurer":"Visa","cvv":681},
		{"class":"fake","cardnumber":"4401 1646 5618 2830","expiryyear":2018,"expirymonth":2,"issurer":"Visa","cvv":560},
		{"class":"fake","cardnumber":"4502 6746 8606 6744","expiryyear":2018,"expirymonth":7,"issurer":"Visa","cvv":532},
		{"class":"fake","cardnumber":"4506 3145 0235 0222","expiryyear":2017,"expirymonth":9,"issurer":"Visa","cvv":237},
		{"class":"fake","cardnumber":"4539 9710 5603 1481","expiryyear":2017,"expirymonth":5,"issurer":"Visa","cvv":708},
		{"class":"fake","cardnumber":"4231 0850 6188 8586","expiryyear":2018,"expirymonth":9,"issurer":"Visa","cvv":869},
		{"class":"fake","cardnumber":"4122 6805 3066 8122","expiryyear":2017,"expirymonth":2,"issurer":"Visa","cvv":618},
		{"class":"fake","cardnumber":"4225 0271 7633 3536","expiryyear":2018,"expirymonth":3,"issurer":"Visa","cvv":753},
		{"class":"fake","cardnumber":"4125 1524 1304 3820","expiryyear":2017,"expirymonth":9,"issurer":"Visa","cvv":58},
		{"class":"fake","cardnumber":"4503 1225 1166 6311","expiryyear":2017,"expirymonth":11,"issurer":"Visa","cvv":43},
		{"class":"fake","cardnumber":"4027 6777 0081 8525","expiryyear":2017,"expirymonth":4,"issurer":"Visa","cvv":300},
		{"class":"fake","cardnumber":"4488 9860 4015 6005","expiryyear":2018,"expirymonth":3,"issurer":"Visa","cvv":92},
		{"class":"fake","cardnumber":"4916 5017 8812 6532","expiryyear":2018,"expirymonth":6,"issurer":"Visa","cvv":641},
		{"class":"fake","cardnumber":"4498 1741 2465 5667","expiryyear":2018,"expirymonth":7,"issurer":"Visa","cvv":843},
		{"class":"fake","cardnumber":"4719 8585 4551 3736","expiryyear":2017,"expirymonth":7,"issurer":"Visa","cvv":180},
		{"class":"fake","cardnumber":"4170 9066 4001 6253","expiryyear":2017,"expirymonth":5,"issurer":"Visa","cvv":41},
		{"class":"fake","cardnumber":"4241 6672 7640 1137","expiryyear":2018,"expirymonth":7,"issurer":"Visa","cvv":752},
		{"class":"fake","cardnumber":"4842 4033 7521 1216","expiryyear":2017,"expirymonth":10,"issurer":"Visa","cvv":675},
		{"class":"fake","cardnumber":"4784 1060 4858 7447","expiryyear":2017,"expirymonth":8,"issurer":"Visa","cvv":648},
		{"class":"fake","cardnumber":"4060 0736 6117 5386","expiryyear":2018,"expirymonth":1,"issurer":"Visa","cvv":725},
		{"class":"fake","cardnumber":"4368 1431 6382 5082","expiryyear":2018,"expirymonth":7,"issurer":"Visa","cvv":776},
		{"class":"fake","cardnumber":"4356 3775 6735 6740","expiryyear":2018,"expirymonth":12,"issurer":"Visa","cvv":199},
		{"class":"fake","cardnumber":"4842 2713 7186 5784","expiryyear":2017,"expirymonth":4,"issurer":"Visa","cvv":879},
		{"class":"fake","cardnumber":"4628 9560 4015 1661","expiryyear":2017,"expirymonth":7,"issurer":"Visa","cvv":230},
		{"class":"fake","cardnumber":"4418 1784 5646 2748","expiryyear":2018,"expirymonth":7,"issurer":"Visa","cvv":568},
		{"class":"fake","cardnumber":"4557 6683 2366 5623","expiryyear":2017,"expirymonth":7,"issurer":"Visa","cvv":707},
		{"class":"fake","cardnumber":"4897 6635 7324 8211","expiryyear":2018,"expirymonth":12,"issurer":"Visa","cvv":919},
		{"class":"comw","cardnumber":"5123 4567 8901 2346","expiryyear":2017,"expirymonth":5,"issurer":"MasterCard","cvv":196},
		{"class":"comw","cardnumber":"4987 6543 2109 8769","expiryyear":2017,"expirymonth":5,"issurer":"Visa","cvv":123},
		{"class":"comw","cardnumber":"3012 3456 789 019","expiryyear":2017,"expirymonth":5,"issurer":"Diners Club","cvv":648}
	];

	var names = [
		{"firstname":"Rodney","lastname":"Adler","details":"Sydney based fraudster who was imprisoned for his role in transactions to hide the true financial status of FAI Insurance\""},
		{"firstname":"Hajnal","lastname":"Ban","details":"defrauded an elderly man with a mental incapacity of $660"},
		{"firstname":"Alan","lastname":"Bond","details":"gaoled for three years in 1996 for fraud"},
		{"firstname":"Brian","lastname":"Burke","details":"former W.A. premier imprisoned for rorting travel expenses"},
		{"firstname":"Michael","lastname":"Cobb","details":"former politician convicted of fraud after rorting travel expenses"},
		{"firstname":"Laurie","lastname":"Connell","details":"gaoled for conspiring to pervert the course of justice"},
		{"firstname":"Peter","lastname":"Foster","details":"one of Australia's most famous conmen"},
		{"firstname":"Simon","lastname":"Hannes","details":"insider trading ahead of takeover of TNT in 1996"},
		{"firstname":"Ray","lastname":"O'Connor","details":"former W.A. premier imprisoned for stealing"},
		{"firstname":"Rene","lastname":"Rivkin","details":"stockmarket guru imprisoned on insider trading charges"},
		{"firstname":"Christopher","lastname":"Skase","details":"failed businessman and fugitive who escaped to Majorca"},
		{"firstname":"Andrew","lastname":"Theophanous","details":"bribery and fraud offences relating to assisting in visa applications as a Member of Parliament"},
		{"firstname":"Craig","lastname":"Thomson","details":"fraud against the Health Services Union for sexual purposes and gratification"},
		{"firstname":"Glenn","lastname":"Wheatley","details":"gaoled for tax evasion"},
		{"firstname":"Ray","lastname":"Williams","details":"fraud related to the collapse of HIH Insurance"}
	];

	console.log("numbersource : " + numbersource+ " issurer : " +issurer);
	
	var classofcards = getObjects(cards,'class',numbersource);
	console.log(classofcards.length);
	var selectedcards = getObjects(classofcards,'issurer',issurer);
	console.log(selectedcards.length);

	var card_pick = Math.floor(Math.random() * selectedcards.length) ;
	var name_pick = Math.floor(Math.random() * names.length) ;

	console.log("card_pick : " + card_pick);
	console.log("name_pick : " + name_pick);
	
	console.log("name : " + names[name_pick].firstname + " " + names[name_pick].lastname);
	console.log("cardnumber : " + selectedcards[card_pick].cardnumber);

	var MyCard = new objCard(names[name_pick].firstname + " " + names[name_pick].lastname,selectedcards[card_pick].cardnumber,selectedcards[card_pick].expirymonth,selectedcards[card_pick].expiryyear,selectedcards[card_pick].cvv) ;

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

GM_registerMenuCommand("Fake MasterCard", function () { main("fake","MasterCard") });
GM_registerMenuCommand("Fake Visa", function () { main("fake","Visa") });
GM_registerMenuCommand("ComBank MasterCard", function () { main("comw","MasterCard") });
GM_registerMenuCommand("ComBank Visa", function () { main("comw","Visa") });
GM_registerMenuCommand("ComBank Diners Club", function () { main("comw","Diners Club") });
