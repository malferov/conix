variable "ip" {}

data "digitalocean_domain" "domain" {
  name = "${var.domain}"
}

resource "digitalocean_record" "web" {
  domain = data.digitalocean_domain.domain.name
  type   = "A"
  name   = "@"
  value  = var.ip
  ttl    = 3600
}
