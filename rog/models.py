from pprint import pprint

from django.db import models, OperationalError
from django.db.models.signals import post_save
from django.contrib.auth.admin import User
from django.dispatch import receiver
import os
import json

from urllib.parse import urlencode
from urllib.error import  URLError
from urllib.request import Request,urlopen


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
            self.auth_header =  dict()
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
            # response.info().header
            return response.read().decode()
    
    def authorize(self, request):
        if self.api_account is not None:
            request.add_header("Authorization", "token %s" % (self.api_account.token))

    def put(self, endpoint):
        request = Request(self.api_host + endpoint, method='PUT')
        self.authorize(request)
        return self.response(request)

    def delete(self, endpoint):
        request = Request(self.api_host + endpoint, method='DELETE')
        self.authorize(request)
        return self.response(request)

    def get(self, endpoint):
        request = Request(self.api_host + endpoint, method='GET')
        self.authorize(request)
        return self.response(request)

    def get_user(self, username):
        return self.get('/user/' + username)

    def activities(self):
        endpoint='/users/' + self.auth_name + '/received_events'
    
        print(endpoint)
        return self.get(endpoint)


class Location(models.Model):
    name = models.CharField(max_length=100, unique=True)
    count = models.IntegerField(default=0)

    def __str__(self):
        return self.name

    def update_users(self):
        api = GitHubApi()
        q = urlencode({'q': 'location:' + self.name})
        res = api.get('/search/users?' + q)
        if res is not None:
            data = json.loads(res)  # todo check if response

            # with open(os.path.dirname(__file__) + '/seacrhlocation', encoding='utf-8') as rec_events:
            #    data = json.loads(rec_events.read())

            if data['total_count'] > 0:
                self.count = data['total_count']
                post_save.disconnect(update_location_users,Location)
                self.save()
                post_save.connect(update_location_users,Location)

                for i in data['items']:
                    gu = GitHubUser()
                    gu.username = i['login']
                    gu.location_id = self.id
                    #pprint(gu)
                    gu.follow()
                    gu.save()




@receiver(post_save, sender=Location)
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
        api.put('/user/following/' + self.username)

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
