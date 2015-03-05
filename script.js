//var paths = [];

$(document).ready(function(){

	  //document.oncontextmenu = function() {return false;};


	$("input[type='submit']").click(function(){
		$("iframe").attr("src",$("input[name='url']").val());
		document.getElementById('the-iframe-id').contentWindow.onload = function() {$("iframe").contents().find("body").append("<script src='script.js'><\/script>")};
		});
	$("*:not(:has(*))").on('contextmenu', function(e) {
		console.log("rClick");
			paths.push(getElementPath2(this));
		$(getSelector(updateFilter())).text("Coucou");
		});
	});
function updateFilter()
{
	var filter = [];
	if(paths.length > 0)
	{
		filter = paths[0];
		for(var i=1;i<paths.length;i++)
		{
			filter = andPath(filter, paths[i]);
		}
	}
	return filter;
}

function getElementPath(element)
{
	return "//" + $(element).parents().andSelf().map(function() {
		var $this = $(this);
		var tagName = this.nodeName;
		if ($this.siblings(tagName).length > 0) {
			tagName += "[" + $this.prevAll(tagName).length + "]";
		}
		return tagName;
	}).get().join("/").toUpperCase();
}
function getElementPath2(element)
{

	var nodeName = [element.nodeName];
	var attrs = element.attributes;
	var dico = {node:nodeName};
	for(var i = attrs.length - 1; i >= 0; i--) {
		dico[attrs[i].name] = attrs[i].value.split(" ");
	}
	
	if(nodeName=="HTML")
	{
		return [dico];
	
	}
	else
	{
		return getElementPath2(element.parentNode).concat(dico);
	}
}

function getLeafNodes()
{
	return $('*:not(:has(*))');
}

function intersect_safe(a, b)
{
  var ai=0, bi=0;
  var result = new Array();

  while( ai < a.length && bi < b.length )
  {
	 if      (a[ai] < b[bi] ){ ai++; }
	 else if (a[ai] > b[bi] ){ bi++; }
	 else /* they're equal */
	 {
	   result.push(a[ai]);
	   ai++;
	   bi++;
	 }
  }

  return result;
}

function getMark(sign1,sign2)
{
	var result = 0;

	for(var i=0; i<sign1.length; i++){
		for(var key in sign1[i])
		{
			for(var j=0; j<sign2.length; j++){
				if(sign2[j].hasOwnProperty(key))
				{
					result = result + intersect_safe(sign1[i][key],sign2[j][key]).length;
				}
			}
			
		}
	}
	return result;
}

function andPath(sign1,sign2)
{
	var result = [];
	var tmp={};
	for(var i=0; i<sign1.length && i<sign2.length; i++){
		tmp = {};
		for(var key in sign1[i])
		{
			if(sign2[i].hasOwnProperty(key))
			{
				tmp[key] = intersect_safe(sign1[i][key],sign2[i][key]);
			}
		}
		result.push(tmp);
	}
	return result;
}
function notPath(sign1,sign2)
{
	var result = [];
	var tmp={};
	for(var i=0; i<sign1.length && i<sign2.length; i++){
		tmp = {};
		for(var key in sign1[i])
		{
			if(sign2[i].hasOwnProperty(key))
			{
				tmp[key] = intersect_safe(sign1[i][key],sign2[i][key]);
			}
		}
		result.push(tmp);
	}
	return result;
}

function getSelector(path)
{
	 var result = "";
	for(var i=0; i<path.length;i++){
		if(i>0) { result = result + ">"}
		result = result + path[i]["node"];
		console.log(path[i]);
		if(path[i].hasOwnProperty("class") && path[i]["class"].length) { result = result + "." + path[i]["class"].join(".")}
		if(path[i].hasOwnProperty("id") && path[i]["id"].length) { result = result + "#" + path[i]["id"].join("#")}
	}
	return result;
}