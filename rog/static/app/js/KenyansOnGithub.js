
var KenyansOnGithub= function () {
    var host='http://danleyb2.pythonanywhere.com';
    var eventsurl='/rog/api/activities';

    var test_act=[];
    return{
        get_activities:function (cb) {

            //this.activities= test_act;
            //cb(test_act);return;
            $.ajax({
                url: eventsurl,
                async:true,
                success: function(result){
                    //app.activities= result;
                    cb(result)
                }
            });
            //return activities;
        }
    }

};


