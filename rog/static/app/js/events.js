/**
 * Created by brian on 1/3/16.
 */
GitHubEvents=function() {
    var html_url='https://github.com/';


    var renderFork=function(activity){
        return    '<span class="octicon octicon-git-branch" aria-label="Fork"></span>' +
            '<time class="timeago ui-li-aside" datetime="'+activity['created_at']+'" is="relative-time" title="Jan 1, 2016, 11:21 PM GMT+3"></time>' +

    '<div class="">' +
    '<a href="'+html_url+ activity['actor']['login'] + '" data-ga-click="type:ForkEvent target:actor">'+activity['actor']['login']+'</a> from '+activity['actor']['location']+' forked ' +
            '<a href="'+html_url+activity['repo']['name']+'" data-ga-click=" type:ForkEvent target:repo">'+activity['repo']['name']+'</a> to ' +
            '<a href="'+activity['payload']['forkee']['html_url']+'" data-ga-click="type:ForkEvent target:parent" title="'+activity['payload']['forkee']['full_name']+'">'+activity['payload']['forkee']['full_name']+'</a>' +
    '</div>';
    };
    var renderStar = function (activity) {
        return '<span class="octicon octicon-star" aria-label="Watch"></span>' +
            '<time class="timeago ui-li-aside" datetime="'+activity['created_at']+'" is="relative-time" title="Jan 1, 2016, 11:21 PM GMT+3"></time>' +

        '<div class="title">' +
        '<a href="'+html_url+ activity['actor']['login'] + '">' + activity['actor']['login'] + '</a> from '+activity['actor']['location']+' starred ' +
        '<a href="'+html_url+activity['repo']['name']+'" data-ga-click="Event click type:WatchEvent target:repo">' + activity.repo.name + '</a>' +


        '</div>';
    };
    var renderCreate = function (activity) {
        return '<span class="octicon octicon-repo" aria-label="Create"></span>' +
            '<time class="timeago ui-li-aside" datetime="'+activity['created_at']+'" is="relative-time" title="Dec 17, 2015, 6:47 AM GMT+3"></time>' +

            '<div class="title">' +
            '<a href="'+html_url+activity['actor']['login']+'" data-ga-click="type:CreateEvent target:actor">'+activity['actor']['login']+'</a> from '+activity['actor']['location']+' created repository ' +
            '<a href="'+html_url+activity['repo']['name']+'" data-ga-click="type:CreateEvent target:repository" title="'+activity['repo']['name']+'">'+activity['repo']['name']+'</a>' +

            '</div>';
    };
    var renderMember = function (activity) {
        return  '<span class="octicon octicon-person" aria-label="Member"></span>' +
            '<time class="timeago ui-li-aside" datetime="'+activity['created_at']+'" is="relative-time" title="Jan 1, 2016, 8:01 PM GMT+3"></time>' +

            '<div class="title">' +
            '<a href="'+html_url+ activity['actor']['login'] + '" data-ga-click="type:MemberEvent target:actor">'+activity['actor']['login']+'</a> from '+activity['actor']['location']+' added' +
            ' <a href="'+activity['payload']['member']['html_url']+'" data-ga-click=" target:member">'+activity['payload']['member']['login']+'</a> to ' +
            '<a href="'+html_url+activity['repo']['name']+'" data-ga-click=" type:MemberEvent target:repo">'+activity['repo']['name']+'</a>' +

            '</div>';

    };
    var renderPullRequest= function () {

        return '<div class="alert issues_opened"><div class="body">'+
            '<span aria-label="Pull request" class="mega-octicon octicon-git-pull-request dashboard-event-icon"></span>'+

            '<div class="time">'+
            '<time datetime="2016-01-09T14:38:01Z" is="relative-time" title="Jan 9, 2016, 5:38 PM GMT+3">4 hours ago</time>'+
        '</div>'+

        '<div class="title">'+
            '<a href="/danleyb2" data-ga-click="News feed, event click, Event click type:PullRequestEvent target:actor">danleyb2</a> opened pull request <a href="/kenyansongithub/django-rog/pull/2" data-ga-click="News feed, event click, Event click type:PullRequestEvent target:pull">kenyansongithub/django-rog#2</a>'+
        '</div>'+

        '<div class="details">'+
            '<a href="/danleyb2"><img alt="@danleyb2" class="gravatar" height="30" src="https://avatars2.githubusercontent.com/u/9919961?v=3&amp;s=60" width="30"></a>'+
            '<div class="message">'+
            '<blockquote>add Travis build</blockquote>'+
        '<div class="pull-info">'+
            '<span aria-hidden="true" class="octicon octicon-git-commit"></span>'+
            '<em>7</em> commits with'+
            '<em>67</em> additions and'+
        '<em>38</em> deletions'+
        '</div>        </div>        </div>       </div></div>';
    };
    var render=function(activity){
            switch (activity['type']){
                case 'WatchEvent':

                    return renderStar(activity);
                case 'CreateEvent':
                    //break;
                    return renderCreate(activity);
                case 'MemberEvent':

                    return renderMember(activity);
                case 'ForkEvent':
                    //break;
                    return renderFork(activity);
                case 'PullRequestEvent':
                    break;
                    return renderPullRequest(activity);

                case '':
                default: return'';
            }
    } ;

    return {
        'render':render
    }

};