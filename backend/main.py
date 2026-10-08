import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api import (
    quantum_router,
    keys_router,
    analysis_router,
    security_router,
    system_router,
)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Quantum Random Number Generation for Trusted Cryptographic Keys - Educational & Technical Research Prototype",
    version=settings.VERSION,
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configure CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root & Health Check Endpoints
@app.get("/", tags=["Health Check"])
def root():
    return {
        "name": settings.PROJECT_NAME,
        "subtitle": settings.PROJECT_SUBTITLE,
        "status": "ONLINE",
        "version": settings.VERSION,
        "documentation": "/docs"
    }

@app.get("/health", tags=["Health Check"])
def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "timestamp": uvicorn.__name__
    }

# Include API Routers
app.include_router(quantum_router, prefix=settings.API_V1_STR)
app.include_router(keys_router, prefix=settings.API_V1_STR)
app.include_router(analysis_router, prefix=settings.API_V1_STR)
app.include_router(security_router, prefix=settings.API_V1_STR)
app.include_router(system_router, prefix=settings.API_V1_STR)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
