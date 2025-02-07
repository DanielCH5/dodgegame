FROM php:8.2-apache
RUN pecl install redis && docker-php-ext-enable redis
RUN docker-php-ext-install pdo pdo_mysql
RUN a2enmod rewrite

# Install Composer
RUN apt-get update && apt-get install -y \
    curl unzip && \
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
WORKDIR /var/www/html