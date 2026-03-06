# Kafka-user-activity-microservice
Event-driven microservice for real-time user activities logging using Node.js, Express js, Apache Kafka as messaging broker, MongoDB, and Docker.

-the service produces and listens for events activities through Kafka Consumer, procees them then stores them in mongoDb witha good indexing to support faster Queries.


## Main Goal of this project:
the main goal is to show how an Event-Driven Architecture can be used to ensure loose coupling between servicies, more scalabilty by adding producers and consumers and real time processing   



----------------------------------------------------------------------------------------------------

## Technologies used:
Node.js & Express js: for building RESTful APIs and microservice logic.
MongoDB : for storing logs with indecies.
Apache Kafka: as message broker system between producer and consumer.
Docker: for containeraize the application.
AWS: for hosting the microservice.



----------------------------------------------------------------------------------------------------

## Architecture Approach:
this service follows Domain-Driven Design principle to keep code organized and maintainable.

### the project structured into separate layers:
-Domain Layer: contains the core business logic such as ActivityLog entity and Repository.
-Infrastructure Layer: for integration with external systems like Kafka and MongoDb.
-Presentation Layer / API Layer:exposes REST APIs to create logs and fetch stored logs with pagination and filtering.



----------------------------------------------------------------------------------------------------

## Setup 

```bash
git clone https://github.com/mina3mad/Kafka-activity-microservice.git

npm install

npm run start

docker build app

docker-compose up

