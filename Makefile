# === Rails & Docker команды ===
.PHONY: docker-up docker-down migrate test rubocop bash lint-js docker-ps
# Выполнить миграции
migrate:
	docker-compose run --rm web rails db:create db:migrate

# Запуск контейнеров
docker-up:
	docker-compose up

# Остановка контейнеров
docker-down:
	docker-compose down

# Запуск пересборки webpack
docker-dev-webpack:
	docker-compose exec web bin/webpack

# Список запущенных контейнеров
docker-ps:
	docker ps

# Интерактивный bash в контейнере
bash:
	docker exec -it first_rails_to_docker-web-1 /bin/bash

# Запуск тестов
test:
	docker exec -it first_rails_to_docker-web-1 rails test

# Rubocop с автофиксом
rubocop:
	docker exec -it first_rails_to_docker-web-1 bundle exec rubocop -a

# Генерация маршрутов
rake:
	docker exec -it first_rails_to_docker-web-1 bundle exec rake js:routes