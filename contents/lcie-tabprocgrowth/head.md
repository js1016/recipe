1. Open a CMD or PowerShell window as administrator and execute following command to disable Loosely Coupled IE (LCIE).

    ```
    REG ADD "HKLM\SOFTWARE\Policies\Microsoft\Internet Explorer\Main" /v TabProcGrowth /t REG_DWORD /d 0 /f
    ```
