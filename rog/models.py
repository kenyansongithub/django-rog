from pprint import pprint

from django.db import models, OperationalError
from django.db.models.signals import post_save
from django.contrib.auth.admin import User
from django.dispatch import receiver
import os
import json

from urllib.parse import urlencode
from urllib.error import URLError
from urllib.request import Request, urlopen


# Create your models here.


class GitHubWatcherTokens(models.Model):
    
    owner = models.ForeignKey(User)
    token = models.CharField(max_length=100, null=False)
    username = models.CharField(max_length=50, null=False)


class GitHubApi(object):
    api_host = "https://api.github.com"

    def __init__(self):
        try:
            self.api_account = GitHubWatcherTokens.objects.first()
        except OperationalError:
            self.api_account = None
            self.auth_header = dict()
            self.auth_name = ''
        else:
            #auth_header = {,}
            self.auth_name = self.api_account.username

    def response(self, request):
        try:
            response = urlopen(request)
        except URLError as e:
            if hasattr(e, 'reason'):
                print('Failed to reach a server')
                print('Reason ', e.reason)
            elif hasattr(e, 'code'):
                print('Server couldn\'t fullfill the request')
                print('Error code ', e.code)
            return None

        else:
            # response.status
            # dict(response.info())
            return response#.read().decode()
    
    def authorize(self, request):
        if self.api_account is not None:
            request.add_header("Authorization", "token %s" % (self.api_account.token))

    def put(self, endpoint):
        print('Posting to resource: '+endpoint)
        request = Request(self.api_host + endpoint, method='PUT')
        self.authorize(request)
        return self.response(request)

    def delete(self, endpoint):
        request = Request(self.api_host + endpoint, method='DELETE')
        self.authorize(request)
        return self.response(request)

    def get(self, endpoint):
        print('Requesting resource: '+endpoint)
        request = Request(self.api_host + endpoint, method='GET')
        self.authorize(request)
        return self.response(request)

    def get_user(self, username):
        return self.get('/user/' + username)

    def activities(self):
        endpoint = '/users/' + self.auth_name + '/received_events'
        http_res = self.get(endpoint)

        res = http_res.read().decode()
        headers = dict(http_res.info())
        return res

    def following(self):
        return self.get('/user/following')


class Location(models.Model):
    name = models.CharField(max_length=100, unique=True)
    count = models.IntegerField(default=0)


    class Meta:
        ordering = ('name',)

    def __str__(self):
        return self.name

    def update_users(self):
        api = GitHubApi()
        q = urlencode({'q': 'location:' + self.name})
        url = '/search/users?' + q #+ '&page=4' #for nairobi
        while True:
            http_res = api.get(url)

            res = http_res.read().decode()
            headers = dict(http_res.info())

            if res is not None:
                pprint(headers)
                data = json.loads(res)  # todo check if response

                if data['total_count'] > 0:
                    self.count = data['total_count']
                    post_save.disconnect(update_location_users, Location)
                    self.save()
                    post_save.connect(update_location_users, Location)

                    for i in data['items']:
                        #user, created = GitHubUser.objects.get_or_create(username=i['login'],location=self)
                        try:
                            user = GitHubUser.objects.get(username=i['login'])
                        except GitHubUser.DoesNotExist:
                            user = GitHubUser(username=i['login'])
                            user.location = self
                            user.follow()
                            user.save()

                        try:
                            pass
                            #user.save()
                        except Exception:
                            break

                    if int(headers['X-RateLimit-Remaining']) < 1:
                        print('X-RateLimit Ended')
                        break
                    else:
                        if 'Link' in headers.keys():
                            links_dict={
                                rel.split('=')[1].strip('"') : link.strip('<> ')
                                for (link,rel) in (url_rel.split(';')
                                                   for url_rel in headers['Link'].split(','))

                                }
                            pprint(links_dict)
                            if 'next' in links_dict.keys():
                                url = links_dict['next'].split('com')[1]
                                continue
                            else:
                                break
                        else: break
                else: break
            else: break


#@receiver(post_save, sender=Location)
def update_location_users(sender, instance, **kwargs):
    instance.update_users()


class GitHubUser(models.Model):
    username = models.CharField(max_length=100, unique=True)
    location = models.ForeignKey(Location)
    is_open = models.BooleanField(default=True)

    def __str__(self):
        return self.username

    def follow(self):
        # PUT /user/following/:username
        api = GitHubApi()
        http_res = api.put('/user/following/' + self.username)
        headers = dict(http_res.info())
        #X-RateLimit-Remaining

    def un_follow(self):
        # DELETE /user/following/:username
        api = GitHubApi()
        api.delete('/user/following/' + self.username)

    def close(self):
        self.is_open = False
        self.save()

    def open(self):
        self.is_open = True
        self.save()
