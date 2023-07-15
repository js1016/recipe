1. Schannel event logs are saved in the System event log. Please follow the steps below to export the System event log.

    - ref:system-event-log

2. If you want to stop Schannel event logging, run CMD or PowerShell as an administrator, then execute the following command:
    ```
    reg add HKLM\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL /v EventLogging /t REG_DWORD /d 1 /f
    ```
