1. Run CMD or PowerShell as administrator and execute following command:
    ```
    REG ADD "HKLM\SOFTWARE\Policies\Microsoft\Internet Explorer\Main" /v NotifyDisableIEOptions /t REG_DWORD /d 0 /f
    ```
