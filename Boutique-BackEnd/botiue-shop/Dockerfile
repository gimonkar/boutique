# ----- Stage 1: Build the Spring Boot app -----
FROM maven:3.9.6-eclipse-temurin-17 as builder

# Set working directory
WORKDIR /app

# Copy all source code
COPY . .

# Build the application
RUN mvn clean package -DskipTests

# ----- Stage 2: Run the built JAR -----
FROM openjdk:17-jdk-alpine

# Set working directory
WORKDIR /app

# Copy the JAR from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the port your app uses
EXPOSE 8080

# Run the JAR
ENTRYPOINT ["java", "-jar", "app.jar"]
