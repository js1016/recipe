1. To re-enable IE as a standalone browser, open Registry Editor (regedit.exe) as an administrator, navigate to `HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Internet Explorer\Main` and delete the key named `NotifyDisableIEOptions` or you can execute the following command in an elevated CMD or PowerShell window:
    ```
    REG DELETE "HKLM\SOFTWARE\Policies\Microsoft\Internet Explorer\Main" /v NotifyDisableIEOptions /f
    ```
