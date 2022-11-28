1. Go to **Fiddler** -> **File** -> **Save** -> **All Sessions...** to save the file in SAZ format.
2. To revert the Fiddler machine proxy setting, please open `regedit.exe` (Registry Editor)
    - Right click `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Internet Settings` and select **Delete** to delete the registry keys.
    - Right click `HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\CurrentVersion\Internet Settings` and click **Delete** to delete the registry keys.
3. Import the backup registry key files: `HKLM_Internet.reg` and `HKLM_Policies_Internet.reg`
