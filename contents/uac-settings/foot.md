1. Run CMD or PowerShell and execute the following command:

    ```
    reg export HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System UACSettings.reg
    ```

    You can find the UAC settings-related registry file: `UACSettings.reg` in the current working directory. For example, if you executed the above command in `c:\temp`, the file will be located at: `c:\temp\UACSettings.reg`.

    ![](https://joji.blob.core.windows.net/recipe/uac-settings-1.png)
