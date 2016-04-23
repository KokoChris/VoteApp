 $(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip({
        placement : 'bottom'
    });


    $('.modal-footer').on('click','button',function(){

         var optionText = $('.form-control').val();
         var newDivOption = '<div class="radio">'+
                             '<label>'+
                                      '<input type = "radio" name= "optionsRadios" value=' +'"'+optionText +'"'+ 'checked>'+ optionText
                              +'</label>'+
                              '</div>';
       
          

          $('.votebtn').before(newDivOption);
          $('.modalText').val("");
    
    });
 
 })
 