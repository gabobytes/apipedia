$(document).ready(function() {
  //function to get articles, receives url for ajax and typesearch
function getArticles(urlGet,typeSearch){
  $.ajax({
      url:urlGet,
      type: 'GET',
      crossDomain: true,
      dataType: 'jsonp',
      headers:{"Access-Control-Allow-Origin":"*"},
      success: function(data){
      var html = "<div class='row labelResults'><strong>Results</strong><br/></div>";
      var resul = data.query[typeSearch];
       
        //if is not random, pageid, else id
        var typeId = "";
        
        if(typeSearch ==="pages"){
           typeId = "pageid";
        }
        else{ typeId = "id";}
        
       //getting the links        
      for (var x in resul) {        
        html+="<div class='row'>";
        html+="<a href='https://en.wikipedia.org/?curid="+resul[x][typeId]+"'  target='_blank'>"+resul[x].title+"</a>";
        
        //if search is not random, print the extract
        if(typeSearch==="pages"){
        html+="<p>"+resul[x].extract+"</p>"}else{
        html+="<p>&nbsp;</p>"     
        }//end if else
        html+="</div>";
       }//end for
      
      //print results on div
      $("#results").html(html);      
    },
    error: function() { alert("Can't stablish Wikipedia connection"); },
    
    });//end ajax
 
}//end GetArticles


//keyup
$("#qsearch").keyup(function(){
   var qsearch = $("#qsearch").val();
   var urlGet = "http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=15&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+qsearch;
  
  var typeSearch = "pages";
  
    getArticles(urlGet,typeSearch);
});//end keyup

//random Articles
$("#lnkRandom").click(function(){
   var urlRandom = "https://en.wikipedia.org/w/api.php?action=query&list=random&rnlimit=10&rnnamespace=0&format=json";
  
  var typeSearch = "random";
  
    getArticles(urlRandom,typeSearch);
});//end random Articles


}); //document ready