# Addendum: Greenfield Technical & UX Considerations

## Sync Strategy [ASSUMPTION]
To maintain the "No Cloud" promise while allowing multi-device use, the app could implement **Syncthing**-like P2P protocols or simple local network discovery (mDNS/Bonjour). This allows a phone and a desktop to sync when on the same Wi-Fi without data touching the WAN.

## Data Portability
Since there is no cloud backup, Greenfield must prioritize easy, automated local backups. 
- Idea: Auto-export encrypted JSON to a designated local folder on the device (e.g., "On My iPhone" or a specific Android directory).

## Rejected Alternatives
- **iCloud/Google Drive Sync:** Rejected because while "private," the data still sits on big-tech servers. Greenfield aims for physical isolation.
