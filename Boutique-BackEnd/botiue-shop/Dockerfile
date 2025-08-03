# Use OpenJDK 17 as the base image
FROM openjdk:17-jdk-alpine

# Set working directory inside the container
WORKDIR /app

# Copy the JAR file into the container
COPY target/*.jar app.jar

# Expose the port (default Spring Boot port)
EXPOSE 8080

# Start the application
ENTRYPOINT ["java", "-jar", "app.jar"]
