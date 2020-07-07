$(document).ready(function () {

  // ******************** TODOOLEAN | Todo-List ********************

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
  getAllTodos();


  // READ : Chiamata ajax per lettura dati - Metodo GET
  //  ---> Stampo i dati presenti nella lista
  function getAllTodos() {
    $('#todo-list').html('');
    $('#todo-text').val('');

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
    ); // end ajax call
  } // end fun getAllTodos



  // CREATE : Chiamata ajax per creazione dati - Metodo POST
  //  ---> Aggiungo dati alla lista,
  //  ---> leggo il valore del nuovo dato inserito, salvo e stampo
  $('#todo-btn').click( function() {
    var newTodo = $('#todo-text').val();

    if ( newTodo.length > 0 ) {

      $.ajax(
        {
          url: myTodosUrl,
          method: "POST",
          data: {
            text: newTodo,
          },
          success: function(data) {
            getAllTodos();
          },
          error: function() {
            alert('Impossibile salvare dati.');
          }
        }
      ); // end ajax call

    } 
    else {
      alert('Il campo è vuoto. Inserire nuovo todo.');
    }

  }); // end click 



  // DELETE : Chiamata ajax per eliminazione dati - Metodo DELETE
  //  ---> creo evento click su icona .delete-btn
  //  ---> seleziono elmento <li> e rispettivo ID assegnato dall'API (collegati tramite data-attr)
  //  ---> elimino elemento selezionato
  $(document).on('click', '.delete-btn', function() {
    var thisId = $(this).parent().attr('data-id');

    $.ajax(
      {
        url: myTodosUrl + thisId,
        method: "DELETE",
        success: function (data) {
          getAllTodos();
        },
        error: function () {
          alert('Errore: impossibile eliminare l\'elemento selezionato.');
        }
      }
    ); // end ajax call

  }); // end on click































































}); // document ready
