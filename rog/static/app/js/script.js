/**
 * Created by brian on 2/17/16.
 */
var act=[];
$(document).ready(function() {
    var githubRegion=KenyansOnGithub();

    githubRegion.get_activities(function(activities){
        console.log(activities);
        act=activities;
        populateList(undefined);

        //$('#all').addClass('active-activity');
    });


    $('#stars').on('click',function (evt) {
       evt.preventDefault();

        $('span.active-activity', $(this).parent()).removeClass('active-activity');
        $(this).addClass('active-activity');

        populateList('WatchEvent');
    });
    $('#forks').on('click',function (evt) {
        evt.preventDefault();
        $('span.active-activity', $(this).parent()).removeClass('active-activity');
        $(this).addClass('active-activity');

        populateList('ForkEvent');
    });
    $('#creates').on('click',function (evt) {
        evt.preventDefault();
        $('span.active-activity', $(this).parent()).removeClass('active-activity');
        $(this).addClass('active-activity');

        populateList('CreateEvent');
    });
    $('#all').on('click',function (evt) {
        evt.preventDefault();
        $('span.active-activity', $(this).parent()).removeClass('active-activity');
        $(this).addClass('active-activity');

        populateList(undefined);
    });
    $('#pulls').on('click',function (evt) {
        evt.preventDefault();
        $('span.active-activity', $(this).parent()).removeClass('active-activity');
        $(this).addClass('active-activity');

        populateList('PullRequestEvent');
    });
    $('#adds').on('click',function (evt) {
        evt.preventDefault();
        $('span.active-activity', $(this).parent()).removeClass('active-activity');
        $(this).addClass('active-activity');

        populateList('MemberEvent');
    });


});



var populateList = function(activityType) {
    var ul = $("#activities");
    var html_str = "";
    var render = GitHubEvents();

    for (var i = 0; i < this.act.length; i++) {
        var activity = act[i];
        if(activityType!=undefined && activity['type']!=activityType)continue;

        html_str +=
            '<li class="list-group-item" >' +

            '<div class="row">' +

                '<div class="col-md-1">'+
                '<img src="' + activity['actor']['avatar_url'] + 's=80" class="left img-fluid ">'+
                '</div>'+
                '<div class="col-md-11">'+
                render.render(activity) +
                '</div>' +

            '</div>'+

            //'<a href="#full-' + i + '" data-rel="dialog" data-transition="slideup" class="ui-btn ui-btn-icon-notext ui-icon-carat-r" title="More Info"></a>' +

            '</li>';
        //console.log(html_str);

    }
    if(html_str==''){
        html_str +=
            '<li class="list-group-item" >' +
            '<div class="row">' +
            '<div class="col-md-12">'+
            "<h4 class=\"text-sm-center\">Kenyans don/'t like doing this activity.</h4>" +
            '</div>' +
            '</div>'+
            '</li>';

    }
    //ul.append(html_str);
    ul.html(html_str);

    $("time.timeago", ul).timeago();

};