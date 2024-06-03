
function comment()
{
    $('html, body').animate({
        scrollTop: $("#comment").offset().top - 100
    }, 500);
}
function setratting(val,comment="",btnupdate=false)
{
    if (val == 1) {
        $(".ratting-danger").find("img").addClass("active");
    } else if (val == 2) {
        $(".ratting-warning").find("img").addClass("active");
    } else {
        $(".ratting-success").find("img").addClass("active");
    }
    $("#ratting").val(val);
    if (comment != "") {
        $("#comment_input").val(comment);
    }
    if (btnupdate) {
        $("#ratting_btn").html("Update Review");
    }
}
setTimeout(function(){

    if (typeof ratting !== 'undefined' && typeof comment_text !== 'undefined'  && typeof btnupdate !== 'undefined') {
        setratting(ratting,comment_text,btnupdate);
    }

    $(document).ready(function(){
        $(".ratting-icon > img").click(function(){
            $("#ratting_error").html("");
            var val = $(this).attr("data-value");
            $(".ratting-icon > img").removeClass("active");
            setratting(val);
        });
        $("#reviewform").validate({
            rules: {
                ratting: {
                    required: true
                },
            },
            messages: {
                ratting: {
                    required: "Please select ratting"
                }
            },
            ignore: "",
            errorPlacement: function(error, element) {
              if (element.attr("name") == "ratting" ) {
                $("#ratting_error").html(error);
              } else {
                error.insertAfter(element);
              }
            }
        });
    });
},300);