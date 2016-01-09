
var KenyansOnGithub= function () {
    var host='http://danleyb2.pythonanywhere.com';
    var eventsurl='/rog/api/activities';

    return{
        get_activities:function (cb) {
           // var activities;
            $.ajax({
                url: eventsurl,
                async:true,
                success: function(result){
                    window.app.activities= result;
                    cb()
                }
            });
            //return activities;
        }
    }
};


