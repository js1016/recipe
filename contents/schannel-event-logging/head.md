1. Run CMD or PowerShell as an administrator, then execute the following command to enable Schannel event logging:
    ```
    reg add HKLM\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL /v EventLogging /t REG_DWORD /d 7 /f
    ```
    **Note**: You will need to restart any client program that uses Schannel for TLS/SSL communication, such as a browser or client application, for this setting to take effect. If you're unsure which program needs to be restarted, you can opt to restart Windows to ensure the setting is applied.
