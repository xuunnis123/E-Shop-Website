from rest_framework import serializers

from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from google.oauth2 import id_token

from google.auth.transport import requests
from backend.settings import SOCIAL_GOOGLE_CLIENT_ID
from .models import *

class SocialLoginSerializer(serializers.Serializer):
    token = serializers.CharField(required=True)

    def verify_token(self, token):
        """
        驗證 id_token 是否正確

        token: JWT
        """
        try:
            idinfo = id_token.verify_oauth2_token(
                token, requests.Request(), SOCIAL_GOOGLE_CLIENT_ID)
            if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                raise ValueError('Wrong issuer.')
            if idinfo['aud'] not in [SOCIAL_GOOGLE_CLIENT_ID]:
                raise ValueError('Could not verify audience.')
            # Success
            return idinfo
        except ValueError:
            pass

    def create(self, validated_data):
        idinfo = self.verify_token(validated_data.get('token'))
        if idinfo:
            # User not exists
            if not SocialAccount.objects.filter(unique_id=idinfo['sub']).exists():
                user = User.objects.create_user(
                    username=f"{idinfo['name']} {idinfo['email']}", # Username has to be unique
                    first_name=idinfo['given_name'],
                    last_name=idinfo['family_name'],
                    email=idinfo['email']
                )
                SocialAccount.objects.create(
                    user=user,
                    unique_id=idinfo['sub']
                )
                return user
            else:
                social = SocialAccount.objects.get(unique_id=idinfo['sub'])
                return social.user
        else:
            raise ValueError("Incorrect Credentials")

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name']


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        token['title'] = user.title
        return token

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only = True)
    _id = serializers.SerializerMethodField(read_only = True)
    isAdmin = serializers.SerializerMethodField(read_only = True)
    class Meta:
        model = User
        fields = ['id','_id','username','email','name','isAdmin']

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only = True)
    class Meta:
          model = User
          fields = ['id','_id','username','email','name','isAdmin','token']
    def get_token(self,obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'