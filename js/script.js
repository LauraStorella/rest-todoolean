$(document).ready(function () {

  /*   
  Utilizzando le API Todos di Boolean creiamo un’interfaccia in cui possiamo 
  leggere, creare e rimuovere degli elementi da una todo-listEndpoints:
    - Read: http://157.230.17.132:{porta}/todos/ Method:GET ;
    - Create: http://157.230.17.132:{porta}/todos/ Method: POST
      Che si aspetta il testo da salvare (nome proprietà ‘text’) ;
    - Delete: http://157.230.17.132:{porta}/todos/{id} Method: DELETE
      Dove id è l’id della risorsa da eliminare 
  */


  var myTodosUrl = 'http://157.230.17.132:3030/todos/';


  // READ : Chiamata ajax per lettura data - Metodo GET
  //  ---> Stampo i dati presenti nella lista
  $.ajax(
    {
      url: myTodosUrl,
      method: "GET",
      success: function (data) {
        
        if ( data.length > 0 ) {      

          var source = $('#todo-list-template').html();
          var template = Handlebars.compile(source);

          for (var i = 0; i < data.length; i++) {
            var thisTodo = data[i];

            var html = template(thisTodo);  
            $('#todo-list').append(html);
          } 

        }
      },
      error: function () {
        alert('Ops! Si è verificato un errore.');
      }
    }
   );






























































}); // document ready
