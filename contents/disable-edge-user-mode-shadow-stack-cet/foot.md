1. To reactivate the c in Edge, please execute the following command in an elevated Command Prompt (CMD) or PowerShell window:
    ```
    reg delete "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\msedge.exe" /v MitigationOptions /f
    ```
