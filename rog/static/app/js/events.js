/**
 * Created by brian on 1/3/16.
 */
GitHubEvents=function() {


    var renderFork=function(activity){
        return    '<div class="alert fork simple">' +
    '<div class="body">' +
    '<div class="simple">' +
    '<span class="octicon octicon-git-branch" aria-label="Fork"></span>' +

    '<div class="title">' +
    '<a href="'+activity['actor']['url']+'" data-ga-click="type:ForkEvent target:actor">'+activity['actor']['login']+'</a> from '+activity['actor']['location']+' forked ' +
            '<a href="'+activity['repo']['url']+'" data-ga-click=" type:ForkEvent target:repo">'+activity['repo']['name']+'</a> to ' +
            '<a href="'+activity['payload']['forkee']['html_url']+'" data-ga-click="type:ForkEvent target:parent" title="'+activity['payload']['forkee']['full_name']+'">'+activity['payload']['forkee']['full_name']+'</a>' +
    '</div>' +

    '<div class="time">' +
    '<time class="timeago" datetime="'+activity['created_at']+'" is="relative-time" title="Jan 1, 2016, 11:21 PM GMT+3">some time ago</time>' +
    '</div>' +
    '</div>' +
    '</div>' +
    '</div>';};
    var renderStar = function (activity) {
        return '<div class="alert watch_started simple">' +
        '<div class="body">' +
        '<div class="simple">' +
        '<span class="octicon octicon-star" aria-label="Watch"></span>' +
        '<div class="title">' +
        '<a href="/mishin" data-ga-click="type:WatchEvent target:actor">' + activity['actor']['login'] + '</a> from '+activity['actor']['location']+' starred ' +
        '<a href="'+activity['repo']['url']+'" data-ga-click="News feed, event click, Event click type:WatchEvent target:repo">' + activity.repo.name + '</a>' +
        '</div>' +
        '<div class="time">' +
        '<time class="timeago" datetime="'+activity['created_at']+'" is="relative-time" title="Jan 1, 2016, 11:21 PM GMT+3">some time ago</time>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    };
    var renderCreate = function (activity) {
        return '<div class="alert create simple"><div class="body">' +
            '<div class="simple">' +
            '<span class="octicon octicon-repo" aria-label="Create"></span>' +

            '<div class="title">' +
            '<a href="'+activity['actor']['url']+'" data-ga-click="type:CreateEvent target:actor">'+activity['actor']['login']+'</a> from '+activity['actor']['location']+' created repository ' +
            '<a href="'+activity['repo']['url']+'" data-ga-click="type:CreateEvent target:repository" title="'+activity['repo']['name']+'">'+activity['repo']['name']+'</a>' +
            '</div>' +

            '<div class="time">' +
            '<time class="timeago" datetime="'+activity['created_at']+'" is="relative-time" title="Dec 17, 2015, 6:47 AM GMT+3">17 days ago</time>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
    };
    var renderMember = function (activity) {
        return  '<div class="alert member_add simple"><div class="body">' +
            '<div class="simple">' +
            '<span class="octicon octicon-person" aria-label="Member"></span>' +

            '<div class="title">' +
            '<a href="'+activity['actor']['url']+'" data-ga-click="type:MemberEvent target:actor">'+activity['actor']['login']+'</a> from '+activity['actor']['location']+' added' +
            ' <a href="'+activity['payload']['member']['html_url']+'" data-ga-click=" target:member">'+activity['payload']['member']['login']+'</a> to ' +
            '<a href="'+activity['repo']['url']+'" data-ga-click=" type:MemberEvent target:repo">'+activity['repo']['name']+'</a>' +
            '</div>' +

            '<div class="time">' +
            '<time class="timeago" datetime="'+activity['created_at']+'" is="relative-time" title="Jan 1, 2016, 8:01 PM GMT+3">2 days ago</time>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';

    };
    var render=function(activity){
            switch (activity['type']){
                case 'WatchEvent':
                    return renderStar(activity);
                case 'CreateEvent':
                    return renderCreate(activity);
                case 'MemberEvent':
                    return renderMember(activity);
                case 'ForkEvent':
                    return renderFork(activity);
                case '':
                    return '';
                default: return'';
            }
    } ;

    return {
        'render':render
    }

};