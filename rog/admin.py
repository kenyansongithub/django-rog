from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from rog.models import Location,GitHubUser,GitHubWatcherTokens
from django.db import models

# Register your models here.
class GithubTokenInline(admin.StackedInline):
    model=GitHubWatcherTokens
    can_delete = False
    verbose_name_plural = 'tokens'

class MyUserAdmin(UserAdmin):
    inlines = (GithubTokenInline,)

admin.site.unregister(User)
admin.site.register(User,MyUserAdmin)


class GitHubUserAdmin(admin.StackedInline):
    model = GitHubUser
    extra = 1


class LocationAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Location',{'fields':['name','count']}),

    ]
    inlines = [GitHubUserAdmin]
    list_filter = ['name']
    search_fields = ['name']

admin.site.register(Location,LocationAdmin)
#admin.site.register(GitHubKenyansWatcher)