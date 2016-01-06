from pprint import pprint
from django.shortcuts import render
from django.http import HttpResponse
import json
import os.path
# Create your views here.
import urllib.request

url = "https://api.github.com/"
from .models import Location, GitHubUser,GitHubApi


def add_location(req):
    lc=Location()
    lc.name=''
    lc.count=''
    lc.save()
    lc.update_users()


def update_users(req):
    #pass a location param
    loc=req.get['location']
    lc=Location.objects.get(pk=1)
    #if location doesn't exist
    add_location(loc)

    with open(os.path.dirname(__file__) + '/seacrhlocation', encoding='utf-8') as rec_events:
        data = json.loads(rec_events.read())
    lc.update_users()



def index(req):
    #update_users(req)
    return render(req,'app/index.html')


def activities(req):

    api = GitHubApi()
    data = api.activities()

    rs = []

    for i in json.loads(data):
        try:
            user=GitHubUser.objects.get(username=i['actor']['login'])
        except GitHubUser.DoesNotExist as e:
            pass
        else:
            i['actor']['location'] = user.location.name
        rs.append(i)

    response= HttpResponse(json.dumps(rs), content_type='application/json')
    response['Access-Control-Allow-Origin']= '*'
    return response