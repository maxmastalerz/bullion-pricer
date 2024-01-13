#!/bin/sh

update_cloudflare_ips() {
	# Fetch the latest Cloudflare IP addresses (replace 'curl' with 'wget' if needed)
	cloudflare_ips_v4=$(curl -s https://www.cloudflare.com/ips-v4)
	cloudflare_ips_v6=$(curl -s https://www.cloudflare.com/ips-v6)

	# Create a string with set_real_ip_from lines for each IP address
	set_real_ip_lines=""
	for ip in $cloudflare_ips_v4 $cloudflare_ips_v6; do
	    set_real_ip_lines="${set_real_ip_lines}set_real_ip_from ${ip};\n    "
	done

	# Update nginx.conf with the new set_real_ip_from values
	sed -i '/set_real_ip_from/d' /etc/nginx/nginx.conf
	sed -i "/real_ip_header/c\    ${set_real_ip_lines}real_ip_header X-Forwarded-For;" /etc/nginx/nginx.conf

	echo "Updated set_real_ip_from in nginx.conf:"
	cat /etc/nginx/nginx.conf
}

# Wait for Certbot to generate certificates
while [ ! -f /etc/letsencrypt/live/bullionpricer.com/fullchain.pem ]; do
	echo "Waiting for Certbot to generate certificates..."
	sleep 5
done

update_cloudflare_ips

# Start Nginx
echo "Letsencrypt certificate found. Starting Nginx..."
nginx -g "daemon off;" &
NGINX_PID=$!

reload_nginx() {
	while true; do
		sleep 6h
		update_cloudflare_ips
		echo "Reloading Nginx..."
		nginx -s reload
		echo "Nginx reloaded."
	done
}

# Run the reload function in the background
reload_nginx &

# Wait for the main Nginx process to finish
wait $NGINX_PID
