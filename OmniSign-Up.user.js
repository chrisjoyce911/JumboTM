// ==UserScript==
// @name		OmniSign-Up
// @namespace	http://www.us.chrisj.dev.utah.lan
// @version		26
// @description	Register customers on all sites
// @include		http://*/create-account/*
// @include		https://*/create-account/*
// @include		http://*registrieren*
// @include		https://*registrieren*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.js
// @updateURL	https://raw.githubusercontent.com/chrisjoyce911/JumboTM/master/OmniSign-Up.user.js
// @downloadUR	https://raw.githubusercontent.com/chrisjoyce911/JumboTM/master/OmniSign-Up.user.js
// @author		Chris Joyce
// @grant       GM_getValue
// @grant       GM_setValue
// @grant		GM_registerMenuCommand
// @copyright	2014+, Chris Joyce
// ==/UserScript==

var TestName = GM_getValue('UserName', "");
	
if (! TestName) {
    var UserName = prompt("Please enter your username (USERNAME@benon.com)", "");
	GM_setValue('UserName', UserName);
	console.log('UserName has been set to : ' + UserName );
	TestName = GM_getValue('UserName', "");
}

const DEFAULT_EMAIL = TestName + '_';
const DEFAULT_DOMAIN = 'benon.com' ;

function main(variant)
{	
	var currentPageUrlIs = "";
	if (typeof this.href != "undefined") {
       currentPageUrlIs = this.href.toString().toLowerCase(); 
	}else{ 
		currentPageUrlIs = document.location.toString().toLowerCase();
	}
	// console.log(currentPageUrlIs);
	
	//var variant ; 
	if( currentPageUrlIs.indexOf('kr') >= 0 || currentPageUrlIs.indexOf('ozdreamlotto') >= 0 ){
	//	variant = "KR";
	} else 	if( currentPageUrlIs.indexOf('au') >= 0){
	//	variant = "AU";
	} else 	if( currentPageUrlIs.indexOf('us') >= 0){
	//	variant = "US";
	} else 	if( currentPageUrlIs.indexOf('de') >= 0){
	//	variant = "DE";
	} 
	
	var theCustomer = loadCustomer(variant) ;
	console.log(theCustomer);
    
	 if (Math.random() < 0.5)
	 {
		 MySetElementIndex("signup_receive_emails",0);
		 MySetElementIndex("receive_emails",0);
	 }
	else
	{
		MySetElementIndex("signup_receive_emails",1);
		MySetElementIndex("receive_emails",1);
	}

	MySetElementValue('password','4Me2Test')
	MySetElementValue('signup_password','4Me2Test');
	
	console.log("Signup agree");
	document.getElementById('signup_agree').checked=true; 

	// DE
	MySetElementValue('signup_first_name',theCustomer.firstname);
	MySetElementValue('signup_last_name',theCustomer.lastname);
	//KR, AU, US
	MySetElementValue('first_name',theCustomer.firstname);
	MySetElementValue('last_name',theCustomer.lastname);
	
	// DE
	MySetElementValue('signup_email',theCustomer.email);
	MySetElementValue('signup_confirm_email',theCustomer.email);
	// KR
	MySetElementValue('email',theCustomer.email);
	MySetElementValue('confirm_email',theCustomer.email);
	
	// DE
	MySetElementValue('signup_mobile',theCustomer.phone);
	// KR
	MySetElementValue('phone',theCustomer.phone);
	
	//DE Gender
	MySetElementValue('signup_gender',theCustomer.gender);
	MySetSelect2('signup_gender',"select2-chosen-2",theCustomer.gender);
	
	console.log("DOB");
	// DE
	MySetSelect2('signup_dob_day',"select2-chosen-3",theCustomer.dob_dd);
	MySetSelect2('signup_dob_month',"select2-chosen-4",theCustomer.dob_mm);
	MySetSelect2('signup_dob_year',"select2-chosen-5",theCustomer.dob_yyyy);
	// KR
	MySetSelect2('dob_day',"select2-chosen-1",theCustomer.dob_dd);
	MySetSelect2('dob_month',"select2-chosen-2",theCustomer.dob_mm);
	MySetSelect2('dob_year',"select2-chosen-3",theCustomer.dob_yyyy);
	
	// DE
	MySetElementValue('signup_address_number',theCustomer.street_number);
	MySetElementValue('signup_address_street',theCustomer.street_name);

	if( currentPageUrlIs.indexOf('de') >= 0){
		// this is only needed till postcodes are worked out
		alert('Postcode : ' + theCustomer.postcode);
	} 
	
//	<span id="location-value" data-state="Hamburg">22001, Hamburg</span>
	
	MySpan("location-value","22001, Hamburg","data-state",theCustomer.city_province)
	
	// KR
	MySetElementValue('street_number',theCustomer.street_number);
	MySetElementValue('street_name',theCustomer.street_name);
	MySetElementValue('suburb',theCustomer.suburb);
	MySetSelect2('city_province',"select2-chosen-6",theCustomer.city_province);
	MySetElementValue('postcode',theCustomer.postcode);
    
}

function MySetSelect2(Element,Label,Data)
{
	//console.log("Element " + Element + " Label "+ Label + " Data" + Data);
	 if (document.getElementById(Element) != null) 
	{
		document.getElementById(Element).value=Data;
		var span = document.getElementById(Label);
		span.textContent = Data;
	}
	return true ;
}

function MySpan(Element,Data,Attribute,AttData)
{
	console.log("Element " + Element + " Data" + Data + " Attribute " + Attribute +  " AttData " +AttData  );
	if (document.getElementById(Element) != null) 
	{
		var span = document.getElementById(Element);
		span.textContent = Data;
		if (span.hasAttribute(Attribute) != null) 
		{
			console.log("hasAttribute");
			span.setAttribute(Attribute, AttData);
		}
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

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function objCustomer(lastname,firstname,email,phone,dob_dd,dob_mm,dob_yyyy,gender,street_number,street_name,suburb,city_province,postcode,country)
{
	this.firstname = firstname;
	this.lastname = lastname;
	this.email = email;
	this.phone = phone;
	this.dob_dd = dob_dd;
	this.dob_mm = dob_mm;
	this.dob_yyyy = dob_yyyy;
	this.gender = gender ;
	this.street_number = street_number;
	this.street_name = street_name;
	this.suburb = suburb;
	this.city_province = city_province;
	this.postcode = postcode;
	this.country = country ;

	var newCustomerThoughts = [
		{	"firstname":"Chris",
			"lastname":"Joyce",
			"email":"chrisj@enon.com",
			"phone":"12345",
			"mobile":"1234",
			"dob_day":1,
			"dob_month":12,
			"dob_year":2017,
			"gender":"m",
			"street_number":"1",
			"street_name":"Some Street",
			"cvv":99
		} 
		]

}

function loadCustomer(variant)
{
	
  if (variant === 'KR')
    {
		var firstnames = ["성민","지은","세연","민경","윤서","진희","지후","창민","동현","상준","세연","남일","은영","태영","남순","은희","선화","수미","지민","민혁","서준","광현","영남","호성","승희","민경","광민","성남","예준","민서","하은","도현","민서","선영","기남","준서","서연","지원","재욱","지연","연우","보영","정은","수현","치원","광혁","광석","광석","동욱","승원","혜진","진호","남선","지원","진호","선영","지은","지혜","태연","정우","영남","승은","연우","광훈","수미","진영","영애","광민","남순","승훈","세연","하선","진희","도연","광혁","유리","해성","건우","은서","자경","동준","대원","경민","혜진","수진","서준","은숙","선화","해일","지훈","정훈","춘화","윤숙","서연","승희","태웅","도연","경민"] ;    
		var lastnames = ["지","하","오","담","임","천","후","반","문","오","맹","홍","궉","류(유)","송","평","마","상","오","포","주","신","전","빈","옹","서","해","가","안","공","화","상","서문","석","서문","내","현","묘","돈","문","심","제갈","조","곽","추","박","순","화","방","필","강","인","변","공","국","황보","옥","변","송","범","돈","후","남궁","탁","피","강","서","오","도","흥","소","조","송","맹","채","함","장","홍","봉","황보","요","표","궁","황","석","주","설","음","왕","가","천","문","남","권","박","신","왕","고","담","천"];
		var phones = ["+82-6-759-2047","+82-5-656-1955","+82-8-782-0201","+82-5-343-4439","+82-3-310-5661","+82-4-991-3008","+82-8-360-6099","+82-5-082-3106","+82-2-245-8521","+82-8-280-3891","+82-9-186-5774","+82-6-479-7774","+82-2-624-7310","+82-7-308-3062","+82-9-298-3808","+82-7-166-9240","+82-7-662-2115","+82-4-356-6752","+82-7-676-8039","+82-9-395-2016","+82-8-749-7911","+82-4-952-9817","+82-4-720-7579","+82-2-341-6549","+82-5-320-6174","+82-2-473-8115","+82-8-150-8079","+82-1-813-8566","+82-1-611-3336","+82-7-734-1958","+82-6-827-3717","+82-7-082-2722","+82-1-375-8350","+82-6-387-3293","+82-8-720-6712","+82-6-720-9469","+82-2-931-3285","+82-1-898-5034","+82-5-421-6397","+82-5-073-7734","+82-4-476-4028","+82-8-701-3333","+82-3-734-9641","+82-9-708-1991","+82-5-686-1529","+82-1-602-0536","+82-4-684-6785","+82-1-533-7142","+82-5-340-6288","+82-5-176-2299","+82-7-508-3976","+82-4-727-8575","+82-2-511-6793","+82-3-311-1018","+82-1-632-5100","+82-1-855-0103","+82-3-373-3747","+82-8-144-4641","+82-6-207-3214","+82-7-366-6405","+82-1-684-6295","+82-1-569-2798","+82-6-294-6459","+82-8-490-0139","+82-7-127-7018","+82-2-633-3843","+82-4-730-4570","+82-2-981-8213","+82-9-600-9899","+82-1-068-1305","+82-3-627-0767","+82-6-112-6511","+82-2-968-7553","+82-2-165-8504","+82-5-790-9095","+82-3-406-2250","+82-2-490-8709","+82-5-915-8572","+82-7-486-2352","+82-6-989-6630","+82-9-755-3313","+82-8-428-1008","+82-2-377-9747","+82-2-977-3415","+82-3-346-3657","+82-1-998-0384","+82-5-395-0331","+82-5-766-9309","+82-7-619-7446","+82-1-431-9140","+82-1-944-9161","+82-5-240-3213","+82-8-922-8652","+82-9-160-5355","+82-4-640-7459","+82-2-895-1649","+82-3-860-3501","+82-5-788-7230","+82-5-158-1719","+82-9-921-3658"];
		var locations_array = ["1091, Hakcheon-ri Heunghae-eup, Pohang-si, gyeongbuk, 791-944", "1242, Oncheon-ri Suanbo-myeon, Chungju-si, chungbuk, 380-943", "1293, Daeyeon 3(sam)-dong, Nam-gu, busan, 608-806", "1017, Worak-ri Worya-myeon, Hampyeong-gun, jeonbuk, 525-881", "1285, Manchon 1(il)-dong, Suseong-gu, daegu, 706-803", "1248, Nogok-ri Yangseong-myeon, Anseong-si, gyeonggi, 456-932", "1116, Oji-riDaesan-eup, Seosan-si, chungbuk, 356-871", "1186, Jangjuk-ri Sinan-myeon, Sancheong-gun, gyeongnam, 666-962", "1182, Dongsak-dong, Pyeongtaek-si, gyeonggi, 450-802", "1133, Hamyeol-eup, Iksan-si, jeonbuk, 570-800", "1062, Ujin Artville Apt. Seokhyeon-dong, Mokpo-si, jeonbuk, 530-777", "1114, Changindong 1-ga, Iksan-si, jeonbuk, 570-991", "1258, Jeonhwa-ri Nakseo-myeon, Uiryeong-gun, gyeongnam, 636-971", "1190, Japo-ri Sillim-myeon, Gochang-gun, jeonbuk, 585-833", "1106, Hyanggyo-dong, Namwon-si, jeonbuk, 590-020", "1038, Nowon-dong 1(il)-ga, Buk-gu, daegu, 702-810", "1070, Hwabong-ri Jeongan-myeon, Gongju-si, chungbuk, 314-825", "1144, Beombu-ri Seo-myeon, Yangyang-gun, Gangwon-do, 215-813", "1104, Gyeongbuk Regional Communications Office Ipseok-dong, Dong-gu, daegu, 701-700", "1068, Wang-dong, Gwangsan-gu, Gwangju, 506-406", "1278, Songchi-ri Jucheon-myeon, Namwon-si, jeonbuk, 590-811", "1042, Seongnae-ri Geumseong-myeon, Jecheon-si, chungbuk, 390-821", "1118, Hyundai Apt. Majang-dong, Seongdong-gu, seoul, 133-753", "1132, Imun 2(i)-dong, Dongdaemun-gu, seoul, 130-827", "1105, Areummaeul Sunkyoung Apt. Imae-dong, Bundang-gu, Seongnam-si, gyeonggi, 463-734", "1195, Hwangdeung-myeon, Iksan-si, jeonbuk, 570-810", "1114, Paldeok-myeon, Sunchang-gun, jeonbuk, 595-860", "1287, Gaheung 2(i)-dong, Yeongju-si, gyeongbuk, 750-902", "1263, Yeoksam 2(i)-dong, Gangnam-gu, seoul, 135-926", "1252, Gimhae College University Sambang-dong, Gimhae-si, gyeongnam, 621-706", "1062, Yunam 1-ri Jeomgok-myeon, Uiseong-gun, gyeongbuk, 769-831", "1209, Pyeongjang-ri Jangheung-eup, Jangheung-gun, jeonbuk, 529-806", "1223, Buyeong Saranguero Apt., Sindae-ri Amnyang-myeon, Gyeongsan-si, gyeongbuk, 712-746", "1117, Hyundai Apt. Apgujeong-dong, Gangnam-gu, seoul, 135-789", "1228, Eomo-myeon, Gimcheon-si, gyeongbuk, 740-830", "1258, Olympic Center Oryun-dong, Songpa-gu, seoul, 138-749", "1294, Eumnae-dong, Buk-gu, daegu, 702-849", "1015, Gojan 1(il)-dong, Danwon-gu, Ansan-si, gyeonggi, 425-021", "1128, Sujeong Hanyang Apt. Seonbu 3(sam)-dong, Danwon-gu, Ansan-si, gyeonggi, 425-765", "1146, Jindalraemaeul Sang 3(sam)-dong, Wonmi-gu, Bucheon-si, gyeonggi, 420-755", "1103, Bugye-myeon, Gunwi-gun, gyeongbuk, 716-830", "1172, Bugok 4(sa)-dong, Geumjeong-gu, busan, 609-818", "1149, Dangdong-ri Daegang-myeon, Danyang-gun, chungbuk, 395-811", "1099, Osan-myeon, Iksan-si, jeonbuk, 570-920", "1230, Omok-ri Yugok-myeon, Uiryeong-gun, gyeongnam, 636-932", "1175, Ministry of Culture, Sports and Tourism Waryong-dong, Jongno-gu, seoul, 110-703", "1195, Eoso-ri Cheongbuk-myeon, Pyeongtaek-si, gyeonggi, 451-833", "1156, Bugok-ri Songak-eup, Dangjin-si, chungbuk, 343-827", "1109, Ilyang Pharm. Co. Hagal-dong, Giheung-gu, Yongin-si, gyeonggi, 446-726", "1083, (A~B) Guui Daerim AcroRiver Guui 3(sam)-dong, Gwangjin-gu, seoul, 143-724", "1122, Danggam 1(il)-dong, busanjin-gu, busan, 614-817", "1294, Hyeonae-ri Pungsan-eup, Andong-si, gyeongbuk, 760-805", "1268, Yeongheung-ri Chuja-myeon, Jeju-si, Jeju-do, 695-951", "1186, Hagik 1(il)-dong, Nam-gu, Incheon, 402-865", "1160, Geumchon 2(i)-dong, Paju-si, gyeonggi, 413-809", "1031, Sujeong 4(sa)-dong, Dong-gu, busan, 601-820", "1080, Ilpae-dong, Namyangju-si, gyeonggi, 472-030", "1233, Kyemongsa Yeoksam 2(i)-dong, Gangnam-gu, seoul, 135-756", "1212, P.O.Box, Baegui-ri Cheongsan-myeon, Yeoncheon-gun, gyeonggi, 486-859", "1160, Rise-ri Okpo-myeon, Dalseong-gun, daegu, 711-843", "1011, Moro-ri Gunbuk-myeon, Haman-gun, gyeongnam, 637-823", "1184, Sanggye 1(il)-dong, Nowon-gu, seoul, 139-838", "1192, Myeongnyun 4(sa)-ga, Jongno-gu, seoul, 110-524", "1181, Tanbeol Kyoungnam Honors Ville 1-danji Apt. Tanbeol-dong, Gwangju-si, gyeonggi, 464-795", "1007, Pungnap 1(il)-dong, Songpa-gu, seoul, 138-873", "1300, Anyang 8(pal)-dong, Manan-gu, Anyang-si, gyeonggi, 430-818", "1152, Jongam-dong, Seongbuk-gu, seoul, 136-863", "1110, Junghwa 2(i)-dong, Jungnang-gu, seoul, 131-881", "1123, Gayang 1(il)-dong, Gangseo-gu, seoul, 157-806", "1191, Jeungpo-dong, Icheon-si, gyeonggi, 467-803", "1074, Gangsan Town Apt. Dowon-dong, Dalseo-gu, daegu, 704-792", "1181, Goejeong 3(sam)-dong, Saha-gu, busan, 604-857", "1216, Daeyeon Techno World Ojeon-dong, Uiwang-si, gyeonggi, 437-753", "1219, Dapsimni 1(il)-dong, Dongdaemun-gu, seoul, 130-802", "1050, Gwanyang 1(il)-dong, Dongan-gu, Anyang-si, gyeonggi, 431-805", "1180, Sinwol-ri Joseong-myeon, Boseong-gun, jeonbuk, 546-911", "1268, Hanil Apt. Taejeon 1(il)-dong, Buk-gu, daegu, 702-791", "1258, Hadang-ri Buk-myeon, Uljin-gun, gyeongbuk, 767-893", "1141, Hwangjuk-ri Jinsang-myeon, Gwangyang-si, jeonbuk, 545-843", "1138, Nonsil-ri Gogyeong-myeon, Yeongcheon-si, gyeongbuk, 770-844", "1290, Sinchon-ri Annae-myeon, Okcheon-gun, chungbuk, 373-811", "1073, Jugong Apt. Hyeonggok 1(il)-dong, Gumi-si, gyeongbuk, 730-778", "1083, Geoseok-ri Bugwi-myeon, Jinan-gun, jeonbuk, 567-911", "1171, Hangnyong-dong, Yeosu-si, jeonbuk, 555-100", "1083, Sajik 2(i)-dong, Dongnae-gu, busan, 607-819", "1174, Hyangnamsibeomneolbeundeulmaeul Umirin Apt., Haengjeong-ri Hyangnam-eup, Hwaseong-si, gyeonggi, 445-803", "1017, Jeonpo 3(sam)-dong, busanjin-gu, busan, 614-043", "1183, Byeollae Umirin Apt. Byeollae-dong, Namyangju-si, gyeonggi, 472-956", "1127, Deokpung 1(il)-dong, Hanam-si, gyeonggi, 465-806", "1198, Jukjeon-ri Boeun-eup, Boeun-gun, chungbuk, 376-804", "1244, Osan-ri Hyeonpung-myeon, Dalseong-gun, daegu, 711-871", "1295, HiParkcityilsan Pamillie 4-danji Apt. Deogi-dong, IlsanSeo-gu, Goyang-si, gyeonggi, 411-794", "1208, Sinsohyeon-dong, Anseong-si, gyeonggi, 456-380", "1188, Sang-dong, Suseong-gu, daegu, 706-830", "1100, Shindong-a Apt. Dangni-dong, Saha-gu, busan, 604-728", "1229, Firenze Apt. Gorim-dong, Cheoin-gu, Yongin-si, gyeonggi, 449-708", "1240, Electron Zone Sangyeok 2(i)-dong, Buk-gu, daegu, 702-711", "1208, Samik 1(il)-cha Apt. Geumgok-dong, Gwonseon-gu, Suwon-si, gyeonggi, 441-747", "1214, Hwachi-dong, Yeosu-si, jeonbuk, 555-280", "1224, Jugong Apt. 6 Danji Jeongwang 1(il)-dong, Siheung-si, gyeonggi, 429-753"];
		var country = "USA";
	}

  if (variant === 'US')
    {
		var firstnames = ["Dirk", "Brian", "David B", "Leigh Ann", "Henry Lincoln", "Chesty", "Alvin", "Seth E.", "Bruce", "Marcus", "Mitchell", "Lewis", "John", "Matt", "Michael", "David" ] ;    
		var lastnames = ["Vlug", "Chontosh", "Bleak", "Hester", "Johnson", "Puller", "York", "Howard", "Crandall", "Luttrell", "Paige", "Millett", "Basilone", "Urban", "Monsoor", "Shughar"];
		var phones = ["+82-6-759-2047","+82-5-656-1955","+82-8-782-0201","+82-5-343-4439","+82-3-310-5661","+82-4-991-3008","+82-8-360-6099","+82-5-082-3106","+82-2-245-8521","+82-8-280-3891","+82-9-186-5774","+82-6-479-7774","+82-2-624-7310","+82-7-308-3062","+82-9-298-3808","+82-7-166-9240","+82-7-662-2115","+82-4-356-6752","+82-7-676-8039","+82-9-395-2016","+82-8-749-7911","+82-4-952-9817","+82-4-720-7579","+82-2-341-6549","+82-5-320-6174","+82-2-473-8115","+82-8-150-8079","+82-1-813-8566","+82-1-611-3336","+82-7-734-1958","+82-6-827-3717","+82-7-082-2722","+82-1-375-8350","+82-6-387-3293","+82-8-720-6712","+82-6-720-9469","+82-2-931-3285","+82-1-898-5034","+82-5-421-6397","+82-5-073-7734","+82-4-476-4028","+82-8-701-3333","+82-3-734-9641","+82-9-708-1991","+82-5-686-1529","+82-1-602-0536","+82-4-684-6785","+82-1-533-7142","+82-5-340-6288","+82-5-176-2299","+82-7-508-3976","+82-4-727-8575","+82-2-511-6793","+82-3-311-1018","+82-1-632-5100","+82-1-855-0103","+82-3-373-3747","+82-8-144-4641","+82-6-207-3214","+82-7-366-6405","+82-1-684-6295","+82-1-569-2798","+82-6-294-6459","+82-8-490-0139","+82-7-127-7018","+82-2-633-3843","+82-4-730-4570","+82-2-981-8213","+82-9-600-9899","+82-1-068-1305","+82-3-627-0767","+82-6-112-6511","+82-2-968-7553","+82-2-165-8504","+82-5-790-9095","+82-3-406-2250","+82-2-490-8709","+82-5-915-8572","+82-7-486-2352","+82-6-989-6630","+82-9-755-3313","+82-8-428-1008","+82-2-377-9747","+82-2-977-3415","+82-3-346-3657","+82-1-998-0384","+82-5-395-0331","+82-5-766-9309","+82-7-619-7446","+82-1-431-9140","+82-1-944-9161","+82-5-240-3213","+82-8-922-8652","+82-9-160-5355","+82-4-640-7459","+82-2-895-1649","+82-3-860-3501","+82-5-788-7230","+82-5-158-1719","+82-9-921-3658"];
		var locations_array = ["1091, Hakcheon-ri Heunghae-eup, Pohang-si, gyeongbuk, 791-944", "1242, Oncheon-ri Suanbo-myeon, Chungju-si, chungbuk, 380-943", "1293, Daeyeon 3(sam)-dong, Nam-gu, busan, 608-806", "1017, Worak-ri Worya-myeon, Hampyeong-gun, jeonbuk, 525-881", "1285, Manchon 1(il)-dong, Suseong-gu, daegu, 706-803", "1248, Nogok-ri Yangseong-myeon, Anseong-si, gyeonggi, 456-932", "1116, Oji-riDaesan-eup, Seosan-si, chungbuk, 356-871", "1186, Jangjuk-ri Sinan-myeon, Sancheong-gun, gyeongnam, 666-962", "1182, Dongsak-dong, Pyeongtaek-si, gyeonggi, 450-802", "1133, Hamyeol-eup, Iksan-si, jeonbuk, 570-800", "1062, Ujin Artville Apt. Seokhyeon-dong, Mokpo-si, jeonbuk, 530-777", "1114, Changindong 1-ga, Iksan-si, jeonbuk, 570-991", "1258, Jeonhwa-ri Nakseo-myeon, Uiryeong-gun, gyeongnam, 636-971", "1190, Japo-ri Sillim-myeon, Gochang-gun, jeonbuk, 585-833", "1106, Hyanggyo-dong, Namwon-si, jeonbuk, 590-020", "1038, Nowon-dong 1(il)-ga, Buk-gu, daegu, 702-810", "1070, Hwabong-ri Jeongan-myeon, Gongju-si, chungbuk, 314-825", "1144, Beombu-ri Seo-myeon, Yangyang-gun, Gangwon-do, 215-813", "1104, Gyeongbuk Regional Communications Office Ipseok-dong, Dong-gu, daegu, 701-700", "1068, Wang-dong, Gwangsan-gu, Gwangju, 506-406", "1278, Songchi-ri Jucheon-myeon, Namwon-si, jeonbuk, 590-811", "1042, Seongnae-ri Geumseong-myeon, Jecheon-si, chungbuk, 390-821", "1118, Hyundai Apt. Majang-dong, Seongdong-gu, seoul, 133-753", "1132, Imun 2(i)-dong, Dongdaemun-gu, seoul, 130-827", "1105, Areummaeul Sunkyoung Apt. Imae-dong, Bundang-gu, Seongnam-si, gyeonggi, 463-734", "1195, Hwangdeung-myeon, Iksan-si, jeonbuk, 570-810", "1114, Paldeok-myeon, Sunchang-gun, jeonbuk, 595-860", "1287, Gaheung 2(i)-dong, Yeongju-si, gyeongbuk, 750-902", "1263, Yeoksam 2(i)-dong, Gangnam-gu, seoul, 135-926", "1252, Gimhae College University Sambang-dong, Gimhae-si, gyeongnam, 621-706", "1062, Yunam 1-ri Jeomgok-myeon, Uiseong-gun, gyeongbuk, 769-831", "1209, Pyeongjang-ri Jangheung-eup, Jangheung-gun, jeonbuk, 529-806", "1223, Buyeong Saranguero Apt., Sindae-ri Amnyang-myeon, Gyeongsan-si, gyeongbuk, 712-746", "1117, Hyundai Apt. Apgujeong-dong, Gangnam-gu, seoul, 135-789", "1228, Eomo-myeon, Gimcheon-si, gyeongbuk, 740-830", "1258, Olympic Center Oryun-dong, Songpa-gu, seoul, 138-749", "1294, Eumnae-dong, Buk-gu, daegu, 702-849", "1015, Gojan 1(il)-dong, Danwon-gu, Ansan-si, gyeonggi, 425-021", "1128, Sujeong Hanyang Apt. Seonbu 3(sam)-dong, Danwon-gu, Ansan-si, gyeonggi, 425-765", "1146, Jindalraemaeul Sang 3(sam)-dong, Wonmi-gu, Bucheon-si, gyeonggi, 420-755", "1103, Bugye-myeon, Gunwi-gun, gyeongbuk, 716-830", "1172, Bugok 4(sa)-dong, Geumjeong-gu, busan, 609-818", "1149, Dangdong-ri Daegang-myeon, Danyang-gun, chungbuk, 395-811", "1099, Osan-myeon, Iksan-si, jeonbuk, 570-920", "1230, Omok-ri Yugok-myeon, Uiryeong-gun, gyeongnam, 636-932", "1175, Ministry of Culture, Sports and Tourism Waryong-dong, Jongno-gu, seoul, 110-703", "1195, Eoso-ri Cheongbuk-myeon, Pyeongtaek-si, gyeonggi, 451-833", "1156, Bugok-ri Songak-eup, Dangjin-si, chungbuk, 343-827", "1109, Ilyang Pharm. Co. Hagal-dong, Giheung-gu, Yongin-si, gyeonggi, 446-726", "1083, (A~B) Guui Daerim AcroRiver Guui 3(sam)-dong, Gwangjin-gu, seoul, 143-724", "1122, Danggam 1(il)-dong, busanjin-gu, busan, 614-817", "1294, Hyeonae-ri Pungsan-eup, Andong-si, gyeongbuk, 760-805", "1268, Yeongheung-ri Chuja-myeon, Jeju-si, Jeju-do, 695-951", "1186, Hagik 1(il)-dong, Nam-gu, Incheon, 402-865", "1160, Geumchon 2(i)-dong, Paju-si, gyeonggi, 413-809", "1031, Sujeong 4(sa)-dong, Dong-gu, busan, 601-820", "1080, Ilpae-dong, Namyangju-si, gyeonggi, 472-030", "1233, Kyemongsa Yeoksam 2(i)-dong, Gangnam-gu, seoul, 135-756", "1212, P.O.Box, Baegui-ri Cheongsan-myeon, Yeoncheon-gun, gyeonggi, 486-859", "1160, Rise-ri Okpo-myeon, Dalseong-gun, daegu, 711-843", "1011, Moro-ri Gunbuk-myeon, Haman-gun, gyeongnam, 637-823", "1184, Sanggye 1(il)-dong, Nowon-gu, seoul, 139-838", "1192, Myeongnyun 4(sa)-ga, Jongno-gu, seoul, 110-524", "1181, Tanbeol Kyoungnam Honors Ville 1-danji Apt. Tanbeol-dong, Gwangju-si, gyeonggi, 464-795", "1007, Pungnap 1(il)-dong, Songpa-gu, seoul, 138-873", "1300, Anyang 8(pal)-dong, Manan-gu, Anyang-si, gyeonggi, 430-818", "1152, Jongam-dong, Seongbuk-gu, seoul, 136-863", "1110, Junghwa 2(i)-dong, Jungnang-gu, seoul, 131-881", "1123, Gayang 1(il)-dong, Gangseo-gu, seoul, 157-806", "1191, Jeungpo-dong, Icheon-si, gyeonggi, 467-803", "1074, Gangsan Town Apt. Dowon-dong, Dalseo-gu, daegu, 704-792", "1181, Goejeong 3(sam)-dong, Saha-gu, busan, 604-857", "1216, Daeyeon Techno World Ojeon-dong, Uiwang-si, gyeonggi, 437-753", "1219, Dapsimni 1(il)-dong, Dongdaemun-gu, seoul, 130-802", "1050, Gwanyang 1(il)-dong, Dongan-gu, Anyang-si, gyeonggi, 431-805", "1180, Sinwol-ri Joseong-myeon, Boseong-gun, jeonbuk, 546-911", "1268, Hanil Apt. Taejeon 1(il)-dong, Buk-gu, daegu, 702-791", "1258, Hadang-ri Buk-myeon, Uljin-gun, gyeongbuk, 767-893", "1141, Hwangjuk-ri Jinsang-myeon, Gwangyang-si, jeonbuk, 545-843", "1138, Nonsil-ri Gogyeong-myeon, Yeongcheon-si, gyeongbuk, 770-844", "1290, Sinchon-ri Annae-myeon, Okcheon-gun, chungbuk, 373-811", "1073, Jugong Apt. Hyeonggok 1(il)-dong, Gumi-si, gyeongbuk, 730-778", "1083, Geoseok-ri Bugwi-myeon, Jinan-gun, jeonbuk, 567-911", "1171, Hangnyong-dong, Yeosu-si, jeonbuk, 555-100", "1083, Sajik 2(i)-dong, Dongnae-gu, busan, 607-819", "1174, Hyangnamsibeomneolbeundeulmaeul Umirin Apt., Haengjeong-ri Hyangnam-eup, Hwaseong-si, gyeonggi, 445-803", "1017, Jeonpo 3(sam)-dong, busanjin-gu, busan, 614-043", "1183, Byeollae Umirin Apt. Byeollae-dong, Namyangju-si, gyeonggi, 472-956", "1127, Deokpung 1(il)-dong, Hanam-si, gyeonggi, 465-806", "1198, Jukjeon-ri Boeun-eup, Boeun-gun, chungbuk, 376-804", "1244, Osan-ri Hyeonpung-myeon, Dalseong-gun, daegu, 711-871", "1295, HiParkcityilsan Pamillie 4-danji Apt. Deogi-dong, IlsanSeo-gu, Goyang-si, gyeonggi, 411-794", "1208, Sinsohyeon-dong, Anseong-si, gyeonggi, 456-380", "1188, Sang-dong, Suseong-gu, daegu, 706-830", "1100, Shindong-a Apt. Dangni-dong, Saha-gu, busan, 604-728", "1229, Firenze Apt. Gorim-dong, Cheoin-gu, Yongin-si, gyeonggi, 449-708", "1240, Electron Zone Sangyeok 2(i)-dong, Buk-gu, daegu, 702-711", "1208, Samik 1(il)-cha Apt. Geumgok-dong, Gwonseon-gu, Suwon-si, gyeonggi, 441-747", "1214, Hwachi-dong, Yeosu-si, jeonbuk, 555-280", "1224, Jugong Apt. 6 Danji Jeongwang 1(il)-dong, Siheung-si, gyeonggi, 429-753"];
		var country = "USA";
	}

  if (variant === 'AU')
    {
      var firstnames = ["Jack", "William", "Noah ", "Ethan", "Oliver", "Thomas", "Cooper", "James", "Lucas", "Lachlan", "Liam", "Samuel", "Jacob", "Joshua", "Mason", "Riley", "Max", "Alexander", "Charlie", "Xavier", "Benjamin", "Harrison", "Tyler", "Hunter", "Ryan", "Levi", "Isaac", "Jackson", "Blake", "Harry", "Braxton", "Oscar", "Henry", "Eli", "Daniel", "Jayden", "Jaxon", "Logan", "Jake", "Sebastian", "Flynn", "Patrick", "Hudson", "Dylan", "Mitchell", "Archie", "Connor", "Luke", "Matthew", "Aiden", "Charlotte", "Ruby", "Olivia", "Chloe", "Sophie", "Emily", "Mia", "Amelia", "Ava", "Isabella", "Ella", "Grace", "Sienna", "Lily", "Zoe", "Sophia", "Emma", "Isla", "Hannah", "Lucy", "Matilda", "Ivy", "Evie", "Eva", "Scarlett", "Abigail", "Maddison", "Madison", "Summer", "Lilly", "Chelsea", "Zara", "Jessica", "Isabelle", "Savannah", "Jasmine", "Georgia", "Layla", "Harper", "Sarah", "Alexis", "Stella", "Alice", "Willow", "Imogen", "Mackenzie", "Elizabeth", "Holly", "Annabelle", "Audrey"] ;
      var lastnames = ["Adler", "Ban", "Bond", "Burke", "Cobb", "Connell", "Foster", "Hannes", "O'Connor", "Rivkin", "Skase", "Theophanous", "Thomson", "Wheatley", "Williams"] ;
      var phones = ["+82-6-759-2047","+82-5-656-1955","+82-8-782-0201","+82-5-343-4439","+82-3-310-5661","+82-4-991-3008","+82-8-360-6099","+82-5-082-3106","+82-2-245-8521","+82-8-280-3891","+82-9-186-5774","+82-6-479-7774","+82-2-624-7310","+82-7-308-3062","+82-9-298-3808","+82-7-166-9240","+82-7-662-2115","+82-4-356-6752","+82-7-676-8039","+82-9-395-2016","+82-8-749-7911","+82-4-952-9817","+82-4-720-7579","+82-2-341-6549","+82-5-320-6174","+82-2-473-8115","+82-8-150-8079","+82-1-813-8566","+82-1-611-3336","+82-7-734-1958","+82-6-827-3717","+82-7-082-2722","+82-1-375-8350","+82-6-387-3293","+82-8-720-6712","+82-6-720-9469","+82-2-931-3285","+82-1-898-5034","+82-5-421-6397","+82-5-073-7734","+82-4-476-4028","+82-8-701-3333","+82-3-734-9641","+82-9-708-1991","+82-5-686-1529","+82-1-602-0536","+82-4-684-6785","+82-1-533-7142","+82-5-340-6288","+82-5-176-2299","+82-7-508-3976","+82-4-727-8575","+82-2-511-6793","+82-3-311-1018","+82-1-632-5100","+82-1-855-0103","+82-3-373-3747","+82-8-144-4641","+82-6-207-3214","+82-7-366-6405","+82-1-684-6295","+82-1-569-2798","+82-6-294-6459","+82-8-490-0139","+82-7-127-7018","+82-2-633-3843","+82-4-730-4570","+82-2-981-8213","+82-9-600-9899","+82-1-068-1305","+82-3-627-0767","+82-6-112-6511","+82-2-968-7553","+82-2-165-8504","+82-5-790-9095","+82-3-406-2250","+82-2-490-8709","+82-5-915-8572","+82-7-486-2352","+82-6-989-6630","+82-9-755-3313","+82-8-428-1008","+82-2-377-9747","+82-2-977-3415","+82-3-346-3657","+82-1-998-0384","+82-5-395-0331","+82-5-766-9309","+82-7-619-7446","+82-1-431-9140","+82-1-944-9161","+82-5-240-3213","+82-8-922-8652","+82-9-160-5355","+82-4-640-7459","+82-2-895-1649","+82-3-860-3501","+82-5-788-7230","+82-5-158-1719","+82-9-921-3658"];
		var locations_array = ["1091, Hakcheon-ri Heunghae-eup, Pohang-si, gyeongbuk, 791-944", "1242, Oncheon-ri Suanbo-myeon, Chungju-si, chungbuk, 380-943", "1293, Daeyeon 3(sam)-dong, Nam-gu, busan, 608-806", "1017, Worak-ri Worya-myeon, Hampyeong-gun, jeonbuk, 525-881", "1285, Manchon 1(il)-dong, Suseong-gu, daegu, 706-803", "1248, Nogok-ri Yangseong-myeon, Anseong-si, gyeonggi, 456-932", "1116, Oji-riDaesan-eup, Seosan-si, chungbuk, 356-871", "1186, Jangjuk-ri Sinan-myeon, Sancheong-gun, gyeongnam, 666-962", "1182, Dongsak-dong, Pyeongtaek-si, gyeonggi, 450-802", "1133, Hamyeol-eup, Iksan-si, jeonbuk, 570-800", "1062, Ujin Artville Apt. Seokhyeon-dong, Mokpo-si, jeonbuk, 530-777", "1114, Changindong 1-ga, Iksan-si, jeonbuk, 570-991", "1258, Jeonhwa-ri Nakseo-myeon, Uiryeong-gun, gyeongnam, 636-971", "1190, Japo-ri Sillim-myeon, Gochang-gun, jeonbuk, 585-833", "1106, Hyanggyo-dong, Namwon-si, jeonbuk, 590-020", "1038, Nowon-dong 1(il)-ga, Buk-gu, daegu, 702-810", "1070, Hwabong-ri Jeongan-myeon, Gongju-si, chungbuk, 314-825", "1144, Beombu-ri Seo-myeon, Yangyang-gun, Gangwon-do, 215-813", "1104, Gyeongbuk Regional Communications Office Ipseok-dong, Dong-gu, daegu, 701-700", "1068, Wang-dong, Gwangsan-gu, Gwangju, 506-406", "1278, Songchi-ri Jucheon-myeon, Namwon-si, jeonbuk, 590-811", "1042, Seongnae-ri Geumseong-myeon, Jecheon-si, chungbuk, 390-821", "1118, Hyundai Apt. Majang-dong, Seongdong-gu, seoul, 133-753", "1132, Imun 2(i)-dong, Dongdaemun-gu, seoul, 130-827", "1105, Areummaeul Sunkyoung Apt. Imae-dong, Bundang-gu, Seongnam-si, gyeonggi, 463-734", "1195, Hwangdeung-myeon, Iksan-si, jeonbuk, 570-810", "1114, Paldeok-myeon, Sunchang-gun, jeonbuk, 595-860", "1287, Gaheung 2(i)-dong, Yeongju-si, gyeongbuk, 750-902", "1263, Yeoksam 2(i)-dong, Gangnam-gu, seoul, 135-926", "1252, Gimhae College University Sambang-dong, Gimhae-si, gyeongnam, 621-706", "1062, Yunam 1-ri Jeomgok-myeon, Uiseong-gun, gyeongbuk, 769-831", "1209, Pyeongjang-ri Jangheung-eup, Jangheung-gun, jeonbuk, 529-806", "1223, Buyeong Saranguero Apt., Sindae-ri Amnyang-myeon, Gyeongsan-si, gyeongbuk, 712-746", "1117, Hyundai Apt. Apgujeong-dong, Gangnam-gu, seoul, 135-789", "1228, Eomo-myeon, Gimcheon-si, gyeongbuk, 740-830", "1258, Olympic Center Oryun-dong, Songpa-gu, seoul, 138-749", "1294, Eumnae-dong, Buk-gu, daegu, 702-849", "1015, Gojan 1(il)-dong, Danwon-gu, Ansan-si, gyeonggi, 425-021", "1128, Sujeong Hanyang Apt. Seonbu 3(sam)-dong, Danwon-gu, Ansan-si, gyeonggi, 425-765", "1146, Jindalraemaeul Sang 3(sam)-dong, Wonmi-gu, Bucheon-si, gyeonggi, 420-755", "1103, Bugye-myeon, Gunwi-gun, gyeongbuk, 716-830", "1172, Bugok 4(sa)-dong, Geumjeong-gu, busan, 609-818", "1149, Dangdong-ri Daegang-myeon, Danyang-gun, chungbuk, 395-811", "1099, Osan-myeon, Iksan-si, jeonbuk, 570-920", "1230, Omok-ri Yugok-myeon, Uiryeong-gun, gyeongnam, 636-932", "1175, Ministry of Culture, Sports and Tourism Waryong-dong, Jongno-gu, seoul, 110-703", "1195, Eoso-ri Cheongbuk-myeon, Pyeongtaek-si, gyeonggi, 451-833", "1156, Bugok-ri Songak-eup, Dangjin-si, chungbuk, 343-827", "1109, Ilyang Pharm. Co. Hagal-dong, Giheung-gu, Yongin-si, gyeonggi, 446-726", "1083, (A~B) Guui Daerim AcroRiver Guui 3(sam)-dong, Gwangjin-gu, seoul, 143-724", "1122, Danggam 1(il)-dong, busanjin-gu, busan, 614-817", "1294, Hyeonae-ri Pungsan-eup, Andong-si, gyeongbuk, 760-805", "1268, Yeongheung-ri Chuja-myeon, Jeju-si, Jeju-do, 695-951", "1186, Hagik 1(il)-dong, Nam-gu, Incheon, 402-865", "1160, Geumchon 2(i)-dong, Paju-si, gyeonggi, 413-809", "1031, Sujeong 4(sa)-dong, Dong-gu, busan, 601-820", "1080, Ilpae-dong, Namyangju-si, gyeonggi, 472-030", "1233, Kyemongsa Yeoksam 2(i)-dong, Gangnam-gu, seoul, 135-756", "1212, P.O.Box, Baegui-ri Cheongsan-myeon, Yeoncheon-gun, gyeonggi, 486-859", "1160, Rise-ri Okpo-myeon, Dalseong-gun, daegu, 711-843", "1011, Moro-ri Gunbuk-myeon, Haman-gun, gyeongnam, 637-823", "1184, Sanggye 1(il)-dong, Nowon-gu, seoul, 139-838", "1192, Myeongnyun 4(sa)-ga, Jongno-gu, seoul, 110-524", "1181, Tanbeol Kyoungnam Honors Ville 1-danji Apt. Tanbeol-dong, Gwangju-si, gyeonggi, 464-795", "1007, Pungnap 1(il)-dong, Songpa-gu, seoul, 138-873", "1300, Anyang 8(pal)-dong, Manan-gu, Anyang-si, gyeonggi, 430-818", "1152, Jongam-dong, Seongbuk-gu, seoul, 136-863", "1110, Junghwa 2(i)-dong, Jungnang-gu, seoul, 131-881", "1123, Gayang 1(il)-dong, Gangseo-gu, seoul, 157-806", "1191, Jeungpo-dong, Icheon-si, gyeonggi, 467-803", "1074, Gangsan Town Apt. Dowon-dong, Dalseo-gu, daegu, 704-792", "1181, Goejeong 3(sam)-dong, Saha-gu, busan, 604-857", "1216, Daeyeon Techno World Ojeon-dong, Uiwang-si, gyeonggi, 437-753", "1219, Dapsimni 1(il)-dong, Dongdaemun-gu, seoul, 130-802", "1050, Gwanyang 1(il)-dong, Dongan-gu, Anyang-si, gyeonggi, 431-805", "1180, Sinwol-ri Joseong-myeon, Boseong-gun, jeonbuk, 546-911", "1268, Hanil Apt. Taejeon 1(il)-dong, Buk-gu, daegu, 702-791", "1258, Hadang-ri Buk-myeon, Uljin-gun, gyeongbuk, 767-893", "1141, Hwangjuk-ri Jinsang-myeon, Gwangyang-si, jeonbuk, 545-843", "1138, Nonsil-ri Gogyeong-myeon, Yeongcheon-si, gyeongbuk, 770-844", "1290, Sinchon-ri Annae-myeon, Okcheon-gun, chungbuk, 373-811", "1073, Jugong Apt. Hyeonggok 1(il)-dong, Gumi-si, gyeongbuk, 730-778", "1083, Geoseok-ri Bugwi-myeon, Jinan-gun, jeonbuk, 567-911", "1171, Hangnyong-dong, Yeosu-si, jeonbuk, 555-100", "1083, Sajik 2(i)-dong, Dongnae-gu, busan, 607-819", "1174, Hyangnamsibeomneolbeundeulmaeul Umirin Apt., Haengjeong-ri Hyangnam-eup, Hwaseong-si, gyeonggi, 445-803", "1017, Jeonpo 3(sam)-dong, busanjin-gu, busan, 614-043", "1183, Byeollae Umirin Apt. Byeollae-dong, Namyangju-si, gyeonggi, 472-956", "1127, Deokpung 1(il)-dong, Hanam-si, gyeonggi, 465-806", "1198, Jukjeon-ri Boeun-eup, Boeun-gun, chungbuk, 376-804", "1244, Osan-ri Hyeonpung-myeon, Dalseong-gun, daegu, 711-871", "1295, HiParkcityilsan Pamillie 4-danji Apt. Deogi-dong, IlsanSeo-gu, Goyang-si, gyeonggi, 411-794", "1208, Sinsohyeon-dong, Anseong-si, gyeonggi, 456-380", "1188, Sang-dong, Suseong-gu, daegu, 706-830", "1100, Shindong-a Apt. Dangni-dong, Saha-gu, busan, 604-728", "1229, Firenze Apt. Gorim-dong, Cheoin-gu, Yongin-si, gyeonggi, 449-708", "1240, Electron Zone Sangyeok 2(i)-dong, Buk-gu, daegu, 702-711", "1208, Samik 1(il)-cha Apt. Geumgok-dong, Gwonseon-gu, Suwon-si, gyeonggi, 441-747", "1214, Hwachi-dong, Yeosu-si, jeonbuk, 555-280", "1224, Jugong Apt. 6 Danji Jeongwang 1(il)-dong, Siheung-si, gyeonggi, 429-753"];
		var country = "USA";
	}

  if (variant == 'DE')
    {
		var firstnames = ["Juliu", "Josep", "Erhar", "Heinric", "Kar", "Kur", "Sep", "Pau", "Fran", "Friedric", "Ma", "Eric", "Herber", "Gottlo", "Werne", "Wilhel", "Erns", "Marti", "Philip", "Fran", "Walte", "Richar", "Kar", "Ott", "Kar", "Joachi", "Theodo", "Kar", "Alber", "Kar", "Augus", "Herber", "Cur", "Erns", "Ulric", "Arthu", "Kar", "Augus", "Wol", "Rudol", "Konra", "Maximilia", "Reinhar", "Richar", "Kar", "Herman", "Friedric", "Han", "Erns", "Han", "Jürge", "Geor", "Wilhel", "Matthia", "Kur", "Eric", "Wilhel", "Friedric", "Walte", "Han", "Werne", "Hartman", "Benn", "Emi", "Konstanti","Car", "Günthe", "Kar", "Artu", "Oswal","Rudol","Hann", "Wilhel"] ;    
		var lastnames = ["Schreck", "Berchtold", "Heiden", "Himmler", "Hanke", "Daluege", "Dietrich", "Hausser", "Xaver Schwarz", "Alpers", "Amann", "von dem Bach-Zelewski", "Backe", "Berger", "Best", "Bittrich", "Wilhelm Bohle", "Bormann", "Bouhler", "Breithaupt", "Buch", "Walther Darré", "Maria Demelhuber", "Dietrich", "von Eberstein", "Albrecht Eggeling", "Eicke", "Fiehler", "Forster", "Hermann Frank", "Greifelt", "Greiser", "Gutenberger", "Heissmeyer", "Heinrich Graf von Helldorf", "Hess", "Henlein", "von Herff", "Heydrich", "Hildebrandt", "Höfer", "Höfle", "Jeckeln", "Jüttner", "Kaltenbrunner", "Kammler", "von Kamptz", "Keppler", "Karl Keppler", "Kleinheisterkamp", "Knoblauch", "Koch", "Koppe", "Wilhelm Krüger", "Krüger", "Lammers", "Lorenz", "Lauterbacher", "Martin", "Mazuw", "von Neurath", "Oberg", "Pancke", "Pfeffer-Wildenbruch", "Phleps", "Pohl", "Querner", "Albin Rauter", "Rediess"];
		var phones = ["+82-6-759-2047","+82-5-656-1955","+82-8-782-0201","+82-5-343-4439","+82-3-310-5661","+82-4-991-3008","+82-8-360-6099","+82-5-082-3106","+82-2-245-8521","+82-8-280-3891","+82-9-186-5774","+82-6-479-7774","+82-2-624-7310","+82-7-308-3062","+82-9-298-3808","+82-7-166-9240","+82-7-662-2115","+82-4-356-6752","+82-7-676-8039","+82-9-395-2016","+82-8-749-7911","+82-4-952-9817","+82-4-720-7579","+82-2-341-6549","+82-5-320-6174","+82-2-473-8115","+82-8-150-8079","+82-1-813-8566","+82-1-611-3336","+82-7-734-1958","+82-6-827-3717","+82-7-082-2722","+82-1-375-8350","+82-6-387-3293","+82-8-720-6712","+82-6-720-9469","+82-2-931-3285","+82-1-898-5034","+82-5-421-6397","+82-5-073-7734","+82-4-476-4028","+82-8-701-3333","+82-3-734-9641","+82-9-708-1991","+82-5-686-1529","+82-1-602-0536","+82-4-684-6785","+82-1-533-7142","+82-5-340-6288","+82-5-176-2299","+82-7-508-3976","+82-4-727-8575","+82-2-511-6793","+82-3-311-1018","+82-1-632-5100","+82-1-855-0103","+82-3-373-3747","+82-8-144-4641","+82-6-207-3214","+82-7-366-6405","+82-1-684-6295","+82-1-569-2798","+82-6-294-6459","+82-8-490-0139","+82-7-127-7018","+82-2-633-3843","+82-4-730-4570","+82-2-981-8213","+82-9-600-9899","+82-1-068-1305","+82-3-627-0767","+82-6-112-6511","+82-2-968-7553","+82-2-165-8504","+82-5-790-9095","+82-3-406-2250","+82-2-490-8709","+82-5-915-8572","+82-7-486-2352","+82-6-989-6630","+82-9-755-3313","+82-8-428-1008","+82-2-377-9747","+82-2-977-3415","+82-3-346-3657","+82-1-998-0384","+82-5-395-0331","+82-5-766-9309","+82-7-619-7446","+82-1-431-9140","+82-1-944-9161","+82-5-240-3213","+82-8-922-8652","+82-9-160-5355","+82-4-640-7459","+82-2-895-1649","+82-3-860-3501","+82-5-788-7230","+82-5-158-1719","+82-9-921-3658"];
		var locations_array = ["1091, Hakcheon-ri Heunghae-eup, Pohang-si, gyeongbuk, 791-944", "1242, Oncheon-ri Suanbo-myeon, Chungju-si, chungbuk, 380-943", "1293, Daeyeon 3(sam)-dong, Nam-gu, busan, 608-806", "1017, Worak-ri Worya-myeon, Hampyeong-gun, jeonbuk, 525-881", "1285, Manchon 1(il)-dong, Suseong-gu, daegu, 706-803", "1248, Nogok-ri Yangseong-myeon, Anseong-si, gyeonggi, 456-932", "1116, Oji-riDaesan-eup, Seosan-si, chungbuk, 356-871", "1186, Jangjuk-ri Sinan-myeon, Sancheong-gun, gyeongnam, 666-962", "1182, Dongsak-dong, Pyeongtaek-si, gyeonggi, 450-802", "1133, Hamyeol-eup, Iksan-si, jeonbuk, 570-800", "1062, Ujin Artville Apt. Seokhyeon-dong, Mokpo-si, jeonbuk, 530-777", "1114, Changindong 1-ga, Iksan-si, jeonbuk, 570-991", "1258, Jeonhwa-ri Nakseo-myeon, Uiryeong-gun, gyeongnam, 636-971", "1190, Japo-ri Sillim-myeon, Gochang-gun, jeonbuk, 585-833", "1106, Hyanggyo-dong, Namwon-si, jeonbuk, 590-020", "1038, Nowon-dong 1(il)-ga, Buk-gu, daegu, 702-810", "1070, Hwabong-ri Jeongan-myeon, Gongju-si, chungbuk, 314-825", "1144, Beombu-ri Seo-myeon, Yangyang-gun, Gangwon-do, 215-813", "1104, Gyeongbuk Regional Communications Office Ipseok-dong, Dong-gu, daegu, 701-700", "1068, Wang-dong, Gwangsan-gu, Gwangju, 506-406", "1278, Songchi-ri Jucheon-myeon, Namwon-si, jeonbuk, 590-811", "1042, Seongnae-ri Geumseong-myeon, Jecheon-si, chungbuk, 390-821", "1118, Hyundai Apt. Majang-dong, Seongdong-gu, seoul, 133-753", "1132, Imun 2(i)-dong, Dongdaemun-gu, seoul, 130-827", "1105, Areummaeul Sunkyoung Apt. Imae-dong, Bundang-gu, Seongnam-si, gyeonggi, 463-734", "1195, Hwangdeung-myeon, Iksan-si, jeonbuk, 570-810", "1114, Paldeok-myeon, Sunchang-gun, jeonbuk, 595-860", "1287, Gaheung 2(i)-dong, Yeongju-si, gyeongbuk, 750-902", "1263, Yeoksam 2(i)-dong, Gangnam-gu, seoul, 135-926", "1252, Gimhae College University Sambang-dong, Gimhae-si, gyeongnam, 621-706", "1062, Yunam 1-ri Jeomgok-myeon, Uiseong-gun, gyeongbuk, 769-831", "1209, Pyeongjang-ri Jangheung-eup, Jangheung-gun, jeonbuk, 529-806", "1223, Buyeong Saranguero Apt., Sindae-ri Amnyang-myeon, Gyeongsan-si, gyeongbuk, 712-746", "1117, Hyundai Apt. Apgujeong-dong, Gangnam-gu, seoul, 135-789", "1228, Eomo-myeon, Gimcheon-si, gyeongbuk, 740-830", "1258, Olympic Center Oryun-dong, Songpa-gu, seoul, 138-749", "1294, Eumnae-dong, Buk-gu, daegu, 702-849", "1015, Gojan 1(il)-dong, Danwon-gu, Ansan-si, gyeonggi, 425-021", "1128, Sujeong Hanyang Apt. Seonbu 3(sam)-dong, Danwon-gu, Ansan-si, gyeonggi, 425-765", "1146, Jindalraemaeul Sang 3(sam)-dong, Wonmi-gu, Bucheon-si, gyeonggi, 420-755", "1103, Bugye-myeon, Gunwi-gun, gyeongbuk, 716-830", "1172, Bugok 4(sa)-dong, Geumjeong-gu, busan, 609-818", "1149, Dangdong-ri Daegang-myeon, Danyang-gun, chungbuk, 395-811", "1099, Osan-myeon, Iksan-si, jeonbuk, 570-920", "1230, Omok-ri Yugok-myeon, Uiryeong-gun, gyeongnam, 636-932", "1175, Ministry of Culture, Sports and Tourism Waryong-dong, Jongno-gu, seoul, 110-703", "1195, Eoso-ri Cheongbuk-myeon, Pyeongtaek-si, gyeonggi, 451-833", "1156, Bugok-ri Songak-eup, Dangjin-si, chungbuk, 343-827", "1109, Ilyang Pharm. Co. Hagal-dong, Giheung-gu, Yongin-si, gyeonggi, 446-726", "1083, (A~B) Guui Daerim AcroRiver Guui 3(sam)-dong, Gwangjin-gu, seoul, 143-724", "1122, Danggam 1(il)-dong, busanjin-gu, busan, 614-817", "1294, Hyeonae-ri Pungsan-eup, Andong-si, gyeongbuk, 760-805", "1268, Yeongheung-ri Chuja-myeon, Jeju-si, Jeju-do, 695-951", "1186, Hagik 1(il)-dong, Nam-gu, Incheon, 402-865", "1160, Geumchon 2(i)-dong, Paju-si, gyeonggi, 413-809", "1031, Sujeong 4(sa)-dong, Dong-gu, busan, 601-820", "1080, Ilpae-dong, Namyangju-si, gyeonggi, 472-030", "1233, Kyemongsa Yeoksam 2(i)-dong, Gangnam-gu, seoul, 135-756", "1212, P.O.Box, Baegui-ri Cheongsan-myeon, Yeoncheon-gun, gyeonggi, 486-859", "1160, Rise-ri Okpo-myeon, Dalseong-gun, daegu, 711-843", "1011, Moro-ri Gunbuk-myeon, Haman-gun, gyeongnam, 637-823", "1184, Sanggye 1(il)-dong, Nowon-gu, seoul, 139-838", "1192, Myeongnyun 4(sa)-ga, Jongno-gu, seoul, 110-524", "1181, Tanbeol Kyoungnam Honors Ville 1-danji Apt. Tanbeol-dong, Gwangju-si, gyeonggi, 464-795", "1007, Pungnap 1(il)-dong, Songpa-gu, seoul, 138-873", "1300, Anyang 8(pal)-dong, Manan-gu, Anyang-si, gyeonggi, 430-818", "1152, Jongam-dong, Seongbuk-gu, seoul, 136-863", "1110, Junghwa 2(i)-dong, Jungnang-gu, seoul, 131-881", "1123, Gayang 1(il)-dong, Gangseo-gu, seoul, 157-806", "1191, Jeungpo-dong, Icheon-si, gyeonggi, 467-803", "1074, Gangsan Town Apt. Dowon-dong, Dalseo-gu, daegu, 704-792", "1181, Goejeong 3(sam)-dong, Saha-gu, busan, 604-857", "1216, Daeyeon Techno World Ojeon-dong, Uiwang-si, gyeonggi, 437-753", "1219, Dapsimni 1(il)-dong, Dongdaemun-gu, seoul, 130-802", "1050, Gwanyang 1(il)-dong, Dongan-gu, Anyang-si, gyeonggi, 431-805", "1180, Sinwol-ri Joseong-myeon, Boseong-gun, jeonbuk, 546-911", "1268, Hanil Apt. Taejeon 1(il)-dong, Buk-gu, daegu, 702-791", "1258, Hadang-ri Buk-myeon, Uljin-gun, gyeongbuk, 767-893", "1141, Hwangjuk-ri Jinsang-myeon, Gwangyang-si, jeonbuk, 545-843", "1138, Nonsil-ri Gogyeong-myeon, Yeongcheon-si, gyeongbuk, 770-844", "1290, Sinchon-ri Annae-myeon, Okcheon-gun, chungbuk, 373-811", "1073, Jugong Apt. Hyeonggok 1(il)-dong, Gumi-si, gyeongbuk, 730-778", "1083, Geoseok-ri Bugwi-myeon, Jinan-gun, jeonbuk, 567-911", "1171, Hangnyong-dong, Yeosu-si, jeonbuk, 555-100", "1083, Sajik 2(i)-dong, Dongnae-gu, busan, 607-819", "1174, Hyangnamsibeomneolbeundeulmaeul Umirin Apt., Haengjeong-ri Hyangnam-eup, Hwaseong-si, gyeonggi, 445-803", "1017, Jeonpo 3(sam)-dong, busanjin-gu, busan, 614-043", "1183, Byeollae Umirin Apt. Byeollae-dong, Namyangju-si, gyeonggi, 472-956", "1127, Deokpung 1(il)-dong, Hanam-si, gyeonggi, 465-806", "1198, Jukjeon-ri Boeun-eup, Boeun-gun, chungbuk, 376-804", "1244, Osan-ri Hyeonpung-myeon, Dalseong-gun, daegu, 711-871", "1295, HiParkcityilsan Pamillie 4-danji Apt. Deogi-dong, IlsanSeo-gu, Goyang-si, gyeonggi, 411-794", "1208, Sinsohyeon-dong, Anseong-si, gyeonggi, 456-380", "1188, Sang-dong, Suseong-gu, daegu, 706-830", "1100, Shindong-a Apt. Dangni-dong, Saha-gu, busan, 604-728", "1229, Firenze Apt. Gorim-dong, Cheoin-gu, Yongin-si, gyeonggi, 449-708", "1240, Electron Zone Sangyeok 2(i)-dong, Buk-gu, daegu, 702-711", "1208, Samik 1(il)-cha Apt. Geumgok-dong, Gwonseon-gu, Suwon-si, gyeonggi, 441-747", "1214, Hwachi-dong, Yeosu-si, jeonbuk, 555-280", "1224, Jugong Apt. 6 Danji Jeongwang 1(il)-dong, Siheung-si, gyeonggi, 429-753"];
		var country = "USA";
	}

  if (variant == 'SCHUFA')
    {
		var firstnames = ["Rainer", "Ralph"]; // , "Mandy"] ;    
		var lastnames = ["SIMLZWEI-IDC-Abnahme", "SIMLZWEI-IDC-Abnahme"]; // , "SIMLZWEI-IDC-Abnahme"];
		var sch_gender = ["m","m"]; //,"f"];
		var sch_dob_dd = ["15","26"]; // ,"19"];
		var sch_dob_mm = ["2","4"]; //,"2"];
		var sch_dob_yy = ["1962","1968"]; // ,"1969"];
		var postcode = ["10965","60388"]; // ,"09120"];
		var phones = ["+82-6-759-2047","+82-5-656-1955"];// ,"+82-8-782-0201"];
		var locations_array = ["89, Mauerstr, Mauerstr, Berlin, 10965", "12, Borsig Allee, Frankfurt, Hessen, 60388"]; //, "89, Annaberger Straße, Chemnitz, Saxony, 09120"];
		var country = "Germany";
	}
	
	var jl = prompt("Please enter JL number", "");
	if (variant == 'SCHUFA')
    {
		var schufa_pick = Math.floor(Math.random() * firstnames.length) ;
		var efirstname = "";
		if (jl != "") {
			efirstname = "JL-" + jl + "_" + firstnames[schufa_pick] ;
		} else 
		{
			efirstname = firstnames[schufa_pick] + dateToYYYYMMDDhhmmss(new Date()) ;
		}
		var e = DEFAULT_EMAIL + variant + "_" + efirstname + "." + lastnames[schufa_pick] + '@' + DEFAULT_DOMAIN;
		var email = e.replace(/\ /g, '-');
		
		var dob_dd = sch_dob_dd[schufa_pick];
		var dob_mm = sch_dob_mm[schufa_pick];
		var dob_yyyy = sch_dob_yy[schufa_pick];
		var locations = locations_array[schufa_pick];
		var address_array = locations.split(', ') ; 
		var gender = sch_gender[schufa_pick] ;
		
		var MyCustomer = new objCustomer(lastnames[schufa_pick],firstnames[schufa_pick],email,phones[schufa_pick],dob_dd,dob_mm,dob_yyyy,gender,address_array[0],address_array[1],address_array[2],address_array[3],address_array[4],country)

		
	} else {
		var firstname = firstnames[Math.floor(Math.random() * firstnames.length)];
		if (jl != "") {
			firstname = "JL-" + jl + "_" + firstname ;
		} 

		var lastname = lastnames[Math.floor(Math.random() * lastnames.length)];

		var e = DEFAULT_EMAIL + variant + "_" + firstname + "." + lastname + '@' + DEFAULT_DOMAIN;
		var email = e.replace(/\ /g, '-');

		var dob_mm_values = ["1","2","3","4","5","6","7","8","9","10","11","12"];
		var dob_mm = dob_mm_values[Math.floor(Math.random() * dob_mm_values.length)];
		var dob_yyyy_values = ["1980","1981","1983","1984","1985","1986","1987","1988","1989","1990","1971","1972"];
		var dob_yyyy = dob_yyyy_values[Math.floor(Math.random() * dob_yyyy_values.length)];
		var dob_dd_values = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","21","22","23","24","25","26","27","28"];
		var dob_dd = dob_dd_values[Math.floor(Math.random() * dob_dd_values.length)];

		var phone = phones[Math.floor(Math.random() * phones.length)];

		var locations = locations_array[Math.floor(Math.random() * locations_array.length)];
		var address_array = locations.split(', ') ; 
		var gender = 'm' ;
		var MyCustomer = new objCustomer(firstname,lastname,email,phone,dob_dd,dob_mm,dob_yyyy,gender,address_array[0],address_array[1],address_array[2],address_array[3],address_array[4],country)

	}
	
		console.log(MyCustomer);
		return MyCustomer ;
}


function objPunter(id,lastname,firstname,gender,dob_dd_value,dob_mm_value,dob_yyyy_value,postcode,city,address_street,streetnum,bankcode,bankaccount,IBAN)
{
	this.id = id ;
	this.firstname = firstname;
	this.lastname = lastname;
	this.gender = gender ;
	this.dob_dd_value = dob_dd_value;
	this.dob_mm_value = dob_mm_value;
	this.dob_yyyy_value = dob_yyyy_value;
	this.streetnum = streetnum;
	this.address_street = address_street;
	this.postcode = postcode;
}

function loadPunters()
{
	MyPunters = new Array();
	MyPunters.push( new objPunter('1','SIMLZWEI-IDC-Abnahme','Rainer','M','15','02','1962','10965','Berlin,Mauerstr','89','51170024','033177700','DE19511700240033177700'));
	MyPunters.push( new objPunter('2','SIMLZWEI-IDC-Abnahme','Ralph','M','26','4','1968','60388','Frankfurt am Main','Borsig Allee','12','51170024','033177700','DE19511700240033177700'));
	MyPunters.push( new objPunter('3','SIMLZWEI-IDC-Abnahme','Mandy','W','19','02','1969','09120','Chemnitz','Annaberger Straße','89','51170024','033177700','DE19511700240033177700'));
	MyPunters.push( new objPunter('4','SIMLZWEI-IDC-Abnahme','Egon','M','17','05','1937','67071','Ludwigshafen','Dürkheimer Str.','31','51170024','033177700','DE19511700240033177700'));
	MyPunters.push( new objPunter('5','SIMLZWEI-IDC-Abnahme','Açkingül-Ürengül-Üstüngül','W','12','02','1966','67071','Ludwigshafen','Schillerstrasse','35,51170024','033177700','DE19511700240033177700'));
	MyPunters.push( new objPunter('6','SIMLZWEI-IDC-Abnahme','Karl-Gustav','M','3','01','1907','10787','Berlin','Kaiser Karl-Gustav Platz','25','51170024','033177700','DE19511700240033177700'));
	MyPunters.push( new objPunter('7','SIMLZWEI-IDC-Abnahme-Wolfenschlegelsteinhausenbergerdorff','André','M','19','03','1956','67112','Mutterstadt','An der Folenweide','12','51170024','033177700','DE19511700240033177700'));
	return MyPunters ;
}

function dateToYYYYMMDDhhmmss(date)
{
    function pad(num) {
        num = num + '';
        return num.length < 2 ? '0' + num : num;
    }
    return date.getFullYear() + 
        pad(date.getMonth() + 1) + 
        pad(date.getDate()) + 
        pad(date.getHours()) + 
        pad(date.getMinutes()) + 
        pad(date.getSeconds());
}


function schufafixed(use_id)
{
	var my_email;
	my_email = DEFAULT_EMAIL + Math.floor((Math.random()*9999)+1000) + '_' ;

	loadPunters();
	var thePunter = MyPunters[use_id];

	document.getElementById("signup_gender").selectedIndex = 1;
	document.getElementById('password').value='4Me2Test';
	document.getElementById('signup_show_password').checked=true;
	document.getElementById('signup_agree').checked=true;

	document.getElementById('first_name').value=thePunter.firstname;
	document.getElementById('last_name').value=thePunter.lastname;  
    
	document.getElementById('social_security').value=thePunter.lastname;  

	var s = my_email + thePunter.firstname + "." + thePunter.lastname;
	signup_email = s.replace(/\ /g, '-');
	document.getElementById('email').value=signup_email  + '@' +  DEFAULT_DOMAIN;
	document.getElementById('confirm_email').value=signup_email  + '@' +  DEFAULT_DOMAIN;

	document.getElementById('signup_dob').value=thePunter.dob_dd_value + '.' + thePunter.dob_mm_value+ '.' + thePunter.dob_yyyy_value;
	document.getElementById('signup_dob_hidden').value=thePunter.dob_yyyy_value + '-' + thePunter.dob_mm_value+ '-' + thePunter.dob_dd_value;

	document.getElementById('signup_address_number').value=thePunter.streetnum;
	document.getElementById('signup_address_street').value=thePunter.address_street;  

	alert ('Use '+ thePunter.postcode + ' for the postcode');
}


GM_registerMenuCommand("Create a User", main);
GM_registerMenuCommand("Create KR", function () { main("KR") });
GM_registerMenuCommand("Create AU", function () { main("AU") });
GM_registerMenuCommand("Create US", function () { main("US") });
GM_registerMenuCommand("Create DE", function () { main("DE") });
GM_registerMenuCommand("Create SCHUFA", function () { main("SCHUFA") });
