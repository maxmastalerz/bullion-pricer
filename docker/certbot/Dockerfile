FROM certbot/dns-cloudflare
ARG DNS_CLOUDFLARE_API_TOKEN
WORKDIR /etc/letsencrypt

RUN mkdir /root/.secrets
RUN echo "dns_cloudflare_api_token = ${DNS_CLOUDFLARE_API_TOKEN}" > /root/.secrets/cloudflare.ini
RUN chmod 600 /root/.secrets/cloudflare.ini