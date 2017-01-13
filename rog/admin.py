import json

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect

from rog.models import Location,GitHubUser,GitHubWatcherTokens,GitHubApi
from django.contrib.admin.views.decorators import staff_member_required
from django.conf.urls import patterns, include, url
from django.db import models
import logging
# Register your models here.


class GithubTokenInline(admin.StackedInline):
    model = GitHubWatcherTokens
    can_delete = False
    verbose_name_plural = 'tokens'
    extra = 1


class MyUserAdmin(UserAdmin):
    inlines = (GithubTokenInline,)

admin.site.unregister(User)
admin.site.register(User, MyUserAdmin)


class GitHubUserAdmin(admin.TabularInline):
    model = GitHubUser
    extra = 1


class LocationAdmin(admin.ModelAdmin):

    fieldsets = [
        ('Location', {'fields': ['name', 'count']}),

    ]
    actions = ['update_users']
    list_display = ('name', 'count', 'users_count')
    inlines = [GitHubUserAdmin]
    exclude = ('location',)
    list_filter = ['name']
    search_fields = ['name']

    def users_count(self, obj):
        return obj.githubuser_set.count()

    def update_users(self, request, queryset):
        print('updating users')
        locations=''
        for location in queryset:
            location.update_users()
            locations += (location.name+' ')

        self.message_user(request, "Successfully updated users from "+locations)
    update_users.short_description = "Update Users from location"

    def get_urls(self):
        urls = super(LocationAdmin, self).get_urls()
        my_urls = [
            url(r"^update_locations/$", export),
            url(r"^update_locations_file/$", export2),
            ]
        return my_urls + urls


@staff_member_required
def export(request):
    """
    :param request:
    :return:
    """
    #logging.getLogger('update_location')
    print('updating locations and users from server')

    api = GitHubApi()

    following = api.following()
    following_dict = json.loads(following)

    def get_location(username):
        print('Getting location for User: '+username, end=' ')
        user_full_profile = api.get('/users/'+username).read().decode()
        location = json.loads(user_full_profile)['location']
        print("\tGot Location is : "+location)
        return location

    def user_loc(username):
        return {
            'username': username,
            'location': get_location(username)
        }

    username_location = [user_loc(k['login'])for k in following_dict]
    #print(username_location)
    #return HttpResponseRedirect(request.META["HTTP_REFERER"])

    for user in username_location:
        GitHubUser.objects.update_or_create(username=user['username'], location=Location.objects.get_or_create(name=user['location'])[0])

    #GitHubUser.objects.bulk_create([
    #    GitHubUser(username=user['username'], location=Location.objects.get_or_create(name=user['location'])[0]) for user in username_location
    #])

    return HttpResponseRedirect(request.META["HTTP_REFERER"])


@staff_member_required
def export2(request):
    """
    :param request:
    :return:
    """
    #logging.getLogger('update_location')
    print('updating locations from File')
    location_list = ["Kenya", "Nairobi", "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo Marakwet", "Embu", "Garissa", "Homa Bay", "Isiolo", "Kajiado", "Kakamega", "Kericho", "Kiambu", "Kilifi", "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia", "Lamu", "Machakos", "Makueni", "Mandera", "Marsabit", "Meru", "Migori", "Mombasa", "Murang'a", "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua", "Nyeri", "Samburu", "Siaya", "Taita/Taveta", "Tana River", "Tharaka-Nithi", "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot"]
    for location in location_list:
        Location.objects.get_or_create(name=location)

    #GitHubUser.objects.bulk_create([
    #    GitHubUser(username=user['username'], location=Location.objects.get_or_create(name=user['location'])[0]) for user in username_location
    #])

    return HttpResponseRedirect(request.META["HTTP_REFERER"])

admin.site.register(Location,LocationAdmin)
#admin.site.register(GitHubKenyansWatcher)