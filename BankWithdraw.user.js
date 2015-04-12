// ==UserScript==
// @name	BankWithdraw
// @namespace	https://www.demo.jumbolotto.com/
// @description	Fills in bank account details to allow a withdraw request
// @include	https://*/bank_withdraw/*
// @include	http://*/bank_withdraw/*
// @include	https://*/my-account/bank_withdraw*
// @include	http://*/my-account/bank_withdraw*
// @include	http://*/konto/einzahlungen/*
// @include	https://*/konto/einzahlungen/*
// @include	https://*/einkaufswagen/einzahlungen/*
// @author	Chris Joyce
// @version	35
// @downloadURL	https://raw.githubusercontent.com/chrisjoyce911/JumboTM/master/BankWithdraw.user.js
// @updateURL	https://raw.githubusercontent.com/chrisjoyce911/JumboTM/master/BankWithdraw.user.js
// @copyright	2015+, Chris Joyce <chris@joyce.id.au>
// ==/UserScript==

function main() {
  
	var theAccount = LoadAccount() ;
	var currentPageUrlIs = "";
	if (typeof this.href != "undefined") {
       currentPageUrlIs = this.href.toString().toLowerCase(); 
	}else{ 
		currentPageUrlIs = document.location.toString().toLowerCase();
	}
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

	var banks = [
		{"id":1,"institution":"AGRICULTURAL BANK OF CHINA SEOUL BRANCH","swift":"ABOCKRSE"},
		{"id":2,"institution":"AUSTRALIA AND NEW ZEALAND BANKING GROUP LIMITED","swift":"ANZBKRSX"},
		{"id":3,"institution":"BANCO BILBAO VIZCAYA ARGENTARIA SA.","swift":"BBVAKRSE"},
		{"id":4,"institution":"BANK OF AMERICA, N.A. SEOUL BRANCH","swift":"BOFAKR2X"},
		{"id":5,"institution":"BANK OF CHINA SEOUL BRANCH","swift":"BKCHKRSEANS"},
		{"id":6,"institution":"BANK OF COMMUNICATIONS CO. LTD SEOULBRANCH","swift":"COMMKRSE"},
		{"id":7,"institution":"BANK OF KOREA","swift":"BOKRKRST"},
		{"id":8,"institution":"BANK OF NOVA SCOTIA, THE, SEOUL BRANCH","swift":"NOSCKRSE"},
		{"id":9,"institution":"BANK OF TOKYO-MITSUBISHI UFJ, LTD., THE","swift":"BOTKKRSX"},
		{"id":10,"institution":"BARCLAYS BANK PLC, SEOUL BRANCH","swift":"BARCKRSE"},
		{"id":11,"institution":"BNP PARIBAS SEOUL BRANCH","swift":"BNPAKRSE"},
		{"id":12,"institution":"BUSAN BANK","swift":"PUSBKR2PSEL"},
		{"id":13,"institution":"CHEIL WORLDWIDE, INC","swift":"CIWWKRSE"},
		{"id":14,"institution":"CHINA CONSTRUCTION BANK SEOUL BRANCH","swift":"PCBCKRSE"},
		{"id":15,"institution":"CITIBANK KOREA INC","swift":"CITIKRSX"},
		{"id":16,"institution":"CONSTRUCTION GUARANTEE COOPERATIVE","swift":"KCGCKRSE"},
		{"id":17,"institution":"CREDIT AGRICOLE CIB","swift":"CRLYKRSE"},
		{"id":18,"institution":"CREDIT SUISSE AG, SEOUL BRANCH","swift":"CRESKRSE"},
		{"id":19,"institution":"DAEGU BANK, LTD.,THE","swift":"DAEBKR22SEL"},
		{"id":20,"institution":"DAEWOO SECURITIES CO., LTD.","swift":"DWSEKRSE"},
		{"id":21,"institution":"DAIMLER TRUCKS KOREA LTD.","swift":"DTKRKRSE"},
		{"id":22,"institution":"DAISHIN SECURITES CO., LTD","swift":"DSSCKRSE"},
		{"id":23,"institution":"DBS BANK LTD, SEOUL BRANCH","swift":"DBSSKRSEIBD"},
		{"id":24,"institution":"DEUTSCHE BANK AG, SEOUL BRANCH","swift":"DEUTKRSEF4C"},
		{"id":25,"institution":"ELAND WORLD LIMITED","swift":"ELGTKRSE"},
		{"id":26,"institution":"GOLDMAN SACHS INTERNATIONAL BANK, SEOULBRANCH","swift":"GSIBKRSE"},
		{"id":27,"institution":"HANA BANK","swift":"HNBNKRSE"},
		{"id":28,"institution":"HANA DAETOO SECURITIES","swift":"HNDTKRSE"},
		{"id":29,"institution":"HANWHA LIFE INSURANCE","swift":"HWLIKRSE"},
		{"id":30,"institution":"HONGKONG AND SHANGHAI BANKING CORPORATION LIMITED, THE","swift":"HSBCKRSEBSN"},
		{"id":31,"institution":"HSBC FUND SERVICES (KOREA) LIMITED","swift":"HIFKKRSE"},
		{"id":32,"institution":"HYUNDAI SECURITIES","swift":"HYSEKRSE"},
		{"id":33,"institution":"INDIAN OVERSEAS BANK, SEOUL BRANCH","swift":"IOBAKRSE"},
		{"id":34,"institution":"INDUSTRIAL AND COMMERCIAL BANK OF CHINA","swift":"ICBKKRSE"},
		{"id":35,"institution":"INDUSTRIAL BANK OF KOREA","swift":"IBKOKRSE"},
		{"id":36,"institution":"ING BANK N.V.","swift":"INGBKRSE"},
		{"id":37,"institution":"J.P. MORGAN SECURITIES (FAR EAST) LTD","swift":"CHASKRSE"},
		{"id":38,"institution":"JEJU BANK","swift":"JJBKKR22"},
		{"id":39,"institution":"JEONBUK BANK","swift":"JEONKRSE"},
		{"id":40,"institution":"JPMORGAN CHASE BANK, N.A., SEOUL BRANCH","swift":"CHASKRSXENQ"},
		{"id":41,"institution":"KOOKMIN BANK","swift":"CZNBKRSEWLS"},
		{"id":42,"institution":"KOREA DEVELOPMENT BANK, THE","swift":"KODBKRSE001"},
		{"id":43,"institution":"KOREA EXCHANGE BANK","swift":"KOEXKRSE"},
		{"id":44,"institution":"KOREA FINANCE CORPORATION","swift":"KOFCKRSE"},
		{"id":45,"institution":"KOREA INVESTMENT AND SECURITIES CO., LTD.","swift":"KISEKRSE"},
		{"id":46,"institution":"KOREA SECURITIES DEPOSITORY","swift":"KSDCKRSEFUN"},
		{"id":47,"institution":"KOREA TRADE INSURANCE CORPORATION","swift":"KEXIKRSE"},
		{"id":48,"institution":"KWANGJU BANK LTD, THE","swift":"KWABKRSE"},
		{"id":49,"institution":"KYOBO LIFE INSURANCE CO., LTD.","swift":"KYBOKRSE"},
		{"id":50,"institution":"KYONGNAM BANK","swift":"KYNAKR22"}
	];

	var BICs = ["29053"] ; 
	var AccountNumbers = ["00634573221"];
	
	var BIC = BICs[Math.floor(Math.random() * BICs.length)];
	var AccountNumber = AccountNumbers[Math.floor(Math.random() * AccountNumbers.length)];
	
	var swift_pick = Math.floor(Math.random() * banks.length) ;
	var Swift = banks[swift_pick].swift;

	var name_pick = Math.floor(Math.random() * names.length) ;

	var AccountName = names[name_pick].firstname + " " + names[name_pick].lastname;
	var Instruction = names[name_pick].details;
		
	var MyAccount = new objAccount(Swift,BIC,AccountNumber,AccountName,Instruction) ;
	console.log(MyAccount);
	return MyAccount ;
}

function MySetSelect2(Element,Label,Data)
{
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
	if (document.getElementById(Element) != null) 
	{
		document.getElementById(Element).value=Data;
	}
	return true ;
}

function MySetElementIndex(Element,Data)
{
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
