1. Edge crash dump should be created at `%LOCALAPPDATA%\Microsoft\Edge\User Data\Crashpad\reports`, you may simply zip the entire `reports` folder to reduce the dump file size.
   
   **Note**: for other channels, dump location will be `%LOCALAPPDATA%\Microsoft\Edge <channel>\User Data\Crashpad\reports`, where `<channel>` is `SxS` (Canary), `Dev` or `Beta`.

2. Since full crash dump takes a lot disk space, it is suggested to remove the user variable: `ENABLE_HEAP_DUMPS` if full crash dump is no longer needed.

   ![](https://joji.blob.core.windows.net/recipe/edge-crashpad-full-dump-3.png)