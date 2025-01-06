FROM amazoncorretto:17-alpine

LABEL maintainer="Hung Vo <votranhung.dev@gmail.com>" \
      version="1.0" \
      description="Zocial Eureka Server" \
      author="Hung Vo" \
      email="votranhung.dev@gmail.com"

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY target/*.jar app.jar

RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 8762

ENV JAVA_OPTS="-Xms512m -Xmx512m"

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
