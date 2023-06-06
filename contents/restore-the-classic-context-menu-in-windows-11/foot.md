1. To restore the modern Windows 11 context menu, open `PowerShell` and run command:
    ```powershell
    Remove-Item "HKCU:\SOFTWARE\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}" -Recurse -Force
    ```
