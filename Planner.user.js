// ==UserScript==
// @name       Fill In Planner
// @namespace  http://use.i.E.your.homepage/
// @version    0.2
// @description  Fill in my planner time log.
// @match      http://planner.benon.com/cgi-bin/timelog.cgi
// @downloadURL	https://raw.githubusercontent.com/chrisjoyce911/JumboTM/master/Planner.user.js
// @updateURL	https://raw.githubusercontent.com/chrisjoyce911/JumboTM/master/Planner.user.js
// @copyright	2015+, Chris Joyce <chris@joyce.id.au>
// ==/UserScript==

function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "window.j=jQuery.noConflict(true);(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

function main() {
    
    var field_duration = "7.6";
   	// var field_work_group = "35" ; 	// "Germany";
    //var field_work_group = "38" ; 	// "Ozlotteries v2";
    var field_work_group = "39" ; 		// "Ozlotteries v2 (Korea)";
    var field_work_type = "19" ;  		// "Website/Asset Improvement"
    
    var descriptions = ["Meeting, Assign, Review, Release, Development"];
	var field_description = descriptions[Math.floor(Math.random() * descriptions.length)];
    
    j('#field-description').val(field_description) ;
    j('#field-duration').val(field_duration) ;
    j('#field-work-group').val(field_work_group) ;
    j('#field-work-type').val(field_work_type) ;
    
    j('select.work_type_field').val(field_work_type) ;
    
    j('select.work_type_field').each(function(i, obj) {
		var tag = $(this);
		tag.parent().css('background', 'orange');
		var url = 'http://planner.benon.com/cgi-bin/timelog.cgi';
		$.post(url, {task: 'api_update_timelog_entry', id: $(this).attr('timelog_id'), work_type: $(this).val()}, function(data){
			if (data == 1) {
				tag.parent().css('background', 'green');
			}
			else {
				tag.parent().css('background', 'red');
			}
		});
        
	// alert('done: ' + $(this).val());
	});

}


// load jQuery and execute the main function
addJQuery(main);
