1. Run PowerShell as an administrator and execute following command to set the PowerShell ExecutionPolicy to `RemoteSigned`. This will allow PowerShell to execute scripts.

    ```powershell
    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
    ```

    If you encounter any errors with the execution of the above command, please proceed with the steps below:

    - To allow script execution in Windows PowerShell, execute following commands in an elevated CMD or PowerShell window:
        ```
        REG ADD HKLM\SOFTWARE\Policies\Microsoft\Windows\PowerShell /v EnableScripts /t REG_DWORD /d 1 /f
        REG ADD HKLM\SOFTWARE\Policies\Microsoft\Windows\PowerShell /v ExecutionPolicy /d "RemoteSigned" /f
        ```
    - To allow script execution in PowerShell Core (Cross-platform PowerShell), execute following commands in an elevated CMD or PowerShell window:
        ```
        REG ADD HKLM\SOFTWARE\Policies\Microsoft\PowerShellCore /v EnableScripts /t REG_DWORD /d 1 /f
        REG ADD HKLM\SOFTWARE\Policies\Microsoft\PowerShellCore /v ExecutionPolicy /d "RemoteSigned" /f
        ```
    - After restarting PowerShell, these changes will take effect. You can run the command `Get-ExecutionPolicy` to check if the current ExecutionPolicy of PowerShell is set to `RemoteSigned`.
