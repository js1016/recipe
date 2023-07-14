1. To enable Loosely Coupled IE (LCIE), please execute following command in an elevated CMD or PowerShell window.
    ```
    REG DELETE "HKLM\SOFTWARE\Policies\Microsoft\Internet Explorer\Main" /v TabProcGrowth /f
    ```
