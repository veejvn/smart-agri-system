# Smart Agriculture Management System

A production-ready microservices platform built for modern agriculture management, helping farmers track crops, monitor weather, get AI-based farming advice, and participate in community forums.

## Technology Stack

- **Backend:** Java Spring Boot, Spring Cloud, Spring Security, Spring Data JPA, REST APIs
- **Infrastructure:** Spring Cloud Gateway, Eureka Service Discovery, Kafka, Redis
- **Databases:** PostgreSQL (Relational), MongoDB (NoSQL)
- **AI Service:** Python, FastAPI, Scikit-learn
- **Frontend:** Next.js
- **Containerization:** Docker, Docker Compose

## Architecture Overview

The system consists of 9 distinct microservices:

1. **API Gateway (`:8080`)**: Central entry point, routing, and authentication filter.
2. **Discovery Service (`:8761`)**: Eureka server for service registration.
3. **Auth Service (`:8081`)**: JWT-based authentication and role-based access control.
4. **User Service (`:8082`)**: Farmer profiles and farm locations management.
5. **Crop Service (`:8083`)**: Crop tracking, farm plots, and farming activity logs.
6. **Weather Service (`:8084`)**: OpenWeatherMap integration, forecast, and weather alerts via Kafka.
7. **Forum Service (`:8085`)**: Community platform with posts, comments, and votes.
8. **Notification Service (`:8086`)**: Event-driven notification delivery.
9. **AI Advice Service (`:8090`)**: Python ML service providing farming recommendations.

## Running the Project Locally

Docker Compose coordinates all necessary infrastructure:
- 4x PostgreSQL Instances (Auth, User, Crop, Notification)
- MongoDB
- Redis
- Kafka & Zookeeper

```bash
cd docker
docker-compose up -d
```
