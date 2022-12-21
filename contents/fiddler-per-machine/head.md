1. Download **Fiddler** from <https://www.telerik.com/download/fiddler> and install it.
2. Open **Fiddler** and go to **Tools** -> **Options** -> **HTTPS** tab. Enable **Decrypt HTTPS traffic**. You will be prompted to install the Fiddler Root certificate (this step requires elevated permission).

    ![](https://joji.blob.core.windows.net/recipe/fiddler-1.png)

3. Close **Fiddler**.
4. Open `regedit.exe` (Registry Editor)

    - Right click `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Internet Settings` and click **Export** to backup the registry keys as: `HKLM_Internet.reg`
    - Right click `HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\CurrentVersion\Internet Settings` and click **Export** to backup the registry keys as `HKLM_Policies_Internet.reg`

5. Download the registry key file from: <https://joji.blob.core.windows.net/recipe/fiddler-per-machine.reg> and import it (this step requires elevated permission).
