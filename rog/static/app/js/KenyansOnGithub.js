
var KenyansOnGithub= function () {
    var host='http://localhost:8000';
    var eventsurl=host+'/rog/api/activities';

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


