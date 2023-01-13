1. Download and import the registry key file from <https://joji.blob.core.windows.net/recipe/disable-lcie.reg> or set following registry key to disable Loosely Coupled IE (LCIE) (this step requires elevated permission).

    ```
    Windows Registry Editor Version 5.00

    [HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Internet Explorer\Main]
    "TabProcGrowth"=dword:00000000
    ```

    ![](https://joji.blob.core.windows.net/recipe/disable-lcie-1.png)
