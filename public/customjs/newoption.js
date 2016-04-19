var optionHtml = '<div class="form-group">' +
    '<input class="form-control" type="text" name="option" placeholder="poll option"></input>' + '<i class="fa fa-trash" aria-hidden="true"></i>' + '</div>';
$(document).ready(function() {
    $(".btn-warning").on('click', function() {
        $('.btn-primary').closest('.form-group').prepend(optionHtml);
    });

    $('.form-group').on('click', '.fa-trash', function() {
        $(this).closest('.form-group').remove();
    });

    
});
