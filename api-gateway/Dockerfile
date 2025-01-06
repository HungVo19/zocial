FROM ubuntu:latest
LABEL maintainer="Hung Vo <votranhung.dev@gmail.com>" \
      version="1.0" \
      description="Zocial API Gateway Service" \
      author="Hung Vo" \
      email="votranhung.dev@gmail.com"

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY target/*.jar app.jar

RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 8081

ENV JAVA_OPTS="-Xms512m -Xmx512m" \
    SPRING_PROFILES_ACTIVE="prod"

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]