#!/bin/sh

# Wait for Certbot to generate certificates
while [ ! -f /etc/letsencrypt/live/bullionpricer.com/fullchain.pem ]; do
	echo "Waiting for Certbot to generate certificates..."
	sleep 5
done

# Start Nginx
echo "Letsencrypt certificate found. Starting Nginx..."
nginx -g "daemon off;" &
NGINX_PID=$!

reload_nginx() {
	while true; do
		sleep 6h
		echo "Reloading Nginx..."
		nginx -s reload
		echo "Nginx reloaded."
	done
}

# Run the reload function in the background
reload_nginx &

# Wait for the main Nginx process to finish
wait $NGINX_PID
