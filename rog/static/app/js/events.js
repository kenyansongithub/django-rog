/**
 * Created by brian on 1/3/16.
 */
GitHubEvents = function () {
    var html_url = 'https://github.com/';


    var renderFork = function (activity) {

        return '<p class="list-group-item-text">'+

            '<a href="' + html_url + activity['actor']['login'] + '" >' +
            '<span class="label label-success" >' + activity['actor']['login'] + '</span>' +
            '</a>' +
            '</span> from ' + activity['actor']['location'] + ' forked ' +

            '<a href="' + html_url + activity['repo']['name'] + '" >' + activity['repo']['name'] + '</a> to ' +
            '<a href="' + activity['payload']['forkee']['html_url'] + '" title="' + activity['payload']['forkee']['full_name'] + '">' + activity['payload']['forkee']['full_name'] + '</a>' +


            '</p>'+


        '<div class="pull-sm-right">'+
           '<span class="octicon octicon-git-branch label label-success" aria-label="Fork"> </span> '+
            '<time class="timeago  label label-time" datetime="' + activity['created_at'] + '">10 mins ago</time>'+
        '</div>';



    };
    var renderStar = function (activity) {

        return '<p class="list-group-item-text">'+
            '<a href="' + html_url + activity['actor']['login'] + '" >' +
            '<span class="label label-primary" >' + activity['actor']['login'] + '</span>' +
            '</a> from ' +

            activity['actor']['location'] + ' starred ' +


            '<a href="' + html_url + activity['repo']['name'] + '" >' + activity.repo.name + '</a>' +
            '</p>'+

            '<div class="pull-sm-right">'+
            '<span class="octicon octicon-star label label-primary" aria-label="Star"> </span> '+
            '<time class="timeago  label label-time" datetime="' + activity['created_at'] + '"> 10 mins ago</time>'+
            '</div>';


    };
    var renderCreate = function (activity) {

        return '<p class="list-group-item-text">'+

            '<a href="' + html_url + activity['actor']['login'] + '" >' +
            '<span class="label label-danger" >' + activity['actor']['login'] + '</span>' +
            '</a>' +
            ' from ' + activity['actor']['location'] + ' created repository ' +


            '<a href="' + html_url + activity['repo']['name'] + '" title="' + activity['repo']['name'] + '">' + activity['repo']['name'] + '</a>' +
            '</p>'+


            '<div class="pull-sm-right">'+
            '<span class="octicon octicon-repo label label-danger" aria-label="Create"> </span> '+
            '<time class="timeago  label label-time" datetime="' + activity['created_at'] + '"> 10 mins ago</time>'+
            '</div>';
    };
    var renderMember = function (activity) {

        return '<p class="list-group-item-text">'+
            '<a href="' + html_url + activity['actor']['login'] + '" >' +
            '<span class="label label-warning" >' + activity['actor']['login'] + '</span>' +
            '</a> from ' + activity['actor']['location'] + ' added ' +


            '<a href="' + activity['payload']['member']['html_url'] + '" >' + activity['payload']['member']['login'] + '</a> to ' +
            '<a href="' + html_url + activity['repo']['name'] + '" >' + activity['repo']['name'] + '</a>' +

            '</p>'+


            '<div class="pull-sm-right">'+
            '<span class="octicon octicon-person label label-warning" aria-label="Member"> </span> '+
            '<time class="timeago  label label-time" datetime="' + activity['created_at'] + '"> 10 mins ago</time>'+
            '</div>';

    };
    var renderPullRequest = function () {

        /*return '<div class="alert issues_opened"><div class="body">' +
            '<span aria-label="Pull request" class="mega-octicon octicon-git-pull-request dashboard-event-icon"></span>' +

            '<div class="time">' +
            '<time datetime="2016-01-09T14:38:01Z" is="relative-time" title="Jan 9, 2016, 5:38 PM GMT+3">4 hours ago</time>' +
            '</div>' +

            '<div class="title">' +
            '<a href="/danleyb2" data-ga-click="News feed, event click, Event click type:PullRequestEvent target:actor">danleyb2</a> opened pull request <a href="/kenyansongithub/django-rog/pull/2" data-ga-click="News feed, event click, Event click type:PullRequestEvent target:pull">kenyansongithub/django-rog#2</a>' +
            '</div>' +

            '<div class="details">' +
            '<a href="/danleyb2"><img alt="@danleyb2" class="gravatar" height="30" src="https://avatars2.githubusercontent.com/u/9919961?v=3&amp;s=60" width="30"></a>' +
            '<div class="message">' +
            '<blockquote>add Travis build</blockquote>' +
            '<div class="pull-info">' +
            '<span aria-hidden="true" class="octicon octicon-git-commit"></span>' +
            '<em>7</em> commits with' +
            '<em>67</em> additions and' +
            '<em>38</em> deletions' +
            '</div>        </div>        </div>       </div></div>';*/
        return '<p class="list-group-item-text">'+

            '<a href="' + html_url + activity['actor']['login'] + '" >' +
            '<span class="label label-info" >' + activity['actor']['login'] + '</span>' +
            '</a> from ' + activity['actor']['location'] + ' forked ' +


            ' forked repo1 to repo2'+
            '</p>'+


            '<div class="pull-sm-right">'+
            '<span class="octicon octicon-git-branch label label-info" aria-label="Fork"> </span> '+
            '<time class="timeago  label label-time" datetime="' + activity['created_at'] + '"> 10 mins ago</time>'+
            '</div>';
    };
    var render = function (activity) {
        switch (activity['type']) {
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
            default:
                return '';
        }
    };
    return {
        'render': render
    }

};