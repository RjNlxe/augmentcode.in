export const pythonWebModernRules = [
  {
    title: "Modern Python Web Development 2025 Augment Rules",
    tags: ["Python", "FastAPI", "Django", "Flask", "Web Development", "Async"],
    slug: "python-web-development-2025-augment-rules",
    libs: ["FastAPI", "Django", "Flask", "Pydantic", "SQLAlchemy", "Alembic", "Celery"],
    content: `
You are an expert in modern Python web development, async frameworks, and scalable web applications (2024-2025).

## Modern Python Web Stack (2024-2025)

### FastAPI Advanced Patterns:
\`\`\`python
from fastapi import FastAPI, Depends, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, Field, validator
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
import asyncio
from typing import List, Optional, Dict, Any
import redis.asyncio as redis

# Modern Pydantic models with validation
class UserCreate(BaseModel):
    email: str = Field(..., regex=r'^[\\w\\.-]+@[\\w\\.-]+\\.\\w+$')
    password: str = Field(..., min_length=8)
    full_name: str = Field(..., min_length=2, max_length=100)
    
    @validator('password')
    def validate_password(cls, v):
        if not any(c.isupper() for c in v):
            raise ValueError('Password must contain uppercase letter')
        if not any(c.islower() for c in v):
            raise ValueError('Password must contain lowercase letter')
        if not any(c.isdigit() for c in v):
            raise ValueError('Password must contain digit')
        return v

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Modern FastAPI application
app = FastAPI(
    title="Modern API",
    description="High-performance async API with modern patterns",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Middleware setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(GZipMiddleware, minimum_size=1000)

# Database setup
DATABASE_URL = "postgresql+asyncpg://user:pass@localhost/db"
engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

# Dependency injection
async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

# Redis connection
redis_client = redis.Redis(host='localhost', port=6379, db=0)

# Authentication
security = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db)
) -> User:
    token = credentials.credentials
    # Implement JWT validation logic
    user_id = await validate_jwt_token(token)
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = await get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

# Modern async endpoints
@app.post("/users/", response_model=UserResponse)
async def create_user(
    user_data: UserCreate,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db)
):
    """Create new user with background email verification"""
    # Check if user exists
    existing_user = await get_user_by_email(db, user_data.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create user
    user = await create_user_in_db(db, user_data)
    
    # Add background task for email verification
    background_tasks.add_task(send_verification_email, user.email)
    
    return user

@app.get("/users/me", response_model=UserResponse)
async def get_current_user_info(
    current_user: User = Depends(get_current_user)
):
    """Get current user information"""
    return current_user

@app.get("/users/{user_id}/posts", response_model=List[PostResponse])
async def get_user_posts(
    user_id: int,
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get user posts with pagination and caching"""
    cache_key = f"user_posts:{user_id}:{skip}:{limit}"
    
    # Try to get from cache
    cached_posts = await redis_client.get(cache_key)
    if cached_posts:
        return json.loads(cached_posts)
    
    # Get from database
    posts = await get_posts_by_user_id(db, user_id, skip, limit)
    
    # Cache the result
    await redis_client.setex(
        cache_key, 
        300,  # 5 minutes
        json.dumps([post.dict() for post in posts])
    )
    
    return posts
\`\`\`

### Django Async Views and Modern Patterns:
\`\`\`python
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from django.contrib.auth.decorators import login_required
from django.core.cache import cache
from django.db import transaction
from asgiref.sync import sync_to_async
import asyncio
import json

class AsyncUserAPIView(View):
    """Modern Django async view"""
    
    @method_decorator(csrf_exempt)
    async def dispatch(self, request, *args, **kwargs):
        return await super().dispatch(request, *args, **kwargs)
    
    async def get(self, request, user_id=None):
        """Get user(s) asynchronously"""
        if user_id:
            user = await self.get_user_async(user_id)
            if not user:
                return JsonResponse({'error': 'User not found'}, status=404)
            return JsonResponse(await self.serialize_user(user))
        
        # Get all users with pagination
        page = int(request.GET.get('page', 1))
        limit = int(request.GET.get('limit', 20))
        
        users = await self.get_users_paginated(page, limit)
        return JsonResponse({
            'users': [await self.serialize_user(user) for user in users],
            'page': page,
            'limit': limit
        })
    
    async def post(self, request):
        """Create user asynchronously"""
        try:
            data = json.loads(request.body)
            user = await self.create_user_async(data)
            return JsonResponse(await self.serialize_user(user), status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    
    @sync_to_async
    def get_user_async(self, user_id):
        from django.contrib.auth.models import User
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            return None
    
    @sync_to_async
    def get_users_paginated(self, page, limit):
        from django.contrib.auth.models import User
        offset = (page - 1) * limit
        return list(User.objects.all()[offset:offset + limit])
    
    @sync_to_async
    def create_user_async(self, data):
        from django.contrib.auth.models import User
        with transaction.atomic():
            return User.objects.create_user(
                username=data['username'],
                email=data['email'],
                password=data['password']
            )
    
    async def serialize_user(self, user):
        return {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'is_active': user.is_active,
            'date_joined': user.date_joined.isoformat()
        }

# Modern Django settings for async
# settings.py
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'mydb',
        'USER': 'myuser',
        'PASSWORD': 'mypass',
        'HOST': 'localhost',
        'PORT': '5432',
        'OPTIONS': {
            'MAX_CONNS': 20,
            'MIN_CONNS': 5,
        }
    }
}

# Cache configuration
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
            'CONNECTION_POOL_KWARGS': {'max_connections': 50}
        }
    }
}

# Celery configuration for background tasks
CELERY_BROKER_URL = 'redis://localhost:6379/0'
CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
\`\`\`

### Modern Flask with Async Support:
\`\`\`python
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import asyncio
from functools import wraps

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user:pass@localhost/db'
app.config['JWT_SECRET_KEY'] = 'your-secret-key'

# Extensions
db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
CORS(app)

# Rate limiting
limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

# Async wrapper for Flask
def async_route(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            return loop.run_until_complete(f(*args, **kwargs))
        finally:
            loop.close()
    return wrapper

# Modern Flask models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'created_at': self.created_at.isoformat(),
            'is_active': self.is_active
        }

# Modern Flask routes
@app.route('/api/users', methods=['POST'])
@limiter.limit("5 per minute")
@async_route
async def create_user():
    """Create user with async processing"""
    data = request.get_json()
    
    # Validate data
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Email and password required'}), 400
    
    # Check if user exists
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({'error': 'Email already registered'}), 400
    
    # Create user
    user = User(
        email=data['email'],
        password_hash=generate_password_hash(data['password'])
    )
    
    db.session.add(user)
    db.session.commit()
    
    # Generate JWT token
    access_token = create_access_token(identity=user.id)
    
    return jsonify({
        'user': user.to_dict(),
        'access_token': access_token
    }), 201

@app.route('/api/users/me', methods=['GET'])
@jwt_required()
@async_route
async def get_current_user():
    """Get current user info"""
    from flask_jwt_extended import get_jwt_identity
    
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify(user.to_dict())
\`\`\`

### Background Task Processing:
\`\`\`python
from celery import Celery
from celery.schedules import crontab
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Celery configuration
celery_app = Celery(
    'tasks',
    broker='redis://localhost:6379/0',
    backend='redis://localhost:6379/0'
)

celery_app.conf.update(
    task_serializer='json',
    accept_content=['json'],
    result_serializer='json',
    timezone='UTC',
    enable_utc=True,
    beat_schedule={
        'send-daily-reports': {
            'task': 'tasks.send_daily_report',
            'schedule': crontab(hour=9, minute=0),  # 9 AM daily
        },
        'cleanup-old-data': {
            'task': 'tasks.cleanup_old_data',
            'schedule': crontab(hour=2, minute=0),  # 2 AM daily
        },
    }
)

@celery_app.task(bind=True, max_retries=3)
def send_email_task(self, to_email, subject, body):
    """Send email asynchronously with retry logic"""
    try:
        msg = MIMEMultipart()
        msg['From'] = 'noreply@example.com'
        msg['To'] = to_email
        msg['Subject'] = subject
        
        msg.attach(MIMEText(body, 'html'))
        
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login('your-email@gmail.com', 'your-password')
        server.send_message(msg)
        server.quit()
        
        return f"Email sent successfully to {to_email}"
        
    except Exception as exc:
        # Retry with exponential backoff
        raise self.retry(exc=exc, countdown=60 * (2 ** self.request.retries))

@celery_app.task
def process_large_dataset(dataset_id):
    """Process large dataset in background"""
    # Simulate heavy processing
    import time
    import random
    
    for i in range(100):
        time.sleep(0.1)  # Simulate work
        # Update progress
        process_large_dataset.update_state(
            state='PROGRESS',
            meta={'current': i, 'total': 100}
        )
    
    return {'status': 'completed', 'result': random.randint(1000, 9999)}

@celery_app.task
def send_daily_report():
    """Send daily report to all users"""
    # Get all active users
    users = get_active_users()
    
    for user in users:
        send_email_task.delay(
            user.email,
            "Daily Report",
            generate_daily_report(user)
        )
    
    return f"Daily reports sent to {len(users)} users"
\`\`\`

### Modern Testing Patterns:
\`\`\`python
import pytest
import asyncio
from httpx import AsyncClient
from fastapi.testclient import TestClient
from unittest.mock import AsyncMock, patch

# Async test fixtures
@pytest.fixture
async def async_client():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac

@pytest.fixture
async def test_user():
    user_data = {
        "email": "test@example.com",
        "password": "TestPass123",
        "full_name": "Test User"
    }
    return user_data

# Modern async tests
@pytest.mark.asyncio
async def test_create_user(async_client: AsyncClient, test_user):
    """Test user creation endpoint"""
    response = await async_client.post("/users/", json=test_user)
    
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == test_user["email"]
    assert "id" in data
    assert "password" not in data

@pytest.mark.asyncio
async def test_get_user_posts_with_cache(async_client: AsyncClient):
    """Test user posts endpoint with caching"""
    user_id = 1
    
    # Mock Redis cache
    with patch('redis.asyncio.Redis.get') as mock_get:
        mock_get.return_value = None
        
        with patch('redis.asyncio.Redis.setex') as mock_setex:
            response = await async_client.get(f"/users/{user_id}/posts")
            
            assert response.status_code == 200
            mock_setex.assert_called_once()

# Performance testing
@pytest.mark.asyncio
async def test_concurrent_requests():
    """Test API under concurrent load"""
    async with AsyncClient(app=app, base_url="http://test") as client:
        tasks = []
        for i in range(100):
            task = client.get("/users/me")
            tasks.append(task)
        
        responses = await asyncio.gather(*tasks, return_exceptions=True)
        
        # Check that most requests succeeded
        successful = [r for r in responses if hasattr(r, 'status_code')]
        assert len(successful) >= 90  # At least 90% success rate
\`\`\`

### Best Practices:
- Use async/await for I/O-bound operations
- Implement proper error handling and logging
- Use dependency injection for better testability
- Apply rate limiting and security measures
- Implement comprehensive monitoring and metrics
- Use background tasks for heavy processing
- Apply database connection pooling
- Use caching strategies for performance
- Implement proper authentication and authorization
- Use environment-based configuration

### Performance Optimization:
- Use async database drivers (asyncpg, aiomysql)
- Implement connection pooling
- Use Redis for caching and sessions
- Apply database query optimization
- Use CDN for static assets
- Implement proper indexing strategies
- Use compression middleware
- Apply lazy loading for large datasets

Always prioritize security, scalability, and maintainability in web development.
`,
  },
];
