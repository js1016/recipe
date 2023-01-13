1. To enable Loosely Coupled IE (LCIE), please delete following registry key.

    ```
    [HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Internet Explorer\Main]
    "TabProcGrowth"=dword:00000000
    ```

    ![](https://joji.blob.core.windows.net/recipe/disable-lcie-2.png)
