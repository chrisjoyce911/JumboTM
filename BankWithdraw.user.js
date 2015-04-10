// ==UserScript==
// @name       BankWithdraw
// @namespace  https://www.demo.jumbolotto.com/
// @description    Bank Withdraw
// @include        https://*/bank_withdraw/*
// @include        http://*/bank_withdraw/*
// @include        https://*/my-account/bank_withdraw*
// @include        http://*/my-account/bank_withdraw*
// @include        http://*/konto/einzahlungen/*
// @include        https://*/konto/einzahlungen/*
// @include        https://*/einkaufswagen/einzahlungen/*
// @version 100
// @downloadURL https://github.com/chrisjoyce911/JumboTM/raw/master/BankWithdraw.user.js
// @updateURL https://github.com/chrisjoyce911/JumboTM/raw/master/BankWithdraw.user.js
// @copyright  2015+, Chris Joyce
// ==/UserScript==


function main() {
  
	var theAccount = LoadAccount() ;

	var currentPageUrlIs = "";
	if (typeof this.href != "undefined") {
       currentPageUrlIs = this.href.toString().toLowerCase(); 
	}else{ 
		currentPageUrlIs = document.location.toString().toLowerCase();
	}
	console.log(currentPageUrlIs);
	
	// Common
	MySetElementValue('tt_swift',theAccount.Swift);
	MySetElementValue('tt_bic',theAccount.BIC);
	MySetElementValue('tt_account_number',theAccount.AccountNumber);
	MySetElementValue('tt_account_name',theAccount.AccountName);
	MySetElementValue('tt_additional_instructions',theAccount.Instruction);
	MySetElementValue('amount',Math.floor(Math.random() * 80) + 20);
	console.log("Done");

}

function objAccount(Swift,BIC,AccountNumber,AccountName,Instruction)
{
	this.Swift = Swift;
	this.BIC = BIC;
	this.AccountNumber = AccountNumber;
	this.AccountName = AccountName;
	this.Instruction = Instruction;
}

function LoadAccount()
{
	var Swifts = ["ANZBKRSX", "ANZBKRSX ","ABOCKRSE"] ; 
	var BICs = ["29053"] ; 
	var AccountNumbers = ["00634573221"];
	var AccountNames = ["Rodney Adler", "Hajnal Ban", "Alan Bond", "Brian Burke", "Michael Cobb", "Laurie Connell", "Peter Foster", "Simon Hannes", "Ray O'Connor", "Rene Rivkin", "Christopher Skase", "Andrew Theophanous", "Craig Thomson", "Glenn Wheatley", "Ray Williams"];
	var Instructions = ["Sydney based fraudster who was imprisoned for his role in transactions to hide the true financial status of FAI Insurance", "defrauded an elderly man with a mental incapacity of $660,000", "gaoled for three years in 1996 for fraud", "former W.A. premier imprisoned for rorting travel expenses", "former politician convicted of fraud after rorting travel expenses", "gaoled for conspiring to pervert the course of justice", "one of Australia's most famous conmen, gaoled for fraud", "insider trading ahead of takeover of TNT in 1996", "former W.A. premier imprisoned for stealing", "stockmarket guru imprisoned on insider trading charges", "failed businessman and fugitive who escaped to Majorca", "bribery and fraud offences relating to assisting in visa applications as a Member of Parliament", "fraud against the Health Services Union for sexual purposes and gratification", "gaoled for tax evasion", "fraud related to the collapse of HIH Insurance"];

	var Swift = Swifts[Math.floor(Math.random() * Swifts.length)];
	var BIC = BICs[Math.floor(Math.random() * BICs.length)];
	var AccountNumber = AccountNumbers[Math.floor(Math.random() * AccountNumbers.length)];
	var Picker = Math.floor(Math.random() * AccountNames.length) ;
	var AccountName = AccountNames[Picker];
	var Instruction = Instructions[Picker];
		
	var MyAccount = new objAccount(Swift,BIC,AccountNumber,AccountName,Instruction) ;

	console.log(MyAccount);
	return MyAccount ;
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

GM_registerMenuCommand("Add Account", main);
