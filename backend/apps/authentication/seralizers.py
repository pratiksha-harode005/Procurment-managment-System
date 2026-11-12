from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from apps.users.serializers import UserSerializer
from django.contrib.auth import get_user_model
from django.db.models import Q

User = get_user_model()


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if hasattr(self, 'initial_data') and isinstance(self.initial_data, dict):
            if 'username' not in self.initial_data and 'email' in self.initial_data:
                self.initial_data['username'] = self.initial_data['email']

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role
        token['username'] = user.username
        token['email'] = user.email
        if user.vendor_id_code:
            token['vendor_id_code'] = user.vendor_id_code
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = UserSerializer(self.user).data
        return data

