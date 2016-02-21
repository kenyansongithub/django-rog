
var KenyansOnGithub= function () {
    var host='http://danleyb2.pythonanywhere.com';
    var eventsurl='/rog/api/activities';
    //eventsurl='data/sample.json';

    var test_act=[];
    return{
        get_activities:function (cb) {

            //this.activities= test_act;
            //cb(test_act);return;
            $.ajax({
                url: eventsurl,
                async:true,
                beforeSend: function() {
                    $('#activities').html("<h3 class='text-center'>Loading Activities...  <img src='/static/app/images/ajax-loader.gif' /></h3>");
                },
                success: function(result){
                    //app.activities= result;
                    cb(result)
                }
            });
            //return activities;
        }
    }

};


