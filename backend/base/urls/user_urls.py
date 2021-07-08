from django.urls import path
from base.views import user_views as views
from rest_framework_simplejwt import views as jwt_views
#from rest_framework_simplejwt import views as jwt_views
from ..views.user_views import GoogleLogin
urlpatterns =[
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    path('register/', views.registerUser, name="register"),

    path('profile/', views.getUserProfile, name="users-profile"),
    path('profile/update/', views.updateUserProfile, name="user-profile-update"),
    path('', views.getUsers, name="users"),
   
    path('rest-auth/facebook/', views.FacebookLogin.as_view(), name='fb_login'),
    path('rest-auth/google/', views.GoogleLogin.as_view(), name='google_login'),
    
    path('token/obtain/', GoogleLogin.as_view()),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh')

]