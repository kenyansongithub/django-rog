
var KenyansOnGithub= function () {
    var host='http://danleyb2.pythonanywhere.com';
    var eventsurl='/rog/api/activities';

    return{
        get_activities:function () {
            var activities;
            $.ajax({
                url: eventsurl,
                async:false,
                success: function(result){
                    activities= result;
                }
            });
            return activities;
        }
    }
};


