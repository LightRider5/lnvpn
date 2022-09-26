# lnvpn
Simple VPN with Lightning

Select a country ➡️ Select duration ➡️ Pay with Lightning ➡️ Use your VPN

LNVPN is a privay focuse VPN provider. We accept only Lightning payments. 





<img width="542" alt="Bildschirmfoto 2022-09-26 um 14 19 35" src="https://user-images.githubusercontent.com/48626097/192274414-200a9950-be03-460f-9dc4-a4c21a662577.png">


# How does it work?

Very simple: On this website you automatically generate WireGuard VPN keys via JavaScript inside of your browser. After selecting a country where your VPN endpoint should be located and a desired validity of your connection you click "Get Invoice" to get a QR code which you can scan with a Bitcoin Lightning capable wallet like Phoenix, Muun, Breez or BlueWallet. After a successful payment, the website reloads and presents you a new QR code and the message PAID. You can now scan the QR code with the WireGuard App on Android Google Play or on the Apple App Store. If you want to use the VPN connection on your PC or Mac you can download the WireGuard configuration file to import it into WireGuard for Windows and MacOS. You can as well send the configuration to yourself via Email to use it later on another divice.

# What services did you use to build this, which VPN service do you use?

For this website, we use the service LNBits for lightning payments, Sendgrid for (optionally) sending WireGuard config file via email, React and socket.IO for WebSockets. On the VPN endpoints we don't use a commercial VPN service but our rented virtual servers from Hetzner (FI and US), Contabo (SG) and OVH (UK and CA) with Wireguard Manager And API managing the WireGuard setup and keys.

# What data do you store about your users? How anonymous is this? What privacy do you offer?

On the lnvpn.net website, we don't use cookies and we only store the first half of your ip address in our webserver logs. For example the IP 1.12.123.234 would be stored as 1.12.0.0. On the VPN endpoints we store your WireGuard public key, the PSK and the total amount of bandwidth you used. While you maintain an active connection to a LNVPN VPN endpoint, we have to keep your IP address in memory, but after 5 minutes of inactivity we remove your IP address from memory. We never store it on disk. As payments are only possible via Bitcoin Lightning, we don't know where the money comes from, we can only verify whether an invoice was paid or not 🤷. If you use the "Send via email" feature for your WireGuard configuration, the email is send via Sendgrid.
What happens after the timeframe I paid my VPN for?

You won't be able to transfer any data over the VPN connection anymore. Your VPN client may indicate it is successfully connected, though.

# Is there a data transfer limit?

Currently, we have four data plans:

    1 hour = 1GB
    1 day = 5GB
    1 week = 10GB
    1 month = 30GB
    3 month = 70GB

# Can I use this VPN for my Lightning Node?

If you need a VPN for your Lightning Node visit tunnelsats.com.

# Who build this?

Berlin Bitcoiners
