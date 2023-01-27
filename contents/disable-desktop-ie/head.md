1. Download <https://joji.blob.core.windows.net/recipe/disable-desktop-ie.reg> and import this registry file, or manually import the following registry entries. This step requires administrator privileges.

    ```
    Windows Registry Editor Version 5.00

    [HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Internet Explorer\Main]
    "NotifyDisableIEOptions"=dword:00000000
    ```
